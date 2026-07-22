// Sistema avanzado de tiempo del mundo - Village Soul


const cargarArchivo =
require("./cargador_datos.js");


const guardarArchivo =
require("./guardador_datos.js");


const crearEvento =
require("./eventos.js");




// =================================
// CONFIGURACIÓN
// =================================


const MINUTOS_REALES_POR_DIA = 20;


const DIAS_POR_MES = 30;


const MESES_POR_AÑO = 12;




// =================================
// OBTENER TIEMPO
// =================================

function obtenerTiempo(){


const datos =
cargarArchivo(
"datos/tiempo.json"
);



if(!datos){

return null;

}


return datos.tiempo;


}






// =================================
// AVANZAR TIEMPO
// =================================


function avanzarTiempo(
minutosReales=1
){



const datos =
cargarArchivo(
"datos/tiempo.json"
);



if(!datos){

return null;

}



const tiempo =
datos.tiempo;




if(tiempo.contador_real===undefined){

tiempo.contador_real=0;

}



tiempo.contador_real += minutosReales;



let nuevoDiaMinecraft=false;






// Cada 20 minutos reales

if(
tiempo.contador_real >= MINUTOS_REALES_POR_DIA
){



tiempo.contador_real=0;


tiempo.dia++;


nuevoDiaMinecraft=true;



}







// Avance del reloj

tiempo.minuto += 3;



if(tiempo.minuto>=60){


tiempo.minuto=0;


tiempo.hora++;


}



if(tiempo.hora>=24){


tiempo.hora=0;


}








actualizarCalendario(
tiempo
);



actualizarEstacion(
tiempo
);







// Guardar estado del día

tiempo.nuevo_dia_minecraft =
nuevoDiaMinecraft;








if(nuevoDiaMinecraft){



crearEvento(

"nuevo_dia",

[],

{

fecha:
generarFechaTexto(tiempo)


}

);


}







guardarArchivo(

"datos/tiempo.json",

datos

);







return tiempo;


}









// =================================
// CALENDARIO
// =================================


function actualizarCalendario(
tiempo
){



if(
tiempo.dia > DIAS_POR_MES
){


tiempo.dia=1;


tiempo.mes++;


}



if(
tiempo.mes > MESES_POR_AÑO
){


tiempo.mes=1;


tiempo.año++;


}



}








// =================================
// ESTACIONES
// =================================


function actualizarEstacion(
tiempo
){


if(tiempo.mes>=3 && tiempo.mes<=5){


tiempo.estacion="primavera";


}

else if(tiempo.mes>=6 && tiempo.mes<=8){


tiempo.estacion="verano";


}

else if(tiempo.mes>=9 && tiempo.mes<=11){


tiempo.estacion="otoño";


}

else{


tiempo.estacion="invierno";


}



return tiempo.estacion;


}








// =================================
// FECHA TEXTO
// =================================


function generarFechaTexto(
tiempo
){


return (

"Día "+
tiempo.dia+
" de "+
tiempo.estacion+
" año "+
tiempo.año

);


}









// =================================
// PERIODO DEL DÍA
// =================================


function obtenerPeriodo(){



const tiempo =
obtenerTiempo();



if(!tiempo){

return null;

}



if(tiempo.hora>=6 && tiempo.hora<12){

return "mañana";

}



if(tiempo.hora>=12 && tiempo.hora<18){

return "dia";

}



if(tiempo.hora>=18 && tiempo.hora<22){

return "tarde";

}



return "noche";


}







module.exports={


obtenerTiempo,


avanzarTiempo,


obtenerPeriodo,


actualizarEstacion,


generarFechaTexto


};
