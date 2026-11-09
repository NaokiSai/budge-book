import { StyledStack } from "./StyledStack"
import { StyledTextField } from "./StyledTextField"
import { StyledTypography } from "./StyledTypography"

type FormMemoProps = {
  memo: string
  setMemo: (d: string) => void
}

export const FormMemo = (props: FormMemoProps) => {
  const { memo, setMemo } = props

  return (
    <StyledStack>
      <StyledTypography>メモ : </StyledTypography>
      <StyledTextField
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
        placeholder='自由入力'
      />
    </StyledStack>
  )
}