import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import './index.css'
import App from './App.tsx'
import { UserProvider } from './UserContext';
import { DataProvider } from './DataContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DataProvider>
      <UserProvider>
        {/* クライアントIDは環境変数などに入れるのが理想的です */}
        <GoogleOAuthProvider clientId="967011185025-jmds0gu5asunpsrjgpr95jdo5p8r5g2e.apps.googleusercontent.com">
          <HashRouter>
            <App />
          </HashRouter>
        </GoogleOAuthProvider>
      </UserProvider>
    </DataProvider>
  </StrictMode>,
)
