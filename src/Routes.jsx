import { createHashRouter } from "react-router-dom"
import App from "./App.jsx"
import CombinedRaycoQuote from "./assets/CombinedRaycoQuote.jsx"
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n' // Importez l'instance i18n
import ModernOptionsInstallationsComponent from "./NewOptionsComponent.jsx"

const Routes = createHashRouter([
    {
        path:"/",
        element: (
            <I18nextProvider i18n={i18n}>
                <App/>
            </I18nextProvider>
        ),
        errorElement: <h1>error</h1>,
        children:[
            {path:"/", element:<CombinedRaycoQuote />},
            {path:"/admin2", element:<ModernOptionsInstallationsComponent />},
        ]
    }
])

export default Routes