import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import type { GasResponse } from '@type/type';
import { gasClient } from '@service/api';
import { Image } from '@styledComponents/Image';
import TopImage from './../assets/TopLogo.png'
import { useState } from 'react';

export default function Login() {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState('')

  // ログイン成功後の処理を分離
  const onGoogleSuccess = async (credentialResponse: any) => {
    const idToken = credentialResponse.credential;

    if (!idToken) {
      alert("ログインに失敗しました（トークンが取得できません）");
      return;
    }

    setIsProcessing(true);
    setMessage('認証中...')

    try {
      // API呼び出し
      const result = await gasClient.login(idToken);
      const json: GasResponse = result; // 型が合っていればそのまま代入でOK

      if (json.httpCode !== 200) {
        throw new Error(json.message || "サーバーエラーが発生しました");
      }

      // データの保存
      localStorage.setItem('id_token', idToken);
      localStorage.setItem('user', json.user?.picture ?? '');
      localStorage.setItem('user_name', json.user?.name ?? '')

      // 画面遷移
      navigate('/home');

    } catch (error: any) {
      setMessage('認証できませんでした。')
    } finally {
      setIsProcessing(false);
    }
  };

  // 現在の年を取得
  const currentYear = new Date().getFullYear();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#F6F2E2',
        height: '100%'
      }}
    >
      <Image src={TopImage} sx={{ width: '80%', maxWidth: 300, mt: 'auto', mb: 4 }} />
      <Typography sx={{ color: 'gray', fontSize: 12 }}>
        v{import.meta.env.PACKAGE_VERSION}
      </Typography>
      <Box sx={{ mt: 5, mb: 'auto', opacity: isProcessing ? 0.5 : 1, pointerEvents: isProcessing ? 'none' : 'auto' }}>
        <GoogleLogin
          onSuccess={onGoogleSuccess}
          onError={() => console.error('Google Auth Failed')}
          useOneTap
        />
        <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', mt: 1, height: 40 }}>
          {message}
        </Typography>
      </Box>

      <Typography sx={{ color: 'gray', fontSize: 12, mb: 2 }}>
        @{currentYear}年 個人利用目的
      </Typography>
    </Box>
  );
}