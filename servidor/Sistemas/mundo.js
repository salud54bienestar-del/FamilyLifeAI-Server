// Sistema del mundo de Village Soul

const cargarArchivo = require("./cargador_datos.js");




// =================================
// OBTENER MUNDO
// =================================

function obtenerMundo(){

    const datos =
    cargarArchivo("../datos/mundo.json");


    if(!datos){

        console.log(
            "No se pudo cargar el mundo."
        );

        return null;

    }


    return datos;

}






// =================================
// AVANZAR DÍA
// =================================

function avanzarDia(){


    const mundo =
    obtenerMundo();



    if(!mundo){

        return null;

    }



    mundo.dia_actual++;



    return mundo;


}






// =================================
// CAMBIAR ESTACIÓN
// =================================

function cambiarEstacion(
    estacion
){


    const mundo =
    obtenerMundo();



    if(!mundo){

        return null;

    }



    mundo.estacion =
    estacion;



    return mundo;


}






// =================================
// CAMBIAR ESTADO DEL MUNDO
// =================================

function cambiarEstado(
    estado
){


    const mundo =
    obtenerMundo();



    if(!mundo){

        return null;

    }



    mundo.estado =
    estado;



    return mundo;


}






// =================================
// AGREGAR LUGAR
// =================================

function agregarLugar(
    nombre,
    tipo
){


    const mundo =
    obtenerMundo();



    if(!mundo){

        return null;

    }



    const nuevoId =

    mundo.lugares.length > 0

    ?

    Math.max(
        ...mundo.lugares.map(
            l=>l.id
        )
    ) + 1

    :

    1;



    const lugar = {

        id:nuevoId,

        nombre,

        tipo,

        descubierto:false

    };



    mundo.lugares.push(
        lugar
    );



    return lugar;


}






// =================================
// MODIFICAR RECURSOS
// =================================

function modificarRecurso(
    recurso,
    cantidad
){


    const mundo =
    obtenerMundo();



    if(!mundo){

        return null;

    }



    if(
        mundo.recursos[recurso] === undefined
    ){

        return null;

    }



    mundo.recursos[recurso] += cantidad;



    if(
        mundo.recursos[recurso] < 0
    ){

        mundo.recursos[recurso] = 0;

    }



    return mundo.recursos;


}






module.exports = {


    obtenerMundo,

    avanzarDia,

    cambiarEstacion,

    cambiarEstado,

    agregarLugar,

    modificarRecurso


};
