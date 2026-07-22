// Sistema de ciclo del mundo - Village Soul


const avanzarTiempo =
require("./tiempo.js")
.avanzarTiempo;



const actualizarCrecimiento =
require("./crecimiento.js")
.actualizarCrecimiento;



const crearEvento =
require("./eventos.js");



const obtenerMundo =
require("./mundo.js")
.obtenerMundo;



// Sistemas opcionales

let actualizarEmbarazos = null;

try{

    actualizarEmbarazos =
    require("./embarazos.js")
    .actualizarEmbarazos;

}
catch(e){}





let actualizarEconomia = null;

try{

    actualizarEconomia =
    require("./recursos.js")
    .actualizarEconomia;

}
catch(e){}





let actualizarNecesidades = null;

try{

    actualizarNecesidades =
    require("./necesidades.js")
    .actualizarNecesidades;

}
catch(e){}





let ejecutarRutinas = null;

try{

    ejecutarRutinas =
    require("./rutinas.js")
    .ejecutarRutinas;

}
catch(e){}








// =================================
// EJECUTAR CICLO
// =================================


function ejecutarCiclo(){



console.log(
"=============================="
);


console.log(
"Ciclo Village Soul"
);


console.log(
"=============================="
);






// Tiempo


const tiempo =
avanzarTiempo(1);



if(!tiempo){

return null;

}








// Rutinas diarias


if(ejecutarRutinas){

    ejecutarRutinas();

}









// Nuevo día Minecraft


if(
tiempo.nuevo_dia_minecraft === true
){



console.log(
"Nuevo día del mundo."
);





// Crecimiento

actualizarCrecimiento();






// Embarazos

if(actualizarEmbarazos){

actualizarEmbarazos();

}






// Economía

if(actualizarEconomia){

actualizarEconomia();

}







// Necesidades

if(actualizarNecesidades){

actualizarNecesidades();

}







crearEvento(

"ciclo_diario",

[],

{

dia:
tiempo.dia,


mes:
tiempo.mes,


año:
tiempo.año


}

);



}









const mundo =
obtenerMundo();







return {


tiempo,


mundo


};



}








// =================================
// VARIOS CICLOS
// =================================


function ejecutarDias(
cantidad
){



let resultado=null;



for(
let i=0;
i<cantidad;
i++
){


resultado =
ejecutarCiclo();


}



return resultado;



}








module.exports={


ejecutarCiclo,


ejecutarDias


};
