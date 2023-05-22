import { useProvider } from 'wagmi'

import { useAuctionForm } from '../../../hooks/useAuctionForm'
import { FORM_PARAMETERS, FormKeys } from '../../../pages/LaunchAuction/formConfig'
import { checkIsContract } from '../../../utils'
import FormInput from '../../form/Input'
import { addressRegex } from '../../form/NumericalInput'
import SwitchInput from '../../form/SwitchInput'
import Input from '../../form/TextInput'

const formKey: FormKeys = 'allowListData'
const isAllowedKey: FormKeys = 'isWhiteListingProcessUsed'

export const AllowListDataInput = () => {
  const { label, tooltipText } = FORM_PARAMETERS[formKey]
  const { label: isAllowedLabel, tooltipText: isAllowedTooltipText } = FORM_PARAMETERS[isAllowedKey]
  const { watch } = useAuctionForm()
  const provider = useProvider()

  const isWhiteListingProcessUsed = watch(isAllowedKey)

  return (
    <>
      <FormInput label={isAllowedLabel} tooltip={isAllowedTooltipText}>
        <SwitchInput name={isAllowedKey} />
      </FormInput>
      {isWhiteListingProcessUsed && (
        <FormInput label={label} tooltip={tooltipText}>
          <Input
            name={formKey}
            rules={{
              required: true,
              pattern: addressRegex,
              validate: {
                isContract: async (value) => {
                  if (!value) return true
                  const allowListDataIsContract = await checkIsContract(provider, value)
                  return allowListDataIsContract ? 'allowListData should be an EOA' : true
                },
              },
            }}
          />
        </FormInput>
      )}
    </>
  )
}
