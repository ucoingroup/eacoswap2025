//
//  Extensions.swift
//  EACOswap
//
//  Created by EACO Team on 2026-09-07.
//

import UIKit

// MARK: - UIColor Hex Initializer

extension UIColor {
    /// Initialize UIColor from a hex string (supports #RGB, #RGBA, #RRGGBB, #RRGGBBAA)
    convenience init(hex: String) {
        let hexString = hex.trimmingCharacters(in: .whitespacesAndNewlines)
            .replacingOccurrences(of: "#", with: "")
            .replacingOccurrences(of: "0x", with: "")

        var hexValue: UInt64 = 0
        guard Scanner(string: hexString).scanHexInt64(&hexValue) else {
            self.init(white: 0, alpha: 1)
            return
        }

        let length = hexString.count
        let r, g, b, a: CGFloat

        switch length {
        case 3: // RGB (12-bit)
            r = CGFloat((hexValue & 0xF00) >> 8) / 15.0
            g = CGFloat((hexValue & 0x0F0) >> 4) / 15.0
            b = CGFloat(hexValue & 0x00F) / 15.0
            a = 1.0
        case 4: // RGBA (12-bit)
            r = CGFloat((hexValue & 0xF000) >> 12) / 15.0
            g = CGFloat((hexValue & 0x0F00) >> 8) / 15.0
            b = CGFloat((hexValue & 0x00F0) >> 4) / 15.0
            a = CGFloat(hexValue & 0x000F) / 15.0
        case 6: // RRGGBB (24-bit)
            r = CGFloat((hexValue & 0xFF0000) >> 16) / 255.0
            g = CGFloat((hexValue & 0x00FF00) >> 8) / 255.0
            b = CGFloat(hexValue & 0x0000FF) / 255.0
            a = 1.0
        case 8: // RRGGBBAA (32-bit)
            r = CGFloat((hexValue & 0xFF000000) >> 24) / 255.0
            g = CGFloat((hexValue & 0x00FF0000) >> 16) / 255.0
            b = CGFloat((hexValue & 0x0000FF00) >> 8) / 255.0
            a = CGFloat(hexValue & 0x000000FF) / 255.0
        default:
            r = 0; g = 0; b = 0; a = 1
        }

        self.init(red: r, green: g, blue: b, alpha: a)
    }

    /// Convert UIColor to hex string (#RRGGBB or #RRGGBBAA if alpha < 1)
    func toHex(includeAlpha: Bool = false) -> String {
        var r: CGFloat = 0
        var g: CGFloat = 0
        var b: CGFloat = 0
        var a: CGFloat = 0

        guard self.getRed(&r, green: &g, blue: &b, alpha: &a) else {
            return "#000000"
        }

        let ri = Int((r * 255).rounded())
        let gi = Int((g * 255).rounded())
        let bi = Int((b * 255).rounded())
        let ai = Int((a * 255).rounded())

        if includeAlpha || a < 1.0 {
            return String(format: "#%02X%02X%02X%02X", ri, gi, bi, ai)
        }
        return String(format: "#%02X%02X%02X", ri, gi, bi)
    }

    /// Returns a lighter variant of the color
    func lighter(by percentage: CGFloat = 0.2) -> UIColor {
        var r: CGFloat = 0, g: CGFloat = 0, b: CGFloat = 0, a: CGFloat = 0
        self.getRed(&r, green: &g, blue: &b, alpha: &a)
        return UIColor(
            red: min(r + percentage, 1.0),
            green: min(g + percentage, 1.0),
            blue: min(b + percentage, 1.0),
            alpha: a
        )
    }

    /// Returns a darker variant of the color
    func darker(by percentage: CGFloat = 0.2) -> UIColor {
        var r: CGFloat = 0, g: CGFloat = 0, b: CGFloat = 0, a: CGFloat = 0
        self.getRed(&r, green: &g, blue: &b, alpha: &a)
        return UIColor(
            red: max(r - percentage, 0.0),
            green: max(g - percentage, 0.0),
            blue: max(b - percentage, 0.0),
            alpha: a
        )
    }
}

// MARK: - UIView Corner Radius + Shadow

extension UIView {
    /// Apply corner radius and optional shadow in one call
    func applyCornerRadius(_ radius: CGFloat, shadow: Bool = false) {
        layer.cornerRadius = radius
        layer.masksToBounds = !shadow

        if shadow {
            layer.shadowColor = UIColor.black.cgColor
            layer.shadowOpacity = Constants.UI.shadowOpacity
            layer.shadowRadius = Constants.UI.shadowRadius
            layer.shadowOffset = Constants.UI.shadowOffset
        } else {
            layer.shadowColor = nil
            layer.shadowOpacity = 0
            layer.shadowRadius = 0
            layer.shadowOffset = .zero
        }
    }

    /// Apply a themed card style (corner radius + shadow + background)
    func applyCardStyle(backgroundColor: UIColor? = nil, cornerRadius: CGFloat = Constants.UI.cornerRadius) {
        self.backgroundColor = backgroundColor ?? ThemeManager.shared.currentTheme.cardBackgroundColor
        layer.cornerRadius = cornerRadius
        layer.masksToBounds = false
        layer.shadowColor = UIColor.black.cgColor
        layer.shadowOpacity = Constants.UI.shadowOpacity
        layer.shadowRadius = Constants.UI.shadowRadius
        layer.shadowOffset = Constants.UI.shadowOffset
    }

    /// Add a border with specified color and width
    func addBorder(color: UIColor, width: CGFloat = 1.0) {
        layer.borderColor = color.cgColor
        layer.borderWidth = width
    }

    /// Round specific corners
    func roundCorners(corners: UIRectCorner, radius: CGFloat) {
        let path = UIBezierPath(roundedRect: bounds, byRoundingCorners: corners, cornerRadii: CGSize(width: radius, height: radius))
        let mask = CAShapeLayer()
        mask.path = path.cgPath
        layer.mask = mask
    }

    /// Add a subtle pulse animation
    func pulse(duration: TimeInterval = 0.6) {
        let pulseAnimation = CABasicAnimation(keyPath: "transform.scale")
        pulseAnimation.duration = duration
        pulseAnimation.fromValue = 1.0
        pulseAnimation.toValue = 1.05
        pulseAnimation.timingFunction = CAMediaTimingFunction(name: .easeInEaseOut)
        pulseAnimation.autoreverses = true
        pulseAnimation.repeatCount = 1
        layer.add(pulseAnimation, forKey: "pulse")
    }

    /// Fade in animation
    func fadeIn(duration: TimeInterval = Constants.UI.animationDuration) {
        alpha = 0
        UIView.animate(withDuration: duration) {
            self.alpha = 1
        }
    }

    /// Fade out animation
    func fadeOut(duration: TimeInterval = Constants.UI.animationDuration) {
        UIView.animate(withDuration: duration) {
            self.alpha = 0
        }
    }
}

// MARK: - String Localization Helper

extension String {
    /// Localized string using self as the key
    var localized: String {
        return NSLocalizedString(self, comment: "")
    }

    /// Localized string with format arguments
    func localized(_ args: CVarArg...) -> String {
        let format = NSLocalizedString(self, comment: "")
        return String(format: format, arguments: args)
    }

    /// Localized string with table name
    func localized(tableName: String?) -> String {
        return NSLocalizedString(self, tableName: tableName, comment: "")
    }

    /// Truncate string to max length with ellipsis
    func truncated(to length: Int, trailing: String = "...") -> String {
        if self.count > length {
            return String(self.prefix(length)) + trailing
        }
        return self
    }

    /// Check if string is a valid URL
    var isValidURL: Bool {
        guard let url = URL(string: self) else { return false }
        return UIApplication.shared.canOpenURL(url)
    }

    /// Copy to pasteboard
    func copyToPasteboard() {
        UIPasteboard.general.string = self
    }
}

// MARK: - Number Formatting Extensions

extension Double {
    /// Format as price with dynamic decimal places
    var priceFormatted: String {
        return NumberFormatters.price.string(from: NSNumber(value: self)) ?? String(format: "%.2f", self)
    }

    /// Format as market cap (B/M/K)
    var marketCapFormatted: String {
        return NumberFormatters.marketCap.string(from: NSNumber(value: self)) ?? String(format: "%.0f", self)
    }

    /// Format as volume
    var volumeFormatted: String {
        return NumberFormatters.volume.string(from: NSNumber(value: self)) ?? String(format: "%.2f", self)
    }

    /// Format as percentage with sign
    var percentageFormatted: String {
        return NumberFormatters.percentage.string(from: NSNumber(value: self)) ?? String(format: "%.2f%%", self)
    }

    /// Format as currency
    var currencyFormatted: String {
        return NumberFormatters.currency.string(from: NSNumber(value: self)) ?? String(format: "$%.2f", self)
    }

    /// Format with specified decimal places
    func formatted(decimals: Int) -> String {
        return String(format: "%.*f", decimals, self)
    }

    /// Format as compact (e.g. 1.2K, 3.4M)
    var compactFormatted: String {
        let absValue = abs(self)
        switch absValue {
        case 1_000_000_000_000...:
            return String(format: "%.1fT", self / 1_000_000_000_000)
        case 1_000_000_000...:
            return String(format: "%.1fB", self / 1_000_000_000)
        case 1_000_000...:
            return String(format: "%.1fM", self / 1_000_000)
        case 1_000...:
            return String(format: "%.1fK", self / 1_000)
        default:
            return String(format: "%.2f", self)
        }
    }
}

extension Int {
    /// Format as compact (e.g. 1.2K, 3.4M)
    var compactFormatted: String {
        return Double(self).compactFormatted
    }

    /// Format with grouping separator
    var groupedFormatted: String {
        let formatter = NumberFormatter()
        formatter.numberStyle = .decimal
        formatter.groupingSeparator = ","
        return formatter.string(from: NSNumber(value: self)) ?? String(self)
    }
}

// MARK: - UITableViewCell Reuse Identifier

extension UITableViewCell {
    /// Reuse identifier based on class name
    static var reuseIdentifier: String {
        return String(describing: self)
    }
}

extension UITableViewHeaderFooterView {
    /// Reuse identifier based on class name
    static var reuseIdentifier: String {
        return String(describing: self)
    }
}

extension UICollectionViewCell {
    /// Reuse identifier based on class name
    static var reuseIdentifier: String {
        return String(describing: self)
    }
}

// MARK: - UITableView Helper

extension UITableView {
    /// Register a cell type using its reuseIdentifier
    func register<T: UITableViewCell>(_ cellClass: T.Type) {
        register(cellClass, forCellReuseIdentifier: T.reuseIdentifier)
    }

    /// Dequeue a reusable cell with type inference
    func dequeueReusableCell<T: UITableViewCell>(_ cellClass: T.Type, for indexPath: IndexPath) -> T {
        guard let cell = dequeueReusableCell(withIdentifier: T.reuseIdentifier, for: indexPath) as? T else {
            fatalError("Unable to dequeue cell: \(T.reuseIdentifier)")
        }
        return cell
    }
}

// MARK: - UICollectionView Helper

extension UICollectionView {
    /// Register a cell type using its reuseIdentifier
    func register<T: UICollectionViewCell>(_ cellClass: T.Type) {
        register(cellClass, forCellWithReuseIdentifier: T.reuseIdentifier)
    }

    /// Dequeue a reusable cell with type inference
    func dequeueReusableCell<T: UICollectionViewCell>(_ cellClass: T.Type, for indexPath: IndexPath) -> T {
        guard let cell = dequeueReusableCell(withReuseIdentifier: T.reuseIdentifier, for: indexPath) as? T else {
            fatalError("Unable to dequeue cell: \(T.reuseIdentifier)")
        }
        return cell
    }
}

// MARK: - UIEdgeInsets Helper

extension UIEdgeInsets {
    /// Create equal insets on all sides
    static func all(_ value: CGFloat) -> UIEdgeInsets {
        return UIEdgeInsets(top: value, left: value, bottom: value, right: value)
    }

    /// Create horizontal and vertical insets
    static func symmetric(horizontal: CGFloat, vertical: CGFloat) -> UIEdgeInsets {
        return UIEdgeInsets(top: vertical, left: horizontal, bottom: vertical, right: horizontal)
    }
}

// MARK: - Date Formatting

extension Date {
    /// Format date relative to now (e.g., "2 hours ago")
    var timeAgo: String {
        let formatter = RelativeDateTimeFormatter()
        formatter.unitsStyle = .short
        return formatter.localizedString(for: self, relativeTo: Date())
    }

    /// Format with a fixed style
    func formatted(style: DateFormatter.Style = .medium) -> String {
        let formatter = DateFormatter()
        formatter.dateStyle = style
        formatter.timeStyle = .short
        return formatter.string(from: self)
    }
}
