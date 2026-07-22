// Sistema avanzado de comportamiento de habitantes - Village Soul


const cargarArchivo =
require("./cargador_datos.js");


const guardarArchivo =
require("./guardador_datos.js");


const crearEvento =
require("./eventos.js");


const crearMemoria =
require("./memorias.js");






// =================================
// OBTENER COMPORTAMIENTO
// =================================

function obtenerComportamiento(
    habitante_id
){


    const datos =
    cargarArchivo("../datos/comportamientos.json");


    if(!datos){

        return null;

    }



    return datos.comportamientos.find(

        c=>c.habitante_id===habitante_id

    ) || null;


}







// =================================
// CREAR COMPORTAMIENTO
// =================================

function crearComportamiento(
    habitante_id
){


    const datos =
    cargarArchivo("../datos/comportamientos.json");


    if(!datos){

        return null;

    }



    const comportamiento = {


        id:
        datos.comportamientos.length + 1,


        habitante_id,



        estado_actual:
        "idle",



        accion_actual:
        "descansar",



        destino:null,



        siguiendo:null,



        objetivo_actual:null,



        ultima_accion:null,



        historial:[]



    };





    datos.comportamientos.push(
        comportamiento
    );





    guardarArchivo(

        "../datos/comportamientos.json",

        datos

    );





    return comportamiento;


}








// =================================
// EJECUTAR ACCIÓN
// =================================

function ejecutarAccion(
    habitante_id,
    accion,
    datosExtra={}
){



    let comportamiento =
    obtenerComportamiento(
        habitante_id
    );



    if(!comportamiento){


        comportamiento =
        crearComportamiento(
            habitante_id
        );


    }







    comportamiento.accion_actual =
    accion;



    comportamiento.estado_actual =
    "ejecutando";



    comportamiento.ultima_accion =
    new Date().toISOString();






    comportamiento.historial.push({


        accion,


        fecha:
        comportamiento.ultima_accion,


        datos:
        datosExtra


    });







    realizarAccionBase(

        comportamiento,

        accion,

        datosExtra

    );






    guardarComportamiento(

        comportamiento

    );





    crearEvento(

        "accion_habitante",

        [

            habitante_id

        ],

        {

            accion

        }

    );





    crearMemoria(

        habitante_id,

        "accion",

        "Realizó la acción: "+accion,

        "baja"

    );






    return comportamiento;


}








// =================================
// ACCIONES DISPONIBLES
// =================================

function realizarAccionBase(
comportamiento,
accion,
datos
){



    switch(accion){



        case "caminar":


            comportamiento.estado_actual =
            "movimiento";


        break;






        case "dormir":


            comportamiento.estado_actual =
            "descansando";


        break;






        case "trabajar":


            comportamiento.estado_actual =
            "trabajando";


        break;






        case "comer":


            comportamiento.estado_actual =
            "alimentandose";


        break;






        case "hablar":


            comportamiento.estado_actual =
            "socializando";


        break;






        case "ayudar":


            comportamiento.estado_actual =
            "ayudando";


        break;






        case "proteger":


            comportamiento.estado_actual =
            "defendiendo";


        break;






        case "explorar":


            comportamiento.estado_actual =
            "explorando";


        break;






        case "seguir_jugador":


            comportamiento.siguiendo =
            datos.jugador || null;


        break;






        case "ir_a_casa":


            comportamiento.destino =
            datos.casa || null;


        break;






        default:


            comportamiento.estado_actual =
            "idle";


    }



}









// =================================
// CAMBIAR ESTADO
// =================================

function cambiarEstado(
habitante_id,
estado
){



    const comportamiento =
    obtenerComportamiento(
        habitante_id
    );



    if(!comportamiento){

        return null;

    }



    comportamiento.estado_actual =
    estado;



    guardarComportamiento(
        comportamiento
    );



    return comportamiento;


}








// =================================
// OBTENER ACCIÓN ACTUAL
// =================================

function obtenerAccionActual(
habitante_id
){



    const comportamiento =
    obtenerComportamiento(
        habitante_id
    );



    return comportamiento
    ?
    comportamiento.accion_actual
    :
    null;


}








// =================================
// GUARDAR
// =================================

function guardarComportamiento(
comportamiento
){



    const datos =
    cargarArchivo("../datos/comportamientos.json");



    if(!datos){

        return null;

    }




    const indice =
    datos.comportamientos.findIndex(

        c=>c.id===comportamiento.id

    );



    if(indice!==-1){

        datos.comportamientos[indice]=comportamiento;

    }




    guardarArchivo(

        "../datos/comportamientos.json",

        datos

    );



    return comportamiento;


}







module.exports={


    obtenerComportamiento,

    crearComportamiento,

    ejecutarAccion,

    cambiarEstado,

    obtenerAccionActual


};
