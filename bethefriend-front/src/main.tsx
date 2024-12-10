import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import HomeView from './views/Home.tsx'
import './views/Home.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HomeView />
    <App />
  </StrictMode>,
)
