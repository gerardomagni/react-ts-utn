import { useContext } from 'react'
import { CartContext } from '../context/CarritoContext.tsx'

export const useCart = () => {
  const context = useContext(CartContext)

  if (context === undefined) {
    throw new Error('useCart debe ser usado dentro del ambito de un CartProvider')
  }

  return context
}
