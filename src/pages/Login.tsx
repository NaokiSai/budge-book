import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@cnxt/AppContext'
import { Box, Typography } from '@mui/material';
import type { GasResponse } from '@type/type';
import { gasClient } from '@service/api';
import { Image } from '@styledComponents/Image';
import TopImage from './../assets/TopLogo.png'

export default function Login() {
  const navigate = useNavigate();
  const { updateUserImage } = useUser();

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
      <Image src={TopImage} sx={{ width: '80%', maxWidth: 300, mb: 0 }} />
      <Box component="form" noValidate sx={{ mt: 5, mb: 'auto' }}>
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            // credentialResponse.credential これが IDトークン
            const idToken = credentialResponse.credential;
            if (idToken !== undefined) {
              const result = await gasClient.login(idToken);
              const json: GasResponse = JSON.parse(JSON.stringify(result));

              if (json.httpCode === 200) {
                // localStorage にトークンを保存
                localStorage.setItem('id_token', idToken);
                localStorage.setItem('user', JSON.stringify(json.user));
                navigate('/home');
                updateUserImage(json.user?.picture !== undefined ? json.user.picture : ''); // AppContextのプロフィール画像を更新
              } else {
                alert(`ログインに失敗しました: ${json.message}`);
              }
            } else {
              alert(`ログインに失敗しました`);
            }
          }}
          onError={() => {
            console.error('Login Failed');
          }}
        />
      </Box>
      <Typography sx={{ color: 'gray', fontSize: 12, mb: 1 }}>2026年作成 個人利用</Typography>
    </Box>
  );
}