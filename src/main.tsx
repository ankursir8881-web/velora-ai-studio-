import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#161616',
            color: '#fff',
            border: '1px solid rgba(0, 255, 136, 0.3)',
          },
          success: {
            iconTheme: { primary: '#00ff88', secondary: '#0a0a0a' },
          },
          error: {
            iconTheme: { primary: '#ff4444', secondary: '#0a0a0a' },
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>,
)
