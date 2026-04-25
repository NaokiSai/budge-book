import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext'
import { Button, Box, Container, Typography, Paper } from '@mui/material';
import GASClient from './gasClient';
import type { GasResponse } from './type';

export default function Login() {
  const navigate = useNavigate();
  const { updateUserImage } = useUser();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const accessToken = tokenResponse.access_token;
      const gasClient = new GASClient('https://script.google.com/macros/s/AKfycbxcgW3w06EKs7Hulkr6MaFvfEWNMd6la86WG1KXzrOm9izPv8X5fsUkZVfUiER3zAxA/exec');
      const result = await gasClient.login(accessToken);
      // console.log("GASクライアントのログイン結果:", result);
      const json: GasResponse = JSON.parse(JSON.stringify(result)); // これで result を JSON オブジェクトとして扱えるようになります
      // console.log("GASクライアントのログイン結果（JSON形式）:", json);
      if (json.httpCode === 200) {
        // localStorage にトークンを保存
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('user', JSON.stringify(json.user));
        navigate('/home');
        updateUserImage(json.user?.picture !== undefined ? json.user.picture : ''); // UserContextのプロフィール画像を更新
      } else {
        alert(`ログインに失敗しました: ${json.message}`);
      }
    },
    scope: "https://www.googleapis.com/auth/script.external_request https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/userinfo.email"
  });

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
            ログイン
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <Button sx={{ textTransform: 'none', mx: 'auto' }} variant='contained' onClick={() => login()}>Googleでログイン</Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}