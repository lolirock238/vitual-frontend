import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Wardrobe from './Wardrobe.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Wardrobe />
  </StrictMode>,
)
