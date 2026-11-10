import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '@cnxt/AuthContext'
import { DataProvider } from '@cnxt/DataContext' // ← DataProviderで全体を包む
import { PageContainer } from '@styledComponents/PageContaner'
import { lazy } from 'react'
import { MainLayout } from '@styledComponents/MainLayout' // 共通レイアウト
import { IconProvider } from './cnxt/IconContext.tsx'

const Login = lazy(() => import('@pages/Login'));
const Home = lazy(() => import('@pages/Home'));
const Add = lazy(() => import('@pages/Add'));
const Analytics = lazy(() => import('@pages/Analytics'));
const Settings = lazy(() => import('@pages/Settings'));
const Reimburse = lazy(() => import('@pages/Reimburse'));

function App() {
  return (
    <PageContainer>
      <AuthProvider>
        <IconProvider>
          <DataProvider> {/* DataContextを有効にする */}
            <Routes>
              {/* ログイン画面はAppBarやBottomNavが不要なレイアウト */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<Login />} />

              {/* 認証後の共通レイアウトを使うグループ */}
              <Route element={<MainLayout />}>
                <Route path="/home" element={<Home />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/add" element={<Add />} />
                <Route path="/reimburse" element={<Reimburse />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
            </Routes>
          </DataProvider>
        </IconProvider>
      </AuthProvider>
    </PageContainer>
  )
}

export default App;