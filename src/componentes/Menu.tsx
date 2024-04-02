import { useState, useEffect } from 'react'
import Plato from '../entidades/Plato';
import ItemPlato from './ItemPlato';
import { getPlatosJSON } from '../servicios/FuncionesApi';


function Menu() {   
    const [platos, setPlatos] = useState<Plato[]>([]);
    
    const getPlatosResto = () => {
      let datos:Plato[] = getPlatosJSON();
      setPlatos(datos);
    }

    useEffect(() => {
      getPlatosResto();
    }, []);

    return (
        <>
        <div className="row">
         {platos.map((plato:Plato) => 
                <ItemPlato key={plato.id} id={plato.id} tituloPlato={plato.nombre} precio={plato.precio} rubro={plato.rubro} imagenPlato={plato.imagenPath} descripcion={plato.descripcion} initialHayStock={true}></ItemPlato>
               )}
        </div>
        </>
      )
}
    
export default Menu