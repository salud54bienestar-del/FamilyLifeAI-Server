// Sistema avanzado de memorias - Village Soul


const cargarArchivo =
require("./cargador_datos.js");


const guardarArchivo =
require("./guardador_datos.js");








// =================================
// CREAR MEMORIA
// =================================


function crearMemoria(
habitante_id,
tipo,
descripcion,
importancia="baja",
personas=[],
emocion="neutral",
lugar=null,
efecto={},
aprendizaje=null
){



const datos =
cargarArchivo("../datos/memorias.json");



if(!datos){

return null;

}



if(!datos.memorias){

datos.memorias=[];

}






const id =

datos.memorias.length

?

Math.max(

...datos.memorias.map(

m=>m.id

)

)+1

:

1;








const influencia =

importancia==="alta"

?

90

:

importancia==="media"

?

60

:

30;








const categoria =

[
"felicidad",
"amor",
"orgullo"

].includes(emocion)

?

"positiva"

:

[
"tristeza",
"miedo",
"ira",
"estres"

].includes(emocion)

?

"negativa"

:

"neutral";









const memoria={



id,


habitante_id,



tipo,



descripcion,



importancia,



influencia,



categoria,



emocion,




personas_relacionadas:

personas,



lugar_relacionado:

lugar,





efecto_personalidad:{


confianza:

efecto.confianza || 0,


miedo:

efecto.miedo || 0,


felicidad:

efecto.felicidad || 0,


tristeza:

efecto.tristeza || 0


},




aprendizaje:



aprendizaje || "ninguno",




impacto_comportamiento:


importancia==="alta"

?

"fuerte"

:

importancia==="media"

?

"moderado"

:

"leve",





fuerza_recuerdo:100,


recordada:true,



fecha:

new Date().toISOString()


};







datos.memorias.push(
memoria
);







// Limitar memoria por habitante


const propias =

datos.memorias.filter(

m=>m.habitante_id===habitante_id

);



if(propias.length>500){



const eliminar =

propias

.sort(

(a,b)=>

new Date(a.fecha)-

new Date(b.fecha)

)

.slice(

0,

propias.length-500

);



datos.memorias =

datos.memorias.filter(

m=>!eliminar.includes(m)

);



}









guardarArchivo(

"../datos/memorias.json",

datos

);





return memoria;


}









// =================================
// OBTENER MEMORIAS
// =================================


function obtenerMemorias(
habitante_id
){


const datos =

cargarArchivo("../datos/memorias.json");



if(!datos || !datos.memorias){

return [];

}





return datos.memorias

.filter(

m=>m.habitante_id===habitante_id

)

.sort(

(a,b)=>

new Date(a.fecha)-

new Date(b.fecha)

);


}









// =================================
// BUSCAR TIPO
// =================================


function buscarMemoriasTipo(
habitante_id,
tipo
){


return obtenerMemorias(

habitante_id

)

.filter(

m=>m.tipo===tipo

);


}









// =================================
// BUSCAR PERSONA
// =================================


function buscarMemoriasPersona(
habitante_id,
persona_id
){


return obtenerMemorias(

habitante_id

)

.filter(

m=>

m.personas_relacionadas.includes(
persona_id
)

);


}









// =================================
// IMPORTANTES
// =================================


function obtenerRecuerdosImportantes(
habitante_id
){


return obtenerMemorias(

habitante_id

)

.filter(

m=>

m.influencia>=80

);


}









// =================================
// ÚLTIMO RECUERDO
// =================================


function ultimaMemoria(
habitante_id
){


const lista =

obtenerMemorias(

habitante_id

);



return lista.length

?

lista[lista.length-1]

:

null;


}









// =================================
// OLVIDAR CON EL TIEMPO
// =================================


function evolucionarMemorias(){



const datos =

cargarArchivo(

"../datos/memorias.json"

);



if(!datos){

return null;

}






datos.memorias.forEach(

memoria=>{


let perdida=1;



if(memoria.importancia==="alta")

perdida=0.2;


else if(memoria.importancia==="media")

perdida=0.5;





memoria.fuerza_recuerdo-=perdida;



if(memoria.fuerza_recuerdo<=0){


memoria.recordada=false;


}



}



);






guardarArchivo(

"../datos/memorias.json",

datos

);






return true;


}









// =================================
// ELIMINAR
// =================================


function eliminarMemoria(id){


const datos=

cargarArchivo("../datos/memorias.json");



if(!datos){

return false;

}



datos.memorias=

datos.memorias.filter(

m=>m.id!==id

);




guardarArchivo(

"../datos/memorias.json",

datos

);



return true;


}








module.exports={


crearMemoria,

obtenerMemorias,

buscarMemoriasTipo,

buscarMemoriasPersona,

obtenerRecuerdosImportantes,

ultimaMemoria,

evolucionarMemorias,

eliminarMemoria


};
