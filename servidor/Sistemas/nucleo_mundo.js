// Sistema núcleo del mundo - Village Soul


const cargarArchivo =
require("./cargador_datos.js");




// =================================
// OBTENER NÚCLEO DEL MUNDO
// =================================

function obtenerNucleo(){


    const datos =
    cargarArchivo("../datos/nucleo_mundo.json");



    if(!datos){

        console.log(
            "No se pudo cargar el núcleo del mundo."
        );

        return null;

    }



    return datos;


}







// =================================
// OBTENER SISTEMAS ACTIVOS
// =================================

function obtenerSistemas(){


    const nucleo =
    obtenerNucleo();



    if(!nucleo){

        return [];

    }



    return nucleo.sistemas || [];

}







// =================================
// VERIFICAR SISTEMA ACTIVO
// =================================

function sistemaActivo(
    nombre
){


    const sistemas =
    obtenerSistemas();



    return sistemas.includes(
        nombre
    );


}







// =================================
// INFORMACIÓN DEL MUNDO
// =================================

function obtenerInformacionMundo(){


    const mundo =
    cargarArchivo("../datos/mundo.json");



    if(!mundo){

        return null;

    }



    return {


        nombre:
        mundo.nombre,


        dia:
        mundo.dia_actual,


        estacion:
        mundo.estacion,


        estado:
        mundo.estado,


        poblacion:
        mundo.poblacion,


        aldeas:
        mundo.aldeas,


        epoca:
        mundo.epoca


    };


}







// =================================
// INICIALIZAR MUNDO
// =================================

function iniciarMundo(){


    const nucleo =
    obtenerNucleo();



    const mundo =
    obtenerInformacionMundo();



    if(
        !nucleo ||
        !mundo
    ){

        return null;

    }



    console.log("===============================");
    console.log("     VILLAGE SOUL INICIADO");
    console.log("===============================");



    console.log(
        "Mundo:",
        mundo.nombre
    );


    console.log(
        "Día:",
        mundo.dia
    );


    console.log(
        "Estación:",
        mundo.estacion
    );


    console.log(
        "Sistemas:",
        nucleo.sistemas
    );



    return {

        nucleo,

        mundo

    };


}







module.exports = {


    obtenerNucleo,

    obtenerSistemas,

    sistemaActivo,

    obtenerInformacionMundo,

    iniciarMundo


};
