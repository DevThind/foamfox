import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4500,
        style: {
          background: '#0e1929',
          color: '#fff',
          border: '1px solid rgba(0,148,255,0.3)',
          borderRadius: '10px',
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.92rem',
          boxShadow: '0 0 20px rgba(0,148,255,0.2)',
        },
        success: {
          iconTheme: { primary: '#0094ff', secondary: '#fff' },
        },
        error: {
          iconTheme: { primary: '#ff5a5a', secondary: '#fff' },
        },
      }}
    />
  </StrictMode>,
)
