//
//  LocalizationManager.swift
//  EACOswap
//
//  Created by EACO Team on 2026-09-07.
//

import UIKit
import os.log

final class LocalizationManager: ObservableObject {
    static let shared = LocalizationManager()

    @Published var currentLanguage: AppLanguage = .english
    private let logger = Logger(subsystem: "com.eacoswap.app", category: "LocalizationManager")

    private let languageKey = "app_language"

    private init() {
        if let saved = UserDefaults.standard.string(forKey: languageKey),
           let lang = AppLanguage(rawValue: saved) {
            currentLanguage = lang
        }
    }

    func applySavedLanguage() {
        if let saved = UserDefaults.standard.string(forKey: languageKey),
           let lang = AppLanguage(rawValue: saved) {
            applyLanguage(lang)
        }
    }

    func applyLanguage(_ language: AppLanguage) {
        currentLanguage = language
        UserDefaults.standard.set(language.rawValue, forKey: languageKey)
        UserDefaults.standard.set([language.rawValue], forKey: "AppleLanguages")

        // Set RTL for Arabic
        if language.isRTL {
            UIView.appearance().semanticContentAttribute = .forceRightToLeft
            UIApplication.shared.windows.forEach { window in
                window.semanticContentAttribute = .forceRightToLeft
            }
        } else {
            UIView.appearance().semanticContentAttribute = .unspecified
            UIApplication.shared.windows.forEach { window in
                window.semanticContentAttribute = .unspecified
            }
        }

        NotificationCenter.default.post(name: .languageDidChange, object: language)
        logger.info("Language applied: \(language.rawValue)")

        // Force reload root view controller to reflect changes
        DispatchQueue.main.async {
            for scene in UIApplication.shared.connectedScenes {
                if let windowScene = scene as? UIWindowScene {
                    for window in windowScene.windows {
                        guard let root = window.rootViewController else { continue }
                        let snapshot = window.snapshotView(afterScreenUpdates: false)
                        window.addSubview(snapshot!)

                        root.view.setNeedsLayout()
                        root.view.layoutIfNeeded()

                        UIView.animate(withDuration: 0.3, animations: {
                            snapshot?.alpha = 0
                        }) { _ in
                            snapshot?.removeFromSuperview()
                        }
                    }
                }
            }
        }
    }

    func localizedString(_ key: String, comment: String = "") -> String {
        let bundle = getBundle(for: currentLanguage)
        return NSLocalizedString(key, tableName: nil, bundle: bundle, value: "", comment: comment)
    }

    private func getBundle(for language: AppLanguage) -> Bundle {
        guard let path = Bundle.main.path(forResource: language.rawValue, ofType: "lproj"),
              let bundle = Bundle(path: path) else {
            return Bundle.main
        }
        return bundle
    }
}

extension Notification.Name {
    static let languageDidChange = Notification.Name("languageDidChange")
}
