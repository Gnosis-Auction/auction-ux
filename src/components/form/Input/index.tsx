import { rgba } from 'polished'
import React from 'react'
import styled from 'styled-components'

import { Tooltip } from '../../common/Tooltip'
import { Label } from '../FormLabel'

const FieldRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  gap: 2em !important;
  width: 100% !important;
  margin-bottom: 2em !important;
`

const FieldRowLabel = styled.div`
  color: ${({ theme }) => rgba(theme.text1, 0.8)};
  font-size: 12px;
  font-weight: 600;
  line-height: 1.2;
  margin-right: auto;
  text-align: left;
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: 250px;
`

const LabelText = styled(Label)`
  margin-right: 8px;
`

interface Props {
  label: string
  tooltip: string
  value?: string
  readOnly?: boolean
  placeholder?: string
  children: React.ReactNode
}

const FormInput: React.FC<Props> = ({ children, label, tooltip }) => {
  return (
    <FieldRow>
      <FieldRowLabel>
        <LabelText>{label}</LabelText>
        <Tooltip text={tooltip} />
      </FieldRowLabel>
      {children}
    </FieldRow>
  )
}

export default FormInput
