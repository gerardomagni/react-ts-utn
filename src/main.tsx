import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Componentes from './Componentes.tsx'
import App from './App.tsx'
import DetallePlato from './componentes/DetallePlato.tsx'
import { RutaPrivada } from './controlAcceso/RutaPrivada.tsx'
import Login from './componentes/Login.tsx'
import RolUsuario from './controlAcceso/RolUsuario.tsx'
import { Roles } from './entidades/Roles.ts'

//lazy -> técnica de carga diferida, el componente se carga cuando se necesita y NO desde el inicio
//ayudar a reducir el tiempo de carga inicial de la aplicación y a mejorar la velocidad de navegación
const Menu = lazy(() => import('./componentes/Menu'));
const GrillaPlatos = lazy(() => import('./componentes/GrillaPlatos'));
const CheckoutMP = lazy(() => import('./componentes/CheckoutMP'));
const Formulario = lazy(() => import('./componentes/Formulario'));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={<><img src='loading.gif' /></>}>
        <BrowserRouter>
        <Routes>
            //ruta publica
        <Route index element={<Componentes />} />
            //ruta publica
        <Route path="/login" element={<Login />} />
            //ruta publica
        <Route path="/componentes" element={<Componentes />} />
            //ruta publica
        <Route path="/app" element={<App />} />
           //ruta publica
        <Route path="/detalle">
            <Route path=":idplato" element={<DetallePlato />} />
        </Route>
            //ruta privada
        <Route path="/menu" element={
                                        <RutaPrivada>
                                            <Menu />
                                        </RutaPrivada>
                                    } />
            //ruta privada
        <Route path="/grilla" element={
                                        <RutaPrivada>
                                            <GrillaPlatos  />
                                        </RutaPrivada>
                                        } />
            //ruta privada y con Rol Administrador
        <Route element={<RolUsuario rol={Roles.ADMIN} />}>
            <Route path="/formulario/:idplato" element={<Formulario />} />
        </Route>
       
            //ruta privada
        <Route path="/mercadopago" element={
                                            <RutaPrivada> 
                                                <CheckoutMP />
                                            </RutaPrivada>
                                            } />
            //ruta por defecto
        <Route path="*" element={<Componentes />} />
        </Routes>
    </BrowserRouter>
  </Suspense>
  </React.StrictMode>,
)
