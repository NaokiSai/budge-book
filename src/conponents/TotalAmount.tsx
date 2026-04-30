import { Box, Skeleton, Typography } from "@mui/material";
import React from "react";

type TotalAmountProps = {
  loading: boolean
  amount: number
}
export const TotalAmount = (props: TotalAmountProps) => {
  const { loading = false, amount = 0 } = props

  return (
    <React.Fragment>
      {!loading ? (
        <Box sx={{ mt: 0.5, p: 0.5, backgroundColor: '#F5F5F5' }}>
          <Typography sx={{ fontSize: 16, fontWeight: 600 }} align="center">
            合計金額 : {Number(amount).toLocaleString()}円
          </Typography>
        </Box>
      ) : (
        <Box sx={{ mt: 0.5, p: 0.5, backgroundColor: '#F5F5F5' }}>
          <Skeleton variant="text" sx={{ p: 0.5, mx: 'auto', width: 300, lineHeight: '1.6', fontSize: '1.25rem' }} />
        </Box>

      )}
    </React.Fragment>
  )
}