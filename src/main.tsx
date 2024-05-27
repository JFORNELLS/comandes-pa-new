import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ComandaProvider } from './context/ComandaContext.tsx'
import { RegistreProvider } from './context/RegistreContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RegistreProvider>
      <ComandaProvider>
        <App />
      </ComandaProvider>
    </RegistreProvider>
  </React.StrictMode>,
)
