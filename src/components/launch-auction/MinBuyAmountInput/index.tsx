import { FORM_PARAMETERS, FormKeys } from '../../../pages/LaunchAuction/formConfig'
import FormInput from '../../form/Input'
import { positiveNumberRegex } from '../../form/NumericalInput'
import Input from '../../form/TextInput'

const formKey: FormKeys = 'minBuyAmount'

export const MinBuyAmountInput = () => {
  const { label, tooltipText } = FORM_PARAMETERS[formKey]

  return (
    <FormInput label={label} tooltip={tooltipText}>
      <Input
        name={formKey}
        rules={{
          required: true,
          pattern: positiveNumberRegex,
          validate: {
            min: (value) => value > 0 || 'Amount to buy should be positive',
          },
        }}
      />
    </FormInput>
  )
}
