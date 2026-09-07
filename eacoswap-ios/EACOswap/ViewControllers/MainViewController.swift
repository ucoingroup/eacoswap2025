//
//  MainViewController.swift
//  EACOswap
//
//  Created by EACO Team on 2026-09-07.
//

import UIKit
import WebKit
import os.log

class MainViewController: UIViewController {

    private var webView: WKWebView!
    private var bridge: WebViewBridge?
    private var offlineView: UIView?
    private let logger = Logger(subsystem: "com.eacoswap.app", category: "MainViewController")

    override func viewDidLoad() {
        super.viewDidLoad()
        title = NSLocalizedString("tab.home", comment: "")
        setupWebView()
        loadWebContent()
        setupThemeObserver()
    }

    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        applyThemeColors()
    }

    deinit {
        bridge?.cleanup()
        NotificationCenter.default.removeObserver(self)
    }

    // MARK: - Setup

    private func setupWebView() {
        let config = WKWebViewConfiguration()
        config.allowsInlineMediaPlayback = true
        config.mediaTypesRequiringUserActionForPlayback = []
        config.preferences.javaScriptEnabled = true
        config.defaultWebpagePreferences.allowsContentJavaScript = true

        // Set up a process pool for shared cookies/storage
        config.processPool = WKProcessPool()

        webView = WKWebView(frame: view.bounds, configuration: config)
        webView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        webView.navigationDelegate = self
        webView.uiDelegate = self
        webView.allowsBackForwardNavigationGestures = true
        webView.scrollView.bounces = true
        webView.scrollView.contentInsetAdjustmentBehavior = .automatic

        view.addSubview(webView)
        bridge = WebViewBridge(webView: webView, viewController: self)
    }

    private func setupThemeObserver() {
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(themeChanged),
            name: .themeDidChange,
            object: nil
        )
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(loadWebContent),
            name: .languageDidChange,
            object: nil
        )
    }

    @objc private func themeChanged() {
        applyThemeColors()
        // Notify web content of theme change
        let theme = ThemeManager.shared.currentTheme
        let script = """
        if (window.__eacoswapThemeChange) {
            window.__eacoswapThemeChange('\(theme.rawValue)');
        }
        """
        webView.evaluateJavaScript(script, completionHandler: nil)
    }

    @objc private func loadWebContent() {
        let serverURL = UserDefaults.standard.string(forKey: "server_url") ?? Constants.defaultServerURL
        let lang = LocalizationManager.shared.currentLanguage.rawValue
        let urlString = "\(serverURL)?lang=\(lang)&platform=ios"

        guard let url = URL(string: urlString) else {
            showOfflineView()
            return
        }

        var request = URLRequest(url: url)
        request.setValue("EACOswap-iOS/1.0", forHTTPHeaderField: "User-Agent")
        request.cachePolicy = .returnCacheDataElseLoad

        webView.load(request)
    }

    private func applyThemeColors() {
        let theme = ThemeManager.shared.currentTheme
        view.backgroundColor = theme.backgroundColor
        webView.backgroundColor = theme.backgroundColor
        webView.isOpaque = false
    }

    // MARK: - Offline View

    private func showOfflineView() {
        guard offlineView == nil else { return }

        let container = UIView()
        container.backgroundColor = ThemeManager.shared.currentTheme.backgroundColor
        container.translatesAutoresizingMaskIntoConstraints = false

        let label = UILabel()
        label.text = NSLocalizedString("error.offline_title", comment: "")
        label.textColor = ThemeManager.shared.currentTheme.textColor
        label.font = .preferredFont(forTextStyle: .headline)
        label.textAlignment = .center
        label.translatesAutoresizingMaskIntoConstraints = false

        let sublabel = UILabel()
        sublabel.text = NSLocalizedString("error.offline_message", comment: "")
        sublabel.textColor = ThemeManager.shared.currentTheme.secondaryTextColor
        sublabel.font = .preferredFont(forTextStyle: .body)
        sublabel.textAlignment = .center
        sublabel.numberOfLines = 0
        sublabel.translatesAutoresizingMaskIntoConstraints = false

        let button = UIButton(type: .system)
        button.setTitle(NSLocalizedString("common.retry", comment: ""), for: .normal)
        button.setTitleColor(ThemeManager.shared.currentTheme.accentColor, for: .normal)
        button.titleLabel?.font = .preferredFont(forTextStyle: .headline)
        button.addTarget(self, action: #selector(loadWebContent), for: .touchUpInside)
        button.translatesAutoresizingMaskIntoConstraints = false

        // Load offline HTML as fallback
        let webViewOffline = WKWebView(frame: .zero)
        if let htmlPath = Bundle.main.path(forResource: "webview_error", ofType: "html"),
           let html = try? String(contentsOfFile: htmlPath, encoding: .utf8) {
            let themedHTML = html
                .replacingOccurrences(of: "{{theme_bg}}", with: ThemeManager.shared.currentTheme.backgroundColor.toHex())
                .replacingOccurrences(of: "{{theme_text}}", with: ThemeManager.shared.currentTheme.textColor.toHex())
                .replacingOccurrences(of: "{{theme_accent}}", with: ThemeManager.shared.currentTheme.accentColor.toHex())
            webViewOffline.loadHTMLString(themedHTML, baseURL: nil)
        }
        webViewOffline.translatesAutoresizingMaskIntoConstraints = false

        container.addSubview(webViewOffline)
        container.addSubview(label)
        container.addSubview(sublabel)
        container.addSubview(button)

        view.addSubview(container)
        offlineView = container

        NSLayoutConstraint.activate([
            container.topAnchor.constraint(equalTo: view.topAnchor),
            container.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            container.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            container.bottomAnchor.constraint(equalTo: view.bottomAnchor),

            webViewOffline.topAnchor.constraint(equalTo: container.safeAreaLayoutGuide.topAnchor, constant: 20),
            webViewOffline.leadingAnchor.constraint(equalTo: container.leadingAnchor, constant: 20),
            webViewOffline.trailingAnchor.constraint(equalTo: container.trailingAnchor, constant: -20),
            webViewOffline.heightAnchor.constraint(equalToConstant: 200),

            label.topAnchor.constraint(equalTo: webViewOffline.bottomAnchor, constant: 20),
            label.leadingAnchor.constraint(equalTo: container.leadingAnchor, constant: 20),
            label.trailingAnchor.constraint(equalTo: container.trailingAnchor, constant: -20),

            sublabel.topAnchor.constraint(equalTo: label.bottomAnchor, constant: 10),
            sublabel.leadingAnchor.constraint(equalTo: container.leadingAnchor, constant: 20),
            sublabel.trailingAnchor.constraint(equalTo: container.trailingAnchor, constant: -20),

            button.topAnchor.constraint(equalTo: sublabel.bottomAnchor, constant: 20),
            button.centerXAnchor.constraint(equalTo: container.centerXAnchor)
        ])
    }

    private func hideOfflineView() {
        offlineView?.removeFromSuperview()
        offlineView = nil
    }
}

// MARK: - WKNavigationDelegate
extension MainViewController: WKNavigationDelegate {
    func webView(_ webView: WKWebView, didStartProvisionalNavigation navigation: WKNavigation!) {
        hideOfflineView()
    }

    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        logger.info("WebView finished loading")
        hideOfflineView()

        // Inject current theme
        let theme = ThemeManager.shared.currentTheme.rawValue
        let script = "window.__eacoswapTheme = '\(theme)';"
        webView.evaluateJavaScript(script, completionHandler: nil)
    }

    func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) {
        logger.error("WebView failed: \(error.localizedDescription)")
        showOfflineView()
    }

    func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) {
        logger.error("WebView provisional fail: \(error.localizedDescription)")
        showOfflineView()
    }

    func webView(
        _ webView: WKWebView,
        decidePolicyFor navigationAction: WKNavigationAction,
        decisionHandler: @escaping (WKNavigationActionPolicy) -> Void
    ) {
        guard let url = navigationAction.request.url else {
            decisionHandler(.allow)
            return
        }

        let urlString = url.absoluteString

        // Open external links in Safari
        if let host = url.host, !isInternalHost(host) {
            UIApplication.shared.open(url)
            decisionHandler(.cancel)
            return
        }

        // Handle wallet deeplinks
        if urlString.hasPrefix("phantom://") || urlString.hasPrefix("solflare://") || urlString.hasPrefix("backpack://") {
            UIApplication.shared.open(url)
            decisionHandler(.cancel)
            return
        }

        decisionHandler(.allow)
    }

    private func isInternalHost(_ host: String) -> Bool {
        let internalHosts = ["localhost", "eacoswap.com", "app.eacoswap.com"]
        return internalHosts.contains(where: { host.contains($0) })
    }
}

// MARK: - WKUIDelegate
extension MainViewController: WKUIDelegate {
    func webView(
        _ webView: WKWebView,
        createWebViewWith configuration: WKWebViewConfiguration,
        for navigationAction: WKNavigationAction,
        windowFeatures: WKWindowFeatures
    ) -> WKWebView? {
        if let url = navigationAction.request.url {
            UIApplication.shared.open(url)
        }
        return nil
    }

    func webView(
        _ webView: WKWebView,
        runJavaScriptAlertPanelWithMessage message: String,
        initiatedByFrame frame: WKFrameInfo,
        completionHandler: @escaping () -> Void
    ) {
        let alert = UIAlertController(title: nil, message: message, preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: NSLocalizedString("common.ok", comment: ""), style: .default, handler: { _ in completionHandler() }))
        present(alert, animated: true)
    }

    func webView(
        _ webView: WKWebView,
        runJavaScriptConfirmPanelWithMessage message: String,
        initiatedByFrame frame: WKFrameInfo,
        completionHandler: @escaping (Bool) -> Void
    ) {
        let alert = UIAlertController(title: nil, message: message, preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: NSLocalizedString("common.ok", comment: ""), style: .default, handler: { _ in completionHandler(true) }))
        alert.addAction(UIAlertAction(title: NSLocalizedString("common.cancel", comment: ""), style: .cancel, handler: { _ in completionHandler(false) }))
        present(alert, animated: true)
    }
}
