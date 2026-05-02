import { Stack, TextField, Typography } from "@mui/material"

type FormAmountProps = {
  amount: string | number
  setAmount: (d: string | number) => void
}
export const FormAmount = (props: FormAmountProps) => {
  const { amount, setAmount } = props

  return (
    <Stack sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <Typography sx={{ fontSize: 14, minWidth: 80 }}>金額 : </Typography>
      <TextField
        value={amount}
        onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ''))}
        size="small"
        slotProps={{
          htmlInput: {
            inputMode: 'numeric',
            pattern: '[0-9]*',
          },
        }}
        placeholder='数字のみ入力可能'
        sx={{ width: 200, ml: 'auto' }} />
    </Stack>
  )
}