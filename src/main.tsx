import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Componentes from './Componentes.tsx'
import App from './App.tsx'
import Menu from './componentes/Menu.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route index element={<Componentes />} />
      <Route path="/app" element={<App />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="*" element={<Componentes />} />
    </Routes>
  </BrowserRouter>
  </React.StrictMode>,
)
