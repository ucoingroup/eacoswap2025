//
//  WalletManager.swift
//  EACOswap
//
//  Created by EACO Team on 2026-09-07.
//

import UIKit
import os.log

final class WalletManager {
    static let shared = WalletManager()

    private let logger = Logger(subsystem: "com.eacoswap.app", category: "WalletManager")
    private var walletCallback: ((Result<String, WalletError>) -> Void)?

    private init() {}

    enum WalletType: String, CaseIterable {
        case phantom = "phantom"
        case solflare = "solflare"
        case backpack = "backpack"

        var universalLink: String {
            switch self {
            case .phantom: return "https://phantom.app/ul/browse"
            case .solflare: return "https://solflare.com/ul/browse"
            case .backpack: return "https://backpack.app/ul/browse"
            }
        }

        var scheme: String {
            switch self {
            case .phantom: return "phantom"
            case .solflare: return "solflare"
            case .backpack: return "backpack"
            }
        }

        var appStoreURL: String {
            switch self {
            case .phantom:
                return "https://apps.apple.com/app/phantom-solana-wallet/id1598432977"
            case .solflare:
                return "https://apps.apple.com/app/solflare-wallet/id1580902717"
            case .backpack:
                return "https://apps.apple.com/app/backpack-crypto-wallet/id6445964367"
            }
        }

        var displayName: String {
            switch self {
            case .phantom: return "Phantom"
            case .solflare: return "Solflare"
            case .backpack: return "Backpack"
            }
        }

        var iconName: String {
            switch self {
            case .phantom: return "wallet.pass"
            case .solflare: return "sun.max"
            case .backpack: return "backpack"
            }
        }
    }

    enum WalletError: LocalizedError {
        case walletNotInstalled
        case invalidCallback
        case connectionRejected
        case timeout
        case unknown

        var errorDescription: String? {
            switch self {
            case .walletNotInstalled:
                return NSLocalizedString("wallet.not_installed", comment: "")
            case .invalidCallback:
                return NSLocalizedString("wallet.invalid_callback", comment: "")
            case .connectionRejected:
                return NSLocalizedString("wallet.connection_rejected", comment: "")
            case .timeout:
                return NSLocalizedString("wallet.timeout", comment: "")
            case .unknown:
                return NSLocalizedString("wallet.unknown_error", comment: "")
            }
        }
    }

    /// Connect wallet via universal link
    func connectWallet(type: WalletType, from viewController: UIViewController) {
        let serverURL = UserDefaults.standard.string(forKey: "server_url") ?? Constants.defaultServerURL
        let encodedURL = serverURL.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) ?? serverURL

        let universalURL = URL(string: "\(type.universalLink)?url=\(encodedURL)&ref=eacoswap")!
        let schemeURL = URL(string: "\(type.scheme)://browse?url=\(encodedURL)")!

        // Check if wallet app is installed
        if UIApplication.shared.canOpenURL(schemeURL) {
            logger.info("Opening installed wallet: \(type.displayName)")
            UIApplication.shared.open(schemeURL, options: [:]) { success in
                if !success {
                    self.fallbackToUniversalLink(universalURL, orAppStore: type.appStoreURL, from: viewController)
                }
            }
        } else {
            logger.info("Wallet not installed, falling back: \(type.displayName)")
            fallbackToUniversalLink(universalURL, orAppStore: type.appStoreURL, from: viewController)
        }
    }

    /// Open wallet app or show App Store fallback
    private func fallbackToUniversalLink(_ url: URL, orAppStore appStoreURL: String, from viewController: UIViewController) {
        let alert = UIAlertController(
            title: NSLocalizedString("wallet.not_installed_title", comment: ""),
            message: String(format: NSLocalizedString("wallet.not_installed_message", comment: ""), WalletType.phantom.displayName),
            preferredStyle: .alert
        )

        alert.addAction(UIAlertAction(title: NSLocalizedString("wallet.install", comment: ""), style: .default) { _ in
            if let appStore = URL(string: appStoreURL) {
                UIApplication.shared.open(appStore)
            }
        })

        alert.addAction(UIAlertAction(title: NSLocalizedString("wallet.continue_web", comment: ""), style: .default) { _ in
            UIApplication.shared.open(url)
        })

        alert.addAction(UIAlertAction(title: NSLocalizedString("common.cancel", comment: ""), style: .cancel))

        viewController.present(alert, animated: true)
    }

    /// Handle wallet callback URL
    func handleWalletCallback(url: URL) {
        logger.info("Processing wallet callback: \(url.absoluteString)")

        guard let components = URLComponents(url: url, resolvingAgainstBaseURL: false),
              let queryItems = components.queryItems else {
            walletCallback?(.failure(.invalidCallback))
            return
        }

        if let errorItem = queryItems.first(where: { $0.name == "error" }),
           let errorValue = errorItem.value {
            logger.error("Wallet error: \(errorValue)")
            walletCallback?(.failure(.connectionRejected))
            return
        }

        if let pubKeyItem = queryItems.first(where: { $0.name == "pubkey" }),
           let pubKey = pubKeyItem.value {
            logger.info("Wallet connected: \(pubKey)")
            UserDefaults.standard.set(pubKey, forKey: "wallet_public_key")
            UserDefaults.standard.set(Date().timeIntervalSince1970, forKey: "wallet_connected_at")
            walletCallback?(.success(pubKey))
            NotificationCenter.default.post(name: .walletConnected, object: pubKey)
        }
    }

    func disconnectWallet() {
        UserDefaults.standard.removeObject(forKey: "wallet_public_key")
        UserDefaults.standard.removeObject(forKey: "wallet_connected_at")
        NotificationCenter.default.post(name: .walletDisconnected, object: nil)
    }

    func getConnectedWallet() -> String? {
        return UserDefaults.standard.string(forKey: "wallet_public_key")
    }

    func isWalletConnected() -> Bool {
        return getConnectedWallet() != nil
    }

    func getWalletType() -> WalletType? {
        guard let wallet = getConnectedWallet() else { return nil }
        // Determine from stored preference or default to phantom
        if let typeString = UserDefaults.standard.string(forKey: "wallet_type"),
           let type = WalletType(rawValue: typeString) {
            return type
        }
        return .phantom
    }

    func setWalletCallback(_ callback: @escaping (Result<String, WalletError>) -> Void) {
        self.walletCallback = callback
    }
}

extension Notification.Name {
    static let walletConnected = Notification.Name("walletConnected")
    static let walletDisconnected = Notification.Name("walletDisconnected")
}
