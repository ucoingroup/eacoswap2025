// ===== Wallet Detection & Connection Services =====

export function isWalletAvailable(walletType) {
  switch (walletType) {
    case 'phantom':
      return !!window?.phantom?.solana?.isPhantom
    case 'solflare':
      return !!window?.solflare?.isSolflare
    case 'backpack':
      return !!window?.backpack?.isBackpack
    default:
      return false
  }
}

export async function connectPhantom() {
  const phantom = window?.phantom?.solana
  if (!phantom) {
    // Mobile deep link fallback
    if (isMobile()) {
      openWalletDeepLink('phantom')
      return null
    }
    throw new Error('Phantom wallet not installed')
  }

  try {
    const response = await phantom.connect()
    return { address: response.publicKey.toString(), wallet: 'phantom' }
  } catch (err) {
    throw new Error('Phantom connection rejected: ' + err.message)
  }
}

export async function connectSolflare() {
  const solflare = window?.solflare
  if (!solflare) {
    if (isMobile()) {
      openWalletDeepLink('solflare')
      return null
    }
    throw new Error('Solflare wallet not installed')
  }

  try {
    await solflare.connect()
    return { address: solflare.publicKey.toString(), wallet: 'solflare' }
  } catch (err) {
    throw new Error('Solflare connection rejected: ' + err.message)
  }
}

export async function connectBackpack() {
  const backpack = window?.backpack
  if (!backpack) {
    if (isMobile()) {
      openWalletDeepLink('backpack')
      return null
    }
    throw new Error('Backpack wallet not installed')
  }

  try {
    await backpack.connect()
    return { address: backpack.publicKey.toString(), wallet: 'backpack' }
  } catch (err) {
    throw new Error('Backpack connection rejected: ' + err.message)
  }
}

export async function connectWalletConnect() {
  try {
    const { WalletConnectProvider } = await import('@walletconnect/ethereum-provider')
    const provider = await WalletConnectProvider.init({
      projectId: 'eacoswap-wallet-connect',
      chains: [1], // Ethereum mainnet - adjust for Solana if needed
      showQrModal: true,
    })
    await provider.enable()
    const accounts = provider.accounts
    return { address: accounts[0], wallet: 'walletconnect', provider }
  } catch (err) {
    throw new Error('WalletConnect failed: ' + err.message)
  }
}

export async function connectTonConnect() {
  try {
    const { TonConnect } = await import('@tonconnect/sdk')
    const connector = new TonConnect({
      manifestUrl: 'https://eacoswap.example.com/tonconnect-manifest.json'
    })
    // This is a simplified integration - full TON Connect requires manifest setup
    throw new Error('TON Connect requires manifest configuration. Please set up tonconnect-manifest.json.')
  } catch (err) {
    throw new Error('TON Connect error: ' + err.message)
  }
}

function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

function openWalletDeepLink(wallet) {
  const currentUrl = encodeURIComponent(window.location.href)
  const links = {
    phantom: `https://phantom.app/ul/browse/${currentUrl}`,
    solflare: `https://solflare.com/ul/${currentUrl}`,
    backpack: `https://backpack.app/ul/${currentUrl}`,
  }
  const url = links[wallet]
  if (url) {
    window.Telegram?.WebApp?.openLink?.(url) || window.open(url, '_blank')
  }
}

export function disconnectWallet(walletType) {
  try {
    switch (walletType) {
      case 'phantom':
        window.phantom?.solana?.disconnect()
        break
      case 'solflare':
        window.solflare?.disconnect()
        break
      case 'backpack':
        window.backpack?.disconnect()
        break
    }
  } catch (err) {
    console.warn('Wallet disconnect error:', err)
  }
}

export function getConnectedWallet() {
  if (window.phantom?.solana?.isConnected) {
    return { type: 'phantom', address: window.phantom.solana.publicKey?.toString() }
  }
  if (window.solflare?.isConnected) {
    return { type: 'solflare', address: window.solflare.publicKey?.toString() }
  }
  if (window.backpack?.isConnected) {
    return { type: 'backpack', address: window.backpack.publicKey?.toString() }
  }
  return null
}
