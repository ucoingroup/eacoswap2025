//
//  Constants.swift
//  EACOswap
//
//  Created by EACO Team on 2026-09-07.
//

import Foundation
import UIKit

enum Constants {

    // MARK: - API Endpoints

    static var baseServerURL: String {
        UserDefaults.standard.string(forKey: "server_url") ?? defaultServerURL
    }

    static let defaultServerURL = "http://localhost:3000"

    static var apiBaseURL: String {
        baseServerURL
    }

    // MARK: - EACO Contract

    static let eacoContractAddress = "5EacoNSJtM7PGqj7Gh2pv1U2N7y1b8ZG6tC6sE7K8b9A"

    // MARK: - Token Mint Addresses

    enum TokenMints {
        static let sol  = "So11111111111111111111111111111111111111112"
        static let usdt = "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"
        static let usdc = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
        static let wbnb = "9gP2K5Qq5KmM8L3J6N7r8P9Q0R1S2T3U4V5W6X7Y8Z9"
        static let trx  = "A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1"
        static let weth = "7vfCXTUXx5WJV5JMHxQK5UJjB8DQ4kK9QLg6r12WJLyr"
        static let wbtc = "3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJ"
        static let ecnh = "Z1Y2X3W4V5U6T7S8R9Q0P1O2N3M4L5K6J7I8H9G0F1"
        static let eaco = "5EacoNSJtM7PGqj7Gh2pv1U2N7y1b8ZG6tC6sE7K8b9A"
    }

    // MARK: - DEX URLs

    enum DEXURLs {
        static let jupiter   = "https://jup.ag"
        static let raydium   = "https://raydium.io"
        static let orca      = "https://orca.so"
        static let meteora   = "https://meteora.ag"
        static let lifinity  = "https://lifinity.io"
        static let phoenix   = "https://phoenix.trade"
    }

    // MARK: - OrbMarkets

    static let orbMarketsBaseURL = "https://orbmarkets.com"
    static let orbMarketsEACOPage = "https://orbmarkets.com/token/5EacoNSJtM7PGqj7Gh2pv1U2N7y1b8ZG6tC6sE7K8b9A"

    // MARK: - Wallet Deep Links

    enum WalletDeepLinks {
        static let phantom  = "phantom://"
        static let solflare = "solflare://"
        static let backpack = "backpack://"
    }

    // MARK: - External URLs

    static let eacoWebsite = "https://eacoswap.com"
    static let charityURL  = "https://eacoswap.com/charity"
    static let docsURL     = "https://docs.eacoswap.com"
    static let supportURL  = "https://support.eacoswap.com"

    // MARK: - App Info

    static let appBundleID = "com.eacoswap.app"
    static let appVersion: String = {
        Bundle.main.infoDictionary?["CFBundleShortVersionString"] as? String ?? "1.0.0"
    }()
    static let buildNumber: String = {
        Bundle.main.infoDictionary?["CFBundleVersion"] as? String ?? "1"
    }()

    // MARK: - UI Constants

    enum UI {
        static let cornerRadius: CGFloat = 12
        static let buttonHeight: CGFloat = 50
        static let padding: CGFloat = 16
        static let cardPadding: CGFloat = 20
        static let animationDuration: TimeInterval = 0.25
        static let shadowOpacity: Float = 0.15
        static let shadowRadius: CGFloat = 8
        static let shadowOffset = CGSize(width: 0, height: 4)
    }

    // MARK: - Cache Keys

    enum CacheKeys {
        static let selectedLanguage = "selected_language"
        static let selectedTheme    = "selected_theme"
        static let serverURL        = "server_url"
        static let walletAddress    = "wallet_address"
        static let walletProvider   = "wallet_provider"
        static let lastMarketData   = "last_market_data"
        static let lastMarketUpdate = "last_market_update"
    }

    // MARK: - Notification Names

    static let themeDidChangeNotification    = Notification.Name("themeDidChange")
    static let languageDidChangeNotification = Notification.Name("languageDidChange")
    static let walletDidConnectNotification  = Notification.Name("walletDidConnect")
    static let walletDidDisconnectNotification = Notification.Name("walletDidDisconnect")
}

// MARK: - Notification.Name Extensions

extension Notification.Name {
    static let themeDidChange    = Constants.themeDidChangeNotification
    static let languageDidChange = Constants.languageDidChangeNotification
    static let walletDidConnect  = Constants.walletDidConnectNotification
    static let walletDidDisconnect = Constants.walletDidDisconnectNotification
}
