import { MASTERS } from "@src/service/master"
import { StyledMenuItem } from "./StyledMenuItem"
import { StyledStack } from "./StyledStack"
import { StyledSelect } from "./StyledSelect"
import { StyledTypography } from "./StyledTypography"
type FormCategoryProps = {
  category: string
  setCategory: (d: string) => void
}

export const FormCategory = (props: FormCategoryProps) => {
  const { category, setCategory } = props

  return (
    <StyledStack>
      <StyledTypography>カテゴリ : </StyledTypography>
      <StyledSelect
        value={category}
        onChange={(e) => setCategory(e.target.value as string)}>
        {MASTERS.PAYMENT_CATEGORIES.map(category => (
          <StyledMenuItem key={category.id} value={category.id}>{category.name}</StyledMenuItem>
        ))}
      </StyledSelect>
    </StyledStack>
  )
}