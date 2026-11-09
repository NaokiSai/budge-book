import { MASTERS } from "@src/service/master"
import { StyledStack } from "./StyledStack"
import { StyledTypography } from "./StyledTypography"
import { StyledSelect } from "./StyledSelect"
import { StyledMenuItem } from "./StyledMenuItem"

type FormPaymentMethodProps = {
  paymentMethod: string
  setPaymentMethod: (d: string) => void
}

export const FormPaymentMethod = (props: FormPaymentMethodProps) => {
  const { paymentMethod, setPaymentMethod } = props

  return (
    <StyledStack>
      <StyledTypography>支払方法 : </StyledTypography>
      <StyledSelect
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value as string)}>
        {MASTERS.PAYMENT_METHOD.map(method => (
          <StyledMenuItem key={method.id} value={method.id}>
            {method.name}
          </StyledMenuItem>
        ))}
      </StyledSelect>
    </StyledStack>
  )
}