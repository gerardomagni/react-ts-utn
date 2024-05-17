import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Usuario from "../entidades/Usuario";

function MenuOpciones() {   

    const navigate = useNavigate();

    
    const cerrarSesion = async () => {
        localStorage.setItem('usuario', "");
        localStorage.removeItem('usuario');
        navigate('/login', {
                replace: true,
                state: {
                    logged: false
                },
		    });
    }

    const [jsonUsuario, setJSONUsuario] = useState<any>(localStorage.getItem('usuario'));
    console.log("JSON " + jsonUsuario);
    const usuarioLogueado:Usuario = JSON.parse(jsonUsuario) as Usuario;
    
    return (
        <>
        <div className="card text-center">
            <div className="card-header">
                <ul className="nav nav-tabs card-header-tabs">
                    <li className="nav-item">
                        <a className="nav-link" aria-current="true" href="/menu">Menu</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/app">App</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/componentes">Componentes</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/grilla">Grilla</a>
                    </li>
                    <li>
                        <div className="separador"></div>
                    </li>
                    <li>
                        <a className="nav-link">
                            Usuario: {usuarioLogueado?.usuario}
                        </a>
                    </li>
                    <li className="nav-item">
                        <button onClick={cerrarSesion} className="btn btn-success" type="button">
                            Cerrar Sesión
                        </button>
                    </li>
                </ul>
            </div>
        </div>
        <Outlet />
        </>
      )
}
    
export default MenuOpciones