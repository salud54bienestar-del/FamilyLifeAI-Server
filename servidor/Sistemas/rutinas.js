// Sistema avanzado de rutinas de habitantes - Village Soul


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



    return datos.rutinas.find(

        r=>r.habitante_id===habitante_id

    ) || null;

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



    const rutina={


        id:

        datos.rutinas.length+1,


        habitante_id,


        etapa,


        horario:
        generarHorario(etapa),


        actividad_actual:
        "descansar",


        ultima_actualizacion:null



    };





    datos.rutinas.push(rutina);



    guardarArchivo(

        "../datos/rutinas.json",

        datos

    );




    crearMemoria(

        habitante_id,

        "rutina",

        "Creó una rutina diaria.",

        "baja"

    );




    return rutina;

}









// =================================
// HORARIOS
// =================================

function generarHorario(
etapa
){


switch(etapa){


case "niño":

return [

{
hora:7,
accion:"despertar"
},

{
hora:8,
accion:"ir_escuela"
},

{
hora:13,
accion:"jugar"
},

{
hora:18,
accion:"familia"
},

{
hora:21,
accion:"dormir"
}

];





case "adolescente":

return [

{
hora:7,
accion:"entrenar"
},

{
hora:10,
accion:"socializar"
},

{
hora:14,
accion:"aprender"
},

{
hora:18,
accion:"hobby"
},

{
hora:22,
accion:"dormir"
}

];







case "adulto":

return [

{
hora:6,
accion:"despertar"
},

{
hora:8,
accion:"ir_trabajo"
},

{
hora:17,
accion:"regresar_hogar"
},

{
hora:20,
accion:"familia"
},

{
hora:23,
accion:"dormir"
}

];







case "adulto_mayor":

return [

{
hora:7,
accion:"pasear"
},

{
hora:10,
accion:"enseñar"
},

{
hora:15,
accion:"socializar"
},

{
hora:21,
accion:"dormir"
}

];







default:

return [

{
hora:8,
accion:"descansar"
}

];


}


}









// =================================
// EJECUTAR ACCIÓN DE RUTINA
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

"rutina",

"Pasó tiempo con su familia.",

"baja"

);


break;







case "dormir":


crearMemoria(

habitante_id,

"rutina",

"Fue a descansar.",

"baja"

);


break;






case "pasear":


crearMemoria(

habitante_id,

"rutina",

"Salió a pasear.",

"baja"

);


break;


}



return true;


}









// =================================
// ACTUALIZAR RUTINA
// =================================

function actualizarRutina(
habitante_id,
horaActual,
contexto={}
){



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






const actividad =

rutina.horario.find(

a=>a.hora===horaActual

);





if(!actividad){

return rutina;

}






rutina.actividad_actual =
actividad.accion;



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
actividad.accion

}

);






return rutina;


}









// =================================
// PROFESIONES
// =================================

function adaptarRutinaProfesion(
rutina,
profesion
){


if(!rutina || !profesion){

return rutina;

}



rutina.horario.push({

hora:9,

accion:"trabajar"

});



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
