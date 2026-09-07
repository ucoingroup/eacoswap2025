package com.eaco.swap

import android.content.Context
import android.os.Build
import androidx.appcompat.app.AppCompatDelegate
import androidx.core.content.edit

class ThemeManager(private val context: Context) {

    enum class Theme(val themeName: String, val themeResId: Int) {
        COSMIC("cosmic", R.style.Theme_EACOswap_Cosmic),
        ARMY("army", R.style.Theme_EACOswap_Army),
        CLASSIC("classic", R.style.Theme_EACOswap_Classic);

        companion object {
            fun fromString(name: String): Theme? {
                return entries.find { it.name.lowercase() == name.lowercase() }
            }
        }
    }

    companion object {
        const val PREFS_THEME = "theme_prefs"
        const val KEY_THEME = "current_theme"
        const val DEFAULT_THEME = "cosmic"
    }

    fun getCurrentTheme(): Theme {
        val prefs = context.getSharedPreferences(PREFS_THEME, Context.MODE_PRIVATE)
        val themeName = prefs.getString(KEY_THEME, DEFAULT_THEME) ?: DEFAULT_THEME
        return Theme.fromString(themeName) ?: Theme.COSMIC
    }

    fun setTheme(themeName: String): Boolean {
        val theme = Theme.fromString(themeName)
        return if (theme != null) {
            context.getSharedPreferences(PREFS_THEME, Context.MODE_PRIVATE).edit {
                putString(KEY_THEME, themeName.lowercase())
            }
            true
        } else {
            false
        }
    }

    fun applyTheme() {
        val theme = getCurrentTheme()
        context.setTheme(theme.themeResId)

        // Apply night mode based on theme
        when (theme) {
            Theme.COSMIC, Theme.ARMY -> {
                AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_YES)
            }
            Theme.CLASSIC -> {
                AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO)
            }
        }
    }

    fun getThemeColors(): ThemeColors {
        return when (getCurrentTheme()) {
            Theme.COSMIC -> ThemeColors(
                primary = context.getColor(R.color.cosmic_primary),
                primaryVariant = context.getColor(R.color.cosmic_primary_variant),
                secondary = context.getColor(R.color.cosmic_secondary),
                background = context.getColor(R.color.cosmic_background),
                surface = context.getColor(R.color.cosmic_surface),
                onPrimary = context.getColor(R.color.cosmic_on_primary),
                onSecondary = context.getColor(R.color.cosmic_on_secondary)
            )
            Theme.ARMY -> ThemeColors(
                primary = context.getColor(R.color.army_primary),
                primaryVariant = context.getColor(R.color.army_primary_variant),
                secondary = context.getColor(R.color.army_secondary),
                background = context.getColor(R.color.army_background),
                surface = context.getColor(R.color.army_surface),
                onPrimary = context.getColor(R.color.army_on_primary),
                onSecondary = context.getColor(R.color.army_on_secondary)
            )
            Theme.CLASSIC -> ThemeColors(
                primary = context.getColor(R.color.classic_primary),
                primaryVariant = context.getColor(R.color.classic_primary_variant),
                secondary = context.getColor(R.color.classic_secondary),
                background = context.getColor(R.color.classic_background),
                surface = context.getColor(R.color.classic_surface),
                onPrimary = context.getColor(R.color.classic_on_primary),
                onSecondary = context.getColor(R.color.classic_on_secondary)
            )
        }
    }

    data class ThemeColors(
        val primary: Int,
        val primaryVariant: Int,
        val secondary: Int,
        val background: Int,
        val surface: Int,
        val onPrimary: Int,
        val onSecondary: Int
    )
}
