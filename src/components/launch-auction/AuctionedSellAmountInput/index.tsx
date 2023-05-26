import { FORM_PARAMETERS, FormKeys } from '../../../pages/LaunchAuction/formConfig'
import FormInput from '../../form/Input'
import { positiveNumberRegex } from '../../form/NumericalInput'
import Input from '../../form/TextInput'

const formKey: FormKeys = 'auctionedSellAmount'

export const AuctionedSellAmountInput = () => {
  const { label, tooltipText } = FORM_PARAMETERS[formKey]

  return (
    <FormInput label={label} tooltip={tooltipText}>
      <Input
        name={formKey}
        rules={{
          required: 'Please enter the amount to sell.',
          pattern: positiveNumberRegex,
          validate: {
            min: (value) => value > 0 || 'Amount to sell must be positive',
          },
        }}
      />
    </FormInput>
  )
}
