import { WalletConnectConnector } from '@anxolin/walletconnect-connector'
import { PortisConnector } from '@web3-react/portis-connector'
import { configureChains, createClient } from 'wagmi'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { SafeConnector } from 'wagmi/connectors/safe'
import { WalletConnectConnector as WC } from 'wagmi/connectors/walletConnect'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'

import {
  ChainId,
  NETWORK_CONFIGS,
  avalanche,
  avalancheFuji,
  gnosis,
  goerli,
  mainnet,
  polygon,
  polygonMumbai,
} from './../utils/networkConfig'
import { INFURA_KEY, PORTIS_ID, WALLET_CONNECT_PROJECT_ID } from '../constants/config'

const { chains, provider } = configureChains(
  [mainnet, polygonMumbai, gnosis, goerli, polygon, avalanche, avalancheFuji],
  [infuraProvider({ apiKey: INFURA_KEY }), publicProvider()],
)

export { chains }

const metamaskConnector = new MetaMaskConnector({ chains })
export const injected = new InjectedConnector({ chains })
const coinbaseWalletConnector = new CoinbaseWalletConnector({
  chains,
  options: {
    appName: 'gnosis-auction.eth',
    jsonRpcUrl: `${mainnet.rpcUrls.public.http}`,
  },
})
export const walletConnectConnector = new WC({
  chains,
  options: {
    projectId: WALLET_CONNECT_PROJECT_ID,
    metadata: {
      name: 'gnosis-auction',
      description: 'Decentralised token price discovery platform',
      url: 'gnosis-auction.eth',
      icons: [],
    },
  },
})

const safeConnector = new SafeConnector({
  chains,
  options: {
    allowedDomains: [/gnosis-safe.io$/, /app.safe.global$/],
    debug: true,
  },
})

export const wagmiClient = createClient({
  autoConnect: true,
  connectors: [
    metamaskConnector,
    injected,
    coinbaseWalletConnector,
    walletConnectConnector,
    safeConnector,
  ],
  provider,
})

const POLLING_INTERVAL = 10000

const urls: string[] = []

// TOOD Try to use reduce to improve types
const rpcs: any = {}

const chainIds = Object.keys(NETWORK_CONFIGS).map(Number)
chainIds.forEach((chainId: ChainId) => {
  if (NETWORK_CONFIGS[chainId].rpcUrls.default) {
    urls[chainId] = `${NETWORK_CONFIGS[chainId].rpcUrls.default.http}`
    rpcs[chainId] = NETWORK_CONFIGS[chainId].rpcUrls.default.http
  }
})

export const walletconnect = {
  1: new WalletConnectConnector({
    rpc: { 1: `${NETWORK_CONFIGS[1].rpcUrls.default.http}` },
    bridge: 'https://safe-walletconnect.gnosis.io',
    qrcode: true,
    pollingInterval: POLLING_INTERVAL,
  }),
  100: new WalletConnectConnector({
    rpc: { 100: `${NETWORK_CONFIGS[100].rpcUrls.default.http}` },
    bridge: 'https://safe-walletconnect.gnosis.io',
    qrcode: true,
    pollingInterval: POLLING_INTERVAL,
  }),
  137: new WalletConnectConnector({
    rpc: { 137: `${NETWORK_CONFIGS[137].rpcUrls.default.http}` },
    bridge: 'https://safe-walletconnect.gnosis.io',
    qrcode: true,
    pollingInterval: POLLING_INTERVAL,
  }),
  5: new WalletConnectConnector({
    rpc: { 5: `${NETWORK_CONFIGS[5].rpcUrls.default.http}` },
    bridge: 'https://safe-walletconnect.gnosis.io',
    qrcode: true,
    pollingInterval: POLLING_INTERVAL,
  }),
  // if no network is defined, we look whether wallet connect supports all possible chains
  // this might cause issues on the auction overview page.
  // A solution for this usecase should be a network selector
  undefined: new WalletConnectConnector({
    rpc: rpcs,
    bridge: 'https://safe-walletconnect.gnosis.io',
    qrcode: true,
    pollingInterval: POLLING_INTERVAL,
  }),
}

// mainnet only
export const portis = new PortisConnector({
  dAppId: PORTIS_ID,
  networks: [1],
})
