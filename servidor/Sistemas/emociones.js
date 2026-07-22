// Sistema avanzado de emociones - Village Soul


const cargarArchivo =
require("./cargador_datos.js");


const guardarArchivo =
require("./guardador_datos.js");


const crearMemoria =
require("./memorias.js");








// =================================
// OBTENER EMOCIONES
// =================================


function obtenerEmociones(
habitante_id
){


const datos =
cargarArchivo("../datos/emociones.json");



if(
!datos ||
!datos.emociones
){

return null;

}




return datos.emociones.find(

e=>e.habitante_id===habitante_id

)||null;


}









// =================================
// CREAR EMOCIÓN
// =================================


function crearEmocion(
habitante_id
){


const datos =
cargarArchivo("../datos/emociones.json");



if(
!datos
){

return null;

}



if(!datos.emociones){

datos.emociones=[];

}




const existente =
obtenerEmociones(
habitante_id
);



if(existente){

return existente;

}






const nueva={


habitante_id,



felicidad:50,

confianza:50,


miedo:0,

tristeza:0,

ira:0,


calma:50,



emociones_secundarias:{


amor:0,

soledad:0,

orgullo:0,

estres:0,

aburrimiento:0,

curiosidad:0,

esperanza:0,

motivacion:0


},



emocion_actual:"neutral",



intensidad:50,



estabilidad_emocional:50,



ultima_actualizacion:null


};






datos.emociones.push(
nueva
);



guardarArchivo(

"../datos/emociones.json",

datos

);





return nueva;


}









// =================================
// CAMBIAR EMOCIÓN
// =================================


function cambiarEmocion(
habitante_id,
emocion,
cantidad,
motivo=""
){



const datos =
cargarArchivo("../datos/emociones.json");



if(
!datos
){

return null;

}



let estado =
obtenerEmociones(
habitante_id
);




if(!estado){


estado =
crearEmocion(
habitante_id
);


}






// Emociones principales

if(
estado[emocion] !== undefined &&
typeof estado[emocion]==="number"
){


estado[emocion]+=cantidad;


}

else{


if(
!estado.emociones_secundarias
){

estado.emociones_secundarias={};

}



if(
!estado.emociones_secundarias[emocion]
){

estado.emociones_secundarias[emocion]=0;

}



estado.emociones_secundarias[emocion]+=cantidad;


}








limitarEmociones(
estado
);



actualizarEmocionActual(
estado
);




estado.ultima_actualizacion =
new Date().toISOString();






guardarArchivo(

"../datos/emociones.json",

datos

);







crearMemoria(

habitante_id,

"emocion",

"Sintió "+emocion+
" por "+motivo,

"baja"

);







return estado;


}









// =================================
// EMOCIÓN DOMINANTE
// =================================


function actualizarEmocionActual(
estado
){



const emociones={



felicidad:
estado.felicidad,


miedo:
estado.miedo,


tristeza:
estado.tristeza,


ira:
estado.ira,


calma:
estado.calma,



amor:
estado.emociones_secundarias?.amor || 0,


soledad:
estado.emociones_secundarias?.soledad || 0,


estres:
estado.emociones_secundarias?.estres || 0,


curiosidad:
estado.emociones_secundarias?.curiosidad || 0


};







let mayor="neutral";


let valor=0;






Object.keys(emociones)
.forEach(

emocion=>{


if(
emociones[emocion]>valor
){

valor=
emociones[emocion];


mayor=emocion;


}


}

);






estado.emocion_actual =
mayor;






estado.intensidad =
valor;






estado.estabilidad_emocional =

Math.max(

0,

100-

(

estado.tristeza+

estado.miedo+

estado.ira+

estado.emociones_secundarias.estres

)/4

);






limitarEmociones(
estado
);



return estado;


}









// =================================
// RECUPERACIÓN NATURAL
// =================================


function evolucionarEmociones(
habitante_id
){



const estado =
obtenerEmociones(
habitante_id
);



if(!estado){

return null;

}






estado.tristeza-=1;


estado.ira-=1;


estado.miedo-=1;


estado.emociones_secundarias.estres-=1;



estado.calma+=1;






limitarEmociones(
estado
);



actualizarEmocionActual(
estado
);




estado.ultima_actualizacion =
new Date().toISOString();







const datos =
cargarArchivo("../datos/emociones.json");



guardarArchivo(

"../datos/emociones.json",

datos

);







return estado;


}









// =================================
// LIMITAR VALORES
// =================================


function limitarEmociones(
obj
){



Object.keys(obj)
.forEach(

key=>{


if(
typeof obj[key]==="number"
){


obj[key]=Math.max(

0,

Math.min(

100,

obj[key]

)

);


}





else if(
typeof obj[key]==="object" &&
obj[key]!==null
){


limitarEmociones(
obj[key]
);


}


}

);


}









// =================================
// NECESIDADES → EMOCIONES
// =================================


function actualizarEmocionesPorNecesidades(
habitante_id,
necesidades
){



if(!necesidades){

return null;

}






if(
necesidades.hambre<30
){


cambiarEmocion(

habitante_id,

"tristeza",

5,

"hambre"

);


}







if(
necesidades.energia<30
){


cambiarEmocion(

habitante_id,

"estres",

5,

"cansancio"

);


}







if(
necesidades.social<30
){


cambiarEmocion(

habitante_id,

"soledad",

5,

"falta de compañía"

);


}







if(
necesidades.carino<30
){


cambiarEmocion(

habitante_id,

"soledad",

5,

"falta de cariño"

);


}






if(
necesidades.diversion>80
){


cambiarEmocion(

habitante_id,

"felicidad",

2,

"diversión"

);


}





return obtenerEmociones(
habitante_id
);


}








module.exports={


obtenerEmociones,


crearEmocion,


cambiarEmocion,


evolucionarEmociones,


actualizarEmocionesPorNecesidades


};
