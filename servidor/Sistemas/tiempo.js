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


// Minutos reales necesarios para un día Village Soul

const MINUTOS_REALES_POR_DIA = 20;


// Minutos del mundo que pasan por minuto real

const MINUTOS_MUNDO_POR_MINUTO_REAL = 3;


const DIAS_POR_MES = 30;


const MESES_POR_AÑO = 12;









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



    prepararTiempo(datos);



    guardarArchivo(

        "../datos/tiempo.json",

        datos

    );



    return datos.tiempo;


}









// =================================
// PREPARAR DATOS
// =================================

function prepararTiempo(
datos
){



    if(!datos.tiempo){

        datos.tiempo={};

    }



    const tiempo =
    datos.tiempo;





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




    prepararTiempo(datos);




    const tiempo =
    datos.tiempo;






    let nuevoDiaMinecraft=false;





    tiempo.contador_real += minutosReales;





    // Control de día Village Soul

    if(
        tiempo.contador_real >=
        MINUTOS_REALES_POR_DIA
    ){



        tiempo.contador_real=0;


        tiempo.dia++;


        nuevoDiaMinecraft=true;


        crearEvento(

            "nuevo_dia",

            [],

            {

                dia:
                tiempo.dia

            }

        );


    }









    // Avance de reloj interno


    tiempo.minuto +=

    MINUTOS_MUNDO_POR_MINUTO_REAL *
    minutosReales;





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






    const resultado={


        ...tiempo,


        nuevo_dia_minecraft:
        nuevoDiaMinecraft,


        periodo:
        obtenerPeriodo(
            tiempo
        )

    };







    guardarArchivo(

        "../datos/tiempo.json",

        datos

    );






    return resultado;


}









// =================================
// CALENDARIO
// =================================

function actualizarCalendario(
tiempo
){



    if(
        tiempo.dia >
        DIAS_POR_MES
    ){


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






    if(
        tiempo.mes >
        MESES_POR_AÑO
    ){


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



    let nuevaEstacion;



    if(
        tiempo.mes>=3 &&
        tiempo.mes<=5
    ){

        nuevaEstacion="primavera";

    }

    else if(
        tiempo.mes>=6 &&
        tiempo.mes<=8
    ){

        nuevaEstacion="verano";

    }

    else if(
        tiempo.mes>=9 &&
        tiempo.mes<=11
    ){

        nuevaEstacion="otoño";

    }

    else{

        nuevaEstacion="invierno";

    }






    if(
        tiempo.estacion !== nuevaEstacion
    ){



        tiempo.estacion =
        nuevaEstacion;



        crearEvento(

            "cambio_estacion",

            [],

            {

                estacion:
                nuevaEstacion

            }

        );


    }




}









// =================================
// MOMENTO DEL DÍA
// =================================

function obtenerPeriodo(
tiempo
){



    if(
        tiempo.hora>=6 &&
        tiempo.hora<12
    ){

        return "mañana";

    }



    if(
        tiempo.hora>=12 &&
        tiempo.hora<18
    ){

        return "tarde";

    }



    if(
        tiempo.hora>=18 &&
        tiempo.hora<24
    ){

        return "noche";

    }



    return "madrugada";


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


    generarFechaTexto,


    actualizarEstacion,


    obtenerPeriodo


};
