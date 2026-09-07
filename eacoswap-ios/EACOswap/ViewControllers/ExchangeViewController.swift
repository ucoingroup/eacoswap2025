//
//  ExchangeViewController.swift
//  EACOswap
//
//  Created by EACO Team on 2026-09-07.
//

import UIKit
import os.log

class ExchangeViewController: UIViewController {

    private let logger = Logger(subsystem: "com.eacoswap.app", category: "ExchangeViewController")

    private var fromToken: Token = .sol
    private var toToken: Token = .eaco
    private var amount: Double = 0
    private var currentQuote: SwapQuote?

    private let scrollView = UIScrollView()
    private let contentView = UIView()

    private let fromTokenCard = TokenCardView()
    private let toTokenCard = TokenCardView()
    private let swapButton = UIButton(type: .system)
    private let amountInputView = SwapInputView()
    private let quoteButton = UIButton(type: .system)
    private let quoteContainer = UIView()
    private let quoteLabel = UILabel()
    private let executeButton = UIButton(type: .system)

    override func viewDidLoad() {
        super.viewDidLoad()
        title = NSLocalizedString("tab.exchange", comment: "")
        setupUI()
        applyThemeColors()
        setupThemeObserver()
    }

    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        applyThemeColors()
    }

    deinit {
        NotificationCenter.default.removeObserver(self)
    }

    private func setupThemeObserver() {
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(themeChanged),
            name: .themeDidChange,
            object: nil
        )
    }

    @objc private func themeChanged() {
        applyThemeColors()
    }

    private func setupUI() {
        view.backgroundColor = ThemeManager.shared.currentTheme.backgroundColor

        scrollView.translatesAutoresizingMaskIntoConstraints = false
        contentView.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(scrollView)
        scrollView.addSubview(contentView)

        // From token card
        fromTokenCard.configure(token: fromToken, direction: .from)
        fromTokenCard.translatesAutoresizingMaskIntoConstraints = false
        fromTokenCard.addGestureRecognizer(UITapGestureRecognizer(target: self, action: #selector(selectFromToken)))

        // Swap direction button
        swapButton.setImage(UIImage(systemName: "arrow.up.arrow.down"), for: .normal)
        swapButton.tintColor = ThemeManager.shared.currentTheme.accentColor
        swapButton.backgroundColor = ThemeManager.shared.currentTheme.secondaryBackgroundColor
        swapButton.layer.cornerRadius = 22
        swapButton.addTarget(self, action: #selector(swapTokens), for: .touchUpInside)
        swapButton.translatesAutoresizingMaskIntoConstraints = false

        // To token card
        toTokenCard.configure(token: toToken, direction: .to)
        toTokenCard.translatesAutoresizingMaskIntoConstraints = false
        toTokenCard.addGestureRecognizer(UITapGestureRecognizer(target: self, action: #selector(selectToToken)))

        // Amount input
        amountInputView.delegate = self
        amountInputView.translatesAutoresizingMaskIntoConstraints = false

        // Quote button
        quoteButton.setTitle(NSLocalizedString("exchange.get_quote", comment: ""), for: .normal)
        quoteButton.titleLabel?.font = .preferredFont(forTextStyle: .headline)
        quoteButton.backgroundColor = ThemeManager.shared.currentTheme.accentColor
        quoteButton.setTitleColor(ThemeManager.shared.currentTheme.backgroundColor, for: .normal)
        quoteButton.layer.cornerRadius = 12
        quoteButton.addTarget(self, action: #selector(getQuote), for: .touchUpInside)
        quoteButton.translatesAutoresizingMaskIntoConstraints = false

        // Quote container (hidden initially)
        quoteContainer.backgroundColor = ThemeManager.shared.currentTheme.secondaryBackgroundColor
        quoteContainer.layer.cornerRadius = 12
        quoteContainer.isHidden = true
        quoteContainer.translatesAutoresizingMaskIntoConstraints = false

        quoteLabel.numberOfLines = 0
        quoteLabel.font = .preferredFont(forTextStyle: .body)
        quoteLabel.textColor = ThemeManager.shared.currentTheme.textColor
        quoteLabel.translatesAutoresizingMaskIntoConstraints = false
        quoteContainer.addSubview(quoteLabel)

        // Execute button
        executeButton.setTitle(NSLocalizedString("exchange.execute_swap", comment: ""), for: .normal)
        executeButton.titleLabel?.font = .preferredFont(forTextStyle: .headline)
        executeButton.backgroundColor = ThemeManager.shared.currentTheme.successColor
        executeButton.setTitleColor(.white, for: .normal)
        executeButton.layer.cornerRadius = 12
        executeButton.isHidden = true
        executeButton.addTarget(self, action: #selector(executeSwap), for: .touchUpInside)
        executeButton.translatesAutoresizingMaskIntoConstraints = false

        let stack = UIStackView(arrangedSubviews: [
            fromTokenCard,
            swapButton,
            toTokenCard,
            amountInputView,
            quoteButton,
            quoteContainer,
            executeButton
        ])
        stack.axis = .vertical
        stack.spacing = 16
        stack.alignment = .center
        stack.distribution = .fill
        stack.translatesAutoresizingMaskIntoConstraints = false
        contentView.addSubview(stack)

        NSLayoutConstraint.activate([
            scrollView.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor),
            scrollView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            scrollView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            scrollView.bottomAnchor.constraint(equalTo: view.bottomAnchor),

            contentView.topAnchor.constraint(equalTo: scrollView.topAnchor),
            contentView.leadingAnchor.constraint(equalTo: scrollView.leadingAnchor),
            contentView.trailingAnchor.constraint(equalTo: scrollView.trailingAnchor),
            contentView.bottomAnchor.constraint(equalTo: scrollView.bottomAnchor),
            contentView.widthAnchor.constraint(equalTo: scrollView.widthAnchor),

            fromTokenCard.leadingAnchor.constraint(equalTo: contentView.leadingAnchor, constant: 20),
            fromTokenCard.trailingAnchor.constraint(equalTo: contentView.trailingAnchor, constant: -20),
            fromTokenCard.heightAnchor.constraint(equalToConstant: 80),

            swapButton.widthAnchor.constraint(equalToConstant: 44),
            swapButton.heightAnchor.constraint(equalToConstant: 44),

            toTokenCard.leadingAnchor.constraint(equalTo: contentView.leadingAnchor, constant: 20),
            toTokenCard.trailingAnchor.constraint(equalTo: contentView.trailingAnchor, constant: -20),
            toTokenCard.heightAnchor.constraint(equalToConstant: 80),

            amountInputView.leadingAnchor.constraint(equalTo: contentView.leadingAnchor, constant: 20),
            amountInputView.trailingAnchor.constraint(equalTo: contentView.trailingAnchor, constant: -20),
            amountInputView.heightAnchor.constraint(equalToConstant: 60),

            quoteButton.leadingAnchor.constraint(equalTo: contentView.leadingAnchor, constant: 20),
            quoteButton.trailingAnchor.constraint(equalTo: contentView.trailingAnchor, constant: -20),
            quoteButton.heightAnchor.constraint(equalToConstant: 50),

            quoteContainer.leadingAnchor.constraint(equalTo: contentView.leadingAnchor, constant: 20),
            quoteContainer.trailingAnchor.constraint(equalTo: contentView.trailingAnchor, constant: -20),

            quoteLabel.topAnchor.constraint(equalTo: quoteContainer.topAnchor, constant: 16),
            quoteLabel.leadingAnchor.constraint(equalTo: quoteContainer.leadingAnchor, constant: 16),
            quoteLabel.trailingAnchor.constraint(equalTo: quoteContainer.trailingAnchor, constant: -16),
            quoteLabel.bottomAnchor.constraint(equalTo: quoteContainer.bottomAnchor, constant: -16),

            executeButton.leadingAnchor.constraint(equalTo: contentView.leadingAnchor, constant: 20),
            executeButton.trailingAnchor.constraint(equalTo: contentView.trailingAnchor, constant: -20),
            executeButton.heightAnchor.constraint(equalToConstant: 50),

            stack.topAnchor.constraint(equalTo: contentView.topAnchor, constant: 20),
            stack.leadingAnchor.constraint(equalTo: contentView.leadingAnchor),
            stack.trailingAnchor.constraint(equalTo: contentView.trailingAnchor),
            stack.bottomAnchor.constraint(lessThanOrEqualTo: contentView.bottomAnchor, constant: -20)
        ])
    }

    private func applyThemeColors() {
        let theme = ThemeManager.shared.currentTheme
        view.backgroundColor = theme.backgroundColor
        quoteContainer.backgroundColor = theme.secondaryBackgroundColor
        quoteLabel.textColor = theme.textColor
        swapButton.backgroundColor = theme.secondaryBackgroundColor
        swapButton.tintColor = theme.accentColor
        quoteButton.backgroundColor = theme.accentColor
        quoteButton.setTitleColor(theme.backgroundColor, for: .normal)
    }

    // MARK: - Actions

    @objc private func selectFromToken() {
        showTokenPicker(current: fromToken) { [weak self] token in
            self?.fromToken = token
            self?.fromTokenCard.configure(token: token, direction: .from)
            self?.resetQuote()
        }
    }

    @objc private func selectToToken() {
        showTokenPicker(current: toToken) { [weak self] token in
            self?.toToken = token
            self?.toTokenCard.configure(token: token, direction: .to)
            self?.resetQuote()
        }
    }

    @objc private func swapTokens() {
        let temp = fromToken
        fromToken = toToken
        toToken = temp
        fromTokenCard.configure(token: fromToken, direction: .from)
        toTokenCard.configure(token: toToken, direction: .to)
        resetQuote()
    }

    @objc private func getQuote() {
        guard amount > 0 else {
            showAlert(title: NSLocalizedString("exchange.error_title", comment: ""),
                     message: NSLocalizedString("exchange.enter_amount", comment: ""))
            return
        }

        quoteButton.isEnabled = false
        quoteButton.setTitle(NSLocalizedString("exchange.loading", comment: ""), for: .normal)

        let inputMint = fromToken.mintAddress ?? ""
        let outputMint = toToken.mintAddress ?? ""
        let amountString = String(format: "%.0f", amount * pow(10, Double(fromToken.decimals ?? 6)))

        Task {
            do {
                let quote = try await ApiService.shared.getJupiterQuote(
                    inputMint: inputMint,
                    outputMint: outputMint,
                    amount: amountString
                )
                await MainActor.run {
                    self.currentQuote = quote
                    self.displayQuote(quote)
                    self.quoteButton.isEnabled = true
                    self.quoteButton.setTitle(NSLocalizedString("exchange.get_quote", comment: ""), for: .normal)
                }
            } catch {
                await MainActor.run {
                    self.showAlert(
                        title: NSLocalizedString("exchange.error_title", comment: ""),
                        message: error.localizedDescription
                    )
                    self.quoteButton.isEnabled = true
                    self.quoteButton.setTitle(NSLocalizedString("exchange.get_quote", comment: ""), for: .normal)
                }
            }
        }
    }

    private func displayQuote(_ quote: SwapQuote) {
        let outAmount = Double(quote.outAmount) ?? 0
        let divisor = pow(10.0, Double(toToken.decimals ?? 6))
        let formattedOut = NumberFormatters.tokenAmount(outAmount / divisor)

        let impact = Double(quote.priceImpactPct ?? "0") ?? 0
        let impactColor = impact > 1.0 ? ThemeManager.shared.currentTheme.dangerColor :
                          impact > 0.5 ? ThemeManager.shared.currentTheme.warningColor :
                          ThemeManager.shared.currentTheme.successColor

        var routeText = ""
        if let routes = quote.routePlan, !routes.isEmpty {
            let labels = routes.compactMap { $0.swapInfo.label }.joined(separator: " → ")
            routeText = "\(NSLocalizedString("exchange.route", comment: "")): \(labels)"
        }

        let text = """
        \(NSLocalizedString("exchange.output", comment: "")): \(formattedOut) \(toToken.symbol)
        \(NSLocalizedString("exchange.slippage", comment: "")): \(quote.slippageBps / 100)%
        \(NSLocalizedString("exchange.price_impact", comment: "")): \(String(format: "%.4f", impact))%
        \(routeText)
        """

        let attrString = NSMutableAttributedString(string: text)
        let range = (text as NSString).range(of: String(format: "%.4f", impact) + "%")
        if range.location != NSNotFound {
            attrString.addAttribute(.foregroundColor, value: impactColor, range: range)
        }

        quoteLabel.attributedText = attrString
        quoteContainer.isHidden = false
        executeButton.isHidden = false
    }

    @objc private func executeSwap() {
        guard let quote = currentQuote else { return }

        // Deep link to Jupiter for execution
        let inputMint = fromToken.mintAddress ?? ""
        let outputMint = toToken.mintAddress ?? ""
        let amountString = String(format: "%.0f", amount * pow(10, Double(fromToken.decimals ?? 6)))

        let jupiterURL = "https://jup.ag/swap?inputMint=\(inputMint)&outputMint=\(outputMint)&amount=\(amountString)"

        if let url = URL(string: jupiterURL) {
            UIApplication.shared.open(url)
        }
    }

    private func resetQuote() {
        currentQuote = nil
        quoteContainer.isHidden = true
        executeButton.isHidden = true
    }

    private func showTokenPicker(current: Token, completion: @escaping (Token) -> Void) {
        let alert = UIAlertController(title: NSLocalizedString("exchange.select_token", comment: ""),
                                     message: nil, preferredStyle: .actionSheet)

        for token in Token.allTokens where token.id != current.id {
            alert.addAction(UIAlertAction(title: "\(token.name) (\(token.symbol))", style: .default) { _ in
                completion(token)
            })
        }

        alert.addAction(UIAlertAction(title: NSLocalizedString("common.cancel", comment: ""), style: .cancel))
        present(alert, animated: true)
    }

    private func showAlert(title: String, message: String) {
        let alert = UIAlertController(title: title, message: message, preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: NSLocalizedString("common.ok", comment: ""), style: .default))
        present(alert, animated: true)
    }
}

// MARK: - SwapInputViewDelegate
extension ExchangeViewController: SwapInputViewDelegate {
    func swapInputView(_ view: SwapInputView, didChangeAmount amount: Double) {
        self.amount = amount
        resetQuote()
    }
}
