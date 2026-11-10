import { useEffect, useState, useCallback } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Stack, Box } from '@mui/material';
import { Button } from '@styledComponents/Button';
import type { DataEntry } from '@type/type';
import { DatePickerGroup } from './DatePickerGroup';
import { DataFormFields } from './DataFormFields';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

interface UpdateDialogProps {
  open: boolean;
  onCancel: () => void;
  onOk: (payload: DataEntry) => Promise<boolean>; // レスポンスやエラーを受け取れるよう調整
  willEditData: DataEntry;
}

export const UpdateDialog = ({
  open,
  onOk,
  onCancel,
  willEditData,
}: UpdateDialogProps) => {
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
  const [selectedTempDate, setSelectedTempDate] = useState<Dayjs | undefined>(dayjs(willEditData.date));
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('データを編集してください。');

  // 2. ダイアログが開いた時に最新の Props（日付含む）を確実に反映させる
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
      setSelectedTempDate(dayjs(willEditData.date));
      setMessage('データを編集してください。');
    }
  }, [open, willEditData]);

  // 3. フィールド更新用ハンドラー
  const updateField = useCallback((field: keyof typeof formState) => (value: any) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  }, []);

  // 4. 保存処理（堅牢なエラーハンドリングとクローズ・日付同期を追加）
  const handleSave = async () => {
    setLoading(true);

    const payload: DataEntry = {
      ...willEditData, // 元のIDなどを維持
      date: selectedTempDate?.format('YYYY-MM-DD') ?? '2000-01-01',
      amount: formState.amount,
      paymentPerson: formState.paymentPerson,
      category: formState.category,
      paymentMethod: formState.paymentMethod,
      isAdvancePayment: formState.isAdvance,
      shop: formState.purchaseStore,
      memo: formState.memo,
    };

    const result = await onOk(payload); // 親に保存を通知
    if (!result) {
      setMessage('保存に失敗しました。もう一度お試しください。');
    }
    setLoading(false);
  };

  const handleClose = () => {
    setMessage('');
    onCancel();
  };

  return (
    <Dialog
      open={open}
      sx={{
        '& .MuiDialog-container': { width: '100vw' },
        '& .MuiDialog-paper': { mx: 'auto' },
      }}
    >
      <DialogTitle>✏️ 選択データの編集</DialogTitle>

      <DialogContent sx={{ pb: 1 }}>
        <Stack spacing={1} sx={{ width: 'fit-content', mx: 'auto' }}>
          <Box sx={{ py: 0.5 }}>
            <DatePickerGroup setSelectedDate={setSelectedTempDate} initialDate={selectedTempDate} />
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
    </Dialog>
  );
};