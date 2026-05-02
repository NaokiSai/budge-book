import { Select, Stack, Typography } from "@mui/material"
import { MASTERS } from "@src/service/master"
import { MenuItem } from "@src/styledComponents/MenuItem"

type FormIsAdvanceProps = {
  isAdvance: string
  setIsAdvance: (d: string) => void
}

export const FormIsAdvance = (props: FormIsAdvanceProps) => {
  const { isAdvance, setIsAdvance } = props

  return (
    <Stack sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <Typography sx={{ fontSize: 14, minWidth: 80 }}>立替有無 : </Typography>
      <Select
        value={isAdvance}
        onChange={(e) => setIsAdvance(e.target.value)}
        size="small"
        sx={{ width: 200, ml: 'auto' }} >
        {MASTERS.PAYMENT_IS_ADVANCE.map(isAdvance => (
          <MenuItem key={isAdvance.id} value={isAdvance.id}>{isAdvance.name}</MenuItem>
        ))}
      </Select>
    </Stack>
  )
}