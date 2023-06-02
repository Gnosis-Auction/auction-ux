import { useAuctionForm } from '../../../hooks/useAuctionForm'
import {
  FORM_PARAMETERS,
  FormKeys,
  LaunchAuctionFormValues,
} from '../../../pages/LaunchAuction/formConfig'
import FormInput from '../../form/Input'
import { positiveNumberRegex } from '../../form/NumericalInput'
import Input from '../../form/TextInput'

const formKey: FormKeys = 'minBuyAmount'

export const MinBuyAmountInput = () => {
  const { label, tooltipText } = FORM_PARAMETERS[formKey]
  const { clearErrors, getFieldState, register } = useAuctionForm()

  return (
    <FormInput label={label} tooltip={tooltipText}>
      <Input<LaunchAuctionFormValues>
        clearErrors={clearErrors}
        getFieldState={getFieldState}
        name={formKey}
        register={register}
        rules={{
          required: 'Please enter the minimum buy amount.',
          pattern: positiveNumberRegex,
          validate: {
            min: (value) => value > 0 || 'Amount to buy should be positive',
          },
        }}
      />
    </FormInput>
  )
}
