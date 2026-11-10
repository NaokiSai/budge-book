// 立替金額表示
import { useData } from '@cnxt/DataContext';
import { useTransactionAnalytics } from '@features/reimburse/hooks/useTransactionAnalytics';
import { Box, Divider, Skeleton, Stack, Typography } from '@mui/material';
import { DatePickerGroup } from '@features/transactions/components/DatePickerGroup';
import { BudgeList } from '@src/features/transactions/components/BudgeList';
import { MASTERS } from '@src/service/master';
import { TotalAmount } from '@src/styledComponents/TotalAmount';
import noDataUrl from '@assets/NoData.webp'
import { Image } from "@styledComponents/Image"

export default function Reimburse() {
  // コンテキストからデータや状態をもらう（ここでキャッシュされたデータを使う）
  const {
    dataCtx,
    loadingCtx,
    selectedDateCtx,
    setSelectedDateCtx,
    handleUpdateData,
    handleDeleteData,
    setSelectedMonthCtx
  } = useData();


  // コンテキストにある生データをフックに渡して、グラフ用の集計済みデータをもらう
  const { payerReimburseTotalsGroup } = useTransactionAnalytics(dataCtx);

  return (
    <Box sx={{
      position: 'relative',
      overflow: 'hidden',
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Stack
        direction='column'
        sx={{ mt: 2, mx: 'auto', width: 'fit-content', alignItems: 'center' }}>
        <Stack sx={{ mx: 'auto' }}>
          <DatePickerGroup
            range='month'
            setSelectedDate={setSelectedMonthCtx}
            initialDate={selectedDateCtx} />
        </Stack>
      </Stack>
      <Box sx={{ flexGrow: 1, overflow: 'auto', width: '100%' }}>
        {payerReimburseTotalsGroup.map((payerReimburseTotal, index) =>
          <Box key={index}  >
            {loadingCtx ?
              <Skeleton variant="text" sx={{ m: 2, mb: 0, fontSize: '2rem', width: 200 }} />
              :
              <Typography variant="h6" gutterBottom sx={{ m: 2, mb: 0 }}>
                {MASTERS.getUserName(payerReimburseTotal.paymentData.paymentPerson)}立替の内訳
              </Typography>
            }
            <Divider variant='middle' />
            <TotalAmount amount={payerReimburseTotal.paymentData.total} loading={loadingCtx} />
            <BudgeList
              entries={payerReimburseTotal.entries}
              isLoading={loadingCtx}
              selectedDate={selectedDateCtx}
              setSelectedDate={setSelectedDateCtx}
              onUpdate={handleUpdateData}
              onDelete={handleDeleteData}
            />
          </Box>)
        }
        {payerReimburseTotalsGroup.length === 0 &&
          <Box sx={{ width: 'fit-content', height: '100%', m: 'auto', display: 'flex' }}>
            <Image src={noDataUrl} alt="No data" />
          </Box>
        }
      </Box>
    </Box>
  );
}