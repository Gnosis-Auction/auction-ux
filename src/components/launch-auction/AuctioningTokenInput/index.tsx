import { BigNumber, utils } from 'ethers'

import { fetchBalance, fetchToken } from '@wagmi/core'
import { useWatch } from 'react-hook-form'
import { useAccount } from 'wagmi'

import { useAuctionForm } from '../../../hooks/useAuctionForm'
import { FORM_PARAMETERS, FormKeys } from '../../../pages/LaunchAuction/formConfig'
import FormInput from '../../form/Input'
import { addressRegex } from '../../form/NumericalInput'
import Input from '../../form/TextInput'

const formKey: FormKeys = 'auctioningTokenAddress'

export const AuctioningTokenInput = () => {
  const { label, tooltipText } = FORM_PARAMETERS[formKey]
  const { control, getValues } = useAuctionForm()
  const { address } = useAccount()

  useWatch({ control, name: 'auctionedSellAmount' })

  return (
    <FormInput label={label} tooltip={tooltipText}>
      <Input
        name={formKey}
        rules={{
          required: true,
          pattern: addressRegex,
          validate: {
            checksum: (value) => {
              try {
                utils.getAddress(value)
                return true
              } catch (e) {
                return 'The address has an invalid checksum'
              }
            },
            validity: async (value) => {
              try {
                const token = await fetchToken({
                  // @ts-ignore
                  address: value,
                })
                if (!token) {
                  return 'Invalid ERC20'
                }
              } catch (e) {
                return 'Invalid ERC20'
              }
            },
            balance: async (value) => {
              const {
                decimals,
                symbol,
                value: balance,
              } = await fetchBalance({
                address,
                // @ts-ignore
                token: value,
              })
              const { auctionedSellAmount } = getValues()
              if (auctionedSellAmount && !!balance) {
                const sellAmountInAtoms = utils.parseUnits(auctionedSellAmount, decimals)
                const balanceInUnits = utils.formatUnits(balance.toString(), decimals)
                const symbolERC20 = symbol.toUpperCase()
                if (sellAmountInAtoms && sellAmountInAtoms.gt(BigNumber.from('0'))) {
                  if (balance.lt(sellAmountInAtoms)) {
                    return `Amount to sell is ${auctionedSellAmount} ${symbolERC20} and your balance is ${balanceInUnits} ${symbolERC20}`
                  }
                }
              }
              return true
            },
            notEqual: (value: string) => {
              const { biddingTokenAddress } = getValues()
              if (value.toLowerCase() === biddingTokenAddress.toLowerCase()) {
                return 'Bidding token and auctioning token must be different'
              }
              return true
            },
          },
        }}
        triggerOnChange="biddingTokenAddress"
      />
    </FormInput>
  )
}
