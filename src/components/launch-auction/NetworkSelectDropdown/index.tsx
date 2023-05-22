import styled from 'styled-components'

import { Controller } from 'react-hook-form'

import { chains } from '../../../connectors'
import { useAuctionForm } from '../../../hooks/useAuctionForm'
import { LaunchAuctionFormValues } from '../../../pages/LaunchAuction/formConfig'
import { NETWORK_CONFIGS } from '../../../utils/networkConfig'
import { ButtonSelect } from '../../buttons/ButtonSelect'
import { Dropdown, DropdownItem, DropdownPosition } from '../../common/Dropdown'

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
    width: 12em;
    margin-right: 0 !important;
  `}
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
              <ButtonSelect content={<span>{NETWORK_CONFIGS[(value as number) || 1].name}</span>} />
            }
            dropdownPosition={DropdownPosition.right}
            items={chains.map((item, index) => (
              <DropdownItem
                key={index}
                onClick={() => {
                  onChange(item.id)
                }}
              >
                {item.name}
              </DropdownItem>
            ))}
          />
        )
      }}
    />
  )
}
