// Sistema avanzado de reloj del mundo - Village Soul
// Este archivo SOLO consulta el tiempo.
// El control del tiempo pertenece a tiempo.js


const cargarArchivo =
require("./cargador_datos.js");




// =================================
// OBTENER TIEMPO ACTUAL
// =================================

function obtenerTiempo(){


    const datos =
    cargarArchivo(
        "../datos/tiempo.json"
    );



    if(!datos){

        return null;

    }



    if(!datos.tiempo){


        return {

            hora:6,

            minuto:0,

            dia:1,

            mes:1,

            año:1,

            estacion:"primavera"

        };

    }



    return datos.tiempo;


}








// =================================
// OBTENER HORA
// =================================

function obtenerHora(){


    const tiempo =
    obtenerTiempo();



    if(!tiempo){

        return null;

    }



    return tiempo.hora;


}








// =================================
// OBTENER MOMENTO DEL DÍA
// =================================

function obtenerMomentoDia(){


    const tiempo =
    obtenerTiempo();



    if(!tiempo){

        return null;

    }



    const hora =
    tiempo.hora;





    if(
        hora >= 0 &&
        hora < 6
    ){

        return "madrugada";

    }





    if(
        hora >= 6 &&
        hora < 12
    ){

        return "mañana";

    }






    if(
        hora >=12 &&
        hora <18
    ){

        return "tarde";

    }






    if(
        hora >=18 &&
        hora <24
    ){

        return "noche";

    }



}









// =================================
// ES DE DÍA
// =================================

function esDia(){


    const momento =
    obtenerMomentoDia();



    return (

        momento==="mañana"

        ||

        momento==="tarde"

    );


}









// =================================
// ES DE NOCHE
// =================================

function esNoche(){


    const momento =
    obtenerMomentoDia();



    return (

        momento==="noche"

        ||

        momento==="madrugada"

    );


}









// =================================
// OBTENER FECHA COMPLETA
// =================================

function obtenerFecha(){


    const tiempo =
    obtenerTiempo();



    if(!tiempo){

        return null;

    }



    return {


        dia:
        tiempo.dia,


        mes:
        tiempo.mes,


        año:
        tiempo.año,


        estacion:
        tiempo.estacion


    };


}









// =================================
// TEXTO DE FECHA
// =================================

function obtenerFechaTexto(){


    const fecha =
    obtenerFecha();



    if(!fecha){

        return null;

    }



    return (

        "Día "

        +

        fecha.dia

        +

        " de "

        +

        fecha.estacion

        +

        " del año "

        +

        fecha.año

    );


}









module.exports={


    obtenerTiempo,

    obtenerHora,

    obtenerMomentoDia,

    obtenerFecha,

    obtenerFechaTexto,

    esDia,

    esNoche


};
