//
//  Language.swift
//  EACOswap
//
//  Created by EACO Team on 2026-09-07.
//

import Foundation

enum AppLanguage: String, CaseIterable, Identifiable {
    case english = "en"
    case chinese = "zh-Hans"
    case spanish = "es"
    case arabic = "ar"
    case french = "fr"
    case russian = "ru"

    var id: String { rawValue }

    var displayName: String {
        switch self {
        case .english: return "English"
        case .chinese: return "华语"
        case .spanish: return "Español"
        case .arabic: return "العربية"
        case .french: return "Français"
        case .russian: return "Русский"
        }
    }

    var localeIdentifier: String {
        rawValue
    }

    var isRTL: Bool {
        self == .arabic
    }

    static var `default`: AppLanguage {
        .english
    }
}
