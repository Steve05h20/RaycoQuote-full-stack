import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Routes from "./Routes.jsx"
import { RouterProvider } from "react-router-dom"
import './i18n' // Importez la configuration i18n

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={Routes} />
    </StrictMode>
)