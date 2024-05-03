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


//crear provider, encargado de proveer acceso al contexto
export function CarritoContextProvider({ children }: { children: ReactNode }){
    
    const[cart, setCart] = useState<Plato[]>([]);

    const addCarrito = async (product: Plato) => {
        let existe:boolean = false
        cart.forEach(async (element:Plato) => {
            if(element.id === product.id){
                existe = true
                return existe
            }
        });
        
        if (existe) {
            console.log("YA EXISTE");
            product.cantidad += 1
            const cartClonado = await structuredClone(cart.filter(item => item.id !== product.id))
            await cartClonado.push(product)
            setCart(cartClonado)
        } 
        else { // si el producto no esta en el carrito
            console.log("NO EXISTE");
            await setCart(prevCart => [...prevCart, product])
        }   
    };

    const removeCarrito = async (product: Plato) => {
        await setCart(prevCart => prevCart.filter(item => item.id !== product.id))
    };

    const removeItemCarrito = async (product: Plato) => {
        //const objetoBuscado = cart.find((objeto:Plato) => objeto.id === product.id);
        //const platoIndice = cart.findIndex((objeto:Plato) => objeto.id === product.id)
        //si el producto ya esta en el carrito
        let existe:boolean = false
        cart.forEach(async (element:Plato) => {
            if(element.id === product.id){
                existe = true
            } 
        });

        if (existe) {
            console.log("EXISTE");
            if(product.cantidad > 1){
                product.cantidad -= 1
                const cartClonado = await structuredClone(cart.filter(item => item.id !== product.id))
                await cartClonado.push(product)
                setCart(cartClonado)
            }else{
                await setCart(prevCart => prevCart.filter(item => item.id !== product.id))
            }
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