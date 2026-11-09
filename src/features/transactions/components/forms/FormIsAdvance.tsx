import { MASTERS } from "@src/service/master"
import { StyledSelect } from "./StyledSelect"
import { StyledStack } from "./StyledStack"
import { StyledTypography } from "./StyledTypography"
import { StyledMenuItem } from "./StyledMenuItem"

type FormIsAdvanceProps = {
  isAdvance: string
  setIsAdvance: (d: string) => void
}

export const FormIsAdvance = (props: FormIsAdvanceProps) => {
  const { isAdvance, setIsAdvance } = props

  return (
    <StyledStack>
      <StyledTypography>立替有無 : </StyledTypography>
      <StyledSelect
        value={isAdvance}
        onChange={(e) => setIsAdvance(e.target.value as string)}>
        {MASTERS.PAYMENT_IS_ADVANCE.map(isAdvance => (
          <StyledMenuItem key={isAdvance.id} value={isAdvance.id}>{isAdvance.name}</StyledMenuItem>
        ))}
      </StyledSelect>
    </StyledStack>
  )
}