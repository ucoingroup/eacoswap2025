//
//  ThemeManager.swift
//  EACOswap
//
//  Created by EACO Team on 2026-09-07.
//

import UIKit
import Combine
import os.log

final class ThemeManager: ObservableObject {
    static let shared = ThemeManager()

    @Published var currentTheme: AppTheme = .cosmic
    private let logger = Logger(subsystem: "com.eacoswap.app", category: "ThemeManager")

    private let themeKey = "app_theme"

    private init() {
        if let saved = UserDefaults.standard.string(forKey: themeKey),
           let theme = AppTheme(rawValue: saved) {
            currentTheme = theme
        }
    }

    func applySavedTheme() {
        if let saved = UserDefaults.standard.string(forKey: themeKey),
           let theme = AppTheme(rawValue: saved) {
            applyTheme(theme)
        } else {
            applyTheme(.cosmic)
        }
    }

    func applyTheme(_ theme: AppTheme) {
        currentTheme = theme
        UserDefaults.standard.set(theme.rawValue, forKey: themeKey)

        // Apply to key UI components
        let navAppearance = UINavigationBarAppearance()
        navAppearance.configureWithOpaqueBackground()
        navAppearance.backgroundColor = theme.backgroundColor
        navAppearance.titleTextAttributes = [.foregroundColor: theme.textColor]
        navAppearance.largeTitleTextAttributes = [.foregroundColor: theme.textColor]

        UINavigationBar.appearance().standardAppearance = navAppearance
        UINavigationBar.appearance().compactAppearance = navAppearance
        UINavigationBar.appearance().scrollEdgeAppearance = navAppearance
        UINavigationBar.appearance().tintColor = theme.accentColor

        let tabAppearance = UITabBarAppearance()
        tabAppearance.configureWithOpaqueBackground()
        tabAppearance.backgroundColor = theme.backgroundColor
        tabAppearance.stackedLayoutAppearance.normal.iconColor = theme.secondaryTextColor
        tabAppearance.stackedLayoutAppearance.normal.titleTextAttributes = [.foregroundColor: theme.secondaryTextColor]
        tabAppearance.stackedLayoutAppearance.selected.iconColor = theme.accentColor
        tabAppearance.stackedLayoutAppearance.selected.titleTextAttributes = [.foregroundColor: theme.accentColor]

        UITabBar.appearance().standardAppearance = tabAppearance
        UITabBar.appearance().scrollEdgeAppearance = tabAppearance

        UITableView.appearance().backgroundColor = theme.backgroundColor
        UITableView.appearance().separatorColor = theme.separatorColor
        UICollectionView.appearance().backgroundColor = theme.backgroundColor

        UISearchBar.appearance().tintColor = theme.accentColor
        UISearchBar.appearance().barTintColor = theme.backgroundColor

        UIRefreshControl.appearance().tintColor = theme.accentColor

        // Post notification for view controllers to update
        NotificationCenter.default.post(name: .themeDidChange, object: theme)

        // Force refresh visible windows
        for scene in UIApplication.shared.connectedScenes {
            if let windowScene = scene as? UIWindowScene {
                for window in windowScene.windows {
                    window.tintColor = theme.accentColor
                    window.subviews.forEach { $0.removeFromSuperview(); window.addSubview($0) }
                }
            }
        }

        logger.info("Theme applied: \(theme.rawValue)")
    }
}

extension Notification.Name {
    static let themeDidChange = Notification.Name("themeDidChange")
}
