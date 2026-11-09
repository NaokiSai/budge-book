import { Box, Drawer, Stack, Typography } from "@mui/material"
import { Button } from '@styledComponents/Button';
import { BudgeList, type BudgeListProps } from "@features/transactions/components/BudgeList";
import type { CategoryGroup } from "../hooks/useTransactionAnalytics";
import { TotalAmount } from "@styledComponents/TotalAmount";

type BudgeCategoryGroupListProps = Omit<BudgeListProps, 'entries'> & {
  categoryGroups: CategoryGroup
  onClose: () => void
  isOpen: boolean
}

export const BudgeCategoryGroupList = (props: BudgeCategoryGroupListProps) => {

  const { setOpenTimeoutDialog, categoryGroups } = props
  return (
    <Drawer
      variant='persistent'
      anchor="right"
      open={props.isOpen}
      slotProps={{
        paper: {
          sx: {
            position: 'absolute', // 親のBoxに対して絶対配置
            height: '100%',        // 親の高さに合わせる
            width: '100vw',
            zIndex: 0
          }
        }
      }
      }
    >
      <Box
        sx={{ width: '100%', pt: 2 }}
        role="presentation"
      >
        <Stack direction='row' sx={{ mb: 2, mx: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ ml: 0 }}>
            {categoryGroups.chartData.label} の内訳
          </Typography>
          <Button onClick={() => props.onClose()} sx={{ bgcolor: 'action.disabledBackground', mr: 0, ml: 'auto' }}>
            閉じる
          </Button>
        </Stack>
        <TotalAmount loading={props.isLoading} amount={categoryGroups.chartData.value} />
        <Box>
          <BudgeList
            entries={categoryGroups?.entries || []} // フィルタリングされた当日のデータ
            isLoading={props.isLoading}
            selectedDate={props.selectedDate}
            setSelectedDate={props.setSelectedDate}
            setOpenTimeoutDialog={setOpenTimeoutDialog}
            onUpdate={props.onUpdate}
            onDelete={props.onDelete}
          />
        </Box>
      </Box>
    </Drawer>
  )
}