// Sistema de tiempo del mundo - Village Soul


const cargarArchivo =
require("./cargador_datos.js");


const crearEvento =
require("./eventos.js");




// =================================
// CONFIGURACIÓN DEL TIEMPO
// =================================


// Minecraft:
// 20 minutos reales = 1 día Minecraft

const MINUTOS_REALES_POR_DIA =
20;


const HORAS_POR_DIA =
24;


const DIAS_POR_MES =
30;


const MESES_POR_AÑO =
12;






// =================================
// OBTENER TIEMPO ACTUAL
// =================================

function obtenerTiempo(){


    const datos =
    cargarArchivo("../datos/tiempo.json");



    if(!datos){

        console.log(
            "No se pudo cargar tiempo."
        );

        return null;

    }



    return datos.tiempo;

}







// =================================
// AVANZAR TIEMPO
// =================================

function avanzarTiempo(
    minutosReales = 1
){



    const datos =
    cargarArchivo("../datos/tiempo.json");



    if(!datos){

        return null;

    }



    const tiempo =
    datos.tiempo;



    if(
        !tiempo.contador_minecraft
    ){

        tiempo.contador_minecraft = 0;

    }




    let nuevoDiaMinecraft = false;





    // Acumular tiempo real

    tiempo.contador_minecraft += minutosReales;





    // Cada 20 minutos reales
    // pasa un día Minecraft

    if(
        tiempo.contador_minecraft >=
        MINUTOS_REALES_POR_DIA
    ){


        tiempo.contador_minecraft = 0;


        tiempo.dia++;


        nuevoDiaMinecraft = true;


    }







    // Avanza hora Minecraft


    tiempo.hora += 24 / 20;



    if(
        tiempo.hora >= 24
    ){

        tiempo.hora = 0;

    }





    // Convertir decimales a horas y minutos


    tiempo.hora =
    Math.floor(
        tiempo.hora
    );



    tiempo.minuto =
    Math.floor(
        (24 / 20 % 1) * 60
    );






    // Mes


    if(
        tiempo.dia > DIAS_POR_MES
    ){


        tiempo.dia = 1;

        tiempo.mes++;


    }





    // Año


    if(
        tiempo.mes > MESES_POR_AÑO
    ){


        tiempo.mes = 1;

        tiempo.año++;


    }





    actualizarEstacion(
        tiempo
    );







    if(
        nuevoDiaMinecraft
    ){


        crearEvento(

            "nuevo_dia",

            [],

            {

                dia:
                tiempo.dia,

                mes:
                tiempo.mes,

                año:
                tiempo.año


            }

        );


    }





    return tiempo;


}








// =================================
// ESTACIONES
// =================================

function actualizarEstacion(
    tiempo
){



    if(
        tiempo.mes >=3 &&
        tiempo.mes <=5
    ){

        tiempo.estacion =
        "primavera";

    }

    else if(
        tiempo.mes >=6 &&
        tiempo.mes <=8
    ){

        tiempo.estacion =
        "verano";

    }

    else if(
        tiempo.mes >=9 &&
        tiempo.mes <=11
    ){

        tiempo.estacion =
        "otoño";

    }

    else{

        tiempo.estacion =
        "invierno";

    }


    return tiempo.estacion;


}








// =================================
// PERIODO DEL DÍA
// =================================

function obtenerPeriodo(){



    const tiempo =
    obtenerTiempo();



    if(!tiempo){

        return null;

    }



    if(
        tiempo.hora >=6 &&
        tiempo.hora <12
    ){

        return "mañana";

    }


    if(
        tiempo.hora >=12 &&
        tiempo.hora <18
    ){

        return "dia";

    }


    if(
        tiempo.hora >=18 &&
        tiempo.hora <22
    ){

        return "tarde";

    }



    return "noche";


}






module.exports = {


    obtenerTiempo,

    avanzarTiempo,

    obtenerPeriodo,

    actualizarEstacion


};
