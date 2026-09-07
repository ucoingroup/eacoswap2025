# EACOswap Android App

A Kotlin-based Android companion app for the EACOswap Solana DEX navigation hub.

## Architecture

- **Single Activity**: `MainActivity` hosts a WebView for the web frontend
- **Bottom Navigation**: Native Android BottomNavigationView with 5 tabs
- **Settings Fragment**: Native Fragment for language/theme/server configuration
- **JavaScript Bridge**: `WebAppInterface` enables bidirectional web-native communication
- **Wallet Integration**: Deep-link support for Phantom, Solflare, and Backpack wallets

## Tech Stack

- **Language**: Kotlin (100%)
- **Min SDK**: 24 (Android 7.0)
- **Target SDK**: 34 (Android 14)
- **Build System**: Gradle with Kotlin DSL
- **UI**: Material3, ViewBinding
- **Networking**: Retrofit 2 + OkHttp 3 + Gson
- **Async**: Kotlin Coroutines
- **Browser**: Chrome Custom Tabs for external links

## Project Structure

```
eacoswap-android/
├── app/
│   ├── build.gradle.kts          # App-level build config
│   └── src/
│       ├── main/
│       │   ├── AndroidManifest.xml
│       │   ├── java/com/eaco/swap/
│       │   │   ├── MainActivity.kt          # Entry point, WebView host
│       │   │   ├── WebAppInterface.kt       # JS bridge (connectWallet, theme, locale, share, browser)
│       │   │   ├── WalletManager.kt         # Phantom/Solflare/Backpack deeplinks
│       │   │   ├── ApiService.kt            # Retrofit interface for backend APIs
│       │   │   ├── ThemeManager.kt          # Cosmic/Army/Classic themes
│       │   │   ├── LocaleManager.kt         # en/zh/es/ar/fr/ru with RTL support
│       │   │   └── SettingsFragment.kt        # Native settings UI
│       │   ├── res/
│       │   │   ├── layout/
│       │   │   │   ├── activity_main.xml    # WebView + BottomNav
│       │   │   │   └── dialog_wallet.xml    # Wallet selection dialog
│       │   │   ├── values/                   # English (default)
│       │   │   ├── values-zh/              # Chinese
│       │   │   ├── values-es/              # Spanish
│       │   │   ├── values-ar/              # Arabic (RTL)
│       │   │   ├── values-fr/              # French
│       │   │   ├── values-ru/              # Russian
│       │   │   ├── drawable/               # Vector icons
│       │   │   └── xml/
│       │   │       └── network_security_config.xml
│       │   └── assets/
│       │       └── webview_error.html        # Offline fallback page
│       └── test/
│           └── java/com/eaco/swap/
│               └── ExampleUnitTest.kt
├── build.gradle.kts              # Root build config
├── settings.gradle.kts           # Project settings
├── gradle.properties             # Gradle properties
└── README_ANDROID.md             # This file
```

## Features

### 1. WebView Integration
- Loads the existing EACOswap web frontend
- Supports offline fallback page with retry
- Handles external links via Chrome Custom Tabs
- JS Bridge for wallet, theme, language, share, and browser operations

### 2. Wallet Support
- **Phantom**: `phantom://browse?url=...`
- **Solflare**: `solflare://browse?url=...`
- **Backpack**: `backpack://browse?url=...`
- Fallback to Play Store if wallet not installed
- Deep-link callback handling (`eacoswap://wallet`)

### 3. Theme System
| Theme | Background | Accent |
|-------|-----------|--------|
| Cosmic | #0a1628 | #64ffda |
| Army | #1b2a1b | #c3b091 |
| Classic | #f5f0e8 | #8b0000 |

### 4. Localization
- English (en)
- Chinese (zh)
- Spanish (es)
- Arabic (ar) — RTL layout support
- French (fr)
- Russian (ru)

### 5. Backend APIs
- `GET /api/health` — Health check
- `GET /api/sol-price` — SOL price
- `GET /api/tokens/market-cap?range={range}` — Market cap data
- `GET /api/jupiter/quote?inputMint={}&outputMint={}&amount={}` — Jupiter swap quote
- `POST /api/helius/rpc` — Helius RPC proxy

## Build & Run

### Prerequisites
- Android Studio Hedgehog (2023.1.1) or later
- JDK 17
- Android SDK API 34
- A running EACOswap backend (default: `http://localhost:3000`)

### Android Emulator Note
When using the emulator, `localhost` on your machine maps to `10.0.2.2` inside the emulator. The default server URL is pre-configured to `http://10.0.2.2:3000`.

### Build Steps

```bash
# Open project in Android Studio or build from CLI
cd eacoswap-android

# Build debug APK
./gradlew assembleDebug

# Run tests
./gradlew test

# Install to connected device/emulator
./gradlew installDebug
```

### Configuration
1. Launch the app
2. Navigate to **Settings** (bottom nav, rightmost tab)
3. Enter your backend server URL (e.g., `http://10.0.2.2:3000` or your production URL)
4. Tap **Save**
5. The app will reload with the new server

### Server URL Formats
- Local development (emulator): `http://10.0.2.2:3000`
- Physical device (same network): `http://192.168.x.x:3000`
- Production: `https://your-domain.com`

## WebView ↔ Native Bridge

JavaScript API available in the web frontend:

```javascript
// Connect wallet
AndroidBridge.connectWallet('PHANTOM'); // or 'SOLFLARE', 'BACKPACK'

// Get/set theme
const theme = AndroidBridge.getTheme(); // 'cosmic' | 'army' | 'classic'
AndroidBridge.setTheme('cosmic');

// Get/set language
const lang = AndroidBridge.getLanguage(); // 'en' | 'zh' | 'es' | 'ar' | 'fr' | 'ru'
AndroidBridge.setLanguage('zh');

// Share
AndroidBridge.share('Check out EACOswap!');

// Open in browser
AndroidBridge.openBrowser('https://eacoswap.com');

// Native toast
AndroidBridge.showToast('Hello from web!');

// Check if app installed
const hasPhantom = AndroidBridge.isAppInstalled('app.phantom');
```

## Security

- `android:usesCleartextTraffic="true"` enabled for development
- `network_security_config.xml` allows localhost cleartext traffic
- No API keys are hardcoded
- Server URL is user-configurable via SharedPreferences
- Chrome Custom Tabs used for external browsing

## License

Part of the EACOswap ecosystem.
