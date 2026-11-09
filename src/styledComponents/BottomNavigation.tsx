import { useNavigate, useLocation } from 'react-router-dom'
import Paper from '@mui/material/Paper'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import HomeImage from '@assets/Home.webp'
import AddImage from '@assets/Add.webp'
import ChartImage from '@assets/Chart.webp'
import SettingImage from '@assets/Setting.webp'
import PayImage from '@assets/Pay.webp'
import { Image } from '@styledComponents/Image'
import { StyledBottomNavigation } from '@styledComponents/StyledBottomNavigation'

type BottomNavigationProps = {
  // 必要に応じてpropsを追加できます
  loadingCtx: boolean; // 例: ローディング状態を示すフラグ
}

export const BottomNavigation = (props: BottomNavigationProps) => {
  const { loadingCtx } = props;

  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(getValueFromPath(location.pathname));
  }, [location.pathname]);

  const getValueFromPath = (pathname: string): number => {
    if (pathname === '/home' || pathname === '/') return 0;
    if (pathname === '/analytics') return 1;
    if (pathname === '/add') return 2;
    if (pathname === '/pay') return 3;
    if (pathname === '/settings') return 4;
    return 0;
  };

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    // ナビゲーションは素直に画面遷移だけに専念させる
    const paths = ['/home', '/analytics', '/add', '/pay', '/settings'];
    navigate(paths[newValue] || '/home');
  };

  return (
    <React.Fragment>
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, boxShadow: '0px -5px 10px rgba(0, 0, 0, 0.2)', borderRadius: 0 }}
        elevation={12}>
        <StyledBottomNavigation
          value={value}
          onChange={handleChange}
          sx={{
            overflow: 'visible',
            backgroundColor: '#F5F5F5',
            height: 64,
            '& .MuiBottomNavigationAction-root': {
              minWidth: 'auto',
              p: '3px 0',
              fontSize: '0.65rem',
              '&.Mui-selected': {
                fontSize: '0.65rem',
              },
            },
          }}
        >
          <BottomNavigationAction disabled={loadingCtx} icon={<Image src={HomeImage} sx={{ width: 36 }} />} />
          <BottomNavigationAction disabled={loadingCtx} icon={<Image src={ChartImage} sx={{ width: 54 }} />} />
          <BottomNavigationAction disabled={loadingCtx} sx={{ paddingBottom: '12px!important' }} icon={<Image src={AddImage} sx={{ width: 68, backgroundColor: '#F5C347', borderRadius: '50%' }} />} />
          <BottomNavigationAction disabled={loadingCtx} icon={<Image src={PayImage} sx={{ width: 50 }} />} />
          <BottomNavigationAction disabled={loadingCtx} icon={<Image src={SettingImage} sx={{ width: 60 }} />} />
        </StyledBottomNavigation>
      </Paper>
      <Box sx={{ minHeight: 56 }} />
      {/* TimeoutDialog はアプリのルート付近（App.tsxなど）か、DataContextを監視する共通レイアウトに置いておくのが理想です */}
    </React.Fragment>
  )
}