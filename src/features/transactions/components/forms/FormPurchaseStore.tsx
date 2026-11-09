import { StyledStack } from "./StyledStack"
import { StyledTextField } from "./StyledTextField"
import { StyledTypography } from "./StyledTypography"

type FormPurchaseStoreProps = {
  purchaseStore: string
  setPurchaseStore: (d: string) => void
}

export const FormPurchaseStore = (props: FormPurchaseStoreProps) => {
  const { purchaseStore, setPurchaseStore } = props

  return (
    <StyledStack >
      <StyledTypography>購入店 : </StyledTypography>
      <StyledTextField
        value={purchaseStore}
        onChange={(e) => setPurchaseStore(e.target.value)}
        placeholder='購入場所'
      />
    </StyledStack>
  )
}