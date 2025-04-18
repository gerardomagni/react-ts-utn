import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MenuOpciones from './componentes/MenuOpciones'

function App() {

    const [isActive, setActive] = useState(false);
    const handleClick = () => {
      setActive(prev => !prev);
      if (!isActive) {
        console.log('Boton Activado');
      }
    };
    const [count, setCount] = useState(0)

    return (
        <>
        <MenuOpciones></MenuOpciones>
        <div>
            <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
        </div>
        <div>
            <button onClick={handleClick}>
            {isActive ? 'Desactivado' : 'Activado'}
            </button>
        </div>
        <h1>Vite + React</h1>
        <a href="/loading" target="_blank">
            <h1>LOADING</h1>
        </a>
        <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
            </button>
            <p>
            Edit <code>src/App.tsx</code> and save to test HMR
            </p>
        </div>
        <p className="read-the-docs">
            Click on the Vite and React logos to learn more
        </p>
        </>
    )
}

export default App
