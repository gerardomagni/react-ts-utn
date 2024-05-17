import PreferenceMP from "../entidades/mercadopago/PreferenceMP";
import Ingrediente from "../entidades/Ingrediente";
import Pedido from "../entidades/Pedido";
import Plato from "../entidades/Plato";

export async function getPlatosJSONFetch(){
	const urlServer = 'http://localhost:8080/api/platos';
	const response = await fetch(urlServer, {
		method: 'GET',
        headers: {
			'Content-type': 'application/json',
			'Access-Control-Allow-Origin':'*'
		},
        mode: 'cors'
	});
	console.log(response);
	return await response.json();
}

export async function getPlatoXIdFecth(id:number){
	const urlServer = 'http://localhost:8080/api/platoxid/'+id;
    console.log(urlServer);
	const response = await fetch(urlServer, {
		method: 'GET',
        headers: {
			'Content-type': 'application/json',
			'Access-Control-Allow-Origin':'*'
		},
        mode: 'cors'
	});
	return await response.json() as Plato;
    
}

export async function deletePlatoXId(id:number){
	
	let urlServer = 'http://localhost:8080/api/eliminar/'+id;
	await fetch(urlServer, {
		method: 'GET',
        headers: {
			'Content-type': 'application/json',
			'Access-Control-Allow-Origin':'*'
		},
        mode: 'cors'
	});
}

export async function getPlatosXBusqueda(termino:String){
	let urlServer = 'http://localhost:8080/api/buscar/'+termino;
	let response = await fetch(urlServer, {
		method: 'GET',
        headers: {
			'Content-type': 'application/json',
			'Access-Control-Allow-Origin':'*'
		},
        mode: 'cors'
	});
	console.log(response);
	return await response.json();
}

export async function getIngredienteXIdFetch(id:number){
	let urlServer = 'http://localhost:8080/api/ingredientexid/'+id;
	let response = await fetch(urlServer, {
		method: 'GET',
        headers: {
			'Content-type': 'application/json',
			'Access-Control-Allow-Origin':'*'
		},
        mode: 'cors'
	});
	return await response.json() as Ingrediente;
}

export async function getIngredientesDataBaseJSON(){
	let urlServer = 'http://localhost:8080/api/ingredientes';
	let response = await fetch(urlServer, {
		method: 'GET',
		headers: {
			'Content-type': 'application/json',
			'Access-Control-Allow-Origin':'*'
		},
		mode: 'cors'
	});
	console.log(response);
	return await response.json();
}

export async function savePlato(plato?: Plato) {
	let urlServer = 'http://localhost:8080/api/insert';
	let method:string = "POST";
	if(plato && plato.id > 0){
		urlServer = 'http://localhost:8080/api/update';
		method = "PUT";
	}
	await fetch(urlServer, {
	  "method": method,
	  "body": JSON.stringify(plato),
	  "headers": {
		"Content-Type": 'application/json'
	  }
	});
}

export async function getIngredienteXCodigo(codigo:string){
	let urlServer = 'http://localhost:8080/api/ingredientexcodigo/'+codigo;
	let response = await fetch(urlServer, {
		method: 'GET',
        headers: {
			'Content-type': 'application/json',
			'Access-Control-Allow-Origin':'*'
		},
        mode: 'cors'
	});
    return await response.json() as Ingrediente;    
}


export function getPlatosJSON(){

    const datos:Plato[] = [];
	
	return datos
	
}



export async function createPreferenceMP(pedido?:Pedido){
    let urlServer = 'http://localhost:8080/api/create_preference_mp';
	let method:string = "POST";
    const response = await fetch(urlServer, {
	  "method": method,
	  "body": JSON.stringify(pedido),
	  "headers": {
		"Content-Type": 'application/json'
	  }
	});
    return await response.json() as PreferenceMP;   
}   

