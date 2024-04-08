import { useState } from 'react'
import './Componente.css'

function Componente({tituloPlato='', imagenPlato='', descripcionPlato='', initialHayStock=true}) {
    const [contador, incrementarCantidad] = useState(0);
    const text = initialHayStock ? 'Comprar' : 'Sin Stock';
    const buttonClassName = initialHayStock
    ? 'btn btn-primary'
    : 'btn btn-primary buttonSinStock';
    const handleClick = () => {
        initialHayStock ? incrementarCantidad((contador) => contador + 1) : 0;
      }
  return (
    <>
    <div className="col-sm-4 mb-3 mb-sm-0">
        <div className="card tarjeta">
        <div>
          <img src={`./img/${imagenPlato}`} className="card-img-top img-altura" alt={imagenPlato}></img>
        </div>
        <div className="card-body altura-cuerpo">
            <h5 className="card-title">{tituloPlato}</h5>
            <p className="card-text">{descripcionPlato}</p>
            <a href="#" onClick={handleClick} className={buttonClassName}>{text}</a>
            <p>{contador}</p>
        </div>
        </div>
    </div>
    </>
  )
}

export default Componente