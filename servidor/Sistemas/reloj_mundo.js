// Sistema avanzado de reloj del mundo - Village Soul
// Este sistema SOLO consulta el tiempo.
// El control pertenece a tiempo.js


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



    return tiempo
    ?
    tiempo.hora
    :
    null;


}









// =================================
// OBTENER MINUTO
// =================================

function obtenerMinuto(){


    const tiempo =
    obtenerTiempo();



    return tiempo
    ?
    tiempo.minuto
    :
    null;


}









// =================================
// MOMENTO DEL DÍA
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
        hora>=0 &&
        hora<6
    ){

        return "madrugada";

    }





    if(
        hora>=6 &&
        hora<12
    ){

        return "mañana";

    }






    if(
        hora>=12 &&
        hora<18
    ){

        return "tarde";

    }






    return "noche";


}









// =================================
// ESTADO DEL DÍA
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
// HORARIOS DE VIDA
// =================================

function esHoraDormir(){


    const hora =
    obtenerHora();



    if(hora===null){

        return false;

    }



    return (

        hora>=22

        ||

        hora<6

    );


}









function esHoraTrabajo(){


    const hora =
    obtenerHora();



    if(hora===null){

        return false;

    }



    return (

        hora>=8

        &&

        hora<17

    );


}









function esHoraComer(){


    const hora =
    obtenerHora();



    if(hora===null){

        return false;

    }



    return (

        hora===7

        ||

        hora===12

        ||

        hora===19

    );


}









// =================================
// FECHA
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
// FECHA EN TEXTO
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









// =================================
// EXPORTAR
// =================================

module.exports={


    obtenerTiempo,


    obtenerHora,


    obtenerMinuto,


    obtenerMomentoDia,


    obtenerFecha,


    obtenerFechaTexto,


    esDia,


    esNoche,


    esHoraDormir,


    esHoraTrabajo,


    esHoraComer


};
