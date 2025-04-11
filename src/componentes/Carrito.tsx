import Plato from '../entidades/Plato.ts'
import { useCarrito } from '../hooks/useCarrito.tsx'
import CheckoutMP from './CheckoutMP.tsx'

function CartItem (item:Plato) {
  return (
      <div key={item.id}>
        <span>
            <img width={50} height={50}
            src={`./images/${item.imagenPath}`}
            alt={item.nombre}
            />
            <div>
                <strong>{item.nombre}</strong> - ${item.precio}
            </div>
            <div>
                <b>{item.cantidad} {item.cantidad == 1 ? 'unidad' : 'unidades'} </b>
            </div>
        </span>
        <hr></hr>
      </div>      
  )
}

export function Carrito () {
  
  const { cart, removeCarrito, addCarrito, limpiarCarrito, totalPedido } = useCarrito()
  
  const mostrarCarritoJSON = () => {
    console.log(cart)
  }

  
  return (
    <>
        {
      <aside className='cart'>
        <ul>
          {cart.map((plato:Plato, index) => 
            <CartItem id={plato.id} nombre={plato.nombre} precio={plato.precio} key={index}
            imagenPath={plato.imagenPath} descripcion={plato.descripcion} rubro={plato.rubro} cantidad={plato.cantidad} addCarrito={() => addCarrito(plato)}/>
          )}
        </ul>
        <div>
            <h3>${totalPedido}</h3>
        </div>

        <button onClick={limpiarCarrito} title='Limpiar Todo'>
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' strokeWidth='1' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
                <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                <path d='M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' />
                <path d='M17 17a2 2 0 1 0 2 2' />
                <path d='M17 17h-11v-11' />
                <path d='M9.239 5.231l10.761 .769l-1 7h-2m-4 0h-7' />
                <path d='M3 3l18 18' />
            </svg>
        </button>
        <br></br>
        <button onClick={mostrarCarritoJSON}>
        MOSTRAR CART JSON
        </button>
        <br></br>
        <CheckoutMP montoCarrito={totalPedido} ></CheckoutMP>
      </aside>
      }
    </>
  )
}
