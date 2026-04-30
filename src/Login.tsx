import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useUser } from './AppContext'
import { Box } from '@mui/material';
import type { GasResponse } from './type';
import { gasClient } from './service/api';
import { Image } from './styledComponents/Image';
import TopImage from './assets/Top.png'
import { Button } from './styledComponents/Button';

export default function Login() {
  const navigate = useNavigate();
  const { updateUserImage } = useUser();

  const login = useGoogleLogin({

    onSuccess: async (tokenResponse) => {

      const accessToken = tokenResponse.access_token;
      // const gasClient = new GASClient('https://script.google.com/macros/s/AKfycbxcgW3w06EKs7Hulkr6MaFvfEWNMd6la86WG1KXzrOm9izPv8X5fsUkZVfUiER3zAxA/exec');
      const result = await gasClient.login(accessToken);
      // console.log("GASクライアントのログイン結果:", result);
      const json: GasResponse = JSON.parse(JSON.stringify(result)); // これで result を JSON オブジェクトとして扱えるようになります
      // console.log("GASクライアントのログイン結果（JSON形式）:", json);

      if (json.httpCode === 200) {
        // localStorage にトークンを保存
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('user', JSON.stringify(json.user));
        navigate('/home');
        updateUserImage(json.user?.picture !== undefined ? json.user.picture : ''); // AppContextのプロフィール画像を更新
      } else {
        alert(`ログインに失敗しました: ${json.message}`);
      }
    },
    scope: "https://www.googleapis.com/auth/script.external_request https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/userinfo.email"
  });

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
      <Image src={TopImage} sx={{ width: '80%', mb: 0 }} />
      <Box component="form" noValidate sx={{ mt: 5, mb: 'auto' }}>
        <Button sx={{ mx: 'auto' }} variant='contained' onClick={() => login()}>Googleでログイン</Button>
      </Box>
    </Box>
  );
}