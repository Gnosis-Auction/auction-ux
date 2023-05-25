import { useCallback, useMemo } from 'react'

import { Token, TokenAmount } from '@josojo/honeyswap-sdk'
import { prepareWriteContract, writeContract } from '@wagmi/core'
import dayjs from 'dayjs'
import { encodeAbiParameters, parseAbiParameters, parseUnits } from 'viem'
import { useAccount, useBalance, useNetwork } from 'wagmi'

import { useApproveCallback } from './useApproveCallback'
import { useAuctionForm } from './useAuctionForm'
import EASY_AUCTION_ABI from '../constants/abis/easyAuction/easyAuction.json'
import { useTransactionAdder } from '../state/transactions/hooks'
import {
  ALLOW_LIST_OFF_CHAIN_MANAGED,
  EASY_AUCTION_NETWORKS,
  getEasyAuctionAddress,
} from '../utils'

type ValuesToSend = [
  string,
  string,
  string,
  string,
  BigInt,
  BigInt,
  BigInt,
  BigInt,
  boolean,
  string,
  string,
]
export const useSubmitAuction = () => {
  const { address } = useAccount()
  const { getValues } = useAuctionForm()
  const { chain } = useNetwork()
  const addTransaction = useTransactionAdder()

  const chainId = chain?.id as number
  const { auctioningTokenAddress, biddingTokenAddress } = getValues()

  const {
    data: auctioningTokenData,
    isError: isErrorFetchingAuctionAllowance,
    isFetching: isFetchingAuctionAllowance,
  } = useBalance({
    // @ts-ignore
    address,
    // @ts-ignore
    token: auctioningTokenAddress,
    enabled: !!auctioningTokenAddress,
  })

  const {
    data: biddingTokenData,
    isError: isErrorFetchingBiddingAllowance,
    isFetching: isFetchingBiddingAllowance,
  } = useBalance({
    // @ts-ignore
    address,
    // @ts-ignore
    token: biddingTokenAddress,
    enabled: !!biddingTokenAddress,
  })

  const auctioningToken = useMemo(
    () =>
      !isErrorFetchingAuctionAllowance || !chainId || !auctioningTokenData
        ? undefined
        : new Token(
            chainId,
            auctioningTokenAddress,
            auctioningTokenData.decimals,
            auctioningTokenData.symbol,
          ),
    [auctioningTokenData, auctioningTokenAddress, chainId, isErrorFetchingAuctionAllowance],
  )

  const approvalTokenAmount = useMemo(() => {
    if (!auctioningTokenData) return undefined
    if (!auctioningToken) return undefined
    return new TokenAmount(auctioningToken, auctioningTokenData.value)
  }, [auctioningTokenData, auctioningToken])

  const [, approveCallback] = useApproveCallback(
    approvalTokenAmount,
    // @ts-ignore
    EASY_AUCTION_NETWORKS[chainId],
    chainId,
  )

  const initiateNewAuction = useCallback(async () => {
    const {
      allowListData,
      auctionEndDate,
      auctionedSellAmount: sellAmount,
      auctioningTokenAddress,
      biddingTokenAddress,
      isAtomicClosureAllowed,
      isWhiteListingProcessUsed,
      minBuyAmount,
      minimumBiddingAmountPerOrder: minBuyAmountPerOrder,
      minimumFundingThreshold: minFundingThreshold,
      orderCancellationEndDate,
    } = getValues()

    if (isErrorFetchingAuctionAllowance || isErrorFetchingBiddingAllowance) {
      console.error('InitiateNewAuction called without tokens')
      return
    }

    if (!auctioningTokenData) {
      console.error('auctioningTokenData not found')
      return
    }

    if (!biddingTokenData) {
      console.error('biddingTokenData not found')
      return
    }

    const minBuyAmountInAtoms = parseUnits(minBuyAmount as `${number}`, biddingTokenData.decimals)
    const minBuyAmountPerOrderInAtoms = parseUnits(
      minBuyAmountPerOrder as `${number}`,
      biddingTokenData?.decimals,
    )
    const minFundingThresholdInAtoms = parseUnits(
      minFundingThreshold as `${number}`,
      biddingTokenData?.decimals,
    )
    const sellAmountInAtoms = parseUnits(sellAmount as `${number}`, auctioningTokenData.decimals)

    const auctionEndDateDayjs = dayjs(auctionEndDate)
    const orderCancellationEndDateDayjs = dayjs(orderCancellationEndDate)

    if (sellAmountInAtoms > auctioningTokenData.value) {
      await approveCallback()
    }
    if (!chainId) {
      console.error('ChainId not found')
      return
    }
    const valuesToSend: ValuesToSend = [
      auctioningTokenAddress,
      biddingTokenAddress,
      orderCancellationEndDateDayjs.unix().toString(),
      auctionEndDateDayjs.unix().toString(),
      sellAmountInAtoms,
      minBuyAmountInAtoms,
      minBuyAmountPerOrderInAtoms,
      minFundingThresholdInAtoms,
      !!isAtomicClosureAllowed,
      isWhiteListingProcessUsed
        ? // @ts-ignore
          ALLOW_LIST_OFF_CHAIN_MANAGED[chainId]
        : '0x0000000000000000000000000000000000000000',
      isWhiteListingProcessUsed
        ? // @ts-ignore
          encodeAbiParameters(parseAbiParameters('address'), [allowListData])
        : '0x',
    ]

    const { request } = await prepareWriteContract({
      // @ts-ignore
      address: getEasyAuctionAddress(chainId || 1),
      // @ts-ignore
      abi: EASY_AUCTION_ABI,
      // @ts-ignore
      functionName: 'initiateAuction',
      // @ts-ignore
      args: valuesToSend,
    })

    return writeContract(request).then((response) => {
      addTransaction(response, {
        summary: `Auctioned ${sellAmount} ${auctioningTokenData.symbol} for ${minBuyAmount} ${biddingTokenData?.symbol}.`,
      })
      return response.hash
    })
  }, [
    approveCallback,
    addTransaction,
    auctioningTokenData,
    biddingTokenData,
    chainId,
    isErrorFetchingAuctionAllowance,
    isErrorFetchingBiddingAllowance,
    getValues,
  ])

  return {
    isError: isErrorFetchingAuctionAllowance || isErrorFetchingBiddingAllowance,
    isLoading: isFetchingAuctionAllowance || isFetchingBiddingAllowance,
    initiateNewAuction,
  }
}
