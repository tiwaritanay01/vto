import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'
import './styles/index.css'
import './styles/tailwind.css'
import './styles/theme.css'

// Note: StrictMode removed intentionally — it double-invokes effects which
// breaks camera initialization via getUserMedia in development.
ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
)
