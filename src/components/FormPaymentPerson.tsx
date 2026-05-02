import { Select, Stack, Typography } from "@mui/material"
import { MASTERS } from "@src/service/master"
import { MenuItem } from "@src/styledComponents/MenuItem"

type FormPaymentPersonProps = {
  paymentPerson: string
  setPaymentPerson: (d: string) => void
}

export const FormPaymentPerson = (props: FormPaymentPersonProps) => {
  const { paymentPerson, setPaymentPerson } = props

  return (
    <Stack sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <Typography sx={{ fontSize: 14, minWidth: 80 }}>支払者 : </Typography>
      <Select
        value={paymentPerson}
        onChange={(e) => setPaymentPerson(e.target.value)}
        size="small"
        sx={{ width: 200, ml: 'auto' }} >
        {MASTERS.USER.map(user => (
          <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
        ))}
      </Select>
    </Stack>
  )
}