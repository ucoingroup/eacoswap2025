//
//  AppDelegate.swift
//  EACOswap
//
//  Created by EACO Team on 2026-09-07.
//

import UIKit
import os.log

@main
class AppDelegate: UIResponder, UIApplicationDelegate {

    private let logger = Logger(subsystem: "com.eacoswap.app", category: "AppDelegate")

    func application(
        _ application: UIApplication,
        didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
    ) -> Bool {
        logger.info("App launching...")

        // Initialize theme from persistence
        ThemeManager.shared.applySavedTheme()

        // Initialize localization from persistence
        LocalizationManager.shared.applySavedLanguage()

        // Configure appearance defaults
        configureAppearance()

        // Handle deep links / URL schemes
        URLProtocol.registerClass(URLSchemeHandler.self)

        return true
    }

    // MARK: - UISceneSession Lifecycle

    func application(
        _ application: UIApplication,
        configurationForConnecting connectingSceneSession: UISceneSession,
        options: UIScene.ConnectionOptions
    ) -> UISceneConfiguration {
        return UISceneConfiguration(name: "Default Configuration", sessionRole: connectingSceneSession.role)
    }

    func application(_ application: UIApplication, didDiscardSceneSessions sceneSessions: Set<UISceneSession>) {
        // Cleanup if needed
    }

    // MARK: - URL Handling (Wallet callbacks)

    func application(
        _ app: UIApplication,
        open url: URL,
        options: [UIApplication.OpenURLOptionsKey: Any] = [:]
    ) -> Bool {
        logger.info("Received URL: \(url.absoluteString)")
        WalletManager.shared.handleWalletCallback(url: url)
        return true
    }

    func application(
        _ application: UIApplication,
        didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data
    ) {
        logger.info("Registered for remote notifications")
    }

    func application(
        _ application: UIApplication,
        didFailToRegisterForRemoteNotificationsWithError error: Error
    ) {
        logger.error("Failed to register for remote notifications: \(error.localizedDescription)")
    }

    func applicationDidReceiveMemoryWarning(_ application: UIApplication) {
        logger.warning("Memory warning received - purging caches")
        URLCache.shared.removeAllCachedResponses()
    }

    // MARK: - Appearance Configuration

    private func configureAppearance() {
        // Default navigation bar appearance
        let appearance = UINavigationBarAppearance()
        appearance.configureWithOpaqueBackground()
        appearance.backgroundColor = ThemeManager.shared.currentTheme.backgroundColor
        appearance.titleTextAttributes = [
            .foregroundColor: ThemeManager.shared.currentTheme.textColor
        ]
        appearance.largeTitleTextAttributes = [
            .foregroundColor: ThemeManager.shared.currentTheme.textColor
        ]

        UINavigationBar.appearance().standardAppearance = appearance
        UINavigationBar.appearance().compactAppearance = appearance
        UINavigationBar.appearance().scrollEdgeAppearance = appearance
        UINavigationBar.appearance().tintColor = ThemeManager.shared.currentTheme.accentColor

        // Tab bar appearance
        let tabAppearance = UITabBarAppearance()
        tabAppearance.configureWithOpaqueBackground()
        tabAppearance.backgroundColor = ThemeManager.shared.currentTheme.backgroundColor
        tabAppearance.stackedLayoutAppearance.normal.iconColor = ThemeManager.shared.currentTheme.secondaryTextColor
        tabAppearance.stackedLayoutAppearance.normal.titleTextAttributes = [
            .foregroundColor: ThemeManager.shared.currentTheme.secondaryTextColor
        ]
        tabAppearance.stackedLayoutAppearance.selected.iconColor = ThemeManager.shared.currentTheme.accentColor
        tabAppearance.stackedLayoutAppearance.selected.titleTextAttributes = [
            .foregroundColor: ThemeManager.shared.currentTheme.accentColor
        ]

        UITabBar.appearance().standardAppearance = tabAppearance
        UITabBar.appearance().scrollEdgeAppearance = tabAppearance
    }
}

// MARK: - URL Scheme Handler
private class URLSchemeHandler: URLProtocol {
    override class func canInit(with request: URLRequest) -> Bool {
        return false
    }
    override class func canonicalRequest(for request: URLRequest) -> URLRequest {
        return request
    }
}
