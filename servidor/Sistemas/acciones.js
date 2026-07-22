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
// CREAR PERFIL DE UBICACIONES
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





    const nueva = {


        id:
        datos.ubicaciones.length + 1,


        habitante_id,



        hogar:null,


        trabajo:null,


        escuela:null,



        lugares_visitados:[],



        amigos:{},



        familia:{},



        lugares_favoritos:[],



        ultima_actualizacion:null


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

        "Registró sus lugares importantes.",

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



    const ubicacion =
    obtenerUbicaciones(
        habitante_id
    );



    if(!ubicacion){

        return null;

    }




    ubicacion[tipo]={


        nombre,


        x:coordenadas.x || 0,

        y:coordenadas.y || 0,

        z:coordenadas.z || 0,


        actualizado:
        new Date().toISOString()


    };





    ubicacion.ultima_actualizacion =
    new Date().toISOString();





    const datos =
    cargarArchivo("../datos/ubicaciones.json");



    const index =
    datos.ubicaciones.findIndex(

        u=>u.habitante_id===habitante_id

    );





    datos.ubicaciones[index]=ubicacion;



    guardarArchivo(

        "../datos/ubicaciones.json",

        datos

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
// GUARDAR HOGAR
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
// GUARDAR TRABAJO
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
// GUARDAR AMIGO
// =================================


function guardarAmigo(
habitante_id,
amigo_id,
coordenadas
){


    const ubicacion =
    obtenerUbicaciones(
        habitante_id
    );



    if(!ubicacion){

        return null;

    }




    ubicacion.amigos[amigo_id]={


        x:coordenadas.x,

        y:coordenadas.y,

        z:coordenadas.z


    };





    actualizar(
        ubicacion
    );



    return ubicacion.amigos[amigo_id];


}









// =================================
// AGREGAR LUGAR VISITADO
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
// ACTUALIZAR DATOS
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

    crearUbicaciones,

    establecerHogar,

    establecerTrabajo,

    guardarAmigo,

    registrarLugarVisitado,

    obtenerDestino


};
