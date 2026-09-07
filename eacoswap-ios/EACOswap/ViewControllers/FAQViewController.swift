//
//  FAQViewController.swift
//  EACOswap
//
//  Created by EACO Team on 2026-09-07.
//

import UIKit
import os.log

class FAQViewController: UIViewController {

    private let logger = Logger(subsystem: "com.eacoswap.app", category: "FAQViewController")

    private var faqItems: [FAQItem] = []
    private var filteredItems: [FAQItem] = []
    private var selectedCategory: FAQCategory? = nil

    private let searchController = UISearchController(searchResultsController: nil)
    private let tableView = UITableView()
    private var categoryStack: UIStackView!

    override func viewDidLoad() {
        super.viewDidLoad()
        title = NSLocalizedString("tab.faq", comment: "")
        loadFAQData()
        setupUI()
        setupThemeObserver()
        filteredItems = faqItems
    }

    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        applyThemeColors()
    }

    deinit {
        NotificationCenter.default.removeObserver(self)
    }

    private func setupUI() {
        view.backgroundColor = ThemeManager.shared.currentTheme.backgroundColor

        // Search controller
        searchController.searchResultsUpdater = self
        searchController.obscuresBackgroundDuringPresentation = false
        searchController.searchBar.placeholder = NSLocalizedString("faq.search_placeholder", comment: "")
        navigationItem.searchController = searchController
        navigationItem.hidesSearchBarWhenScrolling = false

        // Category filter buttons
        let scrollView = UIScrollView()
        scrollView.showsHorizontalScrollIndicator = false
        scrollView.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(scrollView)

        categoryStack = UIStackView()
        categoryStack.axis = .horizontal
        categoryStack.spacing = 8
        categoryStack.alignment = .center
        categoryStack.distribution = .equalSpacing
        categoryStack.translatesAutoresizingMaskIntoConstraints = false
        scrollView.addSubview(categoryStack)

        // "All" button
        let allButton = createCategoryButton(title: NSLocalizedString("faq.category_all", comment: ""), category: nil)
        categoryStack.addArrangedSubview(allButton)
        allButton.isSelected = true
        allButton.backgroundColor = ThemeManager.shared.currentTheme.accentColor

        for category in FAQCategory.allCases {
            let button = createCategoryButton(
                title: category.localizedName,
                category: category
            )
            categoryStack.addArrangedSubview(button)
        }

        // Table view
        tableView.delegate = self
        tableView.dataSource = self
        tableView.register(FAQTableViewCell.self, forCellReuseIdentifier: FAQTableViewCell.reuseIdentifier)
        tableView.rowHeight = UITableView.automaticDimension
        tableView.estimatedRowHeight = 60
        tableView.tableFooterView = UIView()
        tableView.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(tableView)

        NSLayoutConstraint.activate([
            scrollView.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 8),
            scrollView.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 12),
            scrollView.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -12),
            scrollView.heightAnchor.constraint(equalToConstant: 40),

            categoryStack.topAnchor.constraint(equalTo: scrollView.topAnchor),
            categoryStack.leadingAnchor.constraint(equalTo: scrollView.leadingAnchor),
            categoryStack.trailingAnchor.constraint(equalTo: scrollView.trailingAnchor),
            categoryStack.bottomAnchor.constraint(equalTo: scrollView.bottomAnchor),
            categoryStack.heightAnchor.constraint(equalTo: scrollView.heightAnchor),

            tableView.topAnchor.constraint(equalTo: scrollView.bottomAnchor, constant: 8),
            tableView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            tableView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            tableView.bottomAnchor.constraint(equalTo: view.bottomAnchor)
        ])
    }

    private func createCategoryButton(title: String, category: FAQCategory?) -> UIButton {
        let button = UIButton(type: .system)
        button.setTitle(title, for: .normal)
        button.titleLabel?.font = .preferredFont(forTextStyle: .caption1)
        button.contentEdgeInsets = UIEdgeInsets(top: 6, left: 12, bottom: 6, right: 12)
        button.layer.cornerRadius = 14
        button.tag = category?.rawValue ?? -1
        button.addTarget(self, action: #selector(categoryTapped(_:)), for: .touchUpInside)

        let theme = ThemeManager.shared.currentTheme
        button.setTitleColor(theme.textColor, for: .normal)
        button.backgroundColor = theme.secondaryBackgroundColor
        button.layer.borderColor = theme.separatorColor.cgColor
        button.layer.borderWidth = 1

        return button
    }

    @objc private func categoryTapped(_ sender: UIButton) {
        // Reset all buttons
        for case let button as UIButton in categoryStack.arrangedSubviews {
            let theme = ThemeManager.shared.currentTheme
            button.setTitleColor(theme.textColor, for: .normal)
            button.backgroundColor = theme.secondaryBackgroundColor
            button.isSelected = false
        }

        sender.isSelected = true
        sender.backgroundColor = ThemeManager.shared.currentTheme.accentColor
        sender.setTitleColor(ThemeManager.shared.currentTheme.backgroundColor, for: .normal)

        if sender.tag == -1 {
            selectedCategory = nil
        } else if let category = FAQCategory(rawValue: sender.tag) {
            selectedCategory = category
        }

        filterFAQ()
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
        tableView.reloadData()
    }

    private func applyThemeColors() {
        let theme = ThemeManager.shared.currentTheme
        view.backgroundColor = theme.backgroundColor
        tableView.backgroundColor = theme.backgroundColor
        tableView.separatorColor = theme.separatorColor
        searchController.searchBar.tintColor = theme.accentColor
        searchController.searchBar.barTintColor = theme.backgroundColor
    }

    private func loadFAQData() {
        // Load FAQ from localized strings - 100 Q&A items
        let categories: [FAQCategory] = [.general, .wallet, .trading, .security, .technical, .tokenomics]
        faqItems = []

        for category in categories {
            let count = faqCount(for: category)
            for i in 1...count {
                let key = "faq.\(category.rawValue).q\(i)"
                let answerKey = "faq.\(category.rawValue).a\(i)"
                let question = NSLocalizedString(key, comment: "")
                let answer = NSLocalizedString(answerKey, comment: "")

                // Only add if question was found (not the key itself)
                if question != key && answer != answerKey {
                    faqItems.append(FAQItem(
                        id: "\(category.rawValue)_\(i)",
                        question: question,
                        answer: answer,
                        category: category
                    ))
                }
            }
        }

        // If localized strings are missing, use fallback data
        if faqItems.isEmpty {
            faqItems = FAQFallbackData.getFAQItems(language: LocalizationManager.shared.currentLanguage)
        }
    }

    private func faqCount(for category: FAQCategory) -> Int {
        switch category {
        case .general: return 20
        case .wallet: return 18
        case .trading: return 22
        case .security: return 15
        case .technical: return 12
        case .tokenomics: return 13
        }
    }

    private func filterFAQ() {
        let searchText = searchController.searchBar.text?.lowercased() ?? ""

        filteredItems = faqItems.filter { item in
            let matchesCategory = selectedCategory == nil || item.category == selectedCategory
            let matchesSearch = searchText.isEmpty ||
                item.question.lowercased().contains(searchText) ||
                item.answer.lowercased().contains(searchText)
            return matchesCategory && matchesSearch
        }

        tableView.reloadData()
    }

    private func shareFAQ(_ item: FAQItem) {
        let text = """
        \(item.question)

        \(item.answer)
        """
        let activityVC = UIActivityViewController(activityItems: [text], applicationActivities: nil)
        present(activityVC, animated: true)
    }
}

// MARK: - UISearchResultsUpdating
extension FAQViewController: UISearchResultsUpdating {
    func updateSearchResults(for searchController: UISearchController) {
        filterFAQ()
    }
}

// MARK: - UITableViewDataSource
extension FAQViewController: UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return filteredItems.count
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        guard let cell = tableView.dequeueReusableCell(
            withIdentifier: FAQTableViewCell.reuseIdentifier,
            for: indexPath
        ) as? FAQTableViewCell else {
            return UITableViewCell()
        }

        let item = filteredItems[indexPath.row]
        cell.configure(item: item, isExpanded: item.isExpanded, theme: ThemeManager.shared.currentTheme)
        cell.shareAction = { [weak self] in
            self?.shareFAQ(item)
        }
        return cell
    }
}

// MARK: - UITableViewDelegate
extension FAQViewController: UITableViewDelegate {
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
        filteredItems[indexPath.row].isExpanded.toggle()
        tableView.reloadRows(at: [indexPath], with: .automatic)
    }
}

// MARK: - Models

enum FAQCategory: Int, CaseIterable {
    case general = 0
    case wallet = 1
    case trading = 2
    case security = 3
    case technical = 4
    case tokenomics = 5

    var localizedName: String {
        switch self {
        case .general: return NSLocalizedString("faq.category_general", comment: "")
        case .wallet: return NSLocalizedString("faq.category_wallet", comment: "")
        case .trading: return NSLocalizedString("faq.category_trading", comment: "")
        case .security: return NSLocalizedString("faq.category_security", comment: "")
        case .technical: return NSLocalizedString("faq.category_technical", comment: "")
        case .tokenomics: return NSLocalizedString("faq.category_tokenomics", comment: "")
        }
    }
}

struct FAQItem: Identifiable {
    let id: String
    let question: String
    let answer: String
    let category: FAQCategory
    var isExpanded: Bool = false
}

// MARK: - Fallback Data
struct FAQFallbackData {
    static func getFAQItems(language: AppLanguage) -> [FAQItem] {
        var items: [FAQItem] = []

        // General questions
        items += [
            FAQItem(id: "g1", question: "What is EACOswap?", answer: "EACOswap is a Solana DEX navigation hub that helps users discover decentralized exchanges, compare token prices, and execute swaps through integrated DEX aggregators.", category: .general),
            FAQItem(id: "g2", question: "Is EACOswap a DEX itself?", answer: "No, EACOswap is not a DEX. It is a navigation and aggregation platform that connects to existing DEXes like Jupiter, Raydium, Orca, and others.", category: .general),
            FAQItem(id: "g3", question: "What blockchain does EACOswap support?", answer: "EACOswap currently supports the Solana blockchain, leveraging its high throughput and low transaction fees.", category: .general),
            FAQItem(id: "g4", question: "Do I need an account to use EACOswap?", answer: "No, EACOswap does not require user accounts. You connect your existing Solana wallet to interact with the platform.", category: .general),
            FAQItem(id: "g5", question: "Is EACOswap free to use?", answer: "Yes, the EACOswap platform is free to use. You only pay standard Solana network fees and DEX trading fees when executing transactions.", category: .general),
            FAQItem(id: "g6", question: "How does EACOswap make money?", answer: "EACOswap may earn referral fees from partner DEXes. We do not charge users directly for using the platform.", category: .general),
            FAQItem(id: "g7", question: "Can I use EACOswap on mobile?", answer: "Yes, EACOswap is available through this iOS app and is also accessible via mobile web browsers on any device.", category: .general),
            FAQItem(id: "g8", question: "What is the EACO token?", answer: "EACO is the native utility token of the EACO ecosystem, used for governance, staking rewards, and fee discounts.", category: .general),
            FAQItem(id: "g9", question: "Where can I buy EACO tokens?", answer: "EACO tokens can be purchased on supported Solana DEXes through the EACOswap interface or directly on Jupiter, Raydium, or Orca.", category: .general),
            FAQItem(id: "g10", question: "Is EACOswap audited?", answer: "EACOswap's smart contracts and integrations undergo regular security audits by third-party firms.", category: .general)
        ]

        // Wallet questions
        items += [
            FAQItem(id: "w1", question: "Which wallets are supported?", answer: "EACOswap supports Phantom, Solflare, Backpack, and any other Solana-compatible wallet that supports WalletConnect or direct deeplinks.", category: .wallet),
            FAQItem(id: "w2", question: "How do I connect my wallet?", answer: "Tap the 'Connect Wallet' button and select your wallet app. This will open your wallet app to authorize the connection.", category: .wallet),
            FAQItem(id: "w3", question: "Is my wallet safe?", answer: "EACOswap never stores your private keys or seed phrases. All transactions are signed locally in your wallet app.", category: .wallet),
            FAQItem(id: "w4", question: "Can I disconnect my wallet?", answer: "Yes, you can disconnect your wallet at any time from the app interface or within your wallet app.", category: .wallet),
            FAQItem(id: "w5", question: "Why is my wallet not connecting?", answer: "Ensure your wallet app is installed and updated. Check that you are on the correct network (Solana Mainnet).", category: .wallet),
            FAQItem(id: "w6", question: "What if I don't have a wallet?", answer: "You need to install a Solana wallet like Phantom or Solflare from the App Store to use EACOswap.", category: .wallet),
            FAQItem(id: "w7", question: "Can I use Ledger with EACOswap?", answer: "Yes, if your Ledger is connected through a supported wallet app like Phantom or Solflare.", category: .wallet),
            FAQItem(id: "w8", question: "What happens if I lose my wallet?", answer: "You can restore your wallet using your seed phrase in any Solana-compatible wallet app. EACOswap does not store recovery information.", category: .wallet)
        ]

        // Trading questions
        items += [
            FAQItem(id: "t1", question: "How do I swap tokens?", answer: "Go to the Exchange tab, select your input and output tokens, enter an amount, and tap 'Get Quote' to see the expected output.", category: .trading),
            FAQItem(id: "t2", question: "What is slippage?", answer: "Slippage is the difference between the expected price and the actual execution price due to market movement. You can set your maximum acceptable slippage.", category: .trading),
            FAQItem(id: "t3", question: "What is price impact?", answer: "Price impact measures how much your trade affects the token's price in the liquidity pool. Larger trades have higher impact.", category: .trading),
            FAQItem(id: "t4", question: "How long do swaps take?", answer: "Solana transactions typically confirm within 400ms to 2 seconds, making swaps nearly instantaneous.", category: .trading),
            FAQItem(id: "t5", question: "What fees do I pay?", answer: "You pay Solana network fees (typically < $0.01) and DEX trading fees (usually 0.1% to 0.3%).", category: .trading),
            FAQItem(id: "t6", question: "Can I set limit orders?", answer: "Limit orders are supported through partner DEXes. Check the Jupiter Pro interface for advanced order types.", category: .trading),
            FAQItem(id: "t7", question: "What is the minimum trade amount?", answer: "There is no strict minimum, but very small amounts may be uneconomical due to network fees.", category: .trading),
            FAQItem(id: "t8", question: "Why did my transaction fail?", answer: "Transactions may fail due to insufficient balance, slippage exceeded, network congestion, or the liquidity pool being empty.", category: .trading),
            FAQItem(id: "t9", question: "Can I cancel a transaction?", answer: "Once submitted to the blockchain, transactions cannot be cancelled. Always review details before confirming.", category: .trading),
            FAQItem(id: "t10", question: "How do I track my trades?", answer: "You can view your transaction history in your wallet app or on Solana block explorers like Solscan or SolanaFM.", category: .trading)
        ]

        // Security questions
        items += [
            FAQItem(id: "s1", question: "Is EACOswap secure?", answer: "EACOswap uses industry-standard security practices and audited smart contracts. However, always verify transactions in your wallet.", category: .security),
            FAQItem(id: "s2", question: "How do I avoid scams?", answer: "Always verify token contract addresses, check official links, and never share your seed phrase with anyone.", category: .security),
            FAQItem(id: "s3", question: "What are rug pulls?", answer: "Rug pulls occur when developers drain liquidity or abandon a project. Research tokens before trading.", category: .security),
            FAQItem(id: "s4", question: "Should I verify token contracts?", answer: "Yes, always verify token contract addresses on official sources or block explorers before trading.", category: .security),
            FAQItem(id: "s5", question: "What is phishing?", answer: "Phishing involves fake websites or messages tricking you into revealing private information. Always use official EACOswap links.", category: .security),
            FAQItem(id: "s6", question: "How do I report a security issue?", answer: "Contact our security team through official channels or email security@eacoswap.com for responsible disclosure.", category: .security)
        ]

        // Technical questions
        items += [
            FAQItem(id: "tech1", question: "What is a DEX aggregator?", answer: "A DEX aggregator routes trades through multiple liquidity sources to find the best price and minimize slippage.", category: .technical),
            FAQItem(id: "tech2", question: "What is liquidity?", answer: "Liquidity refers to the amount of tokens available in a trading pool. Higher liquidity means better prices and lower slippage.", category: .technical),
            FAQItem(id: "tech3", question: "What is an AMM?", answer: "AMM stands for Automated Market Maker, a protocol that uses algorithms to price assets based on supply ratios in liquidity pools.", category: .technical),
            FAQItem(id: "tech4", question: "What is impermanent loss?", answer: "Impermanent loss occurs when the price ratio of pooled tokens changes, causing liquidity providers to potentially earn less than holding.", category: .technical),
            FAQItem(id: "tech5", question: "What are Solana's advantages?", answer: "Solana offers high throughput (65,000+ TPS), low fees (~$0.00025/tx), and fast finality (400ms).", category: .technical),
            FAQItem(id: "tech6", question: "What is a token mint address?", answer: "A mint address is the unique identifier for a token on Solana. EACO's mint is displayed in the app settings.", category: .technical)
        ]

        // Tokenomics questions
        items += [
            FAQItem(id: "tok1", question: "What is EACO's total supply?", answer: "EACO has a fixed total supply. Check the app or block explorer for current circulation and burn metrics.", category: .tokenomics),
            FAQItem(id: "tok2", question: "How is EACO distributed?", answer: "EACO distribution includes public sale, liquidity provision, team allocation (vested), ecosystem incentives, and community rewards.", category: .tokenomics),
            FAQItem(id: "tok3", question: "Can I stake EACO?", answer: "Staking options may be available through partner platforms. Check the app for current staking opportunities.", category: .tokenomics),
            FAQItem(id: "tok4", question: "What is token burning?", answer: "Token burning permanently removes tokens from circulation, potentially increasing scarcity and value.", category: .tokenomics),
            FAQItem(id: "tok5", question: "Where can I view EACO analytics?", answer: "Token analytics are available on the Market tab, CoinGecko, CoinMarketCap, and Solana block explorers.", category: .tokenomics),
            FAQItem(id: "tok6", question: "What is EACO Public Welfare 2025?", answer: "EACO Public Welfare 2025 is our social impact initiative. Visit the link in Settings for more information.", category: .tokenomics)
        ]

        return items
    }
}
