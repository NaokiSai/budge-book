import { MASTERS } from "@src/service/master"
import { StyledStack } from "./StyledStack"
import { StyledTypography } from "./StyledTypography"
import { StyledSelect } from "./StyledSelect"
import { StyledMenuItem } from "./StyledMenuItem"

type FormPaymentPersonProps = {
  paymentPerson: string
  setPaymentPerson: (d: string) => void
}

export const FormPaymentPerson = (props: FormPaymentPersonProps) => {
  const { paymentPerson, setPaymentPerson } = props

  return (
    <StyledStack>
      <StyledTypography>支払者 : </StyledTypography>
      <StyledSelect
        value={paymentPerson}
        onChange={(e) => setPaymentPerson(e.target.value as string)}>
        {MASTERS.USER.map(user => (
          <StyledMenuItem key={user.id} value={user.id}>
            {user.name}
          </StyledMenuItem>
        ))}
      </StyledSelect>
    </StyledStack>
  )
}