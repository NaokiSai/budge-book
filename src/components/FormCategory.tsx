import { Select, Stack, Typography } from "@mui/material"
import { MASTERS } from "@src/service/master"
import { MenuItem } from "@src/styledComponents/MenuItem"

type FormCategoryProps = {
  category: string
  setCategory: (d: string) => void
}

export const FormCategory = (props: FormCategoryProps) => {
  const { category, setCategory } = props

  return (
    <Stack sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <Typography sx={{ fontSize: 14, minWidth: 80 }}>カテゴリ : </Typography>
      <Select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        size="small"
        sx={{ width: 200, ml: 'auto' }} >
        {MASTERS.PAYMENT_CATEGORIES.map(category => (
          <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
        ))}
      </Select>
    </Stack>
  )
}