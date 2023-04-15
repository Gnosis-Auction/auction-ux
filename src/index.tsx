import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { WagmiConfig } from 'wagmi'

import { wagmiClient } from './connectors/index'
import './i18n'
import App from './pages/App'
import store from './state'
import ApplicationUpdater from './state/application/updater'
import MulticallUpdater from './state/multicall/updater'
import TransactionUpdater from './state/transactions/updater'
import UserUpdater from './state/user/updater'
import ThemeProvider from './theme'
import { GlobalStyle, ThemedGlobalStyle } from './theme/globalStyle'
import 'sanitize.css'

const Updaters = () => {
  return (
    <>
      <UserUpdater />
      <ApplicationUpdater />
      <TransactionUpdater />
      <MulticallUpdater />
    </>
  )
}

ReactDOM.render(
  <>
    <WagmiConfig client={wagmiClient}>
      <Provider store={store}>
        <Updaters />
        <ThemeProvider>
          <GlobalStyle />
          <ThemedGlobalStyle />
          <App />
        </ThemeProvider>
      </Provider>
    </WagmiConfig>
  </>,
  document.getElementById('root'),
)
