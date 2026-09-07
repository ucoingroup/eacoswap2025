//
//  FAQTableViewCell.swift
//  EACOswap
//
//  Created by EACO Team on 2026-09-07.
//

import UIKit

class FAQTableViewCell: UITableViewCell {
    static let reuseIdentifier = "FAQTableViewCell"

    private let questionLabel = UILabel()
    private let answerLabel = UILabel()
    private let categoryLabel = UILabel()
    private let shareButton = UIButton(type: .system)
    private let containerView = UIView()

    var shareAction: (() -> Void)?

    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)
        setupUI()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupUI()
    }

    private func setupUI() {
        let theme = ThemeManager.shared.currentTheme
        contentView.backgroundColor = theme.backgroundColor

        containerView.layer.cornerRadius = 12
        containerView.clipsToBounds = true
        containerView.translatesAutoresizingMaskIntoConstraints = false
        contentView.addSubview(containerView)

        questionLabel.font = .preferredFont(forTextStyle: .headline)
        questionLabel.numberOfLines = 0
        questionLabel.translatesAutoresizingMaskIntoConstraints = false
        containerView.addSubview(questionLabel)

        answerLabel.font = .preferredFont(forTextStyle: .body)
        answerLabel.numberOfLines = 0
        answerLabel.translatesAutoresizingMaskIntoConstraints = false
        containerView.addSubview(answerLabel)

        categoryLabel.font = .preferredFont(forTextStyle: .caption2)
        categoryLabel.layer.cornerRadius = 4
        categoryLabel.clipsToBounds = true
        categoryLabel.textAlignment = .center
        categoryLabel.translatesAutoresizingMaskIntoConstraints = false
        containerView.addSubview(categoryLabel)

        shareButton.setImage(UIImage(systemName: "square.and.arrow.up"), for: .normal)
        shareButton.addTarget(self, action: #selector(shareTapped), for: .touchUpInside)
        shareButton.translatesAutoresizingMaskIntoConstraints = false
        containerView.addSubview(shareButton)

        NSLayoutConstraint.activate([
            containerView.topAnchor.constraint(equalTo: contentView.topAnchor, constant: 6),
            containerView.leadingAnchor.constraint(equalTo: contentView.leadingAnchor, constant: 16),
            containerView.trailingAnchor.constraint(equalTo: contentView.trailingAnchor, constant: -16),
            containerView.bottomAnchor.constraint(equalTo: contentView.bottomAnchor, constant: -6),

            categoryLabel.topAnchor.constraint(equalTo: containerView.topAnchor, constant: 12),
            categoryLabel.leadingAnchor.constraint(equalTo: containerView.leadingAnchor, constant: 12),
            categoryLabel.heightAnchor.constraint(equalToConstant: 20),
            categoryLabel.widthAnchor.constraint(greaterThanOrEqualToConstant: 50),

            shareButton.centerYAnchor.constraint(equalTo: categoryLabel.centerYAnchor),
            shareButton.trailingAnchor.constraint(equalTo: containerView.trailingAnchor, constant: -12),
            shareButton.widthAnchor.constraint(equalToConstant: 28),
            shareButton.heightAnchor.constraint(equalToConstant: 28),

            questionLabel.topAnchor.constraint(equalTo: categoryLabel.bottomAnchor, constant: 8),
            questionLabel.leadingAnchor.constraint(equalTo: containerView.leadingAnchor, constant: 12),
            questionLabel.trailingAnchor.constraint(equalTo: containerView.trailingAnchor, constant: -12),

            answerLabel.topAnchor.constraint(equalTo: questionLabel.bottomAnchor, constant: 8),
            answerLabel.leadingAnchor.constraint(equalTo: containerView.leadingAnchor, constant: 12),
            answerLabel.trailingAnchor.constraint(equalTo: containerView.trailingAnchor, constant: -12),
            answerLabel.bottomAnchor.constraint(lessThanOrEqualTo: containerView.bottomAnchor, constant: -12)
        ])
    }

    func configure(item: FAQItem, isExpanded: Bool, theme: AppTheme) {
        containerView.backgroundColor = theme.secondaryBackgroundColor
        questionLabel.textColor = theme.textColor
        answerLabel.textColor = theme.secondaryTextColor
        categoryLabel.textColor = theme.backgroundColor
        categoryLabel.backgroundColor = theme.accentColor
        shareButton.tintColor = theme.accentColor

        questionLabel.text = item.question
        answerLabel.text = item.answer
        answerLabel.isHidden = !isExpanded
        categoryLabel.text = "  \(item.category.localizedName)  "

        // Add a subtle chevron indicator
        let chevron = isExpanded ? "chevron.up" : "chevron.down"
        // questionLabel.attributedText could include the chevron image
    }

    @objc private func shareTapped() {
        shareAction?()
    }
}
