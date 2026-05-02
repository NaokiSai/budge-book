import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box } from '@mui/material';
import { Button } from '@styledComponents/Button';
import type { DataEntry } from '@type/type';
import { MASTERS } from '@src/service/master';
import { useState } from 'react';

interface MessageDialogProps {
  open: boolean;
  onCancel: () => void;
  onOk: () => void
  willDeleteData: DataEntry | null
}

/**
 * MessageDialog
 * @param props 
 * @returns 
 */
export const MessageDialog = (props: MessageDialogProps) => {
  const { open = false, onCancel, onOk, willDeleteData } = props
  const [loading, setLoading] = useState<boolean>(false)

  const handleNavigate = () => {
    setLoading(true)
    onOk();
    setLoading(false)
  };

  return (
    <Dialog open={open}>
      <DialogTitle>⚠️ 選択データの削除確認</DialogTitle>
      <DialogContent>
        <Typography sx={{ fontSize: 12 }} gutterBottom>
          データを削除すると、元に戻せません。削除しますか。
        </Typography>
        <Box sx={{ p: 1, backgroundColor: 'rgba(0,0,0,0.1)', '& > *': { fontSize: 12 } }}>
          {willDeleteData?.date !== undefined && <Typography>購入日 : {willDeleteData?.date}</Typography>}
          {willDeleteData?.paymentPerson !== undefined && <Typography>購入者 : {MASTERS.getUserName(willDeleteData?.paymentPerson)}</Typography>}
          {willDeleteData?.shop !== undefined && <Typography>購入店 : {willDeleteData?.shop}</Typography>}
          {willDeleteData?.amount !== undefined && <Typography>購入金額 : {Number(willDeleteData?.amount).toLocaleString()}円</Typography>}
          {willDeleteData?.paymentMethod !== undefined && <Typography>支払方法 : {MASTERS.getPaymentMethodName(willDeleteData?.paymentMethod)}</Typography>}
          {willDeleteData?.isAdvancePayment !== undefined && <Typography>{MASTERS.getAdvancePaymentName(willDeleteData?.isAdvancePayment)}</Typography>}
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleNavigate} loading={loading}>
          削除
        </Button>
        <Button onClick={onCancel} sx={{ backgroundColor: 'rgba(0, 0, 0, 0.15)' }}>
          キャンセル
        </Button>
      </DialogActions>
    </Dialog>
  );
};