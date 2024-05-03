import { useState, useEffect, useId } from 'react'
import Plato from '../entidades/Plato';
import ItemPlato from './ItemPlato';
import { getPlatosJSONFetch } from '../servicios/FuncionesApi';
import MenuOpciones from './MenuOpciones';
import { CarritoContextProvider } from '../context/CarritoContext';
import { Carrito } from './Carrito';


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
        <CarritoContextProvider>
        <MenuOpciones></MenuOpciones>
        <div className="row">
            <div className="col-10">
                <div className="row">
                {platos.map((plato:Plato, index) => {
                return(
                        <ItemPlato platoObject={plato} key={index} id={plato.id} tituloPlato={plato.nombre} precio={plato.precio} rubro={plato.rubro} imagenPlato={plato.imagenPath} descripcion={plato.descripcion} initialHayStock={true}></ItemPlato>
                    )})}
                </div>    
            </div>
            <div className="col">
                <b>Carrito Compras</b>
                <Carrito></Carrito>
            </div>
        </div>
        </CarritoContextProvider>
        </>
      )
}
    
export default Menu