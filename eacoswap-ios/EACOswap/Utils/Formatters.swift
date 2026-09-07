//
//  Formatters.swift
//  EACOswap
//
//  Created by EACO Team on 2026-09-07.
//

import UIKit

enum NumberFormatters {

    // MARK: - Price Formatter (2-6 decimal places)

    static var price: NumberFormatter {
        let formatter = NumberFormatter()
        formatter.numberStyle = .decimal
        formatter.minimumFractionDigits = 2
        formatter.maximumFractionDigits = 6
        formatter.groupingSeparator = ","
        formatter.decimalSeparator = "."
        formatter.usesGroupingSeparator = true
        return formatter
    }

    /// Format price with dynamic decimal places based on value magnitude
    static func price(_ value: Double) -> String {
        let formatter = NumberFormatter()
        formatter.numberStyle = .decimal
        formatter.usesGroupingSeparator = true
        formatter.groupingSeparator = ","
        formatter.decimalSeparator = "."

        let absValue = abs(value)
        if absValue >= 1 {
            formatter.minimumFractionDigits = 2
            formatter.maximumFractionDigits = 2
        } else if absValue >= 0.01 {
            formatter.minimumFractionDigits = 4
            formatter.maximumFractionDigits = 4
        } else if absValue >= 0.0001 {
            formatter.minimumFractionDigits = 6
            formatter.maximumFractionDigits = 6
        } else {
            formatter.minimumFractionDigits = 8
            formatter.maximumFractionDigits = 10
            formatter.numberStyle = .scientific
        }

        return formatter.string(from: NSNumber(value: value)) ?? String(format: "%.6f", value)
    }

    // MARK: - Market Cap Formatter (B/M/K)

    static var marketCap: NumberFormatter {
        let formatter = NumberFormatter()
        formatter.numberStyle = .currency
        formatter.currencySymbol = "$"
        formatter.maximumFractionDigits = 2
        formatter.minimumFractionDigits = 0
        return formatter
    }

    /// Format market cap with B/M/K suffixes
    static func marketCap(_ value: Double) -> String {
        let absValue = abs(value)
        let formatter = NumberFormatter()
        formatter.numberStyle = .decimal
        formatter.maximumFractionDigits = 2
        formatter.minimumFractionDigits = 0

        switch absValue {
        case 1_000_000_000_000...:
            if let formatted = formatter.string(from: NSNumber(value: value / 1_000_000_000_000)) {
                return "\(formatted)T"
            }
        case 1_000_000_000...:
            if let formatted = formatter.string(from: NSNumber(value: value / 1_000_000_000)) {
                return "\(formatted)B"
            }
        case 1_000_000...:
            if let formatted = formatter.string(from: NSNumber(value: value / 1_000_000)) {
                return "\(formatted)M"
            }
        case 1_000...:
            if let formatted = formatter.string(from: NSNumber(value: value / 1_000)) {
                return "\(formatted)K"
            }
        default:
            if let formatted = formatter.string(from: NSNumber(value: value)) {
                return "\(formatted)"
            }
        }
        return String(format: "%.0f", value)
    }

    // MARK: - Volume Formatter

    static var volume: NumberFormatter {
        let formatter = NumberFormatter()
        formatter.numberStyle = .decimal
        formatter.maximumFractionDigits = 0
        formatter.usesGroupingSeparator = true
        formatter.groupingSeparator = ","
        return formatter
    }

    /// Format volume with appropriate suffix
    static func volume(_ value: Double) -> String {
        let absValue = abs(value)
        let formatter = NumberFormatter()
        formatter.numberStyle = .decimal
        formatter.maximumFractionDigits = 2
        formatter.minimumFractionDigits = 0
        formatter.usesGroupingSeparator = true
        formatter.groupingSeparator = ","

        switch absValue {
        case 1_000_000_000_000...:
            if let formatted = formatter.string(from: NSNumber(value: value / 1_000_000_000_000)) {
                return "\(formatted)T"
            }
        case 1_000_000_000...:
            if let formatted = formatter.string(from: NSNumber(value: value / 1_000_000_000)) {
                return "\(formatted)B"
            }
        case 1_000_000...:
            if let formatted = formatter.string(from: NSNumber(value: value / 1_000_000)) {
                return "\(formatted)M"
            }
        case 1_000...:
            if let formatted = formatter.string(from: NSNumber(value: value / 1_000)) {
                return "\(formatted)K"
            }
        default:
            if let formatted = formatter.string(from: NSNumber(value: value)) {
                return "\(formatted)"
            }
        }
        return String(format: "%.0f", value)
    }

    // MARK: - Percentage Formatter with Color Logic

    static var percentage: NumberFormatter {
        let formatter = NumberFormatter()
        formatter.numberStyle = .decimal
        formatter.minimumFractionDigits = 2
        formatter.maximumFractionDigits = 2
        formatter.positivePrefix = "+"
        formatter.negativePrefix = "-"
        formatter.groupingSeparator = ","
        return formatter
    }

    /// Format percentage with +/-/0 sign
    static func percentage(_ value: Double) -> String {
        if value > 0 {
            return String(format: "+%.2f%%", value)
        } else if value < 0 {
            return String(format: "%.2f%%", value)
        } else {
            return "0.00%"
        }
    }

    /// Get color for percentage value (positive = green/success, negative = red/danger, zero = neutral)
    static func percentageColor(_ value: Double, theme: AppTheme) -> UIColor {
        if value > 0 {
            return theme.positiveChangeColor
        } else if value < 0 {
            return theme.negativeChangeColor
        } else {
            return theme.secondaryTextColor
        }
    }

    /// Format percentage with attributed color
    static func attributedPercentage(_ value: Double, theme: AppTheme) -> NSAttributedString {
        let text = percentage(value)
        let color = percentageColor(value, theme: theme)
        let attributes: [NSAttributedString.Key: Any] = [
            .foregroundColor: color,
            .font: UIFont.preferredFont(forTextStyle: .body)
        ]
        return NSAttributedString(string: text, attributes: attributes)
    }

    // MARK: - Currency Formatter

    static var currency: NumberFormatter {
        let formatter = NumberFormatter()
        formatter.numberStyle = .currency
        formatter.currencySymbol = "$"
        formatter.maximumFractionDigits = 2
        formatter.minimumFractionDigits = 2
        formatter.usesGroupingSeparator = true
        formatter.groupingSeparator = ","
        return formatter
    }

    /// Format as currency with symbol
    static func currency(_ value: Double, symbol: String = "$") -> String {
        let formatter = NumberFormatter()
        formatter.numberStyle = .currency
        formatter.currencySymbol = symbol
        formatter.maximumFractionDigits = 2
        formatter.minimumFractionDigits = 2
        formatter.usesGroupingSeparator = true
        formatter.groupingSeparator = ","
        return formatter.string(from: NSNumber(value: value)) ?? String(format: "%@%.2f", symbol, value)
    }

    // MARK: - Token Amount Formatter

    static func tokenAmount(_ value: Double, decimals: Int = 6) -> String {
        let formatter = NumberFormatter()
        formatter.numberStyle = .decimal
        formatter.usesGroupingSeparator = true
        formatter.groupingSeparator = ","
        formatter.decimalSeparator = "."

        if value >= 1 {
            formatter.minimumFractionDigits = 2
            formatter.maximumFractionDigits = decimals
        } else {
            formatter.minimumFractionDigits = 2
            formatter.maximumFractionDigits = min(decimals, 8)
        }

        return formatter.string(from: NSNumber(value: value)) ?? String(format: "%.*f", decimals, value)
    }

    // MARK: - Compact Number Formatter

    static func compact(_ value: Double) -> String {
        let absValue = abs(value)
        let formatter = NumberFormatter()
        formatter.numberStyle = .decimal
        formatter.maximumFractionDigits = 1

        switch absValue {
        case 1_000_000_000_000...:
            if let formatted = formatter.string(from: NSNumber(value: value / 1_000_000_000_000)) {
                return "\(formatted)T"
            }
        case 1_000_000_000...:
            if let formatted = formatter.string(from: NSNumber(value: value / 1_000_000_000)) {
                return "\(formatted)B"
            }
        case 1_000_000...:
            if let formatted = formatter.string(from: NSNumber(value: value / 1_000_000)) {
                return "\(formatted)M"
            }
        case 1_000...:
            if let formatted = formatter.string(from: NSNumber(value: value / 1_000)) {
                return "\(formatted)K"
            }
        default:
            formatter.maximumFractionDigits = 2
            if let formatted = formatter.string(from: NSNumber(value: value)) {
                return "\(formatted)"
            }
        }
        return String(format: "%.2f", value)
    }

    // MARK: - Date Formatters

    static let iso8601Formatter: ISO8601DateFormatter = {
        let formatter = ISO8601DateFormatter()
        formatter.formatOptions = [.withInternetDateTime, .withFractionalSeconds]
        return formatter
    }()

    static let shortDateFormatter: DateFormatter = {
        let formatter = DateFormatter()
        formatter.dateStyle = .short
        formatter.timeStyle = .none
        return formatter
    }()

    static let mediumDateFormatter: DateFormatter = {
        let formatter = DateFormatter()
        formatter.dateStyle = .medium
        formatter.timeStyle = .short
        return formatter
    }()
}

// MARK: - Attributed String Helpers

extension NSAttributedString {
    /// Create attributed string with color and font
    static func colored(_ text: String, color: UIColor, font: UIFont? = nil) -> NSAttributedString {
        var attributes: [NSAttributedString.Key: Any] = [.foregroundColor: color]
        if let font = font {
            attributes[.font] = font
        }
        return NSAttributedString(string: text, attributes: attributes)
    }

    /// Create attributed string with multiple colored segments
    static func combined(_ segments: [(String, UIColor, UIFont?)]) -> NSAttributedString {
        let result = NSMutableAttributedString()
        for (text, color, font) in segments {
            result.append(.colored(text, color: color, font: font))
        }
        return result
    }
}
