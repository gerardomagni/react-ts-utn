import './Componente.css'
import Componente from './Componente'

function Componentes() {
    return (
    <>
    <div className="row">
      <Componente imagenPlato='pizza.jpg' tituloPlato='Pizza Especial' descripcionPlato='La Pizza especial es una variante de la pizza clásica, la cual se ha vuelto muy popular por la combinación de ingredientes que le dan un sabor único y distintivo.' initialHayStock={true} />
      <Componente imagenPlato='burger.jpg' tituloPlato='Burger Completa' descripcionPlato='Una hamburguesa completa, se compone de varios elementos como el pan, el queso, el bacon, el tomate, la lechuga, las salsas, etc. y como complementos podemos elegir patatas, que suele ser lo más común'  initialHayStock={true} />
      <Componente imagenPlato='lomo.jpg' tituloPlato='Lomo Criollo' descripcionPlato='Incluye lomo, lechuga, tomate, queso, jamón y huevo, preparado especialmente para que sientas una explosión de sabores'  initialHayStock={false} />
    </div>
    </>
  )
}

export default Componentes