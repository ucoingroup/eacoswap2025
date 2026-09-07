package com.eaco.swap

import android.app.AlertDialog
import android.content.Context
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.webkit.WebView
import android.widget.ArrayAdapter
import android.widget.Button
import android.widget.EditText
import android.widget.Spinner
import android.widget.TextView
import android.widget.Toast
import androidx.core.content.edit
import androidx.fragment.app.Fragment
import java.util.Locale

class SettingsFragment : Fragment() {

    private lateinit var serverUrlInput: EditText
    private lateinit var languageSpinner: Spinner
    private lateinit var themeSpinner: Spinner
    private lateinit var aboutSection: View
    private lateinit var clearCacheButton: Button
    private lateinit var eacoContractText: TextView
    private lateinit var welfareLink: TextView

    private lateinit var localeManager: LocaleManager
    private lateinit var themeManager: ThemeManager

    companion object {
        const val EACO_CONTRACT_ADDRESS = "EACOxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
        const val WELFARE_URL = "https://eacoswap.com/welfare-2025"
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        localeManager = LocaleManager(requireContext())
        themeManager = ThemeManager(requireContext())
        return inflater.inflate(R.layout.fragment_settings, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        serverUrlInput = view.findViewById(R.id.server_url_input)
        languageSpinner = view.findViewById(R.id.language_spinner)
        themeSpinner = view.findViewById(R.id.theme_spinner)
        aboutSection = view.findViewById(R.id.about_section)
        clearCacheButton = view.findViewById(R.id.clear_cache_button)
        eacoContractText = view.findViewById(R.id.eaco_contract_text)
        welfareLink = view.findViewById(R.id.welfare_link)

        setupServerUrl()
        setupLanguageSpinner()
        setupThemeSpinner()
        setupAboutSection()
        setupClearCache()
    }

    private fun setupServerUrl() {
        val prefs = requireActivity().getSharedPreferences(MainActivity.PREFS_NAME, Context.MODE_PRIVATE)
        val currentUrl = prefs.getString(MainActivity.KEY_SERVER_URL, MainActivity.DEFAULT_SERVER_URL)
        serverUrlInput.setText(currentUrl)

        view?.findViewById<Button>(R.id.save_server_button)?.setOnClickListener {
            val newUrl = serverUrlInput.text.toString().trim()
            if (newUrl.isNotEmpty()) {
                (activity as? MainActivity)?.reloadWithNewServer(newUrl)
                Toast.makeText(requireContext(), R.string.server_url_saved, Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun setupLanguageSpinner() {
        val languages = LocaleManager.SUPPORTED_LANGUAGES.map { it.second }
        val adapter = ArrayAdapter(requireContext(), android.R.layout.simple_spinner_item, languages)
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
        languageSpinner.adapter = adapter

        val currentLang = localeManager.getCurrentLocale()
        val currentIndex = LocaleManager.SUPPORTED_LANGUAGES.indexOfFirst { it.first == currentLang }
        languageSpinner.setSelection(currentIndex.coerceAtLeast(0))

        view?.findViewById<Button>(R.id.apply_language_button)?.setOnClickListener {
            val selectedIndex = languageSpinner.selectedItemPosition
            val langCode = LocaleManager.SUPPORTED_LANGUAGES[selectedIndex].first
            localeManager.setLocale(langCode)
            (activity as? MainActivity)?.applyLocaleAndRecreate()
        }
    }

    private fun setupThemeSpinner() {
        val themes = ThemeManager.Theme.entries.map { it.themeName.replaceFirstChar { c -> c.uppercase() } }
        val adapter = ArrayAdapter(requireContext(), android.R.layout.simple_spinner_item, themes)
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
        themeSpinner.adapter = adapter

        val currentTheme = themeManager.getCurrentTheme()
        val currentIndex = ThemeManager.Theme.entries.indexOf(currentTheme)
        themeSpinner.setSelection(currentIndex.coerceAtLeast(0))

        view?.findViewById<Button>(R.id.apply_theme_button)?.setOnClickListener {
            val selectedIndex = themeSpinner.selectedItemPosition
            val themeName = ThemeManager.Theme.entries[selectedIndex].name.lowercase()
            themeManager.setTheme(themeName)
            (activity as? MainActivity)?.applyThemeAndRecreate()
        }
    }

    private fun setupAboutSection() {
        eacoContractText.text = getString(R.string.eaco_contract_label, EACO_CONTRACT_ADDRESS)
        eacoContractText.setOnClickListener {
            copyToClipboard(EACO_CONTRACT_ADDRESS)
        }

        welfareLink.setOnClickListener {
            (activity as? MainActivity)?.let { mainActivity ->
                val webInterface = WebAppInterface(
                    mainActivity,
                    WalletManager(mainActivity),
                    ThemeManager(mainActivity),
                    LocaleManager(mainActivity),
                    ApiService.create(mainActivity.getSharedPreferences(MainActivity.PREFS_NAME, Context.MODE_PRIVATE)
                        .getString(MainActivity.KEY_SERVER_URL, MainActivity.DEFAULT_SERVER_URL)!!)
                )
                webInterface.openBrowser(WELFARE_URL)
            }
        }

        view?.findViewById<TextView>(R.id.version_text)?.text =
            getString(R.string.version_text, "1.0.0")
    }

    private fun setupClearCache() {
        clearCacheButton.setOnClickListener {
            AlertDialog.Builder(requireContext())
                .setTitle(R.string.clear_cache_title)
                .setMessage(R.string.clear_cache_message)
                .setPositiveButton(R.string.yes) { _, _ ->
                    clearWebViewCache()
                    Toast.makeText(requireContext(), R.string.cache_cleared, Toast.LENGTH_SHORT).show()
                }
                .setNegativeButton(R.string.no, null)
                .show()
        }
    }

    private fun clearWebViewCache() {
        (activity as? MainActivity)?.getWebView()?.apply {
            clearCache(true)
            clearHistory()
            clearFormData()
        }
    }

    private fun copyToClipboard(text: String) {
        val clipboard = requireContext().getSystemService(Context.CLIPBOARD_SERVICE) as android.content.ClipboardManager
        val clip = android.content.ClipData.newPlainText("EACO Contract", text)
        clipboard.setPrimaryClip(clip)
        Toast.makeText(requireContext(), R.string.copied_to_clipboard, Toast.LENGTH_SHORT).show()
    }
}
