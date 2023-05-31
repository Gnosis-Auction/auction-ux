import { rgba } from 'polished'
import React, { ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import { Alert, AlertColor, Autocomplete, Snackbar, TextField } from '@mui/material'
import { getWalletClient } from '@wagmi/core'
import axios from 'axios'
import { useNetwork, useWalletClient } from 'wagmi'

import {
  ALLOW_LIST_VERIFIER_CONTRACTS,
  // PINATA_JWT,
  generateSignatures,
  uploadSignature,
} from './utils'
import { ButtonSelect } from '../../components/buttons/ButtonSelect'
import { Dropdown, DropdownItem, DropdownPosition } from '../../components/common/Dropdown'
import { chains } from '../../connectors'
import { PINATA_BASE_URL } from '../../constants/config'
import { NETWORK_CONFIGS } from '../../utils/networkConfig'

// const TitleWrapper = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: flex-end;
//   justify-content: center;
// `

const Title = styled.h1`
  color: ${({ theme }) => theme.text1};
  font-size: 26px;
  font-weight: 700;
  line-height: 1.3;
  text-align: center;
`

const DropdownPagination = styled(Dropdown)`
  width: 30%;
  flex-direction: row;
  align-items: flex-end;
  align-self: flex-end;
  justify-content: flex-end;
  margin: 2em !important;
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  margin-right: 3.5em !important;
  cursor: pointer;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 12em;
    margin-right: 0 !important;
  `}
`

const ButtonText = styled.span`
  ${({ theme }) => theme.mediaWidth.upToMedium`
    font-size: 14px;
  `}
`

// const TextInputWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   justify-content: center;
//   width: 100%;
// `

const AuctionIdInput = styled.input`
  width: 10em;
  height: 2.4em;
  font-size: 16px;
  padding: 0 0.5em;
  border-radius: 0.42rem;
  margin-top: 1em;
  border: 1px solid ${({ theme }) => theme.text1};
`

const Input = styled.input`
  width: 20em;
  height: 2.4em;
  font-size: 16px;
  padding: 0 0.5em;
  border-radius: 0.42rem;
  margin-top: 1em;
  border: 1px solid ${({ theme }) => theme.text1};
`

const FieldRowLabel = styled.div`
  color: ${({ theme }) => rgba(theme.text1, 0.8)};
  font-size: 14px;
  font-weight: 600;
  line-height: 1.2;
  margin-right: auto;
  text-align: left;
  margin-top: 3em;
`

const FormWrapper = styled.div`
  margin: 0 10%;
  display: flex;
  flex-direction: column;
`

const Button = styled.button`
  color: white;
  text-height: 20px;
  user-select: none;
  white-space: nowrap;
  font-family: 'Averta', sans-serif;
  align-items: center;
  border-radius: 6px;
  border-style: solid;
  border-width: 1px;
  cursor: pointer;
  display: flex;
  font-size: 14px;
  height: 44px;
  justify-content: center;
  line-height: 1;
  outline: none;
  padding: 0 25px;
  text-align: center;
  background-color: #e8663d;
  border: none;
  width: 10em;
  margin-top: 3em;
  margin-left: auto;
  margin-right: auto;
`

const PrivateAuctionSigner: React.FC = () => {
  const { chain } = useNetwork()
  // const { data: signer } = getWalletClient({chainId});
  const { data: signer } = useWalletClient()

  const [currChain, setCurrChain] = useState(1)
  const [addresses, setAddresses] = useState<string[]>([])
  const [searchInput, setSearchInput] = useState<string>('')
  const [whitelistedAddresses, setWhitelistedAddresses] = useState<any[]>([])
  const [searchAddresses, setSearchAddresses] = useState<any[]>([])
  const [snackbar, setSnackbar] = React.useState<{
    open: boolean
    message: string
    severity: AlertColor
  }>({
    open: false,
    message: '',
    severity: 'success',
  })
  const [auctionId, setAuctionId] = useState('')

  useEffect(() => {
    setSearchAddresses(
      whitelistedAddresses.filter((address: string) => address.startsWith(searchInput)),
    )
  }, [searchInput, whitelistedAddresses])

  const onAddressChange = (...values: any[]) => {
    const options = values[1]
    setAddresses(options)
  }

  const handleClose = () => {
    setSnackbar((state) => ({
      ...state,
      open: false,
      message: '',
    }))
  }

  // const whitelistUrl = (auctionId: string) =>
  // `${PINATA_BASE_URL}data/pinList?status=pinned&metadata[keyvalues][auctionId]={"value":"${auctionId}","op":"eq"}&pageLimit=1000`;

  //   const fetchWhiteList = useCallback(async () => {
  //     const response = await axios.get(whitelistUrl(auctionIdRef.current.value), {
  //         headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${PINATA_JWT}`,
  //         },
  //     });
  //     const rows = response?.data?.rows;
  //     const entriesWithOccurrence = rows.reduce((acc: any, entry: any) => {
  //         const occurrence =
  //             acc.filter(
  //                 (item: any) =>
  //                     item.entry.metadata.keyvalues.address ===
  //                         entry.metadata.keyvalues.address
  //             ).length + 1;
  //         acc.push({ entry, occurrence });
  //         return acc;
  //     }, []);
  //     setWhitelistAddresses(entriesWithOccurrence);
  // }, [auctionId]);

  const submit = async () => {
    console.log('addresses')
    console.log(addresses)

    if (addresses.length === 0) {
      setSnackbar((state) => ({
        ...state,
        open: true,
        message: 'Please enter a minimum of one address',
        severity: 'error',
      }))
      return
    }
    if (auctionId === '') {
      setSnackbar((state) => ({
        ...state,
        open: true,
        message: 'Please enter a valid Auction Id',
        severity: 'error',
      }))
      return
    }

    setWhitelistedAddresses(addresses)
    setSearchAddresses(addresses)

    const chainId = chain?.id ?? 1
    const signatures = await generateSignatures(
      addresses,
      signer,
      auctionId,
      ALLOW_LIST_VERIFIER_CONTRACTS[chainId !== 0 ? chainId : 1],
      setSnackbar,
    )
    await Promise.all(
      signatures.map(async (signature) => {
        const { signature: auctioneerSignedMessage, user } = signature
        await uploadSignature(`${chainId}`, auctionId, user, auctioneerSignedMessage)
      }),
    )
    // setTimeout(fetchWhiteList, 10000)
  }

  return (
    <>
      <Title>Private Auction Signer</Title>
      <DropdownPagination
        dropdownButtonContent={
          <ButtonSelect
            content={<ButtonText>{NETWORK_CONFIGS[currChain as number].name}</ButtonText>}
          />
        }
        dropdownPosition={DropdownPosition.right}
        items={chains.map((item, index) => (
          <DropdownItem
            key={index}
            onClick={() => {
              setCurrChain(item.id)
            }}
          >
            {item.name}
          </DropdownItem>
        ))}
      />
      <FormWrapper>
        <FieldRowLabel className="label">Auction ID *</FieldRowLabel>
        <AuctionIdInput onChange={(e) => setAuctionId(e.target.value)} />
        <FieldRowLabel className="label">Whitelist Addresses *</FieldRowLabel>
        <Autocomplete
          defaultValue={[]}
          filterSelectedOptions
          freeSolo
          id="tags-outlined"
          multiple
          onChange={onAddressChange}
          options={[]}
          renderInput={(params: any) => (
            <TextField
              {...params}
              style={{
                backgroundColor: 'white',
                marginTop: '1em',
                fontSize: '16px',
                borderRadius: '0.42rem',
                border: `1px solid ${({ theme }) => theme.text1}`,
              }}
            />
          )}
        />
        <Button onClick={submit}>Whitelist</Button>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <FieldRowLabel style={{ marginTop: '5em' }}>Whitelisted Addresses</FieldRowLabel>
          <Input onChange={(e) => setSearchInput(e.target.value)} value={searchInput} />
        </div>
        <div
          style={{
            backgroundColor: 'white',
            marginTop: '3em',
            padding: '0.5em 1em',
            fontSize: '16px',
            borderRadius: '0.42rem',
            border: 'none',
            height: '10em',
            overflow: 'scroll',
          }}
        >
          {(searchAddresses as any).map((address, index) => {
            return (
              <li key={index} style={{ color: 'black', listStyle: 'none' }}>
                {address}
              </li>
            )
          })}
        </div>
      </FormWrapper>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        message={snackbar.message}
        onClose={handleClose}
        open={snackbar.open}
        sx={{ marginTop: '4%' }}
      >
        <Alert onClose={handleClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default PrivateAuctionSigner
