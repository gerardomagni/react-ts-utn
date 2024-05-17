import { Navigate, Outlet } from 'react-router-dom';
import { Roles } from '../entidades/Roles';
import Usuario from '../entidades/Usuario';
import { useState } from 'react';

interface Props {
  rol: Roles;
}

function RolUsuario({ rol }: Props) {
  
    const [jsonUsuario, setJSONUsuario] = useState<any>(localStorage.getItem('usuario'));
    const usuarioLogueado:Usuario = JSON.parse(jsonUsuario) as Usuario;
    //si esta logueado y es administrador lo dejo ingresar si no
    if((usuarioLogueado && usuarioLogueado.rol === rol)){
        return <Outlet />;
    }else if(usuarioLogueado){
        return <Navigate replace to='/grilla' />;
    }else{
        return <Navigate replace to='/login' />;
    }
    
}
export default RolUsuario;