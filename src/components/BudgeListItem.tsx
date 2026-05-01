import { Badge, Box, Stack, Typography } from '@mui/material';
import type { DataEntry } from '@type/type';
import { MASTERS } from '@service/master';
import { ListItem } from '@styledComponents/ListItem';
import { Image } from '@styledComponents/Image';
import PCAT001 from '@assets/PCAT001.png'

export const BudgeListItem = ({ entry }: { entry: DataEntry }) => {
  return (
    <ListItem key={entry.id}>
      <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
        <Badge
          color='info'
          badgeContent="立替"
          sx={{
            ' .MuiBadge-badge': {
              fontSize: 8,
              lineHeight: '8px',
              height: 'fit-content',
              padding: '2px 4px',
              display: entry.isAdvancePayment === 'PISADV002' ? 'unset': 'none'
            }
          }}>
          {entry.category === 'PCAT001' ?
            <Image src={PCAT001} sx={{ width: 36, height: 36, backgroundColor: '#F5F5F5', borderRadius: 1, my: 'auto !important' }} />
            :
            <Box sx={{ width: 36, height: 36, backgroundColor: '#F5F5F5', borderRadius: 1, my: 'auto !important' }} />
          }
        </Badge>
        <Stack direction="column" spacing={0.1} sx={{ width: '100%' }}>
          <Stack direction="row" sx={{ width: '100%' }}>
            <Typography sx={{ fontSize: 12, ml: 0, mr: 'auto' }}>
              {MASTERS.getPaymentCategoryName(entry.category)}
            </Typography>
            <Typography sx={{ fontSize: 12, ml: 'auto', mr: 0 }}>
              {Number(entry.amount).toLocaleString()}円
            </Typography>
          </Stack>
          <Stack direction="row" sx={{ width: '100%' }}>
            <Typography sx={{ fontSize: 10, ml: 0, mr: 'auto' }}>
              {MASTERS.getUserName(entry.paymentPerson)} | {entry.shop}
            </Typography>
            <Typography sx={{ fontSize: 10, ml: 'auto', mr: 0 }}>
              {MASTERS.getPaymentMethodName(entry.paymentMethod)}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </ListItem>
  )
}