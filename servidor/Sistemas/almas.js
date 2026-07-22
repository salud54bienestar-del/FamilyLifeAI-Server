// Sistema avanzado de necesidades - Village Soul


const cargarArchivo =
require("./cargador_datos.js");


const guardarArchivo =
require("./guardador_datos.js");


const crearMemoria =
require("./memorias.js");


const crearEvento =
require("./eventos.js");


const {
cambiarEmocion
}
=
require("./emociones.js");


const {
obtenerEtapaHabitante
}
=
require("./etapas.js");








// =================================
// OBTENER NECESIDADES
// =================================


function obtenerNecesidades(
habitante_id
){


const datos =
cargarArchivo("../datos/necesidades.json");


if(!datos){

return null;

}



return datos.necesidades.find(

n=>n.habitante_id===habitante_id

)||null;


}









// =================================
// CREAR NECESIDADES
// =================================


function crearNecesidades(
habitante_id,
etapa="adulto"
){


const datos =
cargarArchivo("../datos/necesidades.json");


if(!datos){

return null;

}



if(!datos.necesidades){

datos.necesidades=[];

}




const existente =
obtenerNecesidades(
habitante_id
);



if(existente){

return existente;

}






const necesidad={


habitante_id,


hambre:100,


energia:100,


higiene:100,


diversion:80,


social:70,


carino:80,


seguridad:100,


descanso:100,


estres:0,


estado:"estable",


etapa,


ultima_actualizacion:null


};






datos.necesidades.push(
necesidad
);



guardarArchivo(

"../datos/necesidades.json",

datos

);





return necesidad;


}









// =================================
// ACTUALIZAR NECESIDADES
// =================================


function actualizarNecesidades(
habitante_id,
ciclo=1
){


const necesidad =
obtenerNecesidades(
habitante_id
);



if(!necesidad){

return null;

}






const almas =
cargarArchivo("../datos/almas.json");




const habitante =
almas?.almas.find(

a=>a.id===habitante_id

);




if(!habitante){

return null;

}






// Obtener etapa correctamente

const etapa =
obtenerEtapaHabitante(
habitante
);







let consumo=1;







// ===============================
// EFECTOS POR EDAD
// ===============================


switch(etapa?.nombre){


case "bebe":

consumo=0.5;

necesidad.carino-=1*ciclo;

break;



case "niño":

consumo=0.8;

necesidad.diversion-=0.5*ciclo;

break;



case "adolescente":

consumo=1;

necesidad.social-=1*ciclo;

break;



case "adulto":

consumo=1.2;

break;



case "adulto_mayor":

consumo=0.9;

necesidad.descanso-=1*ciclo;

break;


}









// ===============================
// PROFESIÓN
// ===============================


if(
habitante.profesion &&
habitante.profesion.nombre!=="ninguna"
){


consumo+=0.5;


necesidad.estres+=1*ciclo;


}









// ===============================
// CONSUMO GENERAL
// ===============================


necesidad.hambre-=
2*ciclo*consumo;


necesidad.energia-=
1*ciclo*consumo;


necesidad.higiene-=
1*ciclo;


necesidad.diversion-=
0.5*ciclo;


necesidad.social-=
0.5*ciclo;


necesidad.descanso-=
1*ciclo;








limitar(
necesidad
);




revisarEstados(

habitante_id,

necesidad

);




actualizarEstado(
necesidad
);





necesidad.ultima_actualizacion =
new Date().toISOString();






guardarNecesidades();



return necesidad;


}









// =================================
// REVISAR ESTADOS CRÍTICOS
// =================================


function revisarEstados(
habitante_id,
necesidad
){



if(
necesidad.hambre<20
){


crearEvento(

"hambre_critica",

[habitante_id]

);



cambiarEmocion(

habitante_id,

"tristeza",

10,

"hambre"

);


}






if(
necesidad.energia<20
){


cambiarEmocion(

habitante_id,

"estres",

10,

"cansancio"

);


}







if(
necesidad.social<20
){


cambiarEmocion(

habitante_id,

"soledad",

10,

"aislamiento"

);


}






if(
necesidad.carino<20
){


cambiarEmocion(

habitante_id,

"soledad",

5,

"falta de cariño"

);


}


}









// =================================
// SATISFACER NECESIDAD
// =================================


function satisfacerNecesidad(
habitante_id,
tipo
){


const necesidad =
obtenerNecesidades(
habitante_id
);



if(!necesidad){

return null;

}






switch(tipo){


case "comida":

necesidad.hambre=100;

break;




case "dormir":

necesidad.energia=100;

necesidad.descanso=100;

break;




case "familia":

necesidad.social=100;

necesidad.carino=100;

break;




case "diversion":

necesidad.diversion=100;

break;




case "seguridad":

necesidad.seguridad=100;

break;



}







crearMemoria(

habitante_id,

"necesidad",

"Recuperó necesidad: "+tipo,

"baja"

);







guardarNecesidades();



return necesidad;


}









// =================================
// LIMITAR VALORES
// =================================


function limitar(
objeto
){


Object.keys(objeto)
.forEach(

key=>{


if(
typeof objeto[key]==="number"
){


objeto[key]=Math.max(

0,

Math.min(

100,

objeto[key]

)

);


}


}

);


}









// =================================
// ESTADO GENERAL
// =================================


function actualizarEstado(
n
){



const promedio=

(
n.hambre+
n.energia+
n.higiene+
n.diversion+
n.social+
n.seguridad
)/6;






if(promedio>=80)

n.estado="feliz";



else if(promedio>=50)

n.estado="normal";



else if(promedio>=25)

n.estado="preocupado";



else

n.estado="critico";




return n;


}









// =================================
// GUARDAR
// =================================


function guardarNecesidades(){


const datos =
cargarArchivo("../datos/necesidades.json");



guardarArchivo(

"../datos/necesidades.json",

datos

);


}









module.exports={


obtenerNecesidades,

crearNecesidades,

actualizarNecesidades,

satisfacerNecesidad


};
