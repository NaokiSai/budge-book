import { Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import { Button } from '@styledComponents/Button';
import type { DataEntry } from '@type/type';
import { CreateDataForm } from './CreateDataForm';

interface EditDialogProps {
  open: boolean;
  onCancel: () => void;
  onOk: () => void
  willEditData: DataEntry | null
}

/**
 * EditDialog
 * @param props 
 * @returns 
 */
export const EditDialog = (props: EditDialogProps) => {
  const { open = false, onCancel, onOk, willEditData } = props

  const handleNavigate = () => {
    onOk();
  };

  return (
    <Dialog open={open} sx={{ width: 'fit-content', ' .MuiDialog-paper': { mx: 1 } }}>
      <DialogTitle>⚠️ 選択データの削除確認</DialogTitle>
      <DialogContent>
        <Typography sx={{ fontSize: 12 }} gutterBottom>
          データを削除すると、元に戻せません。削除しますか。
        </Typography>
        {willEditData !== null &&
          <CreateDataForm
            data={willEditData}
            type="change" />}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleNavigate}>
          保存
        </Button>
        <Button onClick={onCancel} sx={{ backgroundColor: 'rgba(0, 0, 0, 0.15)' }}>
          キャンセル
        </Button>
      </DialogActions>
    </Dialog>
  );
};