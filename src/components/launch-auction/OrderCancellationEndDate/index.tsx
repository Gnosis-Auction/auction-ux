import dayjs from 'dayjs'

import { useAuctionForm } from '../../../hooks/useAuctionForm'
import { FORM_PARAMETERS, FormKeys } from '../../../pages/LaunchAuction/formConfig'
import DateInput from '../../form/DateInput'
import FormInput from '../../form/Input'

const formKey: FormKeys = 'orderCancellationEndDate'

export const OrderCancellationEndDate = () => {
  const { label, tooltipText } = FORM_PARAMETERS[formKey]
  const { getValues } = useAuctionForm()

  return (
    <FormInput label={label} tooltip={tooltipText}>
      <DateInput
        name={formKey}
        rules={{
          required: true,
          validate: {
            future: (value) => {
              const now = dayjs().second(0).millisecond(0)
              if (dayjs(value).isBefore(now)) {
                return 'Order cancellation End Date should be in the future'
              }
              return true
            },
            beforeAuctionEndDate: (value) => {
              const { auctionEndDate } = getValues()
              if (dayjs(value).isAfter(dayjs(auctionEndDate))) {
                return 'Order cancellation End Date should be before auction End Date'
              }
              return true
            },
          },
        }}
        triggerOnChange="auctionEndDate"
      />
    </FormInput>
  )
}
