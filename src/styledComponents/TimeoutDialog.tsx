import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box, LinearProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Button } from '@styledComponents/Button';

interface TimeoutDialogProps {
  open: boolean;
  onClose: () => void;
  resetContext?: () => void; // Contextをリセットする関数
}

/**
 * TimeoutDialog
 */
export const TimeoutDialog = (props: TimeoutDialogProps) => {
  const { open = false, onClose, resetContext } = props;
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    let timer: number | undefined;

    if (open) {
      setCountdown(10); // ダイアログが開くたびにカウントをリセット

      timer = window.setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            if (timer) window.clearInterval(timer);
            handleNavigate();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) window.clearInterval(timer);
    };
  }, [open]);

  const handleNavigate = () => {
    // 1. React コンテキストの状態を丸ごと初期値に戻す
    if (resetContext) {
      resetContext();
    }

    // 2. localStorage は無差別に clear() せず、アプリ固有の認証・キャッシュキーのみ個別削除する
    localStorage.removeItem('id_token');
    localStorage.removeItem('user');
    localStorage.removeItem('user_name');
    localStorage.removeItem('app_icon_cache_v1');

    onClose();
    navigate('/login');
  };

  return (
    <Dialog open={open} onClose={handleNavigate}>
      <DialogTitle>⏳ ログイン有効期限切れ</DialogTitle>
      <DialogContent>
        <Typography sx={{ fontSize: 12 }} gutterBottom>
          セキュリティのため、一定時間が経過したためログアウトしました。
        </Typography>
        <Typography sx={{ fontSize: 12 }} color="text.secondary">
          あと **{countdown}秒** で自動的にログイン画面へ戻ります。
        </Typography>
        <Box sx={{ width: '100%', mt: 2 }}>
          <LinearProgress variant="determinate" value={(countdown / 10) * 100} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleNavigate}>
          今すぐログイン画面へ
        </Button>
      </DialogActions>
    </Dialog>
  );
};