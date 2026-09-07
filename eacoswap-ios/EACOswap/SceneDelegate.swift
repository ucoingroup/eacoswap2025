//
//  SceneDelegate.swift
//  EACOswap
//
//  Created by EACO Team on 2026-09-07.
//

import UIKit
import os.log

class SceneDelegate: UIResponder, UIWindowSceneDelegate {

    var window: UIWindow?
    private let logger = Logger(subsystem: "com.eacoswap.app", category: "SceneDelegate")

    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
        guard let windowScene = (scene as? UIWindowScene) else { return }

        logger.info("Scene connecting...")
        window = UIWindow(windowScene: windowScene)
        window?.tintColor = ThemeManager.shared.currentTheme.accentColor

        let tabBarController = UITabBarController()
        tabBarController.viewControllers = createViewControllers()
        window?.rootViewController = tabBarController
        window?.makeKeyAndVisible()

        // Handle cold-start URL
        if let urlContext = connectionOptions.urlContexts.first {
            handleURL(urlContext.url)
        }
    }

    func sceneDidDisconnect(_ scene: UIScene) {
        logger.info("Scene disconnected")
    }

    func sceneDidBecomeActive(_ scene: UIScene) {
        NotificationCenter.default.post(name: .appDidBecomeActive, object: nil)
    }

    func sceneWillResignActive(_ scene: UIScene) {
        // Save any pending state
    }

    func sceneWillEnterForeground(_ scene: UIScene) {
        NotificationCenter.default.post(name: .appWillEnterForeground, object: nil)
    }

    func sceneDidEnterBackground(_ scene: UIScene) {
        // Persist any unsaved state
    }

    func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
        guard let url = URLContexts.first?.url else { return }
        handleURL(url)
    }

    // MARK: - Helpers

    private func createViewControllers() -> [UIViewController] {
        let homeVC = MainViewController()
        homeVC.tabBarItem = UITabBarItem(
            title: NSLocalizedString("tab.home", comment: ""),
            image: UIImage(systemName: "house"),
            selectedImage: UIImage(systemName: "house.fill")
        )

        let exchangeVC = ExchangeViewController()
        exchangeVC.tabBarItem = UITabBarItem(
            title: NSLocalizedString("tab.exchange", comment: ""),
            image: UIImage(systemName: "arrow.left.arrow.right"),
            selectedImage: UIImage(systemName: "arrow.left.arrow.right.circle.fill")
        )

        let marketVC = MarketViewController()
        marketVC.tabBarItem = UITabBarItem(
            title: NSLocalizedString("tab.market", comment: ""),
            image: UIImage(systemName: "chart.bar"),
            selectedImage: UIImage(systemName: "chart.bar.fill")
        )

        let faqVC = FAQViewController()
        faqVC.tabBarItem = UITabBarItem(
            title: NSLocalizedString("tab.faq", comment: ""),
            image: UIImage(systemName: "questionmark.circle"),
            selectedImage: UIImage(systemName: "questionmark.circle.fill")
        )

        let settingsVC = SettingsViewController()
        settingsVC.tabBarItem = UITabBarItem(
            title: NSLocalizedString("tab.settings", comment: ""),
            image: UIImage(systemName: "gear"),
            selectedImage: UIImage(systemName: "gear.circle.fill")
        )

        let controllers = [homeVC, exchangeVC, marketVC, faqVC, settingsVC]
        return controllers.map { UINavigationController(rootViewController: $0) }
    }

    private func handleURL(_ url: URL) {
        logger.info("Handling URL: \(url.absoluteString)")
        WalletManager.shared.handleWalletCallback(url: url)
    }
}

extension Notification.Name {
    static let appDidBecomeActive = Notification.Name("appDidBecomeActive")
    static let appWillEnterForeground = Notification.Name("appWillEnterForeground")
}
