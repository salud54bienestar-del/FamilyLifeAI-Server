// Sistema avanzado de rutinas de habitantes - Village Soul
// Versión 2.0


const cargarArchivo =
require("./cargador_datos.js");


const guardarArchivo =
require("./guardador_datos.js");


const crearEvento =
require("./eventos.js");


const crearMemoria =
require("./memorias.js");


const movimiento =
require("./movimiento.js");


const reloj =
require("./reloj_mundo.js");






// =================================
// OBTENER RUTINA
// =================================

function obtenerRutina(
habitante_id
){


const datos =
cargarArchivo("../datos/rutinas.json");



if(!datos){

return null;

}



if(!datos.rutinas){

datos.rutinas=[];

}



return datos.rutinas.find(

r=>r.habitante_id===habitante_id

)||null;


}









// =================================
// CREAR RUTINA
// =================================

function crearRutina(
habitante_id,
etapa="adulto"
){


const datos =
cargarArchivo("../datos/rutinas.json");



if(!datos){

return null;

}



if(!datos.rutinas){

datos.rutinas=[];

}





const existente =
obtenerRutina(
habitante_id
);



if(existente){

return existente;

}





const rutina={


id:
datos.rutinas.length>0

?

Math.max(
...datos.rutinas.map(
r=>r.id
)
)+1

:

1,



habitante_id,


etapa,


horario:
generarHorario(etapa),



actividad_actual:
"descansar",



ultima_hora:null,



ultima_actualizacion:
new Date().toISOString()



};





datos.rutinas.push(
rutina
);



guardarArchivo(

"../datos/rutinas.json",

datos

);





crearMemoria(

habitante_id,

"rutina",

"Obtuvo una rutina diaria.",

"baja"

);





return rutina;


}









// =================================
// GENERAR HORARIO
// =================================

function generarHorario(
etapa
){



switch(etapa){


case "bebe":

return [

{hora:8,accion:"dormir"},

{hora:12,accion:"jugar"},

{hora:18,accion:"familia"}

];





case "niño":

return [

{hora:7,accion:"despertar"},

{hora:8,accion:"ir_escuela"},

{hora:13,accion:"jugar"},

{hora:18,accion:"familia"},

{hora:21,accion:"dormir"}

];





case "adolescente":

return [

{hora:7,accion:"despertar"},

{hora:10,accion:"socializar"},

{hora:14,accion:"aprender"},

{hora:18,accion:"hobby"},

{hora:22,accion:"dormir"}

];





case "adulto":

return [

{hora:6,accion:"despertar"},

{hora:8,accion:"ir_trabajo"},

{hora:17,accion:"regresar_hogar"},

{hora:20,accion:"familia"},

{hora:23,accion:"dormir"}

];





case "adulto_mayor":

return [

{hora:7,accion:"pasear"},

{hora:10,accion:"enseñar"},

{hora:15,accion:"socializar"},

{hora:21,accion:"dormir"}

];





default:

return [

{hora:8,accion:"descansar"}

];


}


}









// =================================
// EJECUTAR ACTIVIDAD
// =================================

function ejecutarActividad(
habitante_id,
actividad
){



switch(actividad){



case "ir_trabajo":

return movimiento.irAlTrabajo(
habitante_id
);





case "regresar_hogar":

return movimiento.irAHogar(
habitante_id
);





case "ir_escuela":

return movimiento.irAEscuela(
habitante_id
);





case "familia":


crearMemoria(

habitante_id,

"familia",

"Pasó tiempo con sus seres queridos.",

"media"

);


break;





case "dormir":


crearMemoria(

habitante_id,

"rutina",

"Descansó durante la noche.",

"baja"

);


break;





case "socializar":


crearMemoria(

habitante_id,

"social",

"Conversó con otros habitantes.",

"baja"

);


break;





case "pasear":


crearMemoria(

habitante_id,

"exploracion",

"Exploró los alrededores.",

"baja"

);


break;





default:


crearMemoria(

habitante_id,

"actividad",

"Realizó "+actividad,

"baja"

);


}



return true;


}









// =================================
// ACTUALIZAR RUTINA
// =================================

function actualizarRutina(
habitante_id,
horaActual=null,
contexto={}
){



if(horaActual===null){

horaActual =
reloj.obtenerHora();

}





let rutina =
obtenerRutina(
habitante_id
);





if(!rutina){


rutina =
crearRutina(

habitante_id,

contexto.etapa || "adulto"

);


}






// Cambio de etapa

if(

contexto.etapa &&

rutina.etapa !== contexto.etapa

){



rutina.etapa =
contexto.etapa;



rutina.horario =
generarHorario(
contexto.etapa
);





crearMemoria(

habitante_id,

"crecimiento",

"Su rutina cambió por una nueva etapa de vida.",

"media"

);


}







if(
rutina.ultima_hora===horaActual
){

return rutina;

}






const actividad =

rutina.horario.find(

a=>a.hora===horaActual

);





if(!actividad){

return rutina;

}





rutina.actividad_actual =
actividad.accion;



rutina.ultima_hora =
horaActual;



rutina.ultima_actualizacion =
new Date().toISOString();






ejecutarActividad(

habitante_id,

actividad.accion

);





guardarRutina(
rutina
);





crearEvento(

"actividad_rutina",

[habitante_id],

{

actividad:
actividad.accion,


hora:
horaActual,


momento:
reloj.obtenerMomentoDia()


}

);





return rutina;


}









// =================================
// ADAPTAR PROFESIÓN
// =================================

function adaptarRutinaProfesion(
rutina,
profesion
){



if(!rutina){

return rutina;

}





const trabajos={


agricultor:"trabajar_campo",

herrero:"forjar_objetos",

medico:"atender_pacientes",

cocinero:"cocinar",

maestro:"enseñar",

guardia:"patrullar"


};






const actividad =
trabajos[profesion];






if(
actividad &&

!rutina.horario.some(

h=>h.accion===actividad

)

){


rutina.horario.push({

hora:9,

accion:actividad

});


}





return rutina;


}









// =================================
// GUARDAR
// =================================

function guardarRutina(
rutina
){


const datos =
cargarArchivo("../datos/rutinas.json");



if(!datos){

return null;

}




if(!datos.rutinas){

datos.rutinas=[];

}





const index =
datos.rutinas.findIndex(

r=>r.id===rutina.id

);





if(index!==-1){

datos.rutinas[index]=rutina;

}




guardarArchivo(

"../datos/rutinas.json",

datos

);




return rutina;


}








module.exports={


obtenerRutina,

crearRutina,

actualizarRutina,

adaptarRutinaProfesion,

generarHorario


};
