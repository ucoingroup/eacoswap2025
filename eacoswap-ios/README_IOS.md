# EACOswap iOS

A native iOS application for the EACOswap decentralized exchange, built with UIKit and Swift. EACOswap provides seamless token swapping, real-time market data, wallet integration, and a comprehensive FAQ system — all wrapped in a responsive, multi-theme interface.

---

## Prerequisites

| Requirement | Version |
|-------------|---------|
| Xcode | 15.0 or later |
| macOS | 14.0 (Sonoma) or later |
| iOS Target | 15.0 or later |
| Swift | 5.9 or later |

### Recommended
- An Apple Developer account (for device testing and distribution)
- A physical iOS device for wallet deep-link testing (simulator cannot handle `phantom://`, `solflare://`, etc.)
- Node.js 18+ if you plan to run the local backend server

---

## Project Structure

```
eacoswap-ios/
├── EACOswap/
│   ├── AppDelegate.swift              # App lifecycle & Firebase setup
│   ├── SceneDelegate.swift            # Window scene configuration
│   ├── Info.plist                     # App metadata & URL schemes
│   ├── Models/                         # Data models
│   │   ├── Token.swift                 # Token definitions (SOL, USDT, USDC, EACO, etc.)
│   │   ├── DEX.swift                   # DEX definitions (Jupiter, Raydium, Orca, etc.)
│   │   ├── SwapQuote.swift             # Jupiter swap quote model
│   │   ├── MarketData.swift            # CoinGecko market data model
│   │   ├── Theme.swift                 # AppTheme enum (Cosmic / Army / Classic)
│   │   └── Language.swift              # AppLanguage enum (6 languages + RTL support)
│   ├── Services/                       # Business logic & networking
│   │   ├── ApiService.swift            # Async/await API client with retry logic
│   │   ├── ThemeManager.swift          # Theme persistence & notifications
│   │   ├── LocalizationManager.swift   # Language switching & RTL layout
│   │   ├── WalletManager.swift         # Wallet connection state
│   │   └── WebViewBridge.swift         # JS ↔ Swift communication bridge
│   ├── ViewControllers/              # UI screens
│   │   ├── MainViewController.swift    # Home webview with offline fallback
│   │   ├── ExchangeViewController.swift # Token swap interface
│   │   ├── MarketViewController.swift  # Market cap listings
│   │   ├── FAQViewController.swift     # Searchable FAQ browser
│   │   └── SettingsViewController.swift # Theme, language, server config
│   ├── Views/                          # Reusable UI components
│   │   ├── TokenCardView.swift
│   │   ├── SwapInputView.swift
│   │   ├── MarketTableViewCell.swift
│   │   └── ThemePreviewView.swift
│   ├── Utils/                          # Helpers & extensions
│   │   ├── Constants.swift             # URLs, mints, keys, UI constants
│   │   ├── Extensions.swift            # UIColor hex, UIView styles, String helpers
│   │   └── Formatters.swift            # Price, market cap, volume, % formatters
│   └── Resources/                      # Localization & assets
│       ├── Localizable.strings         # English (Base)
│       ├── Localizable_zh.strings      # Chinese (Simplified)
│       ├── Localizable_es.strings      # Spanish
│       ├── Localizable_ar.strings      # Arabic (RTL)
│       ├── Localizable_fr.strings      # French
│       ├── Localizable_ru.strings      # Russian
│       └── webview_error.html          # Offline fallback page
├── EACOswap.xcodeproj/
├── EACOswap.xcworkspace/               # After `pod install`
├── Podfile                             # Firebase & dependencies
├── Podfile.lock
└── README_IOS.md                       # This file
```

---

## How to Open in Xcode

1. Open **Terminal** and navigate to the project root:
   ```bash
   cd /path/to/eacoswap-ios
   ```

2. If using CocoaPods, install dependencies first:
   ```bash
   pod install
   ```
   Then open the `.xcworkspace`:
   ```bash
   open EACOswap.xcworkspace
   ```

3. If **not** using CocoaPods (Firebase is optional), open the `.xcodeproj` directly:
   ```bash
   open EACOswap.xcodeproj
   ```

---

## Build and Run

### Simulator
1. In Xcode, select a target simulator (e.g., **iPhone 15 Pro**).
2. Press **Cmd + R** or click **Run**.
3. The app will launch with `localhost:3000` as the default server. Ensure your backend is running, or change the server URL in Settings.

### Physical Device
1. Connect your iPhone or iPad via USB.
2. Select your device from the target dropdown.
3. Ensure your Apple ID / Developer Team is selected in **Signing & Capabilities**.
4. Press **Cmd + R**.

> **Note:** Wallet deep links (Phantom, Solflare, Backpack) require a physical device; the Simulator cannot handle custom URL schemes.

---

## Backend Connection Setup

The app communicates with a Node.js backend (or production server) for:
- Health checks (`/api/health`)
- SOL price (`/api/sol-price`)
- Market data (`/api/tokens/market-cap`)
- Jupiter swap quotes (`/api/jupiter/quote`)
- Helius RPC proxy (`/api/helius/rpc`)

### Configure Server URL
1. Open the app and navigate to **Settings → Server URL**.
2. Enter your backend address, for example:
   - Local development: `http://192.168.1.5:3000` (use your Mac's LAN IP)
   - Production: `https://api.eacoswap.com`
3. Tap **Save** — the app will restart the webview with the new endpoint.

### Alternative: UserDefaults
You can also pre-configure the URL via code or a configuration profile:
```swift
UserDefaults.standard.set("https://api.eacoswap.com", forKey: "server_url")
```

---

## App Features

| Feature | Description |
|---------|-------------|
| **Multi-Theme** | Cosmic (dark teal), Army (dark green), Classic (sepia). Live switching with animation. |
| **Localization** | English, 华语, Español, العربية, Français, Русский. Arabic gets full RTL layout mirroring. |
| **Wallet Connect** | Deep-link to Phantom, Solflare, or Backpack. Address copying & explorer links. |
| **Token Swap** | Select from SOL, USDT, USDC, wBTC, wETH, wBNB, TRX, eCNH, and EACO. Jupiter quote integration with slippage and route display. |
| **Market Data** | Browse Top 100 / 1,000 / 10,000 tokens by market cap. Search, sort, and view 24h changes. |
| **FAQ System** | Searchable, categorized help articles with "Was this helpful?" feedback. |
| **Offline Mode** | Graceful offline page with auto-retry and status link when the server is unreachable. |
| **Biometric Lock** | Optional Face ID / Touch ID app lock (implemented in Settings). |
| **Push Notifications** | Price alerts, swap completion, deposits via Firebase Cloud Messaging. |

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| **Build fails with "No such module 'Firebase'"** | Run `pod install` and open `.xcworkspace`. Ensure CocoaPods is installed (`sudo gem install cocoapods`). |
| **Cannot connect to localhost on device** | Use your Mac's LAN IP (e.g., `192.168.x.x:3000`) instead of `localhost`. Ensure the phone and Mac are on the same Wi-Fi. |
| **WebView shows blank page** | Check the server URL in Settings. Verify the backend is running. Check the Xcode console for `ApiService` logs. |
| **Wallet deep links don't work** | Wallet deep links require a physical device with the wallet app installed. They do not function in Simulator. |
| **RTL layout broken for Arabic** | Ensure `LocalizationManager` is setting `UIView.appearance().semanticContentAttribute = .forceRightToLeft`. Check that constraints use leading/trailing (not left/right). |
| **App crashes on launch (iOS 15)** | The app targets iOS 15+. Ensure your deployment target in **Build Settings** is set to `15.0`. |
| **CocoaPods version mismatch** | Run `pod repo update` then `pod install`. |
| **Simulator network errors** | Simulator uses the Mac's network. Ensure your Mac has internet and any VPN/firewall allows local connections. |

---

## Archive and Distribute

### 1. Prepare for Release
- Update the **Version** (`CFBundleShortVersionString`) and **Build** (`CFBundleVersion`) in `Info.plist`.
- Ensure all assets (AppIcon, LaunchScreen) are complete.
- Run **Product → Clean Build Folder** (Shift + Cmd + K).

### 2. Archive
1. Select **Any iOS Device (arm64)** as the target.
2. Go to **Product → Archive**.
3. In the **Organizer**, select the archive and click **Distribute App**.
4. Choose your method:
   - **App Store Connect** → Upload to App Store
   - **Ad Hoc** → Export IPA for internal testing
   - **Enterprise** → In-house distribution

### 3. Provisioning
Ensure your signing certificates and provisioning profiles are valid:
- **Development** profile for device testing
- **Distribution** (App Store or Ad Hoc) for release

---

## TestFlight Deployment

1. After uploading to **App Store Connect**, log in to [App Store Connect](https://appstoreconnect.apple.com).
2. Navigate to **My Apps → EACOswap → TestFlight**.
3. Fill in:
   - **Beta App Review Information** (contact, demo account if needed)
   - **Test Information** (what to test, known issues)
4. Add internal testers (up to 100 App Store Connect users) or external testers (via public link or email invite).
5. Once Apple processes the build (usually 15–30 minutes), testers receive an email invitation to install via the TestFlight app.

### Automated CI/CD (optional)
You can integrate `xcodebuild` with GitHub Actions or Xcode Cloud:
```bash
xcodebuild -workspace EACOswap.xcworkspace \
  -scheme EACOswap \
  -sdk iphoneos \
  -configuration Release \
  archive -archivePath build/EACOswap.xcarchive
```

---

## License

© 2026 EACO Team. All rights reserved.

The EACOswap iOS app is proprietary software. Third-party libraries (Firebase, CocoaPods dependencies) remain under their respective licenses.
