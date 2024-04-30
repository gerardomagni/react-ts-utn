import { useState, useEffect } from 'react'
import Plato from '../entidades/Plato';
import { deletePlatoXId,getPlatoXIdFecth, savePlato, getIngredienteXCodigo } from '../servicios/FuncionesApi';
import MenuOpciones from './MenuOpciones';
import PlatoIngrediente from '../entidades/PlatoIngrediente';
import { useNavigate, useParams } from 'react-router-dom';
import Ingrediente from '../entidades/Ingrediente';


function Formulario() {   
   const navigate = useNavigate();

    const {idplato} = useParams();
    const [plato, setPlato] = useState<Plato>(new Plato());
    const [cantidad, setCantidad] = useState<number>(0);
    let [codigoArticulo, setCodigoArticulo] = useState<string>("");
    const [txtValidacion, setTxtValidacion] = useState<string>("");
    
    
    const getPlatoResto = async () => {
        if(Number(idplato) !== 0){
            let platoSelect:Plato = await getPlatoXIdFecth(Number(idplato));
            setPlato(platoSelect);
        }else{
            let platoSelect:Plato = new Plato();
            setPlato(platoSelect);
        }
    }

    
    const buscarIngredienteXCodigo = async () => {
        if(codigoArticulo){
            const ingrediente:Ingrediente = await getIngredienteXCodigo(codigoArticulo);
            if(!ingrediente || ingrediente.codigo == 0){
                setTxtValidacion("El Ingrediente con codigo " + codigoArticulo + " no existe");
            }else{
                if(!plato.ingredientesPlato)
                    plato.ingredientesPlato = [];
                if(!plato.ingredientesPlato.find(ingAgregado => ingAgregado.ingrediente.id == ingrediente.id)){
                    let platoIng:PlatoIngrediente = new PlatoIngrediente();
                    platoIng.cantidad = cantidad + 50;
                    platoIng.ingrediente = ingrediente;
                    plato.ingredientesPlato.push(platoIng);
                    setTxtValidacion("Ingrediente " + ingrediente.nombre + " agregado");
                }else{
                    setTxtValidacion("El Ingrediente " + ingrediente.nombre + " ya fue agregado");
                }
            }
            if(document && document.getElementById("txtCodigo")){
                (document.getElementById("txtCodigo") as HTMLInputElement).value = "";
            }
                
        }else{
            setCodigoArticulo("");
            setTxtValidacion("Ingrese el código del ingrediente");
        }
    }

    useEffect(() => {
        getPlatoResto();
    }, []);

    const save = async () => {
        if(plato.nombre == undefined || plato.nombre === ""){
            setTxtValidacion("Ingrese el nombre del plato");
            return;
        }
        if(plato.precio == undefined || plato.precio === 0){
            setTxtValidacion("El precio debe ser distinto de cero");
            return;
        }
        if(plato.imagenPath == undefined || plato.imagenPath === ""){
            setTxtValidacion("Ingrese el rubro del plato");
            return;
        }
        if(plato.rubro == undefined || plato.rubro === ""){
            setTxtValidacion("Ingrese el rubro del plato");
            return;
        }
        if(plato.descripcion == undefined || plato.descripcion === ""){
            setTxtValidacion("Ingrese la descripción del plato");
            return;
        }
        if(plato.ingredientesPlato == undefined || plato.ingredientesPlato.length === 0){
            setTxtValidacion("Debe agregar al menos un ingrediente al plato");
            return;
        }
        
        
        console.log(plato.nombre);
        await savePlato(plato);
        navigate('/grilla'); 
    }

    const eliminar = async () => {
        await deletePlatoXId(plato.id);
        navigate('/grilla'); 
    }

    const deleteIngrediente = async (platoIngrediente:PlatoIngrediente) => {
        
        if(plato.ingredientesPlato){
            let ingsPlato:PlatoIngrediente[] = plato.ingredientesPlato.filter(ingPlato => ingPlato.ingrediente.id != platoIngrediente.ingrediente.id);
            plato.ingredientesPlato = ingsPlato;
        }
        if(document && document.getElementById("txtCodigo")){
            (document.getElementById("txtCodigo") as HTMLInputElement).focus();
        }
        setPlato(prevState => plato);
        setTxtValidacion("Ingrediente Eliminado");
      }


    return (
        <>
        <MenuOpciones></MenuOpciones>
        <div className="center">
            <div className="mb-3">
                <label htmlFor="txtNombre" className="form-label">Nombre</label>
                <input type="text" id='txtNombre' className="form-control" placeholder="Ingrese el nombre" defaultValue={plato?.nombre} onChange={e => plato.nombre = String(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="txtPrecio" className="form-label">Precio</label>
                <input type="text" id='txtPrecio' className="form-control" placeholder="Ingrese el precio" defaultValue={plato?.strPrecio} onChange={e => plato.precio = Number(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="txtRubro" className="form-label">Rubro</label>
                <input type="text" id='txtRubro' className="form-control" placeholder="Ingrese el rubro" defaultValue={plato?.rubro} onChange={e => plato.rubro = String(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="txtImagen" className="form-label">Imagen</label>
                <input type="text" id='txtImagen' className="form-control" placeholder="Ingrese el path de la imagen" defaultValue={plato?.imagenPath} onChange={e => plato.imagenPath = String(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="txtDescripcion" className="form-label">Descripción</label>
                <textarea id='txtDescripcion' className="form-control" placeholder="Ingrese la Descripción" defaultValue={plato?.descripcion} onChange={e => plato.descripcion = String(e.target.value)}></textarea>
            </div>
            <div className="row">
                <div className="col">
                <b>Código Articulo:</b>
                </div>
                <div className="col">
                <input defaultValue={codigoArticulo} onChange={e => codigoArticulo = String(e.target.value)}
                        type="text" className="form-control"
                        placeholder="Código Articulo"
                        id='txtCodigo' name='txtCodigo'
                        onKeyDown={(e) => {if (e.key === "Enter") buscarIngredienteXCodigo(); }}
                        autoFocus
                    />
                </div>
                <div className="col">
                <button className="btn btn-success" onClick={buscarIngredienteXCodigo}>
                Add Ingrediente
                </button>
                </div>
            </div>
            <br></br>
            <div className="row">
                <div className="col">
                <b>Id</b>
                </div>
                <div className="col">
                <b>Código</b>
                </div>
                <div className="col">
                <b>Ingrediente</b>
                </div>
                <div className="col">
                <b>Cantidad </b>
                </div>
                <div className="col">
                <b>Unidad de Medida </b>
                </div>
                <div className="col">
                <b>X</b>
                </div>
            </div>
          {plato.ingredientesPlato?.map((ingredienteAux:PlatoIngrediente, index:number) => 
            <div className="row" key={index}>
                <div className="col">
                {ingredienteAux.idplatoingrediente}
                </div>
                <div className="col">
                {ingredienteAux.ingrediente?.codigo}
                </div>
                <div className="col">
                {ingredienteAux.ingrediente?.nombre}
                </div>
                <div className="col">
                <input type='number' defaultValue={ingredienteAux.cantidad} onChange={e => ingredienteAux.cantidad = Number(e.target.value)}/>
                </div>
                <div className="col">
                {ingredienteAux.ingrediente?.unidadMedida}
                </div>
                <div className="col">
                <button style={{ marginBottom:10 }} className="btn btn-danger" onClick={(e) => deleteIngrediente(ingredienteAux)}>Eliminar</button>
                </div>
            </div>
               )}
            <div>
                <p style={{ color: 'red', lineHeight : 5, padding: 5 }}>{txtValidacion}</p>
            </div>
            <div className="col">
                <button onClick={save} className="btn btn-success" type="button">
                    Guardar
                </button>
                <a href={`/grilla`} style={{marginLeft:25}}>
                    <button type="button" className="btn btn-warning">Volver</button>
                </a>
            </div>
        </div>
        </>
      )
}
    
export default Formulario