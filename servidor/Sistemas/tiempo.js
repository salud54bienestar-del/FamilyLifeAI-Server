// Sistema avanzado de tiempo del mundo - Village Soul


const cargarArchivo =
require("./cargador_datos.js");


const guardarArchivo =
require("./guardador_datos.js");


const crearEvento =
require("./eventos.js");




// =================================
// CONFIGURACIÓN
// =================================


const MINUTOS_REALES_POR_DIA = 20;

const DIAS_POR_MES = 30;

const MESES_POR_AÑO = 12;







// =================================
// OBTENER TIEMPO
// =================================


function obtenerTiempo(){


    const datos =
    cargarArchivo(
        "datos/tiempo.json"
    );


    if(!datos){

        return null;

    }



    prepararTiempo(datos);



    return datos.tiempo;


}








// =================================
// PREPARAR DATOS
// =================================


function prepararTiempo(datos){


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
        "datos/tiempo.json"
    );



    if(!datos){

        return null;

    }



    prepararTiempo(datos);



    const tiempo =
    datos.tiempo;




    tiempo.contador_real += minutosReales;



    let nuevoDiaMinecraft=false;






    if(
        tiempo.contador_real >= MINUTOS_REALES_POR_DIA
    ){


        tiempo.contador_real=0;


        tiempo.dia++;


        nuevoDiaMinecraft=true;


    }







    // reloj del día


    tiempo.minuto += 3;



    if(tiempo.minuto >= 60){


        tiempo.minuto=0;


        tiempo.hora++;


    }



    if(tiempo.hora >=24){


        tiempo.hora=0;


    }








    actualizarCalendario(
        tiempo
    );



    actualizarEstacion(
        tiempo
    );







    if(nuevoDiaMinecraft){


        crearEvento(

            "nuevo_dia",

            [],

            {

                fecha:
                generarFechaTexto(tiempo)

            }

        );


    }







    guardarArchivo(

        "datos/tiempo.json",

        datos

    );






    return {


        ...tiempo,


        nuevo_dia_minecraft:


        nuevoDiaMinecraft,


        periodo:


        obtenerPeriodoDesdeTiempo(tiempo)



    };


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


    }



    if(tiempo.mes > MESES_POR_AÑO){


        tiempo.mes=1;


        tiempo.año++;


    }



}








// =================================
// ESTACIONES
// =================================


function actualizarEstacion(
    tiempo
){


    if(tiempo.mes>=3 && tiempo.mes<=5){

        tiempo.estacion="primavera";

    }

    else if(tiempo.mes>=6 && tiempo.mes<=8){

        tiempo.estacion="verano";

    }

    else if(tiempo.mes>=9 && tiempo.mes<=11){

        tiempo.estacion="otoño";

    }

    else{

        tiempo.estacion="invierno";

    }


    return tiempo.estacion;


}









// =================================
// FECHA
// =================================


function generarFechaTexto(
    tiempo
){


    return (

        "Día "+
        tiempo.dia+
        " de "+
        tiempo.estacion+
        " año "+
        tiempo.año

    );


}









// =================================
// PERIODO
// =================================


function obtenerPeriodoDesdeTiempo(
    tiempo
){


    if(tiempo.hora>=6 && tiempo.hora<12){

        return "mañana";

    }


    if(tiempo.hora>=12 && tiempo.hora<18){

        return "dia";

    }


    if(tiempo.hora>=18 && tiempo.hora<22){

        return "tarde";

    }


    return "noche";


}





function obtenerPeriodo(){


    const tiempo =
    obtenerTiempo();


    if(!tiempo){

        return null;

    }


    return obtenerPeriodoDesdeTiempo(tiempo);


}









module.exports={


    obtenerTiempo,


    avanzarTiempo,


    obtenerPeriodo,


    actualizarEstacion,


    generarFechaTexto


};
