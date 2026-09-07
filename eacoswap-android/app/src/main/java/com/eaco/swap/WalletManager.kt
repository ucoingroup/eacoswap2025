package com.eaco.swap

import android.content.Context
import android.content.Intent
import android.net.Uri
import androidx.core.content.ContextCompat
import androidx.core.content.edit

class WalletManager(private val context: Context) {

    enum class WalletType(val displayName: String, val packageName: String?, val deepLinkScheme: String) {
        PHANTOM("Phantom", "app.phantom", "phantom"),
        SOLFLARE("Solflare", "com.solflare.mobile", "solflare"),
        BACKPACK("Backpack", "app.backpack.mobile", "backpack");

        fun getDeepLinkUrl(callbackUrl: String): String {
            return "$deepLinkScheme://browse?url=${Uri.encode(callbackUrl)}"
        }
    }

    companion object {
        const val PREF_WALLET_TYPE = "wallet_type"
        const val PREF_WALLET_PUBKEY = "wallet_pubkey"
    }

    fun connectWallet(type: WalletType) {
        val callbackUrl = "eacoswap://wallet/callback"
        val deepLinkUrl = type.getDeepLinkUrl(callbackUrl)

        if (isWalletInstalled(type)) {
            openDeepLink(deepLinkUrl)
        } else {
            showInstallDialog(type)
        }
    }

    fun isWalletInstalled(type: WalletType): Boolean {
        return type.packageName?.let { packageName ->
            try {
                context.packageManager.getPackageInfo(packageName, 0)
                true
            } catch (e: Exception) {
                false
            }
        } ?: false
    }

    fun openWalletUrl(url: String) {
        val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
        ContextCompat.startActivity(context, intent, null)
    }

    private fun openDeepLink(url: String) {
        val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url)).apply {
            flags = Intent.FLAG_ACTIVITY_NEW_TASK
        }
        try {
            ContextCompat.startActivity(context, intent, null)
        } catch (e: Exception) {
            openInBrowser(url)
        }
    }

    private fun openInBrowser(url: String) {
        val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
        ContextCompat.startActivity(context, intent, null)
    }

    private fun showInstallDialog(type: WalletType) {
        // Show dialog via MainActivity or WebView callback
        val playStoreUrl = when (type) {
            WalletType.PHANTOM -> "https://play.google.com/store/apps/details?id=app.phantom"
            WalletType.SOLFLARE -> "https://play.google.com/store/apps/details?id=com.solflare.mobile"
            WalletType.BACKPACK -> "https://play.google.com/store/apps/details?id=app.backpack.mobile"
        }
        openInBrowser(playStoreUrl)
    }

    fun saveWalletConnection(type: WalletType, publicKey: String) {
        context.getSharedPreferences("wallet_prefs", Context.MODE_PRIVATE).edit {
            putString(PREF_WALLET_TYPE, type.name)
            putString(PREF_WALLET_PUBKEY, publicKey)
        }
    }

    fun getConnectedWallet(): Pair<WalletType?, String?> {
        val prefs = context.getSharedPreferences("wallet_prefs", Context.MODE_PRIVATE)
        val typeName = prefs.getString(PREF_WALLET_TYPE, null)
        val pubKey = prefs.getString(PREF_WALLET_PUBKEY, null)
        val type = typeName?.let { WalletType.valueOf(it) }
        return type to pubKey
    }

    fun disconnectWallet() {
        context.getSharedPreferences("wallet_prefs", Context.MODE_PRIVATE).edit {
            remove(PREF_WALLET_TYPE)
            remove(PREF_WALLET_PUBKEY)
        }
    }
}
