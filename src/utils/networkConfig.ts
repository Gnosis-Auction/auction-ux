import { Chain, gnosis, goerli, mainnet, polygon, polygonMumbai } from 'wagmi/chains'

export { gnosis, goerli, mainnet, polygon, polygonMumbai }
export type { Chain }

export enum ChainId {
  MAINNET = 1,
  GÖRLI = 5,
  XDAI = 100,
  MATIC = 137,
  MUMBAI = 80001,
}

export const NETWORK_CONFIGS: {
  [chainId in ChainId]: Chain
} = {
  [mainnet.id]: mainnet,
  [goerli.id]: goerli,
  [gnosis.id]: gnosis,
  [polygon.id]: polygon,
  [polygonMumbai.id]: polygonMumbai,
}
