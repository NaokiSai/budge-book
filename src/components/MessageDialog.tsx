import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box } from '@mui/material';
import { Button } from '@styledComponents/Button';
import type { DataEntry } from '@type/type';
import { MASTERS } from '@src/service/master';
import { useState } from 'react';
import { CheckDedlineToken, PostRemoveData } from '@src/service/DataService';

interface MessageDialogProps {
  open: boolean;
  onCancel: () => void;
  onOk: () => void
  willDeleteData: DataEntry | null
  setOpenTimeoutDialog: (flag: boolean) => void
}

/**
 * MessageDialog
 * @param props 
 * @returns 
 */
export const MessageDialog = (props: MessageDialogProps) => {
  const { open = false, onCancel, onOk, willDeleteData, setOpenTimeoutDialog } = props
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState('');

  const handleNavigate = async () => {

    setLoading(true);

    try {
      const response = await PostRemoveData(JSON.stringify(willDeleteData));

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
    onOk();
    setLoading(false)
  };

  const handleClose = async() => {
    setMessage('');
    onCancel();
    const response = await CheckDedlineToken()
    if (response.httpCode === 419) setOpenTimeoutDialog(true);
  };

  return (
    <Dialog open={open}>
      <DialogTitle>⚠️ 選択データの削除確認</DialogTitle>
      <DialogContent>
        <Typography sx={{ fontSize: 12 }} gutterBottom>
          データを削除すると、元に戻せません。削除しますか。
        </Typography>
        <Box sx={{ p: 1, backgroundColor: 'rgba(0,0,0,0.1)', '& > p': { fontSize: 12 } }}>
          {willDeleteData?.date !== undefined && <Typography>購入日 : {willDeleteData?.date}</Typography>}
          {willDeleteData?.paymentPerson !== undefined && <Typography>購入者 : {MASTERS.getUserName(willDeleteData?.paymentPerson)}</Typography>}
          {willDeleteData?.shop !== undefined && <Typography>購入店 : {willDeleteData?.shop}</Typography>}
          {willDeleteData?.amount !== undefined && <Typography>購入金額 : {Number(willDeleteData?.amount).toLocaleString()}円</Typography>}
          {willDeleteData?.paymentMethod !== undefined && <Typography>支払方法 : {MASTERS.getPaymentMethodName(willDeleteData?.paymentMethod)}</Typography>}
          {willDeleteData?.isAdvancePayment !== undefined && <Typography>{MASTERS.getAdvancePaymentName(willDeleteData?.isAdvancePayment)}</Typography>}
        </Box>
        <Typography
          variant="body2"
          sx={{ bgcolor: 'action.hover', width: '85%', mx: 'auto', p: 1, borderRadius: 1 }}
        >
          {message}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleNavigate} loading={loading}>
          削除
        </Button>
        <Button onClick={handleClose} sx={{ backgroundColor: 'rgba(0, 0, 0, 0.15)' }}>
          キャンセル
        </Button>
      </DialogActions>
    </Dialog>
  );
};