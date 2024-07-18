import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthenticationContextProvider } from './services/authentication/authentication.jsx'
// import { ApiContextProvider } from './services/api/apiContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthenticationContextProvider>
      {/* <ApiContextProvider> */}
        <App />
      {/* </ApiContextProvider> */}
    </AuthenticationContextProvider>
  </React.StrictMode>,
)
