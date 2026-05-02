import { Stack, TextField, Typography } from "@mui/material"

type FormPurchaseStoreProps = {
  purchaseStore: string
  setPurchaseStore: (d: string) => void
}

export const FormPurchaseStore = (props: FormPurchaseStoreProps) => {
  const { purchaseStore, setPurchaseStore } = props

  return (
    <Stack sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <Typography sx={{ fontSize: 14, minWidth: 80 }}>購入店 : </Typography>
      <TextField
        value={purchaseStore}
        onChange={(e) => setPurchaseStore(e.target.value)}
        size="small"
        placeholder='購入場所'
        sx={{ width: 200, ml: 'auto' }}
      />
    </Stack>
  )
}