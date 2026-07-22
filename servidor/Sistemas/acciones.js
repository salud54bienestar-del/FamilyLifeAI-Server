// Sistema avanzado de ubicaciones de habitantes - Village Soul


const cargarArchivo =
require("./cargador_datos.js");


const guardarArchivo =
require("./guardador_datos.js");


const crearEvento =
require("./eventos.js");


const crearMemoria =
require("./memorias.js");




// =================================
// OBTENER UBICACIONES
// =================================

function obtenerUbicaciones(
habitante_id
){


    const datos =
    cargarArchivo("../datos/ubicaciones.json");



    if(!datos){

        return null;

    }



    return datos.ubicaciones.find(

        u=>u.habitante_id===habitante_id

    ) || null;


}






// =================================
// OBTENER UBICACION HABITANTE
// =================================

function obtenerUbicacionHabitante(
habitante_id
){

    return obtenerUbicaciones(
        habitante_id
    );

}






// =================================
// CREAR PERFIL
// =================================

function crearUbicaciones(
habitante_id
){


    const datos =
    cargarArchivo("../datos/ubicaciones.json");



    if(!datos){

        return null;

    }



    const existente =
    obtenerUbicaciones(
        habitante_id
    );



    if(existente){

        return existente;

    }




    const nueva={


        id:
        datos.ubicaciones.length+1,


        habitante_id,



        hogar:null,


        trabajo:null,


        escuela:null,



        ultima_posicion:null,



        amigos:{},



        familia:{},



        lugares_visitados:[],



        lugares_favoritos:[],



        ultima_actualizacion:
        null


    };





    datos.ubicaciones.push(
        nueva
    );



    guardarArchivo(

        "../datos/ubicaciones.json",

        datos

    );





    crearMemoria(

        habitante_id,

        "ubicacion",

        "Creó su registro de lugares importantes.",

        "baja"

    );



    return nueva;


}








// =================================
// GUARDAR UBICACION
// =================================

function guardarUbicacion(
habitante_id,
tipo,
coordenadas,
nombre=""
){



    let ubicacion =
    obtenerUbicaciones(
        habitante_id
    );



    if(!ubicacion){

        ubicacion =
        crearUbicaciones(
            habitante_id
        );

    }





    ubicacion[tipo]={


        nombre,


        x:
        coordenadas.x || 0,


        y:
        coordenadas.y || 0,


        z:
        coordenadas.z || 0,



        actualizado:
        new Date().toISOString()


    };





    actualizar(
        ubicacion
    );





    crearEvento(

        "ubicacion_guardada",

        [
            habitante_id
        ],

        {
            tipo,
            nombre
        }

    );




    return ubicacion[tipo];


}








// =================================
// CASA
// =================================

function establecerHogar(
habitante_id,
coordenadas
){

    return guardarUbicacion(

        habitante_id,

        "hogar",

        coordenadas,

        "Casa"

    );

}








// =================================
// TRABAJO
// =================================

function establecerTrabajo(
habitante_id,
coordenadas,
nombre
){

    return guardarUbicacion(

        habitante_id,

        "trabajo",

        coordenadas,

        nombre

    );

}








// =================================
// ESCUELA
// =================================

function establecerEscuela(
habitante_id,
coordenadas
){

    return guardarUbicacion(

        habitante_id,

        "escuela",

        coordenadas,

        "Escuela"

    );

}








// =================================
// GUARDAR AMIGO
// =================================

function guardarAmigo(
habitante_id,
amigo_id,
datosAmigo={}
){



    let ubicacion =
    obtenerUbicaciones(
        habitante_id
    );



    if(!ubicacion){

        ubicacion =
        crearUbicaciones(
            habitante_id
        );

    }





    ubicacion.amigos[amigo_id]={


        relacion:
        datosAmigo.relacion || "amigo",



        confianza:
        datosAmigo.confianza || 0,



        x:
        datosAmigo.x || 0,


        y:
        datosAmigo.y || 0,


        z:
        datosAmigo.z || 0


    };





    actualizar(
        ubicacion
    );



    return ubicacion.amigos[amigo_id];


}








// =================================
// REGISTRAR POSICION ACTUAL
// =================================

function actualizarPosicion(
habitante_id,
coordenadas
){



    const ubicacion =
    obtenerUbicaciones(
        habitante_id
    );



    if(!ubicacion){

        return null;

    }



    ubicacion.ultima_posicion={

        x:coordenadas.x,

        y:coordenadas.y,

        z:coordenadas.z

    };



    actualizar(
        ubicacion
    );


    return ubicacion.ultima_posicion;


}








// =================================
// LUGAR VISITADO
// =================================

function registrarLugarVisitado(
habitante_id,
lugar
){



    const ubicacion =
    obtenerUbicaciones(
        habitante_id
    );



    if(!ubicacion){

        return null;

    }



    ubicacion.lugares_visitados.push(
        lugar
    );



    actualizar(
        ubicacion
    );



    return lugar;


}








// =================================
// ACTUALIZAR
// =================================

function actualizar(
ubicacion
){


    const datos =
    cargarArchivo("../datos/ubicaciones.json");



    const index =
    datos.ubicaciones.findIndex(

        u=>u.id===ubicacion.id

    );



    if(index!==-1){

        datos.ubicaciones[index]=ubicacion;

    }



    guardarArchivo(

        "../datos/ubicaciones.json",

        datos

    );


}








// =================================
// OBTENER DESTINO
// =================================

function obtenerDestino(
habitante_id,
tipo
){


    const ubicacion =
    obtenerUbicaciones(
        habitante_id
    );



    if(!ubicacion){

        return null;

    }



    return ubicacion[tipo] || null;


}








module.exports={


    obtenerUbicaciones,

    obtenerUbicacionHabitante,

    crearUbicaciones,

    establecerHogar,

    establecerTrabajo,

    establecerEscuela,

    guardarAmigo,

    actualizarPosicion,

    registrarLugarVisitado,

    obtenerDestino


};
