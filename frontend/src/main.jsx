import { createRoot } from 'react-dom/client'
import './index.css'
import './Authentication/login.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import ContextProvider from './Context/Context.jsx'
import '@fontsource/poppins';

createRoot(document.getElementById('root')).render(
   
   <ContextProvider>
   <BrowserRouter>
   <App />
   </BrowserRouter>
   </ContextProvider>
  
)
