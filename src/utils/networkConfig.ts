import {
  Chain,
  avalanche,
  avalancheFuji,
  gnosis,
  goerli,
  mainnet,
  polygon,
  polygonMumbai,
} from 'wagmi/chains'

export { gnosis, goerli, mainnet, polygon, polygonMumbai, avalanche, avalancheFuji }
export type { Chain }

export enum ChainId {
  MAINNET = 1,
  GÖRLI = 5,
  XDAI = 100,
  MATIC = 137,
  MUMBAI = 80001,
  AVALANCHE = 43114,
  FUJI = 43113,
}

export const NETWORK_CONFIGS: {
  [chainId in ChainId]: Chain
} = {
  [mainnet.id]: mainnet,
  [goerli.id]: goerli,
  [gnosis.id]: gnosis,
  [polygon.id]: polygon,
  [polygonMumbai.id]: polygonMumbai,
  [avalanche.id]: avalanche,
  [avalancheFuji.id]: avalancheFuji,
}
