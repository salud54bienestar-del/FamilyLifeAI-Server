// Sistema avanzado de familias - Village Soul


const cargarArchivo =
require("./cargador_datos.js");


const guardarArchivo =
require("./guardador_datos.js");


const crearEvento =
require("./eventos.js");


const crearMemoria =
require("./memorias.js");


const {
obtenerEtapaHabitante
}
=
require("./etapas_vida.js");




// =================================
// FECHA DEL MUNDO
// =================================

function obtenerFechaMundo(){

const tiempo =
cargarArchivo("../datos/tiempo.json");


if(!tiempo || !tiempo.tiempo){

return new Date().toISOString();

}


return tiempo.tiempo;

}









// =================================
// PUEDE FORMAR FAMILIA
// =================================

function puedeFormarFamilia(
habitante
){


if(!habitante){

return false;

}



const etapa =
obtenerEtapaHabitante(
habitante
);



if(!etapa){

return false;

}



return (

etapa.nombre==="adulto"

||

etapa.nombre==="adulto_mayor"

);

}









// =================================
// CREAR FAMILIA
// =================================

function crearFamilia(
apellido="",
tipo="nuclear"
){


const datos =
cargarArchivo("../datos/familias.json");


if(!datos){

return null;

}



if(!datos.familias){

datos.familias=[];

}




const id =

datos.familias.length>0

?

Math.max(
...datos.familias.map(
f=>f.id
)
)+1

:

1;




const familia={


id,


apellido,


miembros:[],


padres:[],


hijos:[],


generacion:1,


tipo_familia:tipo,


estado:"activa",


hogar:null,



estabilidad:{


confianza:50,


felicidad:50,


recursos:0


},



recursos_compartidos:{


alimentos:0,


esmeraldas:0


},



reputacion:0,


historial:[

{

evento:"familia_creada",

fecha:obtenerFechaMundo()

}

]


};




datos.familias.push(
familia
);



guardarArchivo(

"../datos/familias.json",

datos

);



crearEvento(

"familia_creada",

[],

{

familia_id:id

}

);



return familia;


}









// =================================
// MATRIMONIO
// =================================

function crearFamiliaMatrimonio(
a,
b,
apellido=""
){



const almas =
cargarArchivo("../datos/almas.json");



if(!almas){

return null;

}




const personaA =
almas.almas.find(
x=>x.id===a
);


const personaB =
almas.almas.find(
x=>x.id===b
);




if(

!puedeFormarFamilia(personaA)

||

!puedeFormarFamilia(personaB)

){

return null;

}





const familia =
crearFamilia(

apellido,

"matrimonio"

);




agregarMiembro(

familia.id,

a,

"padre"

);



agregarMiembro(

familia.id,

b,

"madre"

);





familia.historial.push({

evento:"matrimonio",

fecha:obtenerFechaMundo()

});





guardarFamilia(
familia
);





crearMemoria(

a,

"familia",

"Formó una familia.",

"alta",

[b]

);



crearMemoria(

b,

"familia",

"Formó una familia.",

"alta",

[a]

);



crearEvento(

"matrimonio",

[a,b],

{

familia:familia.id

}

);



return familia;


}









// =================================
// AGREGAR MIEMBRO
// =================================

function agregarMiembro(
idFamilia,
habitante_id,
rol="miembro"
){


const familia =
obtenerFamiliaPorId(
idFamilia
);



if(!familia){

return null;

}



if(!familia.miembros.includes(habitante_id)){

familia.miembros.push(
habitante_id
);

}



if(
rol==="padre" ||
rol==="madre"
){


familia.padres.push({

habitante_id,

rol

});


}



crearMemoria(

habitante_id,

"familia",

"Ahora pertenece a una familia.",

"media"

);



guardarFamilia(
familia
);



return familia;

}









// =================================
// AGREGAR HIJO
// =================================

function agregarHijo(
idFamilia,
hijo_id,
tipo="biologico"
){


const familia =
obtenerFamiliaPorId(
idFamilia
);



if(!familia){

return null;

}



familia.hijos.push({

habitante_id:hijo_id,

tipo,

fecha:obtenerFechaMundo()

});




agregarMiembro(

idFamilia,

hijo_id,

"hijo"

);





crearEvento(

"nacimiento",

familia.miembros,

{

hijo:hijo_id

}

);



return familia;


}









// =================================
// GUARDAR FAMILIA
// =================================

function guardarFamilia(
familia
){


const datos =
cargarArchivo("../datos/familias.json");



const index =
datos.familias.findIndex(

f=>f.id===familia.id

);



if(index!==-1){

datos.familias[index]=familia;

}



guardarArchivo(

"../datos/familias.json",

datos

);


}









// =================================
// OBTENER
// =================================

function obtenerFamilia(
habitante_id
){


const datos =
cargarArchivo("../datos/familias.json");


if(!datos){

return null;

}



return datos.familias.find(

f=>f.miembros.includes(
habitante_id
)

)||null;


}




function obtenerFamiliaPorId(
id
){


const datos =
cargarArchivo("../datos/familias.json");


if(!datos){

return null;

}



return datos.familias.find(

f=>f.id===id

)||null;


}




function listarFamilias(){


const datos =
cargarArchivo("../datos/familias.json");


return datos?.familias || [];

}








module.exports={


crearFamilia,

crearFamiliaMatrimonio,

agregarMiembro,

agregarHijo,

obtenerFamilia,

obtenerFamiliaPorId,

listarFamilias,

puedeFormarFamilia


};
