import { useState, useEffect } from 'react'
import Plato from '../entidades/Plato';
import { deletePlatoXId, generarReporteExcel, getPlatosJSONFetch } from '../servicios/FuncionesApi';
import MenuOpciones from './MenuOpciones';
import Usuario from '../entidades/Usuario';
import { Roles } from '../entidades/Roles';
import ConfigApp from '../ConfigApp';


function GrillaPlatos() {   
    
    const [jsonUsuario, setJSONUsuario] = useState<any>(localStorage.getItem('usuario'));
    const usuarioLogueado:Usuario = JSON.parse(jsonUsuario) as Usuario;

    const [platos, setPlatos] = useState<Plato[]>([]);
    
    const getPlatosResto =  async () => {
        const datos:Plato[] = await getPlatosJSONFetch();
        console.log("LOS PLATOS DEL JSON SON: ");
        console.log(datos);
        setPlatos(datos);
    }

    useEffect(() => {
      getPlatosResto();
    }, []);

    const deletePlato = async (idPlato:number) => {
      await deletePlatoXId(idPlato);
      window.location.reload();
    }

    const generarExcel = () => {
      window.open("http://localhost:"+ConfigApp.PUERTO_TOMCAT+"/api/downloadExcelPlatos", "_blank");
    }


    return (
        <>
        <MenuOpciones></MenuOpciones>
        <div className="container text-center">
            <a className="btn btn-success" onClick={(e) => generarExcel()}>Generar Excel</a>
            <br/>
            <a className="btn btn-primary" href={`/formulario/0`}>Nuevo</a>
            <div className="row">
                <div className="col">
                <b>ID</b>
                </div>
                <div className="col">
                <b>Plato</b>
                </div>
                <div className="col">
                <b>Rubro</b>
                </div>
                <div className="col">
                <b>Precio</b>
                </div>
                <div className="col">
                <b>Modificar</b>
                </div>
                {
                    (usuarioLogueado.rol == Roles.ADMIN)
                      ? <div className="col">
                        <b>Eliminar</b>
                        </div>
                      : 
                      <div className="col"></div>
                }
            </div>
          {platos.map((plato:Plato, index) => 
            <div className="row" key={index}>
                <div className="col">
                {plato.id}
                </div>
                <div className="col">
                {plato.nombre}
                </div>
                <div className="col">
                {plato.rubro}
                </div>
                <div className="col">
                {plato.precio}
                </div>
                <div className="col">
                <a className="btn btn-info" style={{ marginBottom:10 }} href={`/formulario/` + plato.id}>Modificar</a>
                </div>
                {
                    (usuarioLogueado.rol == Roles.ADMIN)
                      ? <div className="col">
                            <a className="btn btn-danger" style={{ marginBottom:10 }} onClick={(e) => deletePlato(plato.id)}>Eliminar</a>
                        </div>
                      : 
                      <div className="col"></div>
                }
            </div>
               )}
          </div>
        </>
      )
}
    
export default GrillaPlatos