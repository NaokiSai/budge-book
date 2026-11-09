import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import '@css/main.css'
import App from './App.tsx'
import { IconProvider } from './cnxt/IconContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IconProvider>
      {/* クライアントIDは環境変数などに入れるのが理想的です */}
      <GoogleOAuthProvider clientId="967011185025-jmds0gu5asunpsrjgpr95jdo5p8r5g2e.apps.googleusercontent.com">
        <HashRouter>
          <App />
        </HashRouter>
      </GoogleOAuthProvider>
    </IconProvider>
  </StrictMode>,
)
