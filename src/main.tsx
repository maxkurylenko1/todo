import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/reset.scss'
import App from './App.tsx'
import { ToDoProvider } from './context/ToDoContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToDoProvider>
      <App />
    </ToDoProvider>
  </StrictMode>,
)
