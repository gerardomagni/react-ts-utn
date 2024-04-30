import { useState } from 'react'
import '../componentes/css/ItemPlato.css'
import { useCart } from '../hooks/useCarrito.tsx'
import Plato from '../entidades/Plato.ts';

type PlatoParams = {
    id:number;
    tituloPlato: string;
    imagenPlato: string;
    descripcion:string;
    precio: number;
    rubro:string;
    initialHayStock:boolean;
    isProductInCart?:boolean;
    platoObject:Plato;
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

    const { addCarrito, removeCarrito, cart, removeItemCarrito } = useCart()

    const verificaPlatoEnCarrito = (product:Plato) => {
        return cart.some(item => item.id === product.id)
    }

    const isPlatoInCarrito = verificaPlatoEnCarrito(args.platoObject)

    return (
    <>
    
    <div key={args.id} className="col-sm-4 mb-4 mb-sm-0 espacio">
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
            <hr></hr>
            <p>
            <a className='iconoMasMenos' onClick={() => removeItemCarrito(args.platoObject)}>
            -
            </a>
            <button className='colorFondoBlanco'
                  onClick={() => {
                    isPlatoInCarrito
                      ? removeCarrito(args.platoObject)
                      : addCarrito(args.platoObject)
                  }}
                >
                  {
                    isPlatoInCarrito
                      ? <img src={`./img/deleteCart.png`} />
                      : <img src={`./img/addCart.png`} />
                  }
            </button>
            <a className='iconoMasMenos' onClick={() => addCarrito(args.platoObject)}>
             +
            </a> 
            </p>
        </div>
        </div>
    </div>
    </>
  )
}

export default ItemPlato