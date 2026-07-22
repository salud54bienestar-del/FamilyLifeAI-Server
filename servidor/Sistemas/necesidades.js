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



if(
!datos ||
!datos.necesidades
){

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






const nueva={


habitante_id,


etapa,


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



ultima_actualizacion:null



};







datos.necesidades.push(
nueva
);



guardarArchivo(

"../datos/necesidades.json",

datos

);



return nueva;


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



const alma =
almas?.almas.find(

a=>a.id===habitante_id

);




if(!alma){

return null;

}





const etapa =
obtenerEtapaHabitante(
alma
);




let consumo=1;






// ===============================
// ETAPA DE VIDA
// ===============================


switch(
etapa?.nombre
){


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
alma.profesion &&
alma.profesion.nombre!=="ninguna"
){


consumo+=0.3;


necesidad.estres+=1*ciclo;


}








// ===============================
// PERSONALIDAD
// ===============================


if(
alma.rasgos
&&
alma.rasgos.includes("activo")
){


necesidad.diversion-=0.5*ciclo;


}


if(
alma.rasgos
&&
alma.rasgos.includes("social")
){


necesidad.social-=0.5*ciclo;


}








// ===============================
// CONSUMO NORMAL
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







// Recuperación natural

necesidad.estres-=0.5*ciclo;







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
// ESTADOS CRÍTICOS
// =================================


function revisarEstados(
habitante_id,
n
){



if(
n.hambre<20
){


crearEvento(

"hambre_critica",

[habitante_id]

);



cambiarEmocion(

habitante_id,

"tristeza",

5,

"hambre"

);


}






if(
n.energia<20
){


cambiarEmocion(

habitante_id,

"estres",

5,

"cansancio"

);


}






if(
n.social<20
){


cambiarEmocion(

habitante_id,

"soledad",

5,

"aislamiento"

);


}





if(
n.carino<20
){


cambiarEmocion(

habitante_id,

"soledad",

3,

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

satisfacerNecesidad,

actualizarEstado


};
