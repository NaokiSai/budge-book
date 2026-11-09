import { StyledTypography } from "./StyledTypography"
import { StyledStack } from "./StyledStack"
import { StyledTextField } from "./StyledTextField"

type FormAmountProps = {
  amount: string | number
  setAmount: (d: string | number) => void
}

export const FormAmount = (props: FormAmountProps) => {
  const { amount, setAmount } = props

  return (
    <StyledStack>
      <StyledTypography>金額 : </StyledTypography>
      <StyledTextField
        value={amount}
        onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ''))}
        slotProps={{
          htmlInput: {
            inputMode: 'numeric',
            pattern: '[0-9]*',
          },
        }}
        placeholder='数字のみ入力可能' />
    </StyledStack>
  )
}