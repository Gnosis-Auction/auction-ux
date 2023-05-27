import { rgba } from 'polished'
import React, { useRef, useState } from 'react'
import styled from 'styled-components'

import { ButtonSelect } from '../../components/buttons/ButtonSelect'
import { ButtonCSS } from '../../components/buttons/buttonStylingTypes'
import { Dropdown, DropdownItem, DropdownPosition } from '../../components/common/Dropdown'
import { chains } from '../../connectors'
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
  ${({ theme }) => theme.mediaWidth.upToMedium`
    width: 100%;
    margin-right: 1em;
    flex-direction: column;
  `}
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
  const [currChain, setCurrChain] = useState(1)
  const auctionIdRef = useRef(null)

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
        <AuctionIdInput />
        <FieldRowLabel className="label">Whitelist Addresses *</FieldRowLabel>
        <Input />
        <Button>Whitelist</Button>
      </FormWrapper>
    </>
  )
}

export default PrivateAuctionSigner
