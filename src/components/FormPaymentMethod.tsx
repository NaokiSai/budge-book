import { Select, Stack, Typography } from "@mui/material"
import { MASTERS } from "@src/service/master"
import { MenuItem } from "@src/styledComponents/MenuItem"

type FormPaymentMethodProps = {
  paymentMethod: string
  setPaymentMethod: (d: string) => void
}

export const FormPaymentMethod = (props: FormPaymentMethodProps) => {
  const { paymentMethod, setPaymentMethod } = props

  return (
    <Stack sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <Typography sx={{ fontSize: 14, minWidth: 80 }}>支払方法 : </Typography>
      <Select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        size="small"
        sx={{ width: 200, ml: 'auto' }} >
        {MASTERS.PAYMENT_METHOD.map(method => (
          <MenuItem key={method.id} value={method.id}>{method.name}</MenuItem>
        ))}
      </Select>
    </Stack>
  )
}