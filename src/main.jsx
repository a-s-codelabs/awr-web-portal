import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { OrgProvider } from './contexts/OrgContext.jsx'
import { queryClient } from './lib/api.js'
import App from './App.jsx'
import './index.css'

const basename = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '') || '/'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <OrgProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </OrgProvider>
    </BrowserRouter>
  </StrictMode>,
)
