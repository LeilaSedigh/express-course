import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import AppProvaider from './components/provaiders/AppProvaider.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <AppProvaider>
    <App />
  </AppProvaider>
  // </StrictMode>
)
