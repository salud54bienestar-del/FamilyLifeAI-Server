// Sistema avanzado de comunicación de Village Soul


const cargarArchivo =
require("./cargador_datos.js");


const crearMemoria =
require("./memorias.js");


const crearEvento =
require("./eventos.js");


const emociones =
require("./emociones.js");


const relaciones =
require("./relaciones.js");








// =================================
// OBTENER FRASES
// =================================

function cargarConversaciones(){


    const datos =
    cargarArchivo("../datos/conversaciones.json");



    if(!datos){

        return [];

    }



    return datos.conversaciones || [];


}









// =================================
// OBTENER PERSONALIDAD
// =================================

function obtenerPersonalidad(
    habitante_id
){


    const almas =
    cargarArchivo("../datos/almas.json");



    if(!almas){

        return "neutral";

    }



    const habitante =
    almas.almas.find(

        a=>a.id===habitante_id

    );



    if(!habitante){

        return "neutral";

    }



    return (

        habitante.personalidad ||

        "neutral"

    );


}









// =================================
// CREAR CONVERSACIÓN
// =================================

function conversar(
    hablante_id,
    receptor_id,
    mensaje="hola"
){



    const personalidad =
    obtenerPersonalidad(
        hablante_id
    );



    const conversaciones =
    cargarConversaciones();





    let disponibles =
    conversaciones.filter(

        c=>

        c.personalidad === personalidad

        ||

        c.personalidad === "general"

    );





    if(disponibles.length===0){


        disponibles =
        conversaciones;


    }





    let respuesta =

    "Hola, es un gusto hablar contigo.";





    if(disponibles.length>0){


        const frase =

        disponibles[

            Math.floor(

                Math.random()

                *

                disponibles.length

            )

        ];



        respuesta =
        frase.texto;


    }







    registrarConversacion(

        hablante_id,

        receptor_id,

        mensaje,

        respuesta

    );






    return {


        hablante:
        hablante_id,


        receptor:
        receptor_id,


        mensaje,


        respuesta


    };


}








// =================================
// REGISTRAR CONVERSACIÓN
// =================================

function registrarConversacion(
    hablante_id,
    receptor_id,
    mensaje,
    respuesta
){



    crearMemoria(

        hablante_id,

        "conversacion",

        "Habló con el habitante "
        + receptor_id,

        "baja",

        [

            receptor_id

        ]

    );





    crearMemoria(

        receptor_id,

        "conversacion",

        "Conversó con el habitante "
        + hablante_id,

        "baja",

        [

            hablante_id

        ]

    );






    crearEvento(

        "conversacion",

        [

            hablante_id,

            receptor_id

        ],

        {

            mensaje,

            respuesta

        }

    );





    try{


        relaciones.aumentarAmistad(

            hablante_id,

            receptor_id,

            2

        );


    }

    catch(error){}



}









// =================================
// CONVERSACIÓN SEGÚN EMOCIÓN
// =================================

function hablarSegunEmocion(
    habitante_id,
    receptor_id,
    emocion
){



    let respuesta;



    switch(emocion){



        case "tristeza":


            respuesta =
            "Hoy no me siento muy bien...";


        break;




        case "felicidad":


            respuesta =
            "Estoy teniendo un día maravilloso.";


        break;




        case "miedo":


            respuesta =
            "Espero que todo esté tranquilo.";


        break;




        case "ira":


            respuesta =
            "Necesito calmarme un poco.";


        break;




        default:


            respuesta =
            "Todo está bien por ahora.";



    }





    registrarConversacion(

        habitante_id,

        receptor_id,

        "estado emocional",

        respuesta

    );





    return respuesta;


}









// =================================
// HABLAR SOBRE MEMORIAS
// =================================

function recordarConversacion(
    habitante_id
){



    const memorias =
    cargarArchivo("../datos/memorias.json");



    if(!memorias){

        return null;

    }



    return memorias.memorias.filter(

        m =>

        m.habitante_id===habitante_id

        &&

        m.tipo==="conversacion"

    );


}









// =================================
// RESPUESTA SOCIAL
// =================================

function reaccionSocial(
    tipo
){



    switch(tipo){



        case "amable":

            return {

                amistad:5,

                confianza:3,

                emocion:"felicidad"

            };





        case "grosero":

            return {

                amistad:-5,

                confianza:-3,

                emocion:"ira"

            };





        default:


            return {

                amistad:1,

                confianza:1,

                emocion:"neutral"

            };


    }


}








module.exports={


    cargarConversaciones,

    conversar,

    hablarSegunEmocion,

    recordarConversacion,

    reaccionSocial


};
