import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { useTranslation } from 'react-i18next'
import { useConnect } from 'wagmi'

import { tokenLogosServiceApi } from '../../../api'
import { useActiveListener, useEagerConnect, useInactiveListener } from '../../../hooks'
import { useTokenListActionHandlers } from '../../../state/tokenList/hooks'
import { getLogger } from '../../../utils/logger'
import { InlineLoading } from '../../common/InlineLoading'

const logger = getLogger('Web3ReactManager')

const MessageWrapper = styled.div`
  align-items: center;
  display: flex;
  height: 20rem;
  justify-content: center;
`

const Message = styled.h2`
  color: ${({ theme }) => theme.secondary1};
`

export default function Web3ReactManager({ children }) {
  const { t } = useTranslation()
  // const { isConnected: networkActive } = useAccount()
  const { error: networkError } = useConnect()
  const { onLoadTokenList } = useTokenListActionHandlers()

  // try to eagerly connect to an injected provider, if it exists and has granted access already
  const triedEager = useEagerConnect()

  // when there's no account connected, react to logins (broadly speaking) on the injected provider, if it exists
  useInactiveListener(!triedEager)

  // So we can trigger some events on accountsChanged
  useActiveListener()

  // handle delayed loader state
  const [showLoader, setShowLoader] = useState(true)

  // Fetch token logos by chain ID
  useEffect(() => {
    let cancelled = false
    const fetchTokenList = async (): Promise<void> => {
      try {
        setShowLoader(true)

        const data = await tokenLogosServiceApi.getAllTokens()
        if (!cancelled) {
          onLoadTokenList(data)
          setShowLoader(false)
        }
      } catch (error) {
        logger.error('Error getting token list', error)
        if (cancelled) return
        onLoadTokenList(null)
        setShowLoader(false)
      }
    }

    fetchTokenList()
    return (): void => {
      cancelled = true
    }
  }, [onLoadTokenList])

  // on page load, do nothing until we've tried to connect to the injected connector
  if (!triedEager) {
    return null
  }

  if (showLoader) {
    return <InlineLoading />
  }

  // if the account context isn't active, and there's an error on the network context, it's an irrecoverable error
  if (networkError) {
    return (
      <MessageWrapper>
        <Message>{t('unknownError')}</Message>
      </MessageWrapper>
    )
  }

  return children
}
