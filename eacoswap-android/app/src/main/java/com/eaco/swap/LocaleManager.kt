package com.eaco.swap

import android.content.Context
import android.os.Build
import androidx.core.content.edit
import androidx.core.os.ConfigurationCompat
import java.util.Locale

class LocaleManager(private val context: Context) {

    companion object {
        const val PREFS_LOCALE = "locale_prefs"
        const val KEY_LANGUAGE = "language_code"
        const val DEFAULT_LANGUAGE = "en"

        val SUPPORTED_LANGUAGES = listOf(
            "en" to "English",
            "zh" to "中文",
            "es" to "Español",
            "ar" to "العربية",
            "fr" to "Français",
            "ru" to "Русский"
        )
    }

    fun getCurrentLocale(): String {
        val prefs = context.getSharedPreferences(PREFS_LOCALE, Context.MODE_PRIVATE)
        return prefs.getString(KEY_LANGUAGE, DEFAULT_LANGUAGE) ?: DEFAULT_LANGUAGE
    }

    fun setLocale(languageCode: String): Boolean {
        val supported = SUPPORTED_LANGUAGES.any { it.first == languageCode }
        return if (supported) {
            context.getSharedPreferences(PREFS_LOCALE, Context.MODE_PRIVATE).edit {
                putString(KEY_LANGUAGE, languageCode)
            }
            true
        } else {
            false
        }
    }

    fun applyLocale() {
        val languageCode = getCurrentLocale()
        updateResources(context, languageCode)
    }

    fun isRtl(): Boolean {
        return getCurrentLocale() == "ar"
    }

    private fun updateResources(context: Context, languageCode: String) {
        val locale = Locale(languageCode)
        Locale.setDefault(locale)

        val resources = context.resources
        val configuration = resources.configuration

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            configuration.setLocale(locale)
            configuration.setLayoutDirection(locale)
        } else {
            @Suppress("DEPRECATION")
            configuration.locale = locale
        }

        resources.updateConfiguration(configuration, resources.displayMetrics)
    }

    fun getLanguageName(code: String): String {
        return SUPPORTED_LANGUAGES.find { it.first == code }?.second ?: "English"
    }
}
