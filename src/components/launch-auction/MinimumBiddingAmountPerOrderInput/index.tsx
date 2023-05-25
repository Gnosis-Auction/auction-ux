import { FORM_PARAMETERS, FormKeys } from '../../../pages/LaunchAuction/formConfig'
import FormInput from '../../form/Input'
import { positiveNumberRegex } from '../../form/NumericalInput'
import Input from '../../form/TextInput'

const formKey: FormKeys = 'minimumBiddingAmountPerOrder'

export const MinimumBiddingAmountPerOrderInput = () => {
  const { label, tooltipText } = FORM_PARAMETERS[formKey]

  return (
    <FormInput label={label} tooltip={tooltipText}>
      <Input
        name={formKey}
        rules={{
          required: 'Please enter the minimum bidding amount per order.',
          pattern: positiveNumberRegex,
          validate: {
            min: (value) => value > 0 || 'Minimal bid amount must be greather than 0',
          },
        }}
      />
    </FormInput>
  )
}
