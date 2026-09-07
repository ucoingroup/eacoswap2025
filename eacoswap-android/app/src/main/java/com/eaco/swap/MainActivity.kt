package com.eaco.swap

import android.annotation.SuppressLint
import android.content.Intent
import android.graphics.Bitmap
import android.net.Uri
import android.os.Bundle
import android.view.KeyEvent
import android.view.View
import android.webkit.*
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import com.google.android.material.bottomnavigation.BottomNavigationView
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class MainActivity : AppCompatActivity() {

    private lateinit var webView: WebView
    private lateinit var bottomNav: BottomNavigationView
    private lateinit var walletManager: WalletManager
    private lateinit var themeManager: ThemeManager
    private lateinit var localeManager: LocaleManager
    private lateinit var apiService: ApiService

    companion object {
        const val DEFAULT_SERVER_URL = "http://10.0.2.2:3000"
        const val PREFS_NAME = "eacoswap_prefs"
        const val KEY_SERVER_URL = "server_url"
    }

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        localeManager = LocaleManager(this)
        localeManager.applyLocale()

        themeManager = ThemeManager(this)
        themeManager.applyTheme()

        setContentView(R.layout.activity_main)

        walletManager = WalletManager(this)
        apiService = ApiService.create(getServerUrl())

        webView = findViewById(R.id.webview)
        bottomNav = findViewById(R.id.bottom_navigation)

        setupWebView()
        setupBottomNavigation()
        loadHome()
    }

    @SuppressLint("SetJavaScriptEnabled")
    private fun setupWebView() {
        webView.settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            databaseEnabled = true
            cacheMode = WebSettings.LOAD_DEFAULT
            mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
            userAgentString = userAgentString + " EACOswapApp/1.0.0"
        }

        webView.addJavascriptInterface(
            WebAppInterface(this, walletManager, themeManager, localeManager, apiService),
            "AndroidBridge"
        )

        webView.webViewClient = object : WebViewClient() {
            override fun onPageStarted(view: WebView?, url: String?, favicon: Bitmap?) {
                super.onPageStarted(view, url, favicon)
                webView.visibility = View.VISIBLE
            }

            override fun onReceivedError(
                view: WebView?,
                request: WebResourceRequest?,
                error: WebResourceError?
            ) {
                super.onReceivedError(view, request, error)
                if (request?.isForMainFrame == true) {
                    showOfflinePage()
                }
            }

            override fun onReceivedHttpError(
                view: WebView?,
                request: WebResourceRequest?,
                errorResponse: WebResourceResponse?
            ) {
                super.onReceivedHttpError(view, request, errorResponse)
                if (request?.isForMainFrame == true && errorResponse?.statusCode == 404) {
                    showOfflinePage()
                }
            }

            override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
                val url = request?.url?.toString() ?: return false
                if (url.startsWith("http://") || url.startsWith("https://")) {
                    if (url.contains("phantom.app") || url.contains("solflare.com") || url.contains("backpack.app")) {
                        walletManager.openWalletUrl(url)
                        return true
                    }
                    return false
                }
                try {
                    val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
                    ContextCompat.startActivity(this@MainActivity, intent, null)
                    return true
                } catch (e: Exception) {
                    return false
                }
            }
        }

        webView.webChromeClient = object : WebChromeClient() {
            override fun onConsoleMessage(consoleMessage: ConsoleMessage?): Boolean {
                consoleMessage?.let {
                    android.util.Log.d("WebView", "${it.message()} -- From line ${it.lineNumber()} of ${it.sourceId()}")
                }
                return true
            }
        }
    }

    private fun setupBottomNavigation() {
        bottomNav.setOnItemSelectedListener { item ->
            when (item.itemId) {
                R.id.nav_home -> loadUrl("/")
                R.id.nav_exchange -> loadUrl("/exchange")
                R.id.nav_market -> loadUrl("/market")
                R.id.nav_faq -> loadUrl("/faq")
                R.id.nav_settings -> showSettingsFragment()
            }
            true
        }
    }

    private fun getServerUrl(): String {
        val prefs = getSharedPreferences(PREFS_NAME, MODE_PRIVATE)
        return prefs.getString(KEY_SERVER_URL, DEFAULT_SERVER_URL) ?: DEFAULT_SERVER_URL
    }

    private fun loadHome() {
        loadUrl("/")
    }

    fun loadUrl(path: String) {
        val base = getServerUrl().trimEnd('/')
        val url = if (path.startsWith("/")) "$base$path" else "$base/$path"
        webView.loadUrl(url)
    }

    fun showOfflinePage() {
        webView.loadUrl("file:///android_asset/webview_error.html")
    }

    fun showSettingsFragment() {
        val fragment = SettingsFragment()
        supportFragmentManager.beginTransaction()
            .replace(R.id.fragment_container, fragment)
            .addToBackStack("settings")
            .commit()
        webView.visibility = View.GONE
    }

    fun hideSettingsFragment() {
        supportFragmentManager.popBackStack()
        webView.visibility = View.VISIBLE
    }

    override fun onKeyDown(keyCode: Int, event: KeyEvent?): Boolean {
        if (keyCode == KeyEvent.KEYCODE_BACK) {
            if (supportFragmentManager.backStackEntryCount > 0) {
                hideSettingsFragment()
                return true
            }
            if (webView.canGoBack()) {
                webView.goBack()
                return true
            }
        }
        return super.onKeyDown(keyCode, event)
    }

    override fun onNewIntent(intent: Intent?) {
        super.onNewIntent(intent)
        intent?.data?.let { uri ->
            if (uri.scheme == "eacoswap" && uri.host == "wallet") {
                val pubKey = uri.getQueryParameter("public_key")
                pubKey?.let {
                    webView.evaluateJavascript(
                        "window.dispatchEvent(new CustomEvent('walletConnected', { detail: '$it' }))",
                        null
                    )
                }
            }
        }
    }

    fun reloadWithNewServer(url: String) {
        getSharedPreferences(PREFS_NAME, MODE_PRIVATE)
            .edit()
            .putString(KEY_SERVER_URL, url)
            .apply()
        apiService = ApiService.create(url)
        loadHome()
    }

    fun applyThemeAndRecreate() {
        recreate()
    }

    fun applyLocaleAndRecreate() {
        recreate()
    }

    fun getWebView(): WebView = webView
}
