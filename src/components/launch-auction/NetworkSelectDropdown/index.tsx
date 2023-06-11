import styled from 'styled-components'

import { Controller } from 'react-hook-form'

import { chains } from '../../../connectors'
import { useAuctionForm } from '../../../hooks/useAuctionForm'
import { LaunchAuctionFormValues } from '../../../pages/LaunchAuction/formConfig'
import { NETWORK_CONFIGS } from '../../../utils/networkConfig'
import { ButtonSelect } from '../../buttons/ButtonSelect'
import { Dropdown, DropdownItem, DropdownPosition } from '../../common/Dropdown'
import { IconSelect } from '../IconSelect'

const DropdownPagination = styled(Dropdown)`
  width: 30%;
  flex-direction: row;
  align-items: flex-end;
  align-self: flex-end;
  justify-content: flex-end;
  margin: 2em !important;
  margin-right: 3.5em !important;
  cursor: pointer;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 14em;
    margin-right: 0 !important;
  `}
`

const ButtonText = styled.span`
  ${({ theme }) => theme.mediaWidth.upToSmall`
    font-size: 14px;
  `}
`

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
`

const Icon = styled.div`
  margin: 0px 25px 0px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin: 0px 10px 0px 0px;
  `}
`

const IconItem = styled.div`
  margin: 0px 10px 0px 0px;
`

export const NetworkSelectDropdown = () => {
  const { control } = useAuctionForm()

  return (
    <Controller<LaunchAuctionFormValues>
      control={control}
      name="chainId"
      render={({ field: { onChange, value } }) => {
        return (
          <DropdownPagination
            dropdownButtonContent={
              <ButtonSelect
                content={
                  <ButtonContent>
                    <Icon>
                      <IconSelect name={NETWORK_CONFIGS[value as number].name} />
                    </Icon>
                    <ButtonText>{NETWORK_CONFIGS[value as number].name}</ButtonText>
                  </ButtonContent>
                }
              />
            }
            dropdownPosition={DropdownPosition.right}
            items={chains.map((item, index) => (
              <DropdownItem
                key={index}
                onClick={() => {
                  onChange(item.id)
                }}
              >
                <IconItem>
                  <IconSelect name={item.name} />
                </IconItem>
                {item.name}
              </DropdownItem>
            ))}
          />
        )
      }}
    />
  )
}
