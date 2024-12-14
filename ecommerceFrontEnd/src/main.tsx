import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider as ReduxProvider } from "react-redux"
import ecommerceStore from './EcommerceStore/ecommerceStore.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ReduxProvider store={ecommerceStore}>
        <App />
      </ReduxProvider>
  </StrictMode>
)


