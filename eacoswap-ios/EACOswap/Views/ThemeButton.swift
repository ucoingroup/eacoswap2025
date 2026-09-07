//
//  ThemeButton.swift
//  EACOswap
//
//  Created by EACO Team on 2026-09-07.
//

import UIKit

class ThemeButton: UIButton {

    private let colorPreview = UIView()
    private let checkmarkImageView = UIImageView()

    var theme: AppTheme? {
        didSet {
            updateAppearance()
        }
    }

    var isThemeSelected: Bool = false {
        didSet {
            updateSelection()
        }
    }

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
        layer.borderWidth = 2
        layer.masksToBounds = true

        titleLabel?.font = .preferredFont(forTextStyle: .caption1)
        titleLabel?.textAlignment = .center

        colorPreview.layer.cornerRadius = 8
        colorPreview.translatesAutoresizingMaskIntoConstraints = false
        addSubview(colorPreview)

        checkmarkImageView.image = UIImage(systemName: "checkmark.circle.fill")
        checkmarkImageView.tintColor = .white
        checkmarkImageView.isHidden = true
        checkmarkImageView.translatesAutoresizingMaskIntoConstraints = false
        addSubview(checkmarkImageView)

        NSLayoutConstraint.activate([
            colorPreview.topAnchor.constraint(equalTo: topAnchor, constant: 8),
            colorPreview.centerXAnchor.constraint(equalTo: centerXAnchor),
            colorPreview.widthAnchor.constraint(equalToConstant: 32),
            colorPreview.heightAnchor.constraint(equalToConstant: 32),

            titleLabel!.topAnchor.constraint(equalTo: colorPreview.bottomAnchor, constant: 4),
            titleLabel!.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 4),
            titleLabel!.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -4),
            titleLabel!.bottomAnchor.constraint(equalTo: bottomAnchor, constant: -8),

            checkmarkImageView.centerXAnchor.constraint(equalTo: colorPreview.centerXAnchor),
            checkmarkImageView.centerYAnchor.constraint(equalTo: colorPreview.centerYAnchor),
            checkmarkImageView.widthAnchor.constraint(equalToConstant: 20),
            checkmarkImageView.heightAnchor.constraint(equalToConstant: 20)
        ])
    }

    private func updateAppearance() {
        guard let theme = theme else { return }
        colorPreview.backgroundColor = theme.accentColor
        setTitle(theme.displayName, for: .normal)
        setTitleColor(theme.textColor, for: .normal)
        backgroundColor = theme.secondaryBackgroundColor
        layer.borderColor = theme.separatorColor.cgColor
    }

    private func updateSelection() {
        guard let theme = theme else { return }
        if isThemeSelected {
            layer.borderColor = theme.accentColor.cgColor
            layer.borderWidth = 2
            checkmarkImageView.isHidden = false
            checkmarkImageView.tintColor = theme.backgroundColor
        } else {
            layer.borderColor = theme.separatorColor.cgColor
            layer.borderWidth = 1
            checkmarkImageView.isHidden = true
        }
    }
}
