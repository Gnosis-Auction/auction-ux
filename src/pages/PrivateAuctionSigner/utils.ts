import { utils } from 'ethers'

import axios from 'axios'
import { mainnet, polygon, polygonMumbai } from 'wagmi/chains'

export const PINATA_JWT = process.env.REACT_APP_PINATA_JWT
const PINATA_BASE_URL = 'https://api.pinata.cloud/'
const pinJsonUrl = `${PINATA_BASE_URL}pinning/pinJSONToIPFS`

function domain(chainId: number, verifyingContract: any) {
  return {
    name: 'AccessManager',
    version: 'v1',
    chainId,
    verifyingContract,
  }
}

export async function generateSignatures(
  addresses: string[],
  userSigner: any,
  auctionId: string,
  allowListContractAddress: string,
  setSnackbar,
) {
  if (addresses?.length === 0) return []
  const chainId = await userSigner.getChainId()

  const contractDomain = domain(chainId, allowListContractAddress)

  const signatures: { user: string; signature: string }[] = []
  await Promise.all(
    addresses.map(async (address) => {
      try {
        const auctioneerMessage = utils.keccak256(
          utils.defaultAbiCoder.encode(
            ['bytes32', 'address', 'uint256'],
            [utils._TypedDataEncoder.hashDomain(contractDomain), address, auctionId],
          ),
        )
        const auctioneerSignature = await userSigner.signMessage(utils.arrayify(auctioneerMessage))
        const sig = utils.splitSignature(auctioneerSignature)
        const auctioneerSignatureEncoded = utils.defaultAbiCoder.encode(
          ['uint8', 'bytes32', 'bytes32'],
          [sig.v, sig.r, sig.s],
        )
        signatures.push({
          user: address,
          signature: auctioneerSignatureEncoded,
        })
      } catch (e) {
        setSnackbar((state) => ({
          ...state,
          open: true,
          message: `${String(e).substring(0, 22)}`,
          severity: 'error',
        }))
      }
    }),
  )

  return signatures
}

export const ALLOW_LIST_VERIFIER_CONTRACTS = {
  [mainnet.id]: '0x0F4648d997e486cE06577d6Ee2FecBcA84b834F4',
  [polygonMumbai.id]: '0xE0AD16EB7Ea467C694E6cFdd5E7D61FE850e8B53',
  [polygon.id]: '0x0480A370279B2e70378188E1bd4f1cD7D76D8aD2',
}

export async function uploadSignature(
  chainId: string,
  auctionId: string,
  address: string,
  signature: string,
) {
  const data = JSON.stringify({
    pinataOptions: {
      cidVersion: 1,
    },
    pinataMetadata: {
      name: `${chainId}-${auctionId}-${address}`,
      keyvalues: {
        address,
        auctionId: auctionId,
      },
    },
    pinataContent: {
      signature,
    },
  })

  await axios.post(pinJsonUrl, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${PINATA_JWT}`,
    },
  })
}
