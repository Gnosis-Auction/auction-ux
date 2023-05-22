import { useCallback } from 'react'
import styled from 'styled-components'

import { useAccount, useNetwork } from 'wagmi'

import { useAuctionForm } from '../../../hooks/useAuctionForm'
import { useSubmitAuction } from '../../../hooks/useSubmitAuction'
import useSwitchNetwork from '../../../hooks/useSwitchNetwork'
import { useWalletModalToggle } from '../../../state/application/hooks'
import { NETWORK_CONFIGS } from '../../../utils/networkConfig'
import { Button } from '../../buttons/Button'

const ActionButton = styled(Button)`
  flex-shrink: 0;
  height: 40px;
  margin: 3em auto;
  width: 20em;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 16em;
  `}
`

const SubmitAuction = () => {
  const { initiateNewAuction } = useSubmitAuction()
  const switchNetwork = useSwitchNetwork()
  const { chain } = useNetwork()
  const { address: account } = useAccount()
  const toggleWalletModal = useWalletModalToggle()

  const { getValues } = useAuctionForm()

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

  return (
    <ActionButton disabled={!selectedChain} onClick={onSubmit}>
      {chain?.id === getValues().chainId || !selectedChain
        ? 'Launch Auction'
        : `Switch Network (${NETWORK_CONFIGS[selectedChain]?.name || ''})`}
    </ActionButton>
  )
}

export default SubmitAuction
