// Sistema avanzado de movimiento de habitantes - Village Soul


const cargarArchivo =
require("./cargador_datos.js");


const guardarArchivo =
require("./guardador_datos.js");


const crearEvento =
require("./eventos.js");


const crearMemoria =
require("./memorias.js");


const ubicaciones =
require("./ubicaciones.js");




// =================================
// OBTENER MOVIMIENTO
// =================================

function obtenerMovimiento(
habitante_id
){


const datos =
cargarArchivo("../datos/movimientos.json");



if(!datos){

return null;

}



if(!datos.movimientos){

datos.movimientos=[];

}



return datos.movimientos.find(

m=>m.habitante_id===habitante_id

)||null;


}








// =================================
// CREAR MOVIMIENTO
// =================================

function crearMovimiento(
habitante_id,
posicionInicial={}
){


const datos =
cargarArchivo("../datos/movimientos.json");



if(!datos){

return null;

}



if(!datos.movimientos){

datos.movimientos=[];

}



const existente =
obtenerMovimiento(
habitante_id
);



if(existente){

return existente;

}





const movimiento={


id:
datos.movimientos.length+1,


habitante_id,



posicion_actual:{


x:posicionInicial.x ?? 0,

y:posicionInicial.y ?? 0,

z:posicionInicial.z ?? 0


},



ultima_ubicacion:"inicio",



destino:null,


tipo_destino:null,


estado:"quieto",


velocidad:1,


siguiendo:null,


ultima_actualizacion:
new Date().toISOString()


};






datos.movimientos.push(
movimiento
);



guardarArchivo(

"../datos/movimientos.json",

datos

);





// Crear memoria espacial

ubicaciones.crearUbicacion(
habitante_id
);





crearMemoria(

habitante_id,

"movimiento",

"Registró su posición inicial.",

"baja"

);





return movimiento;


}









// =================================
// ESTABLECER DESTINO
// =================================

function establecerDestino(
habitante_id,
destino,
tipo="desconocido"
){



let movimiento =
obtenerMovimiento(
habitante_id
);



if(!movimiento){

movimiento =
crearMovimiento(
habitante_id
);

}




movimiento.destino={


x:destino.x ?? 0,

y:destino.y ?? 0,

z:destino.z ?? 0


};




movimiento.tipo_destino =
tipo;


movimiento.estado =
"caminando";



movimiento.siguiendo=null;



movimiento.ultima_actualizacion =
new Date().toISOString();




guardarMovimiento(
movimiento
);





crearEvento(

"movimiento_iniciado",

[habitante_id],

{

destino,

tipo

}

);





crearMemoria(

habitante_id,

"movimiento",

"Se dirigió hacia "+tipo,

"baja"

);





return movimiento;


}









// =================================
// IR A UBICACIÓN
// =================================

function irAUbicacion(
habitante_id,
tipo
){


const destino =
ubicaciones.obtenerDestino(

habitante_id,

tipo

);



if(!destino){

return null;

}



return establecerDestino(

habitante_id,

destino,

tipo

);


}








function irAHogar(id){

return irAUbicacion(id,"hogar");

}


function irAlTrabajo(id){

return irAUbicacion(id,"trabajo");

}


function irAEscuela(id){

return irAUbicacion(id,"escuela");

}









// =================================
// VISITAR AMIGO
// =================================

function irAVisitarAmigo(
habitante_id,
amigo_id
){


const amigo =
ubicaciones.obtenerUbicacion(
amigo_id
);



if(
!amigo ||
!amigo.hogar
){

return null;

}




crearMemoria(

habitante_id,

"relacion",

"Fue a visitar a un amigo.",

"media"

);





return establecerDestino(

habitante_id,

amigo.hogar,

"amigo"

);


}









// =================================
// SEGUIR HABITANTE
// =================================

function seguirHabitante(
habitante_id,
objetivo_id
){


const movimiento =
obtenerMovimiento(
habitante_id
);



if(!movimiento){

return null;

}




movimiento.siguiendo =
objetivo_id;


movimiento.estado =
"siguiendo";



guardarMovimiento(
movimiento
);



crearEvento(

"siguiendo_habitante",

[
habitante_id,
objetivo_id
]

);



return movimiento;


}









// =================================
// ACTUALIZAR POSICIÓN
// =================================

function actualizarPosicion(
habitante_id,
posicion
){


const movimiento =
obtenerMovimiento(
habitante_id
);



if(!movimiento){

return null;

}





movimiento.posicion_actual={


x:posicion.x ?? 0,

y:posicion.y ?? 0,

z:posicion.z ?? 0


};




movimiento.ultima_actualizacion =
new Date().toISOString();





verificarLlegada(
movimiento
);





guardarMovimiento(
movimiento
);



return movimiento;


}









// =================================
// VERIFICAR LLEGADA
// =================================

function verificarLlegada(
movimiento
){



if(!movimiento.destino){

return false;

}




const distancia =

Math.sqrt(

Math.pow(
movimiento.posicion_actual.x -
movimiento.destino.x,
2)

+

Math.pow(
movimiento.posicion_actual.y -
movimiento.destino.y,
2)

+

Math.pow(
movimiento.posicion_actual.z -
movimiento.destino.z,
2)

);






if(distancia<=1){



movimiento.estado="llegado";


movimiento.ultima_ubicacion =
movimiento.tipo_destino;



crearEvento(

"lugar_alcanzado",

[
movimiento.habitante_id
],

{

tipo:
movimiento.tipo_destino

}

);



crearMemoria(

movimiento.habitante_id,

"movimiento",

"Llegó a "+movimiento.tipo_destino,

"baja"

);



return true;


}



return false;


}









// =================================
// DETENER MOVIMIENTO
// =================================

function detenerMovimiento(
habitante_id
){


const movimiento =
obtenerMovimiento(
habitante_id
);



if(!movimiento){

return null;

}



movimiento.estado="quieto";


movimiento.destino=null;


movimiento.siguiendo=null;



guardarMovimiento(
movimiento
);



return movimiento;


}









// =================================
// GUARDAR
// =================================

function guardarMovimiento(
movimiento
){


const datos =
cargarArchivo("../datos/movimientos.json");



if(!datos){

return null;

}



if(!datos.movimientos){

datos.movimientos=[];

}




const index =
datos.movimientos.findIndex(

m=>m.id===movimiento.id

);



if(index!==-1){

datos.movimientos[index]=movimiento;

}



guardarArchivo(

"../datos/movimientos.json",

datos

);



return movimiento;


}








module.exports={


obtenerMovimiento,

crearMovimiento,

establecerDestino,

irAUbicacion,

irAHogar,

irAlTrabajo,

irAEscuela,

irAVisitarAmigo,

seguirHabitante,

actualizarPosicion,

detenerMovimiento


};
