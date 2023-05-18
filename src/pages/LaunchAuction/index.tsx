import React from 'react'
import styled from 'styled-components'

import { useForm } from 'react-hook-form'

import { LaunchAuctionFormValues } from './types'
import DateInput from '../../components/form/DateInput'
import TextInput from '../../components/form/TextInput'

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
`

const Title = styled.h1`
  color: ${({ theme }) => theme.text1};
  font-size: 26px;
  font-weight: 700;
  line-height: 1.3;
  text-align: center;
  justify-content: center;
  margin-right: 0.3em;
`
const AuctionTitle = styled.h1`
  color: ${({ theme }) => theme.primary1};
  font-size: 26px;
  font-weight: 700;
  line-height: 1.3;
  text-align: center;
  justify-content: center;
`
const FormBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  margin: 2em auto 0 !important;
  max-width: 60em !important;
`

const LaunchAuction: React.FC = () => {
  const { getValues, register } = useForm<LaunchAuctionFormValues>()

  return (
    <div>
      <TitleWrapper>
        <Title>Start a new</Title>
        <AuctionTitle>Auction</AuctionTitle>
      </TitleWrapper>
      <FormBody>
        <TextInput
          label="Auctioning Token Address*"
          tooltip="Enter the address of the token you want to auction."
          value={getValues('auctioningTokenAddress')}
          {...register('auctioningTokenAddress', {
            required: 'Please enter the address of the auctioning token',
          })}
        />
        <TextInput
          label="Bidding Token Address*"
          tooltip="Enter the address of the token you want in exchange for the auctioning token."
          value={getValues('biddingTokenAddress')}
          {...register('biddingTokenAddress', {
            required: 'Please enter the address of the bidding token',
          })}
        />
        <DateInput
          label="Order Cancellation End Date*"
          tooltip="The date after which orders can no longer be cancelled"
          value={getValues('orderCancellationEndDate')}
          {...register('orderCancellationEndDate', {
            required: 'Please enter the date after which orders can no longer be cancelled',
          })}
        />
        <TextInput
          label="Auctioned Sell Amount*"
          tooltip="Number of auctioning tokens you're willing to sell"
          value={getValues('auctionedSellAmount')}
          {...register('auctionedSellAmount', {
            required: 'Please enter the amount of auctioning tokens you want to sell',
          })}
        />
        <TextInput
          label="Min Buy Amount*"
          tooltip="Minimum price you're willing to accept for your auctioning tokens (in bidding tokens, price = minBuyAmount / auctionedSellAmount)"
          value={getValues('minBuyAmount')}
          {...register('minBuyAmount', {
            required:
              'Please enter the minimum price you want to accept for your auctioning tokens',
          })}
        />
        <TextInput
          label="Minimum Bidding Amount Per Order*"
          tooltip="The minimum amount of bidding tokens you're willing to accept per order"
          value={getValues('minimumBiddingAmountPerOrder')}
          {...register('minimumBiddingAmountPerOrder', {
            required:
              'Please enter the minimum amount of bidding tokens you want to accept per order',
          })}
        />
        <TextInput
          label="Minimum Funding Threshold*"
          tooltip="The minimum amount of bidding tokens you're willing to accept for the entire auction"
          value={getValues('minimumFundingThreshold')}
          {...register('minimumFundingThreshold', {
            required:
              'Please enter the minimum amount of bidding tokens you want to accept for the entire auction',
          })}
        />
      </FormBody>
    </div>
  )
}

export default LaunchAuction
