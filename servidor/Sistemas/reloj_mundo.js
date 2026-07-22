// Sistema avanzado de reloj del mundo - Village Soul


const cargarArchivo =
require("./cargador_datos.js");


const guardarArchivo =
require("./guardador_datos.js");


const crearEvento =
require("./eventos.js");


// =================================
// OBTENER TIEMPO
// =================================

function obtenerTiempo(){


    const datos =
    cargarArchivo("../datos/tiempo.json");



    if(!datos){

        return null;

    }



    if(!datos.tiempo){


        datos.tiempo={

            hora:6,

            dia:1,

            mes:1,

            año:1,

            estacion:"primavera"

        };


        guardarTiempo(datos);

    }



    return datos.tiempo;


}







// =================================
// GUARDAR TIEMPO
// =================================

function guardarTiempo(
datos
){


    guardarArchivo(

        "../datos/tiempo.json",

        datos

    );


}









// =================================
// AVANZAR HORA
// =================================

function avanzarHora(
cantidad=1
){



    const datos =
    cargarArchivo("../datos/tiempo.json");



    if(!datos){

        return null;

    }



    if(!datos.tiempo){


        datos.tiempo={

            hora:6,

            dia:1,

            mes:1,

            año:1,

            estacion:"primavera"

        };

    }





    datos.tiempo.hora += cantidad;





    if(datos.tiempo.hora >=24){


        datos.tiempo.hora=0;


        avanzarDiaInterno(datos);


    }





    guardarTiempo(datos);




    crearEvento(

        "avance_tiempo",

        [],

        {

            hora:
            datos.tiempo.hora,

            dia:
            datos.tiempo.dia

        }

    );





    return datos.tiempo;


}









// =================================
// AVANZAR DÍA
// =================================

function avanzarDiaInterno(
datos
){


    datos.tiempo.dia++;





    crearEvento(

        "nuevo_dia",

        [],

        {

            dia:
            datos.tiempo.dia

        }

    );





    if(datos.tiempo.dia >30){


        datos.tiempo.dia=1;


        avanzarMes(datos);


    }



}









// =================================
// AVANZAR MES
// =================================

function avanzarMes(
datos
){



    datos.tiempo.mes++;





    if(datos.tiempo.mes>12){


        datos.tiempo.mes=1;


        datos.tiempo.año++;


        crearEvento(

            "nuevo_año",

            [],

            {

                año:
                datos.tiempo.año

            }

        );


    }





    actualizarEstacion(datos);



}









// =================================
// CAMBIO DE ESTACIÓN
// =================================

function actualizarEstacion(
datos
){



    let nuevaEstacion;



    if(
        datos.tiempo.mes>=3 &&
        datos.tiempo.mes<=5
    ){

        nuevaEstacion="primavera";

    }


    else if(
        datos.tiempo.mes>=6 &&
        datos.tiempo.mes<=8
    ){

        nuevaEstacion="verano";

    }


    else if(
        datos.tiempo.mes>=9 &&
        datos.tiempo.mes<=11
    ){

        nuevaEstacion="otoño";

    }


    else{


        nuevaEstacion="invierno";


    }






    if(
        datos.tiempo.estacion !== nuevaEstacion
    ){


        datos.tiempo.estacion =
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
// OBTENER MOMENTO DEL DÍA
// =================================

function obtenerMomentoDia(){



    const tiempo =
    obtenerTiempo();



    if(!tiempo){

        return null;

    }





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
// OBTENER FECHA COMPLETA
// =================================

function obtenerFecha(){


    const tiempo =
    obtenerTiempo();


    return tiempo;


}








module.exports={


    obtenerTiempo,

    avanzarHora,

    obtenerMomentoDia,

    obtenerFecha


};
