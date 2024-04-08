import { useState } from 'react'
import '../componentes/css/ItemPlato.css'

type PlatoParams = {
    id:number;
    tituloPlato: string;
    imagenPlato: string;
    descripcion:string;
    precio: number;
    rubro:string;
    initialHayStock:boolean;
}

function ItemPlato(args : PlatoParams) {
    const [contador, incrementarCantidad] = useState(0);
    const text = args.initialHayStock ? 'Comprar' : 'Sin Stock';
    const buttonClassName = args.initialHayStock
    ? 'btn btn-primary'
    : 'btn btn-primary buttonSinStock';
    const handleClick = () => {
        args.initialHayStock ? incrementarCantidad((contador) => contador + 1) : 0;
      }
  return (
    <>
    <div className="col-sm-3 mb-3 mb-sm-0 espacio">
        <div className="card tarjeta">
        <div>
          <img src={`./images/${args.imagenPlato}`} className="card-img-top img-altura" alt={args.imagenPlato}></img>
        </div>
        <div className="card-body altura-cuerpo">
            <h5 className="card-title" title={args.descripcion}>{args.tituloPlato}({args.rubro})</h5>
            <p className="card-text">${args.precio}</p>
            <a href={`detalle/${args.id}`}>
                <button type="button" className="btn btn-warning">Detalle</button>
            </a>
            <a href="#" onClick={handleClick} className={buttonClassName}>{text}</a>
            <p>{contador}</p>
        </div>
        </div>
    </div>
    </>
  )
}

export default ItemPlato