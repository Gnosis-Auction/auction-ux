import { useCallback } from 'react'
import styled from 'styled-components'

import { FieldErrors } from 'react-hook-form'
import { useAccount, useNetwork } from 'wagmi'

import { useIsPrivateAuction } from '../../../hooks/useIsPrivateAuction'
import { usePrivateAuctionSignerForm } from '../../../hooks/usePrivateAuctionSignerForm'
import useSwitchNetwork from '../../../hooks/useSwitchNetwork'
import { PrivateAuctionSignerFormValues } from '../../../pages/PrivateAuctionSigner/formConfig'
import useGenerateSignature from '../../../pages/PrivateAuctionSigner/hooks/useGenerateSignature'
import { uploadSignature } from '../../../pages/PrivateAuctionSigner/utils'
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

const SubmitAddress = () => {
  const generateSignatures = useGenerateSignature()
  const switchNetwork = useSwitchNetwork()
  const { chain } = useNetwork()
  const { address: account } = useAccount()
  const toggleWalletModal = useWalletModalToggle()

  const { getFieldState, getValues, handleSubmit, setError, setValue, watch } =
    usePrivateAuctionSignerForm()

  const { invalid } = getFieldState('auctionId')
  const auctionId = watch('auctionId')

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
    const signatures = await generateSignatures()
    await Promise.all(
      signatures.map(async (signature) => {
        const { signature: auctioneerSignedMessage, user } = signature
        await uploadSignature(
          selectedChain.toString(),
          auctionId.toString(),
          user,
          auctioneerSignedMessage,
        )
      }),
    )
  }, [
    switchNetwork,
    generateSignatures,
    toggleWalletModal,
    account,
    auctionId,
    selectedChain,
    chain,
  ])

  const onError = (errors: FieldErrors<PrivateAuctionSignerFormValues>) => {
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
      setValue(name, getValues()[name], { shouldValidate: true, shouldTouch: true })
    })
  }

  const { isLoading, isPrivateAuction } = useIsPrivateAuction({ auctionId, chainId: selectedChain })

  if (!auctionId || (auctionId && invalid) || isLoading || !isPrivateAuction) return null

  return (
    <ActionButton disabled={!selectedChain} onClick={handleSubmit(onSubmit, onError)}>
      {chain?.id === selectedChain || !selectedChain
        ? 'Whitelist Addresses'
        : `Switch Network (${NETWORK_CONFIGS[selectedChain]?.name || ''})`}
    </ActionButton>
  )
}

export default SubmitAddress
