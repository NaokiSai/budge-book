import { Box, Skeleton, Stack } from '@mui/material';
import { ListItem } from '@styledComponents/ListItem';

type BudgeListItemSkeltonProps = {
  index: number
} 

export const BudgeListItemSkelton = (props: BudgeListItemSkeltonProps) => {
  return (
    <ListItem key={props.index}>
      <Stack direction="row" sx={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Skeleton variant="rectangular" width={36} height={36} sx={{ my: 'auto !important' }} />
        <Stack direction="row" sx={{ width: 'calc(100% - 36px)' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: 150, pl: 1 }}>
            <Skeleton variant="text" sx={{ width: '80%', fontSize: 16 }} />
            <Skeleton variant="text" sx={{ width: '100%', fontSize: 10 }} />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: 150, ml: 'auto', mr: 0 }}>
            <Skeleton variant="text" sx={{ width: '50%', fontSize: 16, ml: 'auto' }} />
            <Skeleton variant="text" sx={{ width: '80%', fontSize: 10, ml: 'auto' }} />
          </Box>
        </Stack>
      </Stack>
    </ListItem>
  )
}