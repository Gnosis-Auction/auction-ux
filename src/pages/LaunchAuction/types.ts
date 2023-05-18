export interface LaunchAuctionFormValues {
  auctioningTokenAddress: string
  biddingTokenAddress: string
  orderCancellationEndDate: string
  auctionEndDate: string
  auctionedSellAmount: string
  minBuyAmount: string
  minimumBiddingAmountPerOrder: string
  minimumFundingThreshold: string
  isAtomicClosureAllowed: boolean
  isPrivateAuction: boolean
  signersAddress: string
  whitelistAddresses: string[]
}
