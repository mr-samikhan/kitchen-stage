import React from 'react'
import App from './core/App/App.tsx'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ReduxProvider } from '@cookup/providers'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ReduxProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    ,
  </ReduxProvider>
)
