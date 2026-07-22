// Sistema avanzado de ubicaciones personales - Village Soul


const cargarArchivo =
require("./cargador_datos.js");


const guardarArchivo =
require("./guardador_datos.js");


const crearEvento =
require("./eventos.js");


const crearMemoria =
require("./memorias.js");






// =================================
// OBTENER UBICACIÓN DEL HABITANTE
// =================================

function obtenerUbicacion(
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
// CREAR MEMORIA ESPACIAL
// =================================

function crearUbicacion(
    habitante_id
){


    const datos =
    cargarArchivo("../datos/ubicaciones.json");


    if(!datos){

        return null;

    }



    const existente =
    obtenerUbicacion(
        habitante_id
    );


    if(existente){

        return existente;

    }






    const ubicacion={


        id:

        datos.ubicaciones.length + 1,



        habitante_id,



        hogar:null,



        trabajo:null,



        escuela:null,



        lugares_favoritos:[],



        familiares:[],



        amigos:[],



        pareja:null,



        ultima_actualizacion:null



    };





    datos.ubicaciones.push(
        ubicacion
    );



    guardarArchivo(

        "../datos/ubicaciones.json",

        datos

    );






    crearMemoria(

        habitante_id,

        "ubicacion",

        "Registró su memoria espacial.",

        "baja"

    );




    return ubicacion;


}









// =================================
// ESTABLECER HOGAR
// =================================

function establecerHogar(
    habitante_id,
    posicion
){


    const ubicacion =
    obtenerUbicacion(
        habitante_id
    );


    if(!ubicacion){

        return null;

    }



    ubicacion.hogar={


        x:posicion.x,

        y:posicion.y,

        z:posicion.z,


        nombre:
        posicion.nombre ||
        "hogar"



    };



    actualizar(
        ubicacion
    );



    crearEvento(

        "nuevo_hogar",

        [
            habitante_id
        ],

        {

            posicion

        }

    );



    return ubicacion.hogar;


}









// =================================
// ESTABLECER TRABAJO
// =================================

function establecerTrabajo(
    habitante_id,
    trabajo
){


    const ubicacion =
    obtenerUbicacion(
        habitante_id
    );


    if(!ubicacion){

        return null;

    }




    ubicacion.trabajo={


        id:
        trabajo.id || null,


        nombre:
        trabajo.nombre,


        x:
        trabajo.x,


        y:
        trabajo.y,


        z:
        trabajo.z



    };



    actualizar(
        ubicacion
    );



    return ubicacion.trabajo;


}








// =================================
// ESTABLECER ESCUELA
// =================================

function establecerEscuela(
    habitante_id,
    escuela
){


    const ubicacion =
    obtenerUbicacion(
        habitante_id
    );


    if(!ubicacion){

        return null;

    }



    ubicacion.escuela=escuela;


    actualizar(
        ubicacion
    );


    return escuela;


}









// =================================
// AGREGAR AMIGO
// =================================

function agregarAmigo(
    habitante_id,
    amigo_id
){


    const ubicacion =
    obtenerUbicacion(
        habitante_id
    );


    if(!ubicacion){

        return null;

    }



    if(

        !ubicacion.amigos.includes(
            amigo_id
        )

    ){

        ubicacion.amigos.push(
            amigo_id
        );

    }



    actualizar(
        ubicacion
    );



    return ubicacion.amigos;


}









// =================================
// AGREGAR FAMILIAR
// =================================

function agregarFamiliar(
    habitante_id,
    familiar_id,
    parentesco
){


    const ubicacion =
    obtenerUbicacion(
        habitante_id
    );


    if(!ubicacion){

        return null;

    }



    ubicacion.familiares.push({

        habitante_id:familiar_id,

        parentesco

    });



    actualizar(
        ubicacion
    );



    return ubicacion.familiares;


}









// =================================
// BUSCAR DESTINO
// =================================

function obtenerDestino(
    habitante_id,
    tipo
){


    const ubicacion =
    obtenerUbicacion(
        habitante_id
    );



    if(!ubicacion){

        return null;

    }



    switch(tipo){


        case "hogar":

            return ubicacion.hogar;



        case "trabajo":

            return ubicacion.trabajo;



        case "escuela":

            return ubicacion.escuela;



        default:

            return null;


    }


}









// =================================
// ACTUALIZAR
// =================================

function actualizar(
    ubicacion
){


    ubicacion.ultima_actualizacion =
    new Date().toISOString();



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









module.exports={


    obtenerUbicacion,

    crearUbicacion,

    establecerHogar,

    establecerTrabajo,

    establecerEscuela,

    agregarAmigo,

    agregarFamiliar,

    obtenerDestino


};
