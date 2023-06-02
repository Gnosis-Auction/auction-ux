import { useAuctionForm } from '../../../hooks/useAuctionForm'
import {
  FORM_PARAMETERS,
  FormKeys,
  LaunchAuctionFormValues,
} from '../../../pages/LaunchAuction/formConfig'
import FormInput from '../../form/Input'
import { positiveNumberRegex } from '../../form/NumericalInput'
import Input from '../../form/TextInput'

const formKey: FormKeys = 'minimumFundingThreshold'

export const MinimumFundingThresholdInput = () => {
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
          required: 'Please enter the minimum funding threshold.',
          pattern: positiveNumberRegex,
        }}
      />
    </FormInput>
  )
}
