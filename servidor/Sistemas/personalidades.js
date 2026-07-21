// Sistema de personalidades de Village Soul

const cargarArchivo = require("./cargador_datos.js");
const crearMemoria = require("./memorias.js");




// =================================
// BUSCAR PERSONALIDAD
// =================================

function obtenerPersonalidad(id){

    const datos =
    cargarArchivo("../datos/personalidades.json");


    if(!datos){

        console.log(
            "No se pudieron cargar las personalidades."
        );

        return null;

    }



    return datos.personalidades.find(

        p => p.id === id

    ) || null;

}







// =================================
// BUSCAR POR NOMBRE
// =================================

function buscarPersonalidad(nombre){


    const datos =
    cargarArchivo("../datos/personalidades.json");



    if(!datos){

        return null;

    }



    return datos.personalidades.find(

        p =>
        p.nombre === nombre.toLowerCase()

    ) || null;


}







// =================================
// ASIGNAR PERSONALIDAD
// =================================

function asignarPersonalidad(
    habitante,
    personalidad_id
){



    if(!habitante){

        return null;

    }



    const personalidad =
    obtenerPersonalidad(
        personalidad_id
    );



    if(!personalidad){

        console.log(
            "Personalidad no encontrada."
        );

        return null;

    }





    habitante.personalidad = {


        id:
        personalidad.id,


        nombre:
        personalidad.nombre,


        rasgos:
        personalidad.rasgos,


        curiosidad:
        personalidad.curiosidad,


        valentia:
        personalidad.valentia,


        sociabilidad:
        personalidad.sociabilidad,


        paciencia:
        personalidad.paciencia


    };





    crearMemoria(

        habitante.id,

        "personalidad",

        "Desarrolló una personalidad " +
        personalidad.nombre,

        "alta"

    );





    return habitante.personalidad;


}







// =================================
// OBTENER RASGOS
// =================================

function obtenerRasgos(
    habitante
){


    if(
        !habitante ||
        !habitante.personalidad
    ){

        return [];

    }



    return habitante.personalidad.rasgos || [];

}







// =================================
// MODIFICADORES DE PERSONALIDAD
// =================================

function obtenerModificador(
    habitante,
    tipo
){


    if(
        !habitante ||
        !habitante.personalidad
    ){

        return 0;

    }



    const personalidad =
    habitante.personalidad;



    if(
        personalidad[tipo] !== undefined
    ){

        return personalidad[tipo];

    }



    return 0;


}







module.exports = {


    obtenerPersonalidad,

    buscarPersonalidad,

    asignarPersonalidad,

    obtenerRasgos,

    obtenerModificador


};
