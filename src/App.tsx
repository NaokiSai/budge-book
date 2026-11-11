import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { AuthProvider } from '@cnxt/AuthContext'
import { DataProvider } from '@cnxt/DataContext'
import { PageContainer } from '@styledComponents/PageContaner'
import { lazy } from 'react'
import { MainLayout } from '@styledComponents/MainLayout'

const Login = lazy(() => import('@pages/Login'));
const Home = lazy(() => import('@pages/Home'));
const Add = lazy(() => import('@pages/Add'));
const Analytics = lazy(() => import('@pages/Analytics'));
const Paymethod = lazy(() => import('@pages/Paymethod'));
const Reimburse = lazy(() => import('@pages/Reimburse'));

/**
 * ログイン状態をチェックし、未認証なら /login へリダイレクトするガードコンポーネント
 */
const ProtectedRoute = () => {
  const isAuthenticated = !!localStorage.getItem('id_token');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

function App() {
  return (
    <PageContainer>
      <AuthProvider>
        <Routes>
          {/* ========================================== */}
          {/* 未認証エリア（DataProviderは置かない）         */}
          {/* ========================================== */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />

          {/* ========================================== */}
          {/* 認証済みエリア（ここで初めて各種プロバイダーを展開） */}
          {/* ========================================== */}
          <Route element={<ProtectedRoute />}>
            <Route
              element={
                <DataProvider>
                  <MainLayout />
                </DataProvider>
              }
            >
              <Route path="/home" element={<Home />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/add" element={<Add />} />
              <Route path="/reimburse" element={<Reimburse />} />
              <Route path="/paymethod" element={<Paymethod />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </PageContainer>
  )
}

export default App;