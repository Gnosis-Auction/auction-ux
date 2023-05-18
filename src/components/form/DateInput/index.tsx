import React from 'react'
import styled from 'styled-components'

import { UseFormRegister } from 'react-hook-form'

import { LaunchAuctionFormValues } from '../../../pages/LaunchAuction/types'
import FormInput from '../Input'

const Input = styled.input`
  width: 32em;
  height: 2.4em;
  font-size: 16px;
  padding: 0 0.5em;
  border-radius: 0.42rem;
  border: 1px solid ${({ theme }) => theme.text1};
  cursor: pointer;
`

// const Image = styled.img`
//   display: block;
//   max-width: 100%;
//   max-height: 100%;
// `

interface Props {
  label: string
  tooltip: string
  value?: string
  placeholder?: string
}

const DateInput = React.forwardRef<
  HTMLInputElement,
  Props & ReturnType<UseFormRegister<LaunchAuctionFormValues>>
>(({ label, name, onBlur, onChange, placeholder, tooltip, value }, ref) => {
  const onClick = () => {
    console.log('Hello world')
  }
  return (
    <FormInput label={label} tooltip={tooltip}>
      <Input
        autoComplete="off"
        autoCorrect="off"
        inputMode="decimal"
        maxLength={79}
        minLength={1}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        onClick={onClick}
        placeholder={placeholder || ''}
        readOnly={true}
        ref={ref}
        spellCheck="false"
        type="date"
        value={value}
      />
    </FormInput>
  )
})

DateInput.displayName = 'DateInput'

export default DateInput
