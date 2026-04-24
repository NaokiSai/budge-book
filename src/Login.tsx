// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// // import './Login.css'

// export default function Login() {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const navigate = useNavigate()

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault()
//     // ここでログイン処理を行う（デモ用なので簡単にしています）
//     if (email && password) {
//       // ログイン成功時にHomeへナビゲート
//       navigate('/home')
//     }
//   }

//   return (
//     <Container component="main" maxWidth="xs">
//       <Box
//         sx={{
//           marginTop: 8,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//         }}
//       >
//         <Paper
//           elevation={3}
//           sx={{
//             padding: 4,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             width: '100%',
//           }}
//         >
//           <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
//             ログイン
//           </Typography>
//           <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1, width: '100%' }}>
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="メールアドレス"
//               name="email"
//               autoComplete="email"
//               autoFocus
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="パスワード"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               ログイン
//             </Button>
//           </Box>
//         </Paper>
//       </Box>
//     </Container>
//   )\
// }

import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from './AuthContext';
import { useUser } from './UserContext'
import { Button, Box, Container, Typography, Paper } from '@mui/material';

export default function Login() {
  const navigate = useNavigate();
  // const { login } = useAuth();
  const { updateUserImage } = useUser();

  const testConnection = async (accessToken: string) => {
    // GASのURLにトークンをパラメータとして付与
    const baseUrl = "https://script.google.com/macros/s/AKfycbxcgW3w06EKs7Hulkr6MaFvfEWNMd6la86WG1KXzrOm9izPv8X5fsUkZVfUiER3zAxA/exec";

    // option パラメータを追加してログインリクエストを明示的に指定
    const gasUrl = `${baseUrl}?option=login&access_token=${accessToken}`;

    try {
      const response = await fetch(gasUrl, {
        method: 'GET',
        mode: 'cors',
        // headers: {
        //   'Content-Type': 'application/json',
        // }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      console.log("GASからのレスポンス:", json);

      // ステータスがsuccess の場合、ログイン処理を実行
      if (json.status === 'success') {
        login();
        navigate('/home');
      } else {
        alert(`ログインに失敗しました: ${json.message}`);
      }
    } catch (error) {
      console.error("通信エラー:", error);
      alert(`ネットワークエラーが発生しました: ${error}`);
    }
  };

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const accessToken = tokenResponse.access_token;
      const baseUrl = 'https://script.google.com/macros/s/AKfycbxcgW3w06EKs7Hulkr6MaFvfEWNMd6la86WG1KXzrOm9izPv8X5fsUkZVfUiER3zAxA/exec';

      // パラメータとしてトークンを付与
      const gasUrl = `${baseUrl}?option=login&access_token=${accessToken}`;

      try {
        const response = await fetch(gasUrl, {
          method: 'GET', // GASへの初回アクセスはGETが最も安定します
          mode: 'cors',
          redirect: 'follow', // 重要：リダイレクトを追跡
        });

        if (!response.ok) throw new Error('Network response was not ok');

        const json = await response.json();
        console.log("GASからのレスポンス:", JSON.stringify(json));

        // ステータスがsuccess の場合、ログイン処理を実行
        if (json.httpStatus === 200) {
          // login();
          navigate('/home');
          if (json.rawResponse) {
            // 1. 文字列として入っている rawResponse をオブジェクトに変換
            const userData = JSON.parse(json.rawResponse);

            // 2. 個別の値にアクセス
            const userEmail = userData.email;
            const userName = userData.name;
            const userPicture = userData.picture;


            console.log("ログインユーザー名:", userName);
            console.log("メールアドレス:", userEmail);
            console.log("プロフィール画像URL:", userPicture);
            updateUserImage(userPicture); // UserContextのプロフィール画像を更新

            // // 3. ここでステータスチェック（例：メールアドレスが取得できていれば成功とする）
            // if (userEmail) {
            //   login(); // AuthContextのログイン状態を更新
            //   navigate('/home'); // ホーム画面へ遷移
            // }
          }
        } else {
          alert(`ログインに失敗しました: ${json.message}`);
        }

        // ここで login() や navigate() を実行
      } catch (error) {
        console.error('通信エラー:', error);
      }
    },
    scope: "https://www.googleapis.com/auth/script.external_request https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/userinfo.email"
  });

  // ログイン成功時のハンドラ内で呼び出す
  // const googleLogin = useGoogleLogin({
  //   onSuccess: (tokenResponse) => testConnection(tokenResponse.access_token),
  //   // ここにスコープを追加
  //   // scope: 'openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/spreadsheets',
  //   scope: "https://www.googleapis.com/auth/script.external_request https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/userinfo.email",
  // });

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