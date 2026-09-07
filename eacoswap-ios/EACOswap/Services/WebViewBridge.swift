//
//  WebViewBridge.swift
//  EACOswap
//
//  Created by EACO Team on 2026-09-07.
//

import WebKit
import UIKit
import os.log

final class WebViewBridge: NSObject, WKScriptMessageHandler {
    weak var webView: WKWebView?
    weak var viewController: UIViewController?
    private let logger = Logger(subsystem: "com.eacoswap.app", category: "WebViewBridge")

    init(webView: WKWebView, viewController: UIViewController) {
        self.webView = webView
        self.viewController = viewController
        super.init()
        setupMessageHandler()
        injectBridgeScript()
    }

    private func setupMessageHandler() {
        webView?.configuration.userContentController.add(self, name: "eacoswapBridge")
    }

    func userContentController(
        _ userContentController: WKUserContentController,
        didReceive message: WKScriptMessage
    ) {
        guard let body = message.body as? [String: Any],
              let action = body["action"] as? String else {
            logger.warning("Invalid bridge message received")
            return
        }

        logger.info("Bridge action: \(action)")

        switch action {
        case "connectWallet":
            if let typeString = body["type"] as? String,
               let type = WalletManager.WalletType(rawValue: typeString),
               let vc = viewController {
                WalletManager.shared.connectWallet(type: type, from: vc)
            }

        case "disconnectWallet":
            WalletManager.shared.disconnectWallet()
            sendResponse(to: action, data: ["success": true])

        case "getTheme":
            sendResponse(to: action, data: [
                "theme": ThemeManager.shared.currentTheme.rawValue,
                "colors": getThemeColors()
            ])

        case "setTheme":
            if let themeString = body["theme"] as? String,
               let theme = AppTheme(rawValue: themeString) {
                ThemeManager.shared.applyTheme(theme)
                sendResponse(to: action, data: ["success": true, "theme": theme.rawValue])
            }

        case "getLanguage":
            sendResponse(to: action, data: [
                "language": LocalizationManager.shared.currentLanguage.rawValue,
                "isRTL": LocalizationManager.shared.currentLanguage.isRTL
            ])

        case "setLanguage":
            if let langString = body["language"] as? String,
               let language = AppLanguage(rawValue: langString) {
                LocalizationManager.shared.applyLanguage(language)
                sendResponse(to: action, data: ["success": true, "language": language.rawValue])
            }

        case "share":
            if let text = body["text"] as? String {
                share(text: text)
            }

        case "openBrowser":
            if let urlString = body["url"] as? String, let url = URL(string: urlString) {
                openBrowser(url: url)
            }

        case "getWalletStatus":
            let pubKey = WalletManager.shared.getConnectedWallet()
            sendResponse(to: action, data: [
                "connected": pubKey != nil,
                "publicKey": pubKey ?? NSNull()
            ])

        default:
            logger.warning("Unknown bridge action: \(action)")
        }
    }

    // MARK: - JavaScript Communication

    func sendEvent(name: String, data: [String: Any]) {
        let jsonData = try? JSONSerialization.data(withJSONObject: data)
        let jsonString = String(data: jsonData ?? Data(), encoding: .utf8) ?? "{}"
        let script = "window.dispatchEvent(new CustomEvent('\(name)', { detail: \(jsonString) }));"
        webView?.evaluateJavaScript(script, completionHandler: nil)
    }

    private func sendResponse(to action: String, data: [String: Any]) {
        var response = data
        response["action"] = action
        sendEvent(name: "eacoswapResponse", data: response)
    }

    private func getThemeColors() -> [String: String] {
        let theme = ThemeManager.shared.currentTheme
        return [
            "background": theme.backgroundColor.toHex(),
            "accent": theme.accentColor.toHex(),
            "text": theme.textColor.toHex(),
            "secondaryText": theme.secondaryTextColor.toHex(),
            "success": theme.successColor.toHex(),
            "danger": theme.dangerColor.toHex()
        ]
    }

    // MARK: - Actions

    private func share(text: String) {
        guard let vc = viewController else { return }
        let activityVC = UIActivityViewController(activityItems: [text], applicationActivities: nil)
        vc.present(activityVC, animated: true)
    }

    private func openBrowser(url: URL) {
        guard let vc = viewController else { return }
        let safariVC = SFSafariViewController(url: url)
        safariVC.preferredControlTintColor = ThemeManager.shared.currentTheme.accentColor
        vc.present(safariVC, animated: true)
    }

    // MARK: - Bridge Script Injection

    private func injectBridgeScript() {
        let script = """
        window.eacoswap = {
            connectWallet: function(type) {
                window.webkit.messageHandlers.eacoswapBridge.postMessage({ action: 'connectWallet', type: type });
            },
            disconnectWallet: function() {
                window.webkit.messageHandlers.eacoswapBridge.postMessage({ action: 'disconnectWallet' });
            },
            getTheme: function() {
                return new Promise((resolve) => {
                    window.webkit.messageHandlers.eacoswapBridge.postMessage({ action: 'getTheme' });
                    window.addEventListener('eacoswapResponse', function handler(e) {
                        if (e.detail.action === 'getTheme') {
                            window.removeEventListener('eacoswapResponse', handler);
                            resolve(e.detail);
                        }
                    });
                });
            },
            setTheme: function(theme) {
                window.webkit.messageHandlers.eacoswapBridge.postMessage({ action: 'setTheme', theme: theme });
            },
            getLanguage: function() {
                return new Promise((resolve) => {
                    window.webkit.messageHandlers.eacoswapBridge.postMessage({ action: 'getLanguage' });
                    window.addEventListener('eacoswapResponse', function handler(e) {
                        if (e.detail.action === 'getLanguage') {
                            window.removeEventListener('eacoswapResponse', handler);
                            resolve(e.detail);
                        }
                    });
                });
            },
            setLanguage: function(language) {
                window.webkit.messageHandlers.eacoswapBridge.postMessage({ action: 'setLanguage', language: language });
            },
            share: function(text) {
                window.webkit.messageHandlers.eacoswapBridge.postMessage({ action: 'share', text: text });
            },
            openBrowser: function(url) {
                window.webkit.messageHandlers.eacoswapBridge.postMessage({ action: 'openBrowser', url: url });
            },
            getWalletStatus: function() {
                return new Promise((resolve) => {
                    window.webkit.messageHandlers.eacoswapBridge.postMessage({ action: 'getWalletStatus' });
                    window.addEventListener('eacoswapResponse', function handler(e) {
                        if (e.detail.action === 'getWalletStatus') {
                            window.removeEventListener('eacoswapResponse', handler);
                            resolve(e.detail);
                        }
                    });
                });
            }
        };
        """

        let userScript = WKUserScript(source: script, injectionTime: .atDocumentStart, forMainFrameOnly: false)
        webView?.configuration.userContentController.addUserScript(userScript)
    }

    func cleanup() {
        webView?.configuration.userContentController.removeScriptMessageHandler(forName: "eacoswapBridge")
    }
}
