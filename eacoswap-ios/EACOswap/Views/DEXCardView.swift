//
//  DEXCardView.swift
//  EACOswap
//
//  Created by EACO Team on 2026-09-07.
//

import UIKit

class DEXCardView: UIView {

    var openAction: (() -> Void)?

    private let iconView = UIImageView()
    private let nameLabel = UILabel()
    private let descriptionLabel = UILabel()
    private let eacoBadge = UILabel()
    private let openButton = UIButton(type: .system)

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

        iconView.contentMode = .scaleAspectFit
        iconView.tintColor = ThemeManager.shared.currentTheme.accentColor
        iconView.translatesAutoresizingMaskIntoConstraints = false
        addSubview(iconView)

        nameLabel.font = .preferredFont(forTextStyle: .headline)
        nameLabel.translatesAutoresizingMaskIntoConstraints = false
        addSubview(nameLabel)

        descriptionLabel.font = .preferredFont(forTextStyle: .caption1)
        descriptionLabel.numberOfLines = 2
        descriptionLabel.translatesAutoresizingMaskIntoConstraints = false
        addSubview(descriptionLabel)

        eacoBadge.font = .preferredFont(forTextStyle: .caption2)
        eacoBadge.textAlignment = .center
        eacoBadge.layer.cornerRadius = 8
        eacoBadge.clipsToBounds = true
        eacoBadge.translatesAutoresizingMaskIntoConstraints = false
        addSubview(eacoBadge)

        openButton.setTitle(NSLocalizedString("common.open", comment: ""), for: .normal)
        openButton.titleLabel?.font = .preferredFont(forTextStyle: .subheadline)
        openButton.layer.cornerRadius = 8
        openButton.contentEdgeInsets = UIEdgeInsets(top: 6, left: 12, bottom: 6, right: 12)
        openButton.addTarget(self, action: #selector(openTapped), for: .touchUpInside)
        openButton.translatesAutoresizingMaskIntoConstraints = false
        addSubview(openButton)

        NSLayoutConstraint.activate([
            iconView.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 16),
            iconView.centerYAnchor.constraint(equalTo: centerYAnchor),
            iconView.widthAnchor.constraint(equalToConstant: 40),
            iconView.heightAnchor.constraint(equalToConstant: 40),

            nameLabel.leadingAnchor.constraint(equalTo: iconView.trailingAnchor, constant: 12),
            nameLabel.topAnchor.constraint(equalTo: topAnchor, constant: 12),
            nameLabel.trailingAnchor.constraint(lessThanOrEqualTo: eacoBadge.leadingAnchor, constant: -8),

            descriptionLabel.leadingAnchor.constraint(equalTo: iconView.trailingAnchor, constant: 12),
            descriptionLabel.topAnchor.constraint(equalTo: nameLabel.bottomAnchor, constant: 4),
            descriptionLabel.trailingAnchor.constraint(lessThanOrEqualTo: openButton.leadingAnchor, constant: -8),
            descriptionLabel.bottomAnchor.constraint(lessThanOrEqualTo: bottomAnchor, constant: -12),

            eacoBadge.trailingAnchor.constraint(equalTo: openButton.leadingAnchor, constant: -8),
            eacoBadge.centerYAnchor.constraint(equalTo: nameLabel.centerYAnchor),
            eacoBadge.heightAnchor.constraint(equalToConstant: 20),
            eacoBadge.widthAnchor.constraint(greaterThanOrEqualToConstant: 40),

            openButton.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -16),
            openButton.centerYAnchor.constraint(equalTo: centerYAnchor),
            openButton.heightAnchor.constraint(equalToConstant: 32)
        ])
    }

    func configure(dex: DEX, theme: AppTheme) {
        backgroundColor = theme.secondaryBackgroundColor
        nameLabel.textColor = theme.textColor
        descriptionLabel.textColor = theme.secondaryTextColor
        iconView.tintColor = theme.accentColor

        openButton.backgroundColor = theme.accentColor
        openButton.setTitleColor(theme.backgroundColor, for: .normal)

        nameLabel.text = dex.name
        descriptionLabel.text = dex.description
        iconView.image = UIImage(systemName: "arrow.left.arrow.right.circle")

        if dex.supportsEACO {
            eacoBadge.text = "EACO"
            eacoBadge.textColor = theme.backgroundColor
            eacoBadge.backgroundColor = theme.accentColor
            eacoBadge.isHidden = false
        } else {
            eacoBadge.isHidden = true
        }
    }

    @objc private func openTapped() {
        openAction?()
    }
}
