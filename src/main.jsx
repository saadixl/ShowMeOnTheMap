import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { APP_DISPLAY_NAME } from './appMeta.js'
import { initFirebaseAnalytics } from './firebase.js'
import './index.css'
import App from './App.jsx'

document.title = APP_DISPLAY_NAME

void initFirebaseAnalytics()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
