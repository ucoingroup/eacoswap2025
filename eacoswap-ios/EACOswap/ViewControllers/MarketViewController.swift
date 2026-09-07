//
//  MarketViewController.swift
//  EACOswap
//
//  Created by EACO Team on 2026-09-07.
//

import UIKit
import os.log

class MarketViewController: UIViewController {

    private let logger = Logger(subsystem: "com.eacoswap.app", category: "MarketViewController")

    private var tokens: [Token] = []
    private var selectedRange: MarketCapRange = .top100
    private var isLoading = false
    private var errorMessage: String?

    private let segmentedControl = UISegmentedControl(items: MarketCapRange.allCases.map { $0.displayName })
    private let tableView = UITableView()
    private let refreshControl = UIRefreshControl()
    private let errorView = UIView()
    private let errorLabel = UILabel()
    private let retryButton = UIButton(type: .system)

    override func viewDidLoad() {
        super.viewDidLoad()
        title = NSLocalizedString("tab.market", comment: "")
        setupUI()
        setupThemeObserver()
        loadMarketData()
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

        // Segmented control
        segmentedControl.selectedSegmentIndex = 0
        segmentedControl.addTarget(self, action: #selector(rangeChanged), for: .valueChanged)
        segmentedControl.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(segmentedControl)

        // Table view
        tableView.delegate = self
        tableView.dataSource = self
        tableView.register(MarketTableViewCell.self, forCellReuseIdentifier: MarketTableViewCell.reuseIdentifier)
        tableView.rowHeight = UITableView.automaticDimension
        tableView.estimatedRowHeight = 72
        tableView.separatorStyle = .singleLine
        tableView.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(tableView)

        // Refresh control
        refreshControl.addTarget(self, action: #selector(loadMarketData), for: .valueChanged)
        tableView.refreshControl = refreshControl

        // Error view
        errorView.isHidden = true
        errorView.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(errorView)

        errorLabel.textAlignment = .center
        errorLabel.numberOfLines = 0
        errorLabel.translatesAutoresizingMaskIntoConstraints = false
        errorView.addSubview(errorLabel)

        retryButton.setTitle(NSLocalizedString("common.retry", comment: ""), for: .normal)
        retryButton.titleLabel?.font = .preferredFont(forTextStyle: .headline)
        retryButton.addTarget(self, action: #selector(loadMarketData), for: .touchUpInside)
        retryButton.translatesAutoresizingMaskIntoConstraints = false
        errorView.addSubview(retryButton)

        NSLayoutConstraint.activate([
            segmentedControl.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 12),
            segmentedControl.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 16),
            segmentedControl.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -16),

            tableView.topAnchor.constraint(equalTo: segmentedControl.bottomAnchor, constant: 12),
            tableView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            tableView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            tableView.bottomAnchor.constraint(equalTo: view.bottomAnchor),

            errorView.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            errorView.centerYAnchor.constraint(equalTo: view.centerYAnchor),
            errorView.leadingAnchor.constraint(greaterThanOrEqualTo: view.leadingAnchor, constant: 20),
            errorView.trailingAnchor.constraint(lessThanOrEqualTo: view.trailingAnchor, constant: -20),

            errorLabel.topAnchor.constraint(equalTo: errorView.topAnchor),
            errorLabel.leadingAnchor.constraint(equalTo: errorView.leadingAnchor),
            errorLabel.trailingAnchor.constraint(equalTo: errorView.trailingAnchor),

            retryButton.topAnchor.constraint(equalTo: errorLabel.bottomAnchor, constant: 16),
            retryButton.centerXAnchor.constraint(equalTo: errorView.centerXAnchor),
            retryButton.bottomAnchor.constraint(equalTo: errorView.bottomAnchor)
        ])
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
        segmentedControl.selectedSegmentTintColor = theme.accentColor
        segmentedControl.backgroundColor = theme.secondaryBackgroundColor
        segmentedControl.setTitleTextAttributes([.foregroundColor: theme.textColor], for: .normal)
        segmentedControl.setTitleTextAttributes([.foregroundColor: theme.backgroundColor], for: .selected)
        refreshControl.tintColor = theme.accentColor
        errorLabel.textColor = theme.secondaryTextColor
        retryButton.tintColor = theme.accentColor
        errorView.isHidden = tokens.isEmpty == false || isLoading
    }

    @objc private func rangeChanged() {
        selectedRange = MarketCapRange.allCases[segmentedControl.selectedSegmentIndex]
        loadMarketData()
    }

    @objc private func loadMarketData() {
        guard !isLoading else { return }
        isLoading = true
        errorView.isHidden = true

        if !refreshControl.isRefreshing {
            // Show loading indicator in nav bar
            let activityIndicator = UIActivityIndicatorView(style: .medium)
            activityIndicator.startAnimating()
            navigationItem.rightBarButtonItem = UIBarButtonItem(customView: activityIndicator)
        }

        Task {
            do {
                let response = try await ApiService.shared.getMarketCap(range: selectedRange)
                await MainActor.run {
                    self.tokens = response.tokens
                    self.errorMessage = nil
                    self.isLoading = false
                    self.refreshControl.endRefreshing()
                    self.navigationItem.rightBarButtonItem = nil
                    self.tableView.reloadData()
                    self.applyThemeColors()
                }
            } catch {
                await MainActor.run {
                    self.errorMessage = error.localizedDescription
                    self.isLoading = false
                    self.refreshControl.endRefreshing()
                    self.navigationItem.rightBarButtonItem = nil
                    self.showError(error.localizedDescription)
                }
            }
        }
    }

    private func showError(_ message: String) {
        errorLabel.text = message
        errorView.isHidden = false
        tableView.isHidden = true
    }

    private func hideError() {
        errorView.isHidden = true
        tableView.isHidden = false
    }
}

// MARK: - UITableViewDataSource
extension MarketViewController: UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return tokens.count
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        guard let cell = tableView.dequeueReusableCell(
            withIdentifier: MarketTableViewCell.reuseIdentifier,
            for: indexPath
        ) as? MarketTableViewCell else {
            return UITableViewCell()
        }

        let token = tokens[indexPath.row]
        cell.configure(token: token, rank: indexPath.row + 1, theme: ThemeManager.shared.currentTheme)
        return cell
    }
}

// MARK: - UITableViewDelegate
extension MarketViewController: UITableViewDelegate {
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
        let token = tokens[indexPath.row]

        // Show action sheet to open external link
        let alert = UIAlertController(title: token.name, message: nil, preferredStyle: .actionSheet)

        alert.addAction(UIAlertAction(title: NSLocalizedString("market.open_orb", comment: ""), style: .default) { _ in
            if let url = URL(string: "https://orbmarkets.com/token/solana/\(token.id)") {
                UIApplication.shared.open(url)
            }
        })

        alert.addAction(UIAlertAction(title: NSLocalizedString("market.open_coingecko", comment: ""), style: .default) { _ in
            if let url = URL(string: "https://www.coingecko.com/en/coins/\(token.id)") {
                UIApplication.shared.open(url)
            }
        })

        alert.addAction(UIAlertAction(title: NSLocalizedString("common.cancel", comment: ""), style: .cancel))
        present(alert, animated: true)
    }
}
