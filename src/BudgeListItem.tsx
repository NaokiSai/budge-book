import { Box, ListItem, Stack, Typography } from '@mui/material';
import type { DataEntry } from './type';
import { MASTERS } from './master';

export const BudgeListItem = ({ entry }: { entry: DataEntry }) => {
  return (
    <ListItem key={entry.id} sx={{ borderBottom: '1px solid #eee' }}>
      <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
        <Box sx={{ width: 36, height: 36, backgroundColor: '#F5F5F5', borderRadius: 1, my: 'auto !important' }} />
        <Stack direction="column" spacing={0.1} sx={{ width: '100%' }}>
          <Stack direction="row" sx={{ width: '100%' }}>
            <Typography sx={{ fontSize: 16, ml: 0, mr: 'auto' }}>
              {MASTERS.getPaymentCategoryName(entry.category)}
            </Typography>
            <Typography sx={{ fontSize: 16, ml: 'auto', mr: 0 }}>
              {Number(entry.amount).toLocaleString()}円
            </Typography>
          </Stack>
          <Stack direction="row" sx={{ width: '100%' }}>
            <Typography sx={{ fontSize: 14, ml: 0, mr: 'auto' }}>
              {MASTERS.getUserName(entry.paymentPerson)} | {entry.shop}
            </Typography>
            <Typography sx={{ fontSize: 14, ml: 'auto', mr: 0 }}>
              {MASTERS.getPaymentMethodName(entry.paymentMethod)}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </ListItem>
  )
}