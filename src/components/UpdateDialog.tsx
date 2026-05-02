import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Stack, Box } from '@mui/material';
import { Button } from '@styledComponents/Button';
import type { DataEntry } from '@type/type';
import { useState } from 'react';
import { PostUpdateData } from '@src/service/DataService';
import dayjs, { Dayjs } from 'dayjs';
import { DatePickerGroup } from './DatePickerGroup';
import { FormAmount } from './FormAmount';
import { FormPaymentPerson } from './FormPaymentPerson';
import { FormCategory } from './FormCategory';
import { FormPaymentMethod } from './FormPaymentMethod';
import { FormIsAdvance } from './FormIsAdvance';
import { FormPurchaseStore } from './FormPurchaseStore';
import { FormMemo } from './FormMemo';

interface UpdateDialogProps {
  open: boolean;
  onCancel: () => void;
  onOk: () => void
  willEditData: DataEntry
  setDate: (date: Dayjs) => void
}

/**
 * EditDialog
 * @param props 
 * @returns 
 */
export const UpdateDialog = (props: UpdateDialogProps) => {
  const { open = false, onCancel, willEditData, setDate } = props
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('データを編集してください。')

  const [selectedDate, setSelectedDate] = useState(willEditData.date);
  const [amount, setAmount] = useState(willEditData.amount);
  const [paymentPerson, setPaymentPerson] = useState(willEditData.paymentPerson);
  const [category, setCategory] = useState(willEditData.category);
  const [paymentMethod, setPaymentMethod] = useState(willEditData.paymentMethod);
  const [isAdvance, setIsAdvance] = useState(willEditData.isAdvancePayment);
  const [memo, setMemo] = useState(willEditData.memo);
  const [purchaseStore, setPurchaseStore] = useState(willEditData.shop);

  const handleSave = async () => {
    setLoading(true)

    try {
      const dataTemp = {
        date: selectedDate,
        id: willEditData.id,
        amount,
        paymentPerson,
        category,
        paymentMethod,
        isAdvancePayment: isAdvance,
        memo,
        shop: purchaseStore
      }

      const response = await PostUpdateData(JSON.stringify(dataTemp)); // これも必要に応じて呼び出してください
      if (response?.status === 'error') {
        // setOpenTimeoutDialog(true)
        setMessage('❌データの保存に失敗しました。');
      }
      if (response?.status == 'success') {
        setMessage('✨データを保存しました。')
      }
    } catch (error) {
      setMessage('❌データの保存に失敗しました。');
      // 必要ならここでユーザーにトースト通知などを出す
    } finally {
      // 3. 成功・失敗に関わらず、最後に必ずローディングをOFF
      setLoading(false);
    }
  };

  const handleClose = () => {
    setMessage('')

    const dateObj = dayjs(selectedDate); // これでDay.js型
    setDate(dateObj)

    onCancel()
  }

  return (
    <Dialog open={open} sx={{ width: 'fit-content', ' .MuiDialog-container': { width: '100vw' }, ' .MuiDialog-paper': { mx: 'auto' } }}>
      <DialogTitle>✏️ 選択データの編集</DialogTitle>
      <DialogContent>
        <Stack direction="column" spacing={1} sx={{ width: 'fit-content', pt: 2 }}>
          <Box sx={{ margin: '4px auto !important', }}>
            <DatePickerGroup setSelectedDate={setSelectedDate} initialDateStr={willEditData.date} />
          </Box>
          <Stack spacing={1} sx={{ backgroundColor: '#fff', border: 1, borderColor: 'divider', borderRadius: 2, boxShadow: 1, p: 2 }}>
            <FormAmount amount={amount} setAmount={setAmount} />
            <FormPaymentPerson paymentPerson={paymentPerson} setPaymentPerson={setPaymentPerson} />
            <FormCategory category={category} setCategory={setCategory} />
            <FormPaymentMethod paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
            <FormIsAdvance isAdvance={isAdvance} setIsAdvance={setIsAdvance} />
            <FormPurchaseStore purchaseStore={purchaseStore} setPurchaseStore={setPurchaseStore} />
            <FormMemo memo={memo} setMemo={setMemo} />
          </Stack>
        </Stack>
      </DialogContent>
      <Typography sx={{ backgroundColor: 'rgba(0,0,0,0.1)', width: '80%', mx: 'auto', p: 1 }}>{message}</Typography>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleSave} loading={loading}>
          保存
        </Button>
        <Button onClick={handleClose} sx={{ backgroundColor: 'rgba(0, 0, 0, 0.15)' }}>
          閉じる
        </Button>
      </DialogActions>
    </Dialog>
  );
};