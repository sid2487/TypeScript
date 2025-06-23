
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom"
import { AuthProvider } from './context/AuthContext.tsx';
import axios from "axios";
axios.defaults.withCredentials = true;

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
  <AuthProvider>
    <App />
  </AuthProvider>
  </BrowserRouter>
);
