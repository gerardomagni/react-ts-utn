import { useState, useEffect } from 'react'
import Plato from '../entidades/Plato';
import ItemPlato from './ItemPlato';
import { deletePlatoXId, getPlatosJSONFetch } from '../servicios/FuncionesApi';
import MenuOpciones from './MenuOpciones';


function GrillaPlatos() {   
    const [platos, setPlatos] = useState<Plato[]>([]);
    
    const getPlatosResto =  async () => {
      const datos:Plato[] = await getPlatosJSONFetch();
      setPlatos(datos);
    }

    useEffect(() => {
      getPlatosResto();
    }, []);

    const deletePlato = async (idPlato:number) => {
      await deletePlatoXId(idPlato);
      window.location.reload();
    }


    return (
        <>
        <MenuOpciones></MenuOpciones>
        <div className="container text-center">
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
                <div className="col">
                <b>Eliminar</b>
                </div>
            </div>
          {platos.map((plato:Plato) => 
            <div className="row" key={plato.id}>
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
                <div className="col">
                <a className="btn btn-danger" style={{ marginBottom:10 }} onClick={(e) => deletePlato(plato.id)}>Eliminar</a>
                </div>
            </div>
               )}
          </div>
        </>
      )
}
    
export default GrillaPlatos