import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './AuthContext'
import Login from './Login'
import Home from './Home'
import Add from './Add'
import Analytics from './Analytics'
import Settings from './Settings'
import { PageContainer } from './styledComponents/PageContaner'
import MenuAppBar from './MenuAppBar'
import { BottomNavigation } from './BottomNavigation'
import React from 'react'

function App() {
  return (
    <PageContainer>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
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
              <MenuAppBar />
            </React.Fragment>
          } />
        </Routes>
      </AuthProvider>
    </PageContainer>
  )
}

export default App
