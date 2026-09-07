package com.eaco.swap

import android.content.Context
import android.content.Intent
import android.net.Uri
import android.webkit.JavascriptInterface
import androidx.browser.customtabs.CustomTabsIntent
import androidx.core.content.ContextCompat
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import android.widget.Toast

class WebAppInterface(
    private val context: Context,
    private val walletManager: WalletManager,
    private val themeManager: ThemeManager,
    private val localeManager: LocaleManager,
    private val apiService: ApiService
) {

    @JavascriptInterface
    fun connectWallet(type: String): String {
        val walletType = try {
            WalletManager.WalletType.valueOf(type.uppercase())
        } catch (e: IllegalArgumentException) {
            return "{\"error\":\"Unsupported wallet type: $type\"}"
        }
        walletManager.connectWallet(walletType)
        return "{\"status\":\"connecting\",\"wallet\":\"$type\"}"
    }

    @JavascriptInterface
    fun getTheme(): String {
        return themeManager.getCurrentTheme().name.lowercase()
    }

    @JavascriptInterface
    fun setTheme(theme: String): String {
        val success = themeManager.setTheme(theme)
        if (success) {
            (context as? MainActivity)?.applyThemeAndRecreate()
        }
        return "{\"success\":$success,\"theme\":\"$theme\"}"
    }

    @JavascriptInterface
    fun getLanguage(): String {
        return localeManager.getCurrentLocale()
    }

    @JavascriptInterface
    fun setLanguage(language: String): String {
        val success = localeManager.setLocale(language)
        if (success) {
            (context as? MainActivity)?.applyLocaleAndRecreate()
        }
        return "{\"success\":$success,\"language\":\"$language\"}"
    }

    @JavascriptInterface
    fun share(text: String) {
        val intent = Intent(Intent.ACTION_SEND).apply {
            type = "text/plain"
            putExtra(Intent.EXTRA_TEXT, text)
        }
        val chooser = Intent.createChooser(intent, context.getString(R.string.share_title))
        ContextCompat.startActivity(context, chooser, null)
    }

    @JavascriptInterface
    fun openBrowser(url: String) {
        try {
            val customTabsIntent = CustomTabsIntent.Builder()
                .setShowTitle(true)
                .build()
            customTabsIntent.launchUrl(context, Uri.parse(url))
        } catch (e: Exception) {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
            ContextCompat.startActivity(context, intent, null)
        }
    }

    @JavascriptInterface
    fun getSolPrice(): String {
        var result = "{\"error\":\"Request failed\"}"
        CoroutineScope(Dispatchers.IO).launch {
            try {
                val response = apiService.getSolPrice()
                withContext(Dispatchers.Main) {
                    result = "{\"price\":${response.price},\"change24h\":${response.change24h}}"
                }
            } catch (e: Exception) {
                withContext(Dispatchers.Main) {
                    result = "{\"error\":\"${e.message}\"}"
                }
            }
        }
        return result
    }

    @JavascriptInterface
    fun getMarketCap(range: String): String {
        var result = "{\"error\":\"Request failed\"}"
        CoroutineScope(Dispatchers.IO).launch {
            try {
                val response = apiService.getMarketCap(range)
                withContext(Dispatchers.Main) {
                    result = "{\"tokens\":${response.tokens.size},\"data\":\"fetched\"}"
                }
            } catch (e: Exception) {
                withContext(Dispatchers.Main) {
                    result = "{\"error\":\"${e.message}\"}"
                }
            }
        }
        return result
    }

    @JavascriptInterface
    fun showToast(message: String) {
        Toast.makeText(context, message, Toast.LENGTH_SHORT).show()
    }

    @JavascriptInterface
    fun isAppInstalled(packageName: String): Boolean {
        return try {
            context.packageManager.getPackageInfo(packageName, 0)
            true
        } catch (e: Exception) {
            false
        }
    }
}
