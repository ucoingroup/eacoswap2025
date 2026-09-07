//
//  Theme.swift
//  EACOswap
//
//  Created by EACO Team on 2026-09-07.
//

import UIKit

enum AppTheme: String, CaseIterable, Identifiable {
    case cosmic = "cosmic"
    case army = "army"
    case classic = "classic"

    var id: String { rawValue }

    var displayName: String {
        switch self {
        case .cosmic: return NSLocalizedString("theme.cosmic", comment: "")
        case .army: return NSLocalizedString("theme.army", comment: "")
        case .classic: return NSLocalizedString("theme.classic", comment: "")
        }
    }

    var backgroundColor: UIColor {
        switch self {
        case .cosmic: return UIColor(hex: "#0a1628")
        case .army: return UIColor(hex: "#1b2a1b")
        case .classic: return UIColor(hex: "#f5f0e8")
        }
    }

    var secondaryBackgroundColor: UIColor {
        switch self {
        case .cosmic: return UIColor(hex: "#14243e")
        case .army: return UIColor(hex: "#2a3d2a")
        case .classic: return UIColor(hex: "#ebe5d9")
        }
    }

    var accentColor: UIColor {
        switch self {
        case .cosmic: return UIColor(hex: "#64ffda")
        case .army: return UIColor(hex: "#c3b091")
        case .classic: return UIColor(hex: "#8b0000")
        }
    }

    var textColor: UIColor {
        switch self {
        case .cosmic: return .white
        case .army: return UIColor(hex: "#e8e4dc")
        case .classic: return UIColor(hex: "#1a1a1a")
        }
    }

    var secondaryTextColor: UIColor {
        switch self {
        case .cosmic: return UIColor(hex: "#8b9bb4")
        case .army: return UIColor(hex: "#a3b899")
        case .classic: return UIColor(hex: "#5c5c5c")
        }
    }

    var separatorColor: UIColor {
        switch self {
        case .cosmic: return UIColor(hex: "#1e3350")
        case .army: return UIColor(hex: "#2d402d")
        case .classic: return UIColor(hex: "#d4cec2")
        }
    }

    var successColor: UIColor {
        switch self {
        case .cosmic: return UIColor(hex: "#00e676")
        case .army: return UIColor(hex: "#76b041")
        case .classic: return UIColor(hex: "#2e7d32")
        }
    }

    var dangerColor: UIColor {
        switch self {
        case .cosmic: return UIColor(hex: "#ff5252")
        case .army: return UIColor(hex: "#d64545")
        case .classic: return UIColor(hex: "#b71c1c")
        }
    }

    var warningColor: UIColor {
        switch self {
        case .cosmic: return UIColor(hex: "#ffab40")
        case .army: return UIColor(hex: "#d4a843")
        case .classic: return UIColor(hex: "#f57c00")
        }
    }

    var positiveChangeColor: UIColor {
        successColor
    }

    var negativeChangeColor: UIColor {
        dangerColor
    }

    var cardBackgroundColor: UIColor {
        secondaryBackgroundColor
    }

    var navigationBarColor: UIColor {
        backgroundColor
    }

    var tabBarColor: UIColor {
        backgroundColor
    }
}
