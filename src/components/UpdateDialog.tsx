import { useEffect, useState, useCallback } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Stack, Box } from '@mui/material';
import { Button } from '@styledComponents/Button';
import type { DataEntry } from '@type/type';
import { PostUpdateData } from '@src/service/DataService';
import dayjs, { Dayjs } from 'dayjs';
import { DatePickerGroup } from './DatePickerGroup';
import { useData } from '@src/cnxt/DataContext';
import { TimeoutDialog } from './TimeoutDialog';
import { DataFormFields } from './DataFormFields';

interface UpdateDialogProps {
  open: boolean;
  onCancel: () => void;
  onOk: () => void;
  willEditData: DataEntry;
  setDate: (date: Dayjs) => void;
}

export const UpdateDialog = ({ open, onCancel, willEditData, setDate }: UpdateDialogProps) => {
  const { selectedDate, setSelectedDate } = useData();

  // 1. 状態管理をオブジェクトに集約
  const [formState, setFormState] = useState({
    amount: willEditData.amount,
    paymentPerson: willEditData.paymentPerson,
    category: willEditData.category,
    paymentMethod: willEditData.paymentMethod,
    isAdvance: willEditData.isAdvancePayment,
    purchaseStore: willEditData.shop,
    memo: willEditData.memo,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('データを編集してください。');
  const [openTimeoutDialog, setOpenTimeoutDialog] = useState(false);

  // 2. ダイアログが開いた時に最新の Props を反映させる
  useEffect(() => {
    if (open) {
      setFormState({
        amount: willEditData.amount,
        paymentPerson: willEditData.paymentPerson,
        category: willEditData.category,
        paymentMethod: willEditData.paymentMethod,
        isAdvance: willEditData.isAdvancePayment,
        purchaseStore: willEditData.shop,
        memo: willEditData.memo,
      });
      setMessage('データを編集してください。');
    }
  }, [open, willEditData]);

  // 3. フィールド更新用ハンドラー
  const updateField = useCallback((field: keyof typeof formState) => (value: any) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      const payload: DataEntry = {
        ...willEditData, // 元のIDなどを維持
        date: selectedDate?.format('YYYY-MM-DD') ?? '2000-01-01',
        amount: formState.amount,
        paymentPerson: formState.paymentPerson,
        category: formState.category,
        paymentMethod: formState.paymentMethod,
        isAdvancePayment: formState.isAdvance,
        shop: formState.purchaseStore,
        memo: formState.memo,
      };

      const response = await PostUpdateData(JSON.stringify(payload));

      if (response?.status === 'error') {
        if (response.httpCode === 419) setOpenTimeoutDialog(true);
        setMessage('❌ データの保存に失敗しました。');
      } else if (response?.status === 'success') {
        setMessage('✨ データを保存しました。');
      }
    } catch (error) {
      setMessage('❌ データの保存に失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setMessage('');
    setDate(dayjs(selectedDate));
    onCancel();
  };

  return (
    <Dialog
      open={open}
      sx={{
        '& .MuiDialog-container': { width: '100vw' },
        '& .MuiDialog-paper': { mx: 'auto' }
      }}
    >
      <DialogTitle>✏️ 選択データの編集</DialogTitle>

      <DialogContent sx={{ pb: 1 }}>
        <Stack spacing={1} sx={{ width: 'fit-content', mx: 'auto' }}>
          <Box sx={{ py: 0.5 }}>
            <DatePickerGroup setSelectedDate={setSelectedDate} initialDate={selectedDate} />
          </Box>
          <DataFormFields formState={formState} updateField={updateField} />
        </Stack>
      </DialogContent>

      <Typography
        variant="body2"
        sx={{ bgcolor: 'action.hover', width: '85%', mx: 'auto', p: 1, borderRadius: 1 }}
      >
        {message}
      </Typography>

      <DialogActions sx={{ px: 3, pb: 2, pt: 1 }}>
        <Button onClick={handleSave} loading={loading} variant="contained">
          保存
        </Button>
        <Button onClick={handleClose} sx={{ bgcolor: 'action.disabledBackground' }}>
          閉じる
        </Button>
      </DialogActions>

      <TimeoutDialog open={openTimeoutDialog} onClose={() => setOpenTimeoutDialog(false)} />
    </Dialog>
  );
};