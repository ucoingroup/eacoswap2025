//
//  SettingsViewController.swift
//  EACOswap
//
//  Created by EACO Team on 2026-09-07.
//

import UIKit
import os.log
import SafariServices
import WebKit

class SettingsViewController: UIViewController {

    private let logger = Logger(subsystem: "com.eacoswap.app", category: "SettingsViewController")

    private let tableView = UITableView(frame: .zero, style: .insetGrouped)

    enum Section: Int, CaseIterable {
        case language = 0
        case theme = 1
        case server = 2
        case about = 3
        case actions = 4
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        title = NSLocalizedString("tab.settings", comment: "")
        setupUI()
        setupThemeObserver()
    }

    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        applyThemeColors()
        tableView.reloadData()
    }

    deinit {
        NotificationCenter.default.removeObserver(self)
    }

    private func setupUI() {
        view.backgroundColor = ThemeManager.shared.currentTheme.backgroundColor

        tableView.delegate = self
        tableView.dataSource = self
        tableView.register(UITableViewCell.self, forCellReuseIdentifier: "cell")
        tableView.register(UITableViewCell.self, forCellReuseIdentifier: "themeCell")
        tableView.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(tableView)

        NSLayoutConstraint.activate([
            tableView.topAnchor.constraint(equalTo: view.topAnchor),
            tableView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            tableView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            tableView.bottomAnchor.constraint(equalTo: view.bottomAnchor)
        ])
    }

    private func setupThemeObserver() {
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(themeChanged),
            name: .themeDidChange,
            object: nil
        )
    }

    @objc private func themeChanged() {
        applyThemeColors()
        tableView.reloadData()
    }

    private func applyThemeColors() {
        let theme = ThemeManager.shared.currentTheme
        view.backgroundColor = theme.backgroundColor
        tableView.backgroundColor = theme.backgroundColor
        tableView.separatorColor = theme.separatorColor
    }

    // MARK: - Actions

    private func showLanguagePicker() {
        let alert = UIAlertController(
            title: NSLocalizedString("settings.select_language", comment: ""),
            message: nil,
            preferredStyle: .actionSheet
        )

        for language in AppLanguage.allCases {
            let action = UIAlertAction(title: language.displayName, style: .default) { [weak self] _ in
                LocalizationManager.shared.applyLanguage(language)
                self?.tableView.reloadData()
                self?.updateTabBarTitles()
            }
            if language == LocalizationManager.shared.currentLanguage {
                action.setValue(UIImage(systemName: "checkmark"), forKey: "image")
            }
            alert.addAction(action)
        }

        alert.addAction(UIAlertAction(title: NSLocalizedString("common.cancel", comment: ""), style: .cancel))
        present(alert, animated: true)
    }

    private func showThemePicker() {
        let alert = UIAlertController(
            title: NSLocalizedString("settings.select_theme", comment: ""),
            message: nil,
            preferredStyle: .actionSheet
        )

        for theme in AppTheme.allCases {
            let action = UIAlertAction(title: theme.displayName, style: .default) { [weak self] _ in
                ThemeManager.shared.applyTheme(theme)
                self?.tableView.reloadData()
            }
            if theme == ThemeManager.shared.currentTheme {
                action.setValue(UIImage(systemName: "checkmark"), forKey: "image")
            }
            alert.addAction(action)
        }

        alert.addAction(UIAlertAction(title: NSLocalizedString("common.cancel", comment: ""), style: .cancel))
        present(alert, animated: true)
    }

    private func showServerURLAlert() {
        let alert = UIAlertController(
            title: NSLocalizedString("settings.server_url", comment: ""),
            message: NSLocalizedString("settings.server_url_desc", comment: ""),
            preferredStyle: .alert
        )

        alert.addTextField { textField in
            textField.text = UserDefaults.standard.string(forKey: "server_url") ?? Constants.defaultServerURL
            textField.placeholder = "https://..."
            textField.keyboardType = .URL
            textField.autocorrectionType = .no
            textField.autocapitalizationType = .none
        }

        alert.addAction(UIAlertAction(title: NSLocalizedString("common.save", comment: ""), style: .default) { [weak self] _ in
            if let urlString = alert.textFields?.first?.text,
               self?.isValidURL(urlString) == true {
                UserDefaults.standard.set(urlString, forKey: "server_url")
                self?.tableView.reloadData()
            } else {
                self?.showInvalidURLError()
            }
        })

        alert.addAction(UIAlertAction(title: NSLocalizedString("common.cancel", comment: ""), style: .cancel))
        present(alert, animated: true)
    }

    private func isValidURL(_ string: String) -> Bool {
        guard let url = URL(string: string),
              let scheme = url.scheme else { return false }
        return ["http", "https"].contains(scheme)
    }

    private func showInvalidURLError() {
        let alert = UIAlertController(
            title: NSLocalizedString("settings.invalid_url", comment: ""),
            message: NSLocalizedString("settings.invalid_url_message", comment: ""),
            preferredStyle: .alert
        )
        alert.addAction(UIAlertAction(title: NSLocalizedString("common.ok", comment: ""), style: .default))
        present(alert, animated: true)
    }

    private func clearCache() {
        let alert = UIAlertController(
            title: NSLocalizedString("settings.clear_cache_title", comment: ""),
            message: NSLocalizedString("settings.clear_cache_message", comment: ""),
            preferredStyle: .alert
        )

        alert.addAction(UIAlertAction(title: NSLocalizedString("settings.clear", comment: ""), style: .destructive) { _ in
            // Clear URL cache
            URLCache.shared.removeAllCachedResponses()
            // Clear cookies
            HTTPCookieStorage.shared.removeCookies(since: Date.distantPast)
            // Clear WKWebView website data
            WKWebsiteDataStore.default().removeData(
                ofTypes: WKWebsiteDataStore.allWebsiteDataTypes(),
                modifiedSince: Date.distantPast
            ) { }

            // Show confirmation
            let confirm = UIAlertController(
                title: NSLocalizedString("settings.cache_cleared", comment: ""),
                message: nil,
                preferredStyle: .alert
            )
            confirm.addAction(UIAlertAction(title: NSLocalizedString("common.ok", comment: ""), style: .default))
            self.present(confirm, animated: true)
        })

        alert.addAction(UIAlertAction(title: NSLocalizedString("common.cancel", comment: ""), style: .cancel))
        present(alert, animated: true)
    }

    private func resetToDefaults() {
        let alert = UIAlertController(
            title: NSLocalizedString("settings.reset_title", comment: ""),
            message: NSLocalizedString("settings.reset_message", comment: ""),
            preferredStyle: .alert
        )

        alert.addAction(UIAlertAction(title: NSLocalizedString("settings.reset", comment: ""), style: .destructive) { _ in
            UserDefaults.standard.removeObject(forKey: "server_url")
            UserDefaults.standard.removeObject(forKey: "app_theme")
            UserDefaults.standard.removeObject(forKey: "app_language")
            ThemeManager.shared.applyTheme(.cosmic)
            LocalizationManager.shared.applyLanguage(.english)
            self.tableView.reloadData()
            self.updateTabBarTitles()
        })

        alert.addAction(UIAlertAction(title: NSLocalizedString("common.cancel", comment: ""), style: .cancel))
        present(alert, animated: true)
    }

    private func updateTabBarTitles() {
        guard let tabBarController = tabBarController,
              let viewControllers = tabBarController.viewControllers else { return }

        let titles = [
            NSLocalizedString("tab.home", comment: ""),
            NSLocalizedString("tab.exchange", comment: ""),
            NSLocalizedString("tab.market", comment: ""),
            NSLocalizedString("tab.faq", comment: ""),
            NSLocalizedString("tab.settings", comment: "")
        ]

        for (index, vc) in viewControllers.enumerated() {
            if index < titles.count {
                vc.tabBarItem.title = titles[index]
            }
        }
    }

    private func openEACOWelfare() {
        if let url = URL(string: "https://eacoswap.com/public-welfare-2025") {
            let safariVC = SFSafariViewController(url: url)
            safariVC.preferredControlTintColor = ThemeManager.shared.currentTheme.accentColor
            present(safariVC, animated: true)
        }
    }

    private func copyContractAddress() {
        let address = "5EacoNSJtM7PGqj7Gh2pv1U2N7y1b8ZG6tC6sE7K8b9A"
        UIPasteboard.general.string = address

        let alert = UIAlertController(
            title: NSLocalizedString("settings.copied", comment: ""),
            message: NSLocalizedString("settings.contract_copied", comment: ""),
            preferredStyle: .alert
        )
        alert.addAction(UIAlertAction(title: NSLocalizedString("common.ok", comment: ""), style: .default))
        present(alert, animated: true)
    }
}

// MARK: - UITableViewDataSource
extension SettingsViewController: UITableViewDataSource {
    func numberOfSections(in tableView: UITableView) -> Int {
        return Section.allCases.count
    }

    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        switch Section(rawValue: section) {
        case .language: return 1
        case .theme: return 1
        case .server: return 1
        case .about: return 4 // Contract, Version, Welfare, Links
        case .actions: return 2 // Clear cache, Reset
        case .none: return 0
        }
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "cell", for: indexPath)
        let theme = ThemeManager.shared.currentTheme
        cell.backgroundColor = theme.secondaryBackgroundColor
        cell.textLabel?.textColor = theme.textColor
        cell.detailTextLabel?.textColor = theme.secondaryTextColor
        cell.tintColor = theme.accentColor

        switch Section(rawValue: indexPath.section) {
        case .language:
            cell.textLabel?.text = NSLocalizedString("settings.language", comment: "")
            cell.detailTextLabel?.text = LocalizationManager.shared.currentLanguage.displayName
            cell.accessoryType = .disclosureIndicator

        case .theme:
            cell.textLabel?.text = NSLocalizedString("settings.theme", comment: "")
            cell.detailTextLabel?.text = ThemeManager.shared.currentTheme.displayName
            cell.accessoryType = .disclosureIndicator
            // Add color preview
            let preview = UIView(frame: CGRect(x: 0, y: 0, width: 20, height: 20))
            preview.backgroundColor = theme.accentColor
            preview.layer.cornerRadius = 10
            cell.accessoryView = preview

        case .server:
            cell.textLabel?.text = NSLocalizedString("settings.server_url", comment: "")
            let url = UserDefaults.standard.string(forKey: "server_url") ?? Constants.defaultServerURL
            cell.detailTextLabel?.text = url
            cell.accessoryType = .disclosureIndicator

        case .about:
            switch indexPath.row {
            case 0:
                cell.textLabel?.text = NSLocalizedString("settings.contract", comment: "")
                cell.detailTextLabel?.text = "5Eaco...b9A"
                cell.accessoryType = .none
                let copyButton = UIButton(type: .system)
                copyButton.setImage(UIImage(systemName: "doc.on.doc"), for: .normal)
                copyButton.tintColor = theme.accentColor
                copyButton.addTarget(self, action: #selector(copyContractAddress), for: .touchUpInside)
                copyButton.sizeToFit()
                cell.accessoryView = copyButton
            case 1:
                cell.textLabel?.text = NSLocalizedString("settings.version", comment: "")
                cell.detailTextLabel?.text = "1.0.0 (1)"
                cell.selectionStyle = .none
            case 2:
                cell.textLabel?.text = NSLocalizedString("settings.welfare", comment: "")
                cell.accessoryType = .disclosureIndicator
                cell.accessoryView = nil
            case 3:
                cell.textLabel?.text = NSLocalizedString("settings.links", comment: "")
                cell.detailTextLabel?.text = "eacoswap.com"
                cell.accessoryType = .disclosureIndicator
                cell.accessoryView = nil
            default: break
            }

        case .actions:
            switch indexPath.row {
            case 0:
                cell.textLabel?.text = NSLocalizedString("settings.clear_cache", comment: "")
                cell.textLabel?.textColor = theme.warningColor
                cell.accessoryType = .none
            case 1:
                cell.textLabel?.text = NSLocalizedString("settings.reset_defaults", comment: "")
                cell.textLabel?.textColor = theme.dangerColor
                cell.accessoryType = .none
            default: break
            }

        case .none: break
        }

        return cell
    }

    func tableView(_ tableView: UITableView, titleForHeaderInSection section: Int) -> String? {
        switch Section(rawValue: section) {
        case .language: return NSLocalizedString("settings.header_language", comment: "")
        case .theme: return NSLocalizedString("settings.header_theme", comment: "")
        case .server: return NSLocalizedString("settings.header_server", comment: "")
        case .about: return NSLocalizedString("settings.header_about", comment: "")
        case .actions: return NSLocalizedString("settings.header_actions", comment: "")
        case .none: return nil
        }
    }
}

// MARK: - UITableViewDelegate
extension SettingsViewController: UITableViewDelegate {
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)

        switch Section(rawValue: indexPath.section) {
        case .language:
            showLanguagePicker()
        case .theme:
            showThemePicker()
        case .server:
            showServerURLAlert()
        case .about:
            switch indexPath.row {
            case 0:
                copyContractAddress()
            case 2:
                openEACOWelfare()
            case 3:
                if let url = URL(string: "https://eacoswap.com") {
                    let safariVC = SFSafariViewController(url: url)
                    safariVC.preferredControlTintColor = ThemeManager.shared.currentTheme.accentColor
                    present(safariVC, animated: true)
                }
            default: break
            }
        case .actions:
            switch indexPath.row {
            case 0:
                clearCache()
            case 1:
                resetToDefaults()
            default: break
            }
        case .none: break
        }
    }
}
