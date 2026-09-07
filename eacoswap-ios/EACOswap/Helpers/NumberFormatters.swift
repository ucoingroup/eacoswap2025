//
//  NumberFormatters.swift
//  EACOswap
//
//  Created by EACO Team on 2026-09-07.
//

import Foundation

enum NumberFormatters {
    
    static let currency: NumberFormatter = {
        let formatter = NumberFormatter()
        formatter.numberStyle = .currency
        formatter.currencySymbol = "$"
        formatter.minimumFractionDigits = 2
        formatter.maximumFractionDigits = 6
        formatter.groupingSeparator = ","
        formatter.groupingSize = 3
        return formatter
    }()
    
    static let price: NumberFormatter = {
        let formatter = NumberFormatter()
        formatter.numberStyle = .decimal
        formatter.minimumFractionDigits = 2
        formatter.maximumFractionDigits = 8
        formatter.groupingSeparator = ","
        formatter.groupingSize = 3
        return formatter
    }()
    
    static let tokenAmount: NumberFormatter = {
        let formatter = NumberFormatter()
        formatter.numberStyle = .decimal
        formatter.minimumFractionDigits = 2
        formatter.maximumFractionDigits = 9
        formatter.groupingSeparator = ","
        formatter.groupingSize = 3
        return formatter
    }()
    
    static let compact: NumberFormatter = {
        let formatter = NumberFormatter()
        formatter.numberStyle = .decimal
        formatter.maximumFractionDigits = 2
        formatter.groupingSeparator = ","
        formatter.groupingSize = 3
        return formatter
    }()
    
    static let percentage: NumberFormatter = {
        let formatter = NumberFormatter()
        formatter.numberStyle = .decimal
        formatter.minimumFractionDigits = 2
        formatter.maximumFractionDigits = 2
        formatter.positivePrefix = "+"
        formatter.negativePrefix = ""
        return formatter
    }()
    
    static let volume: NumberFormatter = {
        let formatter = NumberFormatter()
        formatter.numberStyle = .decimal
        formatter.maximumFractionDigits = 2
        formatter.groupingSeparator = ","
        formatter.groupingSize = 3
        return formatter
    }()
    
    static func currency(_ value: Double) -> String {
        return currency.string(from: NSNumber(value: value)) ?? String(format: "%.2f", value)
    }
    
    static func price(_ value: Double) -> String {
        return price.string(from: NSNumber(value: value)) ?? String(format: "%.2f", value)
    }
    
    static func tokenAmount(_ value: Double) -> String {
        return tokenAmount.string(from: NSNumber(value: value)) ?? String(format: "%.6f", value)
    }
    
    static func compact(_ value: Double) -> String {
        let absValue = abs(value)
        switch absValue {
        case 1_000_000_000_000...:
            return String(format: "%.1fT", value / 1_000_000_000_000)
        case 1_000_000_000...:
            return String(format: "%.1fB", value / 1_000_000_000)
        case 1_000_000...:
            return String(format: "%.1fM", value / 1_000_000)
        case 1_000...:
            return String(format: "%.1fK", value / 1_000)
        default:
            return compact.string(from: NSNumber(value: value)) ?? String(format: "%.2f", value)
        }
    }
    
    static func percentage(_ value: Double) -> String {
        let sign = value >= 0 ? "+" : ""
        return "\(sign)\(String(format: "%.2f", value))%"
    }
    
    static func volume(_ value: Double) -> String {
        return volume.string(from: NSNumber(value: value)) ?? String(format: "%.0f", value)
    }
}
