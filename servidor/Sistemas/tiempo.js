// Sistema avanzado de tiempo del mundo - Village Soul
// Control principal del calendario y ciclo del mundo


const cargarArchivo =
require("./cargador_datos.js");


const guardarArchivo =
require("./guardador_datos.js");


const crearEvento =
require("./eventos.js");




// =================================
// CONFIGURACIÓN
// =================================


// Minutos reales para completar un día Village Soul

const MINUTOS_REALES_POR_DIA = 20;


// Cuántos minutos del mundo pasan por minuto real

const MINUTOS_MUNDO_POR_MINUTO_REAL = 3;


const DIAS_POR_MES = 30;

const MESES_POR_AÑO = 12;








// =================================
// PREPARAR TIEMPO
// =================================

function prepararTiempo(datos){


    if(!datos.tiempo){

        datos.tiempo={};

    }



    const tiempo = datos.tiempo;



    if(tiempo.dia===undefined)
        tiempo.dia=1;


    if(tiempo.mes===undefined)
        tiempo.mes=1;


    if(tiempo.año===undefined)
        tiempo.año=1;


    if(tiempo.hora===undefined)
        tiempo.hora=6;


    if(tiempo.minuto===undefined)
        tiempo.minuto=0;


    if(tiempo.contador_real===undefined)
        tiempo.contador_real=0;


    if(!tiempo.estacion)
        tiempo.estacion="primavera";


    return tiempo;

}









// =================================
// OBTENER TIEMPO
// =================================

function obtenerTiempo(){


    const datos =
    cargarArchivo(
        "../datos/tiempo.json"
    );



    if(!datos){

        return null;

    }



    return prepararTiempo(datos);


}









// =================================
// AVANZAR TIEMPO
// =================================

function avanzarTiempo(
    minutosReales=1
){


    const datos =
    cargarArchivo(
        "../datos/tiempo.json"
    );



    if(!datos){

        return null;

    }



    const tiempo =
    prepararTiempo(datos);




    let diasPasados=0;





    tiempo.contador_real += minutosReales;





    while(
        tiempo.contador_real >=
        MINUTOS_REALES_POR_DIA
    ){


        tiempo.contador_real -=
        MINUTOS_REALES_POR_DIA;


        avanzarDia(
            tiempo
        );


        diasPasados++;


    }








    tiempo.minuto +=

    minutosReales *

    MINUTOS_MUNDO_POR_MINUTO_REAL;








    while(
        tiempo.minuto>=60
    ){


        tiempo.minuto-=60;


        tiempo.hora++;


    }







    while(
        tiempo.hora>=24
    ){


        tiempo.hora-=24;


    }







    actualizarCalendario(
        tiempo
    );



    actualizarEstacion(
        tiempo
    );







    guardarArchivo(

        "../datos/tiempo.json",

        datos

    );







    return {


        ...tiempo,


        dias_pasados:
        diasPasados,


        periodo:
        obtenerPeriodo(tiempo)


    };


}









// =================================
// AVANZAR DÍA
// =================================

function avanzarDia(
tiempo
){


    tiempo.dia++;





    crearEvento(

        "nuevo_dia",

        [],

        {

            dia:
            tiempo.dia

        }

    );



}









// =================================
// CALENDARIO
// =================================

function actualizarCalendario(
tiempo
){



    if(tiempo.dia > DIAS_POR_MES){


        tiempo.dia=1;


        tiempo.mes++;


        crearEvento(

            "nuevo_mes",

            [],

            {

                mes:
                tiempo.mes

            }

        );


    }






    if(tiempo.mes > MESES_POR_AÑO){


        tiempo.mes=1;


        tiempo.año++;



        crearEvento(

            "nuevo_año",

            [],

            {

                año:
                tiempo.año

            }

        );


    }


}









// =================================
// ESTACIONES
// =================================

function actualizarEstacion(
tiempo
){



    let nueva;



    if(
        tiempo.mes>=3 &&
        tiempo.mes<=5
    ){

        nueva="primavera";

    }

    else if(
        tiempo.mes>=6 &&
        tiempo.mes<=8
    ){

        nueva="verano";

    }

    else if(
        tiempo.mes>=9 &&
        tiempo.mes<=11
    ){

        nueva="otoño";

    }

    else{

        nueva="invierno";

    }







    if(
        tiempo.estacion !== nueva
    ){


        tiempo.estacion=nueva;



        crearEvento(

            "cambio_estacion",

            [],

            {

                estacion:nueva

            }

        );


    }



    return nueva;


}









// =================================
// PERIODO DEL DÍA
// =================================

function obtenerPeriodo(
tiempo
){


    const hora =
    tiempo.hora;



    if(
        hora>=0 &&
        hora<6
    )

        return "madrugada";




    if(
        hora>=6 &&
        hora<12
    )

        return "mañana";




    if(
        hora>=12 &&
        hora<18
    )

        return "tarde";




    return "noche";


}









// =================================
// FECHA TEXTO
// =================================

function generarFechaTexto(
tiempo
){


    return (

        "Día "

        +

        tiempo.dia

        +

        " de "

        +

        tiempo.estacion

        +

        " año "

        +

        tiempo.año

    );


}









module.exports={


    obtenerTiempo,


    avanzarTiempo,


    actualizarEstacion,


    generarFechaTexto,


    obtenerPeriodo


};
