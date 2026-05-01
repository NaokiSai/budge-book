import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '@cnxt/AuthContext'
import { PageContainer } from '@styledComponents/PageContaner'
import { MenuAppBar } from '@components/MenuAppBar'
import { BottomNavigation } from '@components/BottomNavigation'
import React, { lazy } from 'react'

const Login = lazy(() => import('@pages/Login'));
const Home = lazy(() => import('@pages/Home'));
const Add = lazy(() => import('@pages/Add'));
const Analytics = lazy(() => import('@pages/Analytics'));
const Settings = lazy(() => import('@pages/Settings'));

function App() {
  return (
    <PageContainer>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={
            <React.Fragment>
              <MenuAppBar />
              <Home />
              <BottomNavigation />
            </React.Fragment>
          } />
          <Route path="/add" element={
            <React.Fragment>
              <MenuAppBar />
              <Add />
              <BottomNavigation />
            </React.Fragment>
          } />
          <Route path="/analytics" element={
            <React.Fragment>
              <MenuAppBar />
              <Analytics />
              <BottomNavigation />
            </React.Fragment>
          } />
          <Route path="/settings" element={
            <React.Fragment>
              <MenuAppBar />
              <Settings />
              <BottomNavigation />
            </React.Fragment>
          } />
        </Routes>
      </AuthProvider>
    </PageContainer>
  )
}

export default App
