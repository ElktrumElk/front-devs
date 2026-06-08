
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'

import './styles/style1.css'
import App from './App.tsx'
import { UserThemeProvider } from './context/user_theme_provider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserThemeProvider>
        <App />
      </UserThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
