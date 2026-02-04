import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.tsx'
import {GoogleOAuthProvider} from '@react-oauth/google';
// adds auth context to whole application
import { AuthProvider } from './auth/AuthContext.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const clientId = import.meta.env.VITE_CLIENT_ID;

if(!clientId) {
  throw new Error("Missing VITE_CLIENT_ID");
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
