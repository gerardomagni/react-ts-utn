import { ChangeEventHandler, MouseEventHandler } from "react";
import Ingrediente from "./Ingrediente";
import PlatoIngrediente from "./PlatoIngrediente";

export default class Plato{

        id:number = 0;
        imagenPath:string = "";
        nombre:string = "";
        descripcion:string = "";
        precio:number = 0;
        rubro:string = "";
        ingredientes?:Ingrediente[] = [];
        ingredientesPlato?:PlatoIngrediente[] = [];
        urlImagenPath?:string = "";
        strPrecio?:string = "";
        cantidad:number = 1;//transient
        addCarrito?:ChangeEventHandler;
    
}