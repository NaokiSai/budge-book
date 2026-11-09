import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import React from "react"

type TotalAmountProps = {
  loading: boolean
  amount: number
}

/**
 * TotalAmount
 * @param props 
 * @returns 
 */
export const TotalAmount = (props: TotalAmountProps) => {
  const { loading = false, amount = 0 } = props

  return (
    <React.Fragment>
      {!loading ? (
        <Box sx={{ m: 2, mb: 0, p: 1, backgroundColor: '#EEEEEE', width: 'calc( 100vw - 48px )' }}>
          <Typography sx={{ fontSize: 16, fontWeight: 600 }} align="center">
            合計金額 : {Number(amount).toLocaleString()}円
          </Typography>
        </Box>
      ) : (
        <Box sx={{ m: 1, p: 0.5, backgroundColor: '#EEEEEE', width: 'calc( 100vw - 24px )' }}>
          <Skeleton variant="text" sx={{ p: 0.5, mx: 'auto', width: 300, lineHeight: '1.6', fontSize: '1.25rem' }} />
        </Box>
      )}
    </React.Fragment>
  )
}