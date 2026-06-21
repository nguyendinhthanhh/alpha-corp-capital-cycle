import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import './index.css'
import App from './App.jsx'
import { AIProvider } from './ai/AIProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <AIProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AIProvider>
    </MotionConfig>
  </StrictMode>,
)
