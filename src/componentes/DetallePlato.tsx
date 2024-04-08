import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Plato from '../entidades/Plato';
import { getPlatoXIdFecth } from '../servicios/FuncionesApi';
import Ingrediente from '../entidades/Ingrediente';
import MenuOpciones from './MenuOpciones';

function DetallePlato() {
    const {idplato} = useParams();
    const [plato, setPlato] = useState<Plato>();
    const getPlatoResto = async () => {
        let platoSelect:Plato = await getPlatoXIdFecth(Number(idplato));
        setPlato(platoSelect);
    }
    useEffect(() => {
        getPlatoResto();
    }, []);

  return (
    <>
    <MenuOpciones></MenuOpciones>
    <div className="card text-center">
        <div className="card-header">
            {plato?.rubro}
        </div>
        <div>
        <img src={"/images/"+plato?.imagenPath} className="card-img-top img-altura" alt={plato?.imagenPath}></img>
        </div>
        <div className="card-body">
            <h5 className="card-title">{plato?.nombre}</h5>
            <h4 className="card-title">${plato?.precio}</h4>
            <p className="card-text">{plato?.descripcion}</p>
            <p className='align-izquierda'>
                Ingredientes:<br></br>
                {plato?.ingredientes?.map((ing:Ingrediente) => 
                    <li key={ing.id}>{ing.nombre} {ing.cantidad} {ing.unidadMedida}</li>
                )}

            </p>
            <a href="#" className="btn btn-primary">Comprar</a>
        </div>
        <div className="card-footer text-body-secondary">
            <a href="/menu">
            <button type="button" className="btn btn-success">Volver</button>
            </a>
        </div>
    </div>
    </>
  )
}

export default DetallePlato