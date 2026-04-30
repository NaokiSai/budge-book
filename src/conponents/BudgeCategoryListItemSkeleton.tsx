import { Box, Skeleton, Stack } from '@mui/material';
import { ListItem } from '../styledComponents/ListItem';

export const BudgeCategoryListItemSkeleton = ({ index }: { index: number }) => {
  return (
    <ListItem key={index}>
      <Stack direction="row" spacing={2} sx={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Skeleton variant="rectangular" width={36} height={36} sx={{ my: 'auto !important' }} />
        <Stack direction="row" spacing={0.1} sx={{ justifyContent: 'flex-end', width: 'calc(100% - 36px)' }}>
          <Skeleton variant="text" sx={{ width: '50%', fontSize: 16, ml: 0, mr: 'auto' }} />
          <Box sx={{ display: 'flex', width: '100%', ml: 'auto', mr: 0 }}>
            <Skeleton variant="text" sx={{ width: '30%', fontSize: 16, ml: 'auto', mr: 0 }} />
            <Skeleton variant="text" sx={{ width: '10%', fontSize: 16, ml: 1, mr: 0 }} />
          </Box>
        </Stack>
      </Stack>
    </ListItem>
  )
}