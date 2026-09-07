package com.eaco.swap

import org.junit.Test
import org.junit.Assert.*

/**
 * Example local unit test for EACOswap Android app.
 *
 * See [testing documentation](http://d.android.com/tools/testing).
 */
class ExampleUnitTest {

    @Test
    fun walletType_fromString_isCorrect() {
        assertEquals(WalletManager.WalletType.PHANTOM, WalletManager.WalletType.valueOf("PHANTOM"))
        assertEquals(WalletManager.WalletType.SOLFLARE, WalletManager.WalletType.valueOf("SOLFLARE"))
        assertEquals(WalletManager.WalletType.BACKPACK, WalletManager.WalletType.valueOf("BACKPACK"))
    }

    @Test
    fun walletType_deepLinkUrl_isCorrect() {
        val phantomUrl = WalletManager.WalletType.PHANTOM.getDeepLinkUrl("eacoswap://wallet/callback")
        assertTrue(phantomUrl.startsWith("phantom://"))
        assertTrue(phantomUrl.contains("eacoswap%3A%2F%2Fwallet%2Fcallback"))
    }

    @Test
    fun themeManager_themeFromString() {
        assertEquals(ThemeManager.Theme.COSMIC, ThemeManager.Theme.fromString("cosmic"))
        assertEquals(ThemeManager.Theme.ARMY, ThemeManager.Theme.fromString("army"))
        assertEquals(ThemeManager.Theme.CLASSIC, ThemeManager.Theme.fromString("classic"))
        assertNull(ThemeManager.Theme.fromString("invalid"))
    }

    @Test
    fun localeManager_supportedLanguages() {
        assertEquals(6, LocaleManager.SUPPORTED_LANGUAGES.size)
        assertTrue(LocaleManager.SUPPORTED_LANGUAGES.any { it.first == "en" })
        assertTrue(LocaleManager.SUPPORTED_LANGUAGES.any { it.first == "zh" })
        assertTrue(LocaleManager.SUPPORTED_LANGUAGES.any { it.first == "es" })
        assertTrue(LocaleManager.SUPPORTED_LANGUAGES.any { it.first == "ar" })
        assertTrue(LocaleManager.SUPPORTED_LANGUAGES.any { it.first == "fr" })
        assertTrue(LocaleManager.SUPPORTED_LANGUAGES.any { it.first == "ru" })
    }

    @Test
    fun addition_isCorrect() {
        assertEquals(4, 2 + 2)
    }
}
