import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Componentes from './Componentes.tsx'
import App from './App.tsx'
import Menu from './componentes/Menu.tsx'
import DetallePlato from './componentes/DetallePlato.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route index element={<Componentes />} />
      <Route path="/componentes" element={<Componentes />} />
      <Route path="/app" element={<App />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/detalle">
        <Route path=":idplato" element={<DetallePlato />} />
      </Route>

      <Route path="*" element={<Componentes />} />
    </Routes>
  </BrowserRouter>
  </React.StrictMode>,
)
