import { Box, Stack, Typography } from '@mui/material';
// import type { DataEntry } from '../type';
import type { ChartDataCategoryTotals } from '../type';
import { MASTERS } from '../master';
import { ListItem } from '../styledComponents/ListItem';

export const BudgeCategoryListItem = ({ data }: { data: ChartDataCategoryTotals }) => {
  return (
    <ListItem key={data.id}>
      <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
        <Box sx={{ width: 36, height: 36, backgroundColor: '#F5F5F5', borderRadius: 1, my: 'auto !important' }} />
        <Stack direction="column" spacing={0.1} sx={{ width: '100%' }}>
          <Stack direction="row" sx={{ width: '100%' }}>
            <Typography sx={{ fontSize: 16, ml: 0, mr: 'auto' }}>
              {MASTERS.getPaymentCategoryName(data.label)}
            </Typography>
            <Typography sx={{ fontSize: 16, ml: 'auto', mr: 0 }}>
              {Number(data.value).toLocaleString()}円
            </Typography>
            <Typography sx={{ fontSize: 16, ml: 1, mr: 0, width: 60, textAlign: 'right' }}>
              {data.rate?.toFixed(1)}%
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </ListItem>
  )
}