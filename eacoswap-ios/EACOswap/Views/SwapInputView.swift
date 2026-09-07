//
//  SwapInputView.swift
//  EACOswap
//
//  Created by EACO Team on 2026-09-07.
//

import UIKit

protocol SwapInputViewDelegate: AnyObject {
    func swapInputView(_ view: SwapInputView, didChangeAmount amount: Double)
}

class SwapInputView: UIView {

    weak var delegate: SwapInputViewDelegate?

    private let textField = UITextField()
    private let currencyLabel = UILabel()
    private let maxButton = UIButton(type: .system)
    private let balanceLabel = UILabel()

    var amount: Double {
        return Double(textField.text?.replacingOccurrences(of: ",", with: "") ?? "0") ?? 0
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
        clipsToBounds = true

        textField.font = .systemFont(ofSize: 32, weight: .semibold)
        textField.keyboardType = .decimalPad
        textField.textAlignment = .left
        textField.placeholder = "0.00"
        textField.addTarget(self, action: #selector(textChanged), for: .editingChanged)
        textField.translatesAutoresizingMaskIntoConstraints = false
        addSubview(textField)

        currencyLabel.font = .preferredFont(forTextStyle: .caption1)
        currencyLabel.textAlignment = .right
        currencyLabel.translatesAutoresizingMaskIntoConstraints = false
        addSubview(currencyLabel)

        maxButton.setTitle(NSLocalizedString("exchange.max", comment: ""), for: .normal)
        maxButton.titleLabel?.font = .preferredFont(forTextStyle: .caption2)
        maxButton.layer.cornerRadius = 8
        maxButton.addTarget(self, action: #selector(maxTapped), for: .touchUpInside)
        maxButton.translatesAutoresizingMaskIntoConstraints = false
        addSubview(maxButton)

        balanceLabel.font = .preferredFont(forTextStyle: .caption2)
        balanceLabel.textAlignment = .left
        balanceLabel.translatesAutoresizingMaskIntoConstraints = false
        addSubview(balanceLabel)

        NSLayoutConstraint.activate([
            textField.topAnchor.constraint(equalTo: topAnchor, constant: 12),
            textField.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 16),
            textField.trailingAnchor.constraint(lessThanOrEqualTo: currencyLabel.leadingAnchor, constant: -8),

            currencyLabel.centerYAnchor.constraint(equalTo: textField.centerYAnchor),
            currencyLabel.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -16),

            maxButton.topAnchor.constraint(equalTo: textField.bottomAnchor, constant: 8),
            maxButton.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 16),
            maxButton.heightAnchor.constraint(equalToConstant: 24),
            maxButton.widthAnchor.constraint(equalToConstant: 44),
            maxButton.bottomAnchor.constraint(lessThanOrEqualTo: bottomAnchor, constant: -12),

            balanceLabel.centerYAnchor.constraint(equalTo: maxButton.centerYAnchor),
            balanceLabel.leadingAnchor.constraint(equalTo: maxButton.trailingAnchor, constant: 8),
            balanceLabel.trailingAnchor.constraint(lessThanOrEqualTo: trailingAnchor, constant: -16)
        ])
    }

    override func layoutSubviews() {
        super.layoutSubviews()
        applyThemeColors()
    }

    private func applyThemeColors() {
        let theme = ThemeManager.shared.currentTheme
        backgroundColor = theme.secondaryBackgroundColor
        textField.textColor = theme.textColor
        textField.tintColor = theme.accentColor
        currencyLabel.textColor = theme.secondaryTextColor
        maxButton.backgroundColor = theme.accentColor.withAlphaComponent(0.2)
        maxButton.setTitleColor(theme.accentColor, for: .normal)
        balanceLabel.textColor = theme.secondaryTextColor
    }

    @objc private func textChanged() {
        let value = amount
        delegate?.swapInputView(self, didChangeAmount: value)
    }

    @objc private func maxTapped() {
        // In a real app, this would use the wallet balance
        textField.text = "100"
        textChanged()
    }

    func setCurrency(_ symbol: String) {
        currencyLabel.text = symbol
    }
}
