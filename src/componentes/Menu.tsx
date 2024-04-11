import { useState, useEffect } from 'react'
import Plato from '../entidades/Plato';
import ItemPlato from './ItemPlato';
import { getPlatosJSONFetch } from '../servicios/FuncionesApi';
import MenuOpciones from './MenuOpciones';


function Menu() {   
    const [platos, setPlatos] = useState<Plato[]>([]);
    
    const getPlatosResto =  async () => {
      const datos:Plato[] = await getPlatosJSONFetch();
      setPlatos(datos);
    }

    useEffect(() => {
      getPlatosResto();
    }, []);

    return (
        <>
        <MenuOpciones></MenuOpciones>
        <div className="row">
         {platos.map((plato:Plato) => 
                <ItemPlato key={plato.id} id={plato.id} tituloPlato={plato.nombre} precio={plato.precio} rubro={plato.rubro} imagenPlato={plato.imagenPath} descripcion={plato.descripcion} initialHayStock={true}></ItemPlato>
               )}
        </div>
        </>
      )
}
    
export default Menu