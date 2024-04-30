import { ReactNode, createContext, useState } from 'react'
import Plato from '../entidades/Plato';

// Definimos el tipo de dato que se almacenará en el contexto del carrito
interface CartContextType {
  cart: Plato[];
  addCarrito: (product: Plato) => void;
  removeCarrito: (product: Plato) => void;
  removeItemCarrito: (product: Plato) => void;
  limpiarCarrito: () => void;
}

//crear contexto
export const CartContext = createContext<CartContextType>({
  cart: [],
  addCarrito: () => {},
  removeCarrito: () => {},
  removeItemCarrito: () => {},
  limpiarCarrito: () => {}
});


//crear provider
export function CartProvider({ children }: { children: ReactNode }){
    
    const[cart, setCart] = useState<Plato[]>([]);

    const addCarrito = async (product: Plato) => {
        //2 formas de buscar
        const objetoBuscado = cart.find((objeto:Plato) => objeto.id === product.id);
        const platoIndice = cart.findIndex((objeto:Plato) => objeto.id === product.id)
        //si el producto ya esta en el carrito
        if (objetoBuscado && platoIndice > 0) {
            console.log("YA EXISTE");
            objetoBuscado.cantidad += 1
            const cartClonado = structuredClone(cart.filter(item => item.id !== product.id))
            cartClonado.push(objetoBuscado)
            setCart(cartClonado)
        } 
        else { // si el producto no esta en el carrito
            await setCart(prevCart => [...prevCart, product])
        }   
    };

    const removeCarrito = async (product: Plato) => {
        await setCart(prevCart => prevCart.filter(item => item.id !== product.id))
    };

    const removeItemCarrito = async (product: Plato) => {
        const objetoBuscado = cart.find((objeto:Plato) => objeto.id === product.id);
        const platoIndice = cart.findIndex((objeto:Plato) => objeto.id === product.id)
        //si el producto ya esta en el carrito
        if (objetoBuscado && platoIndice > 0) {
            console.log("YA EXISTE");
            if(objetoBuscado.cantidad > 1){
                objetoBuscado.cantidad -= 1
                const cartClonado = structuredClone(cart.filter(item => item.id !== product.id))
                cartClonado.push(objetoBuscado)
                setCart(cartClonado)
            }else{
                await setCart(prevCart => prevCart.filter(item => item.id !== product.id))
            }
        } 
        else { // si el producto no esta en el carrito
            await setCart(prevCart => prevCart.filter(item => item.id !== product.id))
        }   
    };

    const limpiarCarrito = () => {
        setCart([])
    }


    return (
    <CartContext.Provider value={{ cart, addCarrito, limpiarCarrito, removeCarrito, removeItemCarrito }}>
      {children}
    </CartContext.Provider>
    );

}