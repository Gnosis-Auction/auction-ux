import { Avalanche } from '../../icons/Avalanche'
import { AvalancheFuji } from '../../icons/AvalancheFuji'
import { BNBSmartChain } from '../../icons/BNBSmartChain'
import { BinanceSmartChainTestnet } from '../../icons/BinanceSmartChainTestnet'
import { Gnosis } from '../../icons/Gnosis'
import { Goerli } from '../../icons/Goerli'
import { Ethereum } from '../../icons/Homestead'
import { Polygon } from '../../icons/Polygon'
import { PolygonMumbai } from '../../icons/PolygonMumbai'

interface IconSelectProps {
  name: string
}

export const IconSelect = (props: IconSelectProps) => {
  const { name } = props

  switch (name) {
    case 'Ethereum':
      return <Ethereum />
    case 'Polygon':
      return <Polygon />
    case 'Gnosis':
      return <Gnosis />
    case 'Avalanche':
      return <Avalanche />
    case 'BNB Smart Chain':
      return <BNBSmartChain />
    case 'Goerli':
      return <Goerli />
    case 'Polygon Mumbai':
      return <PolygonMumbai />
    case 'Avalanche Fuji':
      return <AvalancheFuji />
    case 'Binance Smart Chain Testnet':
      return <BinanceSmartChainTestnet />
    default:
      return <></>
  }
}
