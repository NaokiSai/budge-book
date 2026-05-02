import { Stack, TextField, Typography } from "@mui/material"

type FormMemoProps = {
  memo: string
  setMemo: (d: string) => void
}

export const FormMemo = (props: FormMemoProps) => {
  const { memo, setMemo } = props

  return (
    <Stack sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <Typography sx={{ fontSize: 14, minWidth: 80 }}>メモ : </Typography>
      <TextField
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
        size="small"
        placeholder='自由入力'
        sx={{ width: 200, ml: 'auto' }}
      />
    </Stack>
  )
}