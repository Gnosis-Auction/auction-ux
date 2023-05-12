import { Contract } from '@ethersproject/contracts'
import { abi as IUniswapV2PairABI } from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import { useContract } from 'wagmi'

import { useActiveWeb3React } from './index'
import EASY_AUCTION_ABI from '../constants/abis/easyAuction/easyAuction.json'
import ERC20_ABI from '../constants/abis/erc20.json'
import { V1_EXCHANGE_ABI, V1_FACTORY_ABI, V1_FACTORY_ADDRESS } from '../constants/v1'
import { ChainId, EASY_AUCTION_NETWORKS } from '../utils'

export function useV1FactoryContract(): Maybe<Contract> {
  const { chainId } = useActiveWeb3React()
  return useContract({
    address: chainId === 1 ? V1_FACTORY_ADDRESS : undefined,
    abi: V1_FACTORY_ABI,
  })
}

export function useV1ExchangeContract(address: string): Maybe<Contract> {
  return useContract({ address, abi: V1_EXCHANGE_ABI })
}

export function useTokenContract(tokenAddress?: string): Maybe<Contract> {
  return useContract({ address: tokenAddress, abi: ERC20_ABI })
}

export function usePairContract(pairAddress?: string): Maybe<Contract> {
  return useContract({ address: pairAddress, abi: IUniswapV2PairABI })
}

export function useEasyAuctionContract(): Maybe<Contract> {
  const { chainId } = useActiveWeb3React()
  return useContract({ address: EASY_AUCTION_NETWORKS[chainId as ChainId], abi: EASY_AUCTION_ABI })
}
