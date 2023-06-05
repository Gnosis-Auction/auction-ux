import { useCallback } from 'react'
import styled from 'styled-components'

import { FieldErrors } from 'react-hook-form'
import { useAccount, useNetwork } from 'wagmi'

import { useAuctionForm } from '../../../hooks/useAuctionForm'
import { useSubmitAuction } from '../../../hooks/useSubmitAuction'
import useSwitchNetwork from '../../../hooks/useSwitchNetwork'
import { LaunchAuctionFormValues } from '../../../pages/LaunchAuction/formConfig'
import { useWalletModalToggle } from '../../../state/application/hooks'
import { NETWORK_CONFIGS } from '../../../utils/networkConfig'
import { Button } from '../../buttons/Button'

const ActionButton = styled(Button)`
  flex-shrink: 0;
  margin: 3em auto;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 16em;
    margin: 3em auto;
    word-wrap: break-word;
    font-size: 18px;
    white-space: normal;
  `}
`

const SubmitAuction = () => {
  const { initiateNewAuction } = useSubmitAuction()
  const switchNetwork = useSwitchNetwork()
  const { chain } = useNetwork()
  const { address: account } = useAccount()
  const toggleWalletModal = useWalletModalToggle()

  const { getValues, handleSubmit, setError, setValue } = useAuctionForm()

  const selectedChain = getValues().chainId

  const onSubmit = useCallback(async () => {
    if (!account) {
      toggleWalletModal()
      return
    }
    if (selectedChain !== chain.id) {
      switchNetwork(selectedChain)
      return
    }
    initiateNewAuction()
  }, [switchNetwork, initiateNewAuction, toggleWalletModal, account, selectedChain, chain])

  const onError = (errors: FieldErrors<LaunchAuctionFormValues>) => {
    if (selectedChain !== chain.id) {
      switchNetwork(selectedChain)
      return
    }
    Object.values(errors).forEach((error) => {
      const {
        message,
        // @ts-ignore
        ref: { name },
      } = error
      setError(name, { type: 'custom', message })
      setValue(name, getValues()[name], {
        shouldValidate: true,
        shouldTouch: true,
        shouldDirty: true,
      })
    })
  }

  return (
    <ActionButton disabled={!selectedChain} onClick={handleSubmit(onSubmit, onError)}>
      {chain?.id === selectedChain || !selectedChain
        ? 'Launch Auction'
        : `Switch Network (${NETWORK_CONFIGS[selectedChain]?.name || ''})`}
    </ActionButton>
  )
}

export default SubmitAuction
