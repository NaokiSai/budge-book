// 立替金額表示
import { useData } from '@cnxt/DataContext';
import { useTransactionAnalytics } from '@features/paymethod/hooks/useTransactionAnalytics';
import { Box, Divider, Skeleton, Stack, Typography } from '@mui/material';
import { DatePickerGroup } from '@features/transactions/components/DatePickerGroup';
import { BudgeList } from '@src/features/transactions/components/BudgeList';
import { MASTERS } from '@src/service/master';
import { TotalAmount } from '@src/styledComponents/TotalAmount';
import noDataUrl from '@assets/NoData.webp'
import { Image } from "@styledComponents/Image"

export default function Paymethod() {
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
  const { paymentMethodTotalsGroup } = useTransactionAnalytics(dataCtx);

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
        {paymentMethodTotalsGroup.map((paymentMethodTotal, index) =>
          <Box key={index}  >
            {loadingCtx ?
              <Skeleton variant="text" sx={{ m: 2, mb: 0, fontSize: '2rem', width: 200 }} />
              :
              <Typography gutterBottom sx={{ m: 2, mb: 0, fontSize: 18 }}>
                {MASTERS.getPaymentMethodName(paymentMethodTotal.paymentData.paymentMethod)} 支払い内訳
              </Typography>
            }
            <Divider variant='middle' />
            <TotalAmount amount={paymentMethodTotal.paymentData.total} loading={loadingCtx} />
            <BudgeList
              entries={paymentMethodTotal.entries}
              isLoading={loadingCtx}
              selectedDate={selectedDateCtx}
              setSelectedDate={setSelectedDateCtx}
              onUpdate={handleUpdateData}
              onDelete={handleDeleteData}
            />
          </Box>)
        }
        {paymentMethodTotalsGroup.length === 0 &&
          <Box sx={{ width: 'fit-content', height: '100%', m: 'auto', display: 'flex' }}>
            <Image src={noDataUrl} alt="No data" />
          </Box>
        }
      </Box>
    </Box>
  );
}