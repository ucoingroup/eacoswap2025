//
//  MarketTableViewCell.swift
//  EACOswap
//
//  Created by EACO Team on 2026-09-07.
//

import UIKit

class MarketTableViewCell: UITableViewCell {
    static let reuseIdentifier = "MarketTableViewCell"

    private let rankLabel = UILabel()
    private let nameLabel = UILabel()
    private let symbolLabel = UILabel()
    private let priceLabel = UILabel()
    private let marketCapLabel = UILabel()
    private let changeLabel = UILabel()
    private let volumeLabel = UILabel()

    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)
        setupUI()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupUI()
    }

    private func setupUI() {
        let stack = UIStackView()
        stack.axis = .vertical
        stack.spacing = 4
        stack.translatesAutoresizingMaskIntoConstraints = false

        let topRow = UIStackView()
        topRow.axis = .horizontal
        topRow.spacing = 8
        topRow.alignment = .center

        rankLabel.font = .preferredFont(forTextStyle: .caption1)
        rankLabel.textAlignment = .center
        rankLabel.widthAnchor.constraint(equalToConstant: 32).isActive = true
        topRow.addArrangedSubview(rankLabel)

        let nameStack = UIStackView()
        nameStack.axis = .vertical
        nameStack.spacing = 2

        nameLabel.font = .preferredFont(forTextStyle: .body)
        symbolLabel.font = .preferredFont(forTextStyle: .caption2)
        nameStack.addArrangedSubview(nameLabel)
        nameStack.addArrangedSubview(symbolLabel)
        topRow.addArrangedSubview(nameStack)

        changeLabel.font = .preferredFont(forTextStyle: .caption1)
        changeLabel.textAlignment = .right
        topRow.addArrangedSubview(changeLabel)

        let bottomRow = UIStackView()
        bottomRow.axis = .horizontal
        bottomRow.spacing = 8
        bottomRow.distribution = .fillEqually

        priceLabel.font = .preferredFont(forTextStyle: .caption1)
        marketCapLabel.font = .preferredFont(forTextStyle: .caption2)
        volumeLabel.font = .preferredFont(forTextStyle: .caption2)

        bottomRow.addArrangedSubview(priceLabel)
        bottomRow.addArrangedSubview(marketCapLabel)
        bottomRow.addArrangedSubview(volumeLabel)

        stack.addArrangedSubview(topRow)
        stack.addArrangedSubview(bottomRow)

        contentView.addSubview(stack)
        NSLayoutConstraint.activate([
            stack.topAnchor.constraint(equalTo: contentView.topAnchor, constant: 12),
            stack.leadingAnchor.constraint(equalTo: contentView.leadingAnchor, constant: 16),
            stack.trailingAnchor.constraint(equalTo: contentView.trailingAnchor, constant: -16),
            stack.bottomAnchor.constraint(equalTo: contentView.bottomAnchor, constant: -12)
        ])
    }

    func configure(token: Token, rank: Int, theme: AppTheme) {
        backgroundColor = theme.backgroundColor
        contentView.backgroundColor = theme.backgroundColor
        rankLabel.textColor = theme.secondaryTextColor
        nameLabel.textColor = theme.textColor
        symbolLabel.textColor = theme.secondaryTextColor
        priceLabel.textColor = theme.textColor
        marketCapLabel.textColor = theme.secondaryTextColor
        volumeLabel.textColor = theme.secondaryTextColor

        rankLabel.text = "\(rank)"
        nameLabel.text = token.name
        symbolLabel.text = token.symbol.uppercased()

        if let price = token.currentPrice {
            priceLabel.text = NumberFormatters.currency(price)
        } else {
            priceLabel.text = "—"
        }

        if let mcap = token.marketCap {
            marketCapLabel.text = "MC: \(NumberFormatters.compact(mcap))"
        } else {
            marketCapLabel.text = "MC: —"
        }

        if let vol = token.totalVolume {
            volumeLabel.text = "Vol: \(NumberFormatters.compact(vol))"
        } else {
            volumeLabel.text = "Vol: —"
        }

        if let change = token.priceChange24h {
            let sign = change >= 0 ? "+" : ""
            changeLabel.text = "\(sign)\(String(format: "%.2f", change))%"
            changeLabel.textColor = change >= 0 ? theme.positiveChangeColor : theme.negativeChangeColor
        } else {
            changeLabel.text = "—"
            changeLabel.textColor = theme.secondaryTextColor
        }
    }
}
