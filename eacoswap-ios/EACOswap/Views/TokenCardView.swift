//
//  TokenCardView.swift
//  EACOswap
//
//  Created by EACO Team on 2026-09-07.
//

import UIKit

class TokenCardView: UIView {

    enum Direction {
        case from
        case to
    }

    private let iconLabel = UILabel()
    private let nameLabel = UILabel()
    private let symbolLabel = UILabel()
    private let priceLabel = UILabel()
    private let changeLabel = UILabel()
    private let directionLabel = UILabel()
    private let arrowImageView = UIImageView()

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupUI()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupUI()
    }

    private func setupUI() {
        layer.cornerRadius = 12
        clipsToBounds = true

        iconLabel.font = .systemFont(ofSize: 28)
        iconLabel.textAlignment = .center
        iconLabel.translatesAutoresizingMaskIntoConstraints = false
        addSubview(iconLabel)

        nameLabel.font = .preferredFont(forTextStyle: .headline)
        nameLabel.translatesAutoresizingMaskIntoConstraints = false
        addSubview(nameLabel)

        symbolLabel.font = .preferredFont(forTextStyle: .caption1)
        symbolLabel.translatesAutoresizingMaskIntoConstraints = false
        addSubview(symbolLabel)

        priceLabel.font = .preferredFont(forTextStyle: .body)
        priceLabel.translatesAutoresizingMaskIntoConstraints = false
        addSubview(priceLabel)

        changeLabel.font = .preferredFont(forTextStyle: .caption1)
        changeLabel.textAlignment = .right
        changeLabel.translatesAutoresizingMaskIntoConstraints = false
        addSubview(changeLabel)

        directionLabel.font = .preferredFont(forTextStyle: .caption2)
        directionLabel.textAlignment = .right
        directionLabel.translatesAutoresizingMaskIntoConstraints = false
        addSubview(directionLabel)

        arrowImageView.image = UIImage(systemName: "chevron.right")
        arrowImageView.tintColor = .gray
        arrowImageView.translatesAutoresizingMaskIntoConstraints = false
        addSubview(arrowImageView)

        NSLayoutConstraint.activate([
            iconLabel.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 16),
            iconLabel.centerYAnchor.constraint(equalTo: centerYAnchor),
            iconLabel.widthAnchor.constraint(equalToConstant: 40),
            iconLabel.heightAnchor.constraint(equalToConstant: 40),

            nameLabel.leadingAnchor.constraint(equalTo: iconLabel.trailingAnchor, constant: 12),
            nameLabel.topAnchor.constraint(equalTo: topAnchor, constant: 12),

            symbolLabel.leadingAnchor.constraint(equalTo: iconLabel.trailingAnchor, constant: 12),
            symbolLabel.topAnchor.constraint(equalTo: nameLabel.bottomAnchor, constant: 4),

            priceLabel.leadingAnchor.constraint(equalTo: iconLabel.trailingAnchor, constant: 12),
            priceLabel.topAnchor.constraint(equalTo: symbolLabel.bottomAnchor, constant: 4),
            priceLabel.bottomAnchor.constraint(lessThanOrEqualTo: bottomAnchor, constant: -12),

            changeLabel.centerYAnchor.constraint(equalTo: priceLabel.centerYAnchor),
            changeLabel.trailingAnchor.constraint(equalTo: directionLabel.leadingAnchor, constant: -8),

            directionLabel.trailingAnchor.constraint(equalTo: arrowImageView.leadingAnchor, constant: -8),
            directionLabel.centerYAnchor.constraint(equalTo: centerYAnchor),

            arrowImageView.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -16),
            arrowImageView.centerYAnchor.constraint(equalTo: centerYAnchor),
            arrowImageView.widthAnchor.constraint(equalToConstant: 20),
            arrowImageView.heightAnchor.constraint(equalToConstant: 20)
        ])
    }

    func configure(token: Token, direction: Direction) {
        let theme = ThemeManager.shared.currentTheme
        backgroundColor = theme.secondaryBackgroundColor
        nameLabel.textColor = theme.textColor
        symbolLabel.textColor = theme.secondaryTextColor
        priceLabel.textColor = theme.textColor
        changeLabel.textColor = theme.secondaryTextColor
        directionLabel.textColor = theme.secondaryTextColor
        arrowImageView.tintColor = theme.secondaryTextColor

        nameLabel.text = token.name
        symbolLabel.text = token.symbol
        iconLabel.text = tokenEmoji(for: token.symbol)

        // Price
        if let price = token.currentPrice {
            priceLabel.text = NumberFormatters.currency(price)
        } else {
            priceLabel.text = "—"
        }

        // 24h Change
        if let change = token.priceChange24h {
            let sign = change >= 0 ? "+" : ""
            changeLabel.text = "\(sign)\(String(format: "%.2f", change))%"
            changeLabel.textColor = change >= 0 ? theme.positiveChangeColor : theme.negativeChangeColor
        } else {
            changeLabel.text = ""
        }

        switch direction {
        case .from:
            directionLabel.text = NSLocalizedString("exchange.from", comment: "")
        case .to:
            directionLabel.text = NSLocalizedString("exchange.to", comment: "")
        }
    }

    private func tokenEmoji(for symbol: String) -> String {
        switch symbol.uppercased() {
        case "EACO": return "🌿"
        case "SOL": return "☀️"
        case "USDC": return "💵"
        case "USDT": return "💲"
        case "WBTC": return "🟠"
        case "WETH": return "🔷"
        case "WBNB": return "🟡"
        case "TRX": return "🔴"
        case "ECNH": return "🇨🇳"
        default: return "🪙"
        }
    }
}
