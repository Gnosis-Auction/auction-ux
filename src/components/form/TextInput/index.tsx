import styled from 'styled-components'

import { RegisterOptions } from 'react-hook-form'

import { useAuctionForm } from '../../../hooks/useAuctionForm'
import { FormKeys } from '../../../pages/LaunchAuction/formConfig'

const TextInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
`

const Input = styled.input`
  width: 32em;
  height: 2.4em;
  font-size: 16px;
  padding: 0 0.5em;
  border-radius: 0.42rem;
  border: 1px solid ${({ theme }) => theme.text1};
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 100%;
    margin-right: 1em;
    flex-direction: column;
  `}
`

const Error = styled.span`
  color: ${({ theme }) => theme.red1};
  font-size: 12px;
  font-weight: 500;
  margin-top: 0.5em;
`

interface Props {
  name: FormKeys
  value?: string
  readOnly?: boolean
  placeholder?: string
  rules?: RegisterOptions
}

export const TextInput = ({ name, placeholder, readOnly, rules = {} }: Props) => {
  const { clearErrors, getFieldState, register } = useAuctionForm()

  const { error, isTouched } = getFieldState(name)
  const { onBlur, onChange, ref } = register(name, rules)

  const onChangeHandler = (val) => {
    onChange(val)
    clearErrors(name)
  }

  return (
    <TextInputWrapper>
      <Input
        autoComplete="off"
        autoCorrect="off"
        maxLength={79}
        minLength={1}
        name={name}
        onBlur={onBlur}
        onChange={onChangeHandler}
        placeholder={placeholder || ''}
        readOnly={readOnly}
        ref={ref}
        spellCheck="false"
        type="text"
      />
      {error?.message && isTouched && <Error>{error?.message}</Error>}
    </TextInputWrapper>
  )
}

export default TextInput
