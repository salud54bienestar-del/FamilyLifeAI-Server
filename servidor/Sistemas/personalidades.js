// Sistema avanzado de personalidades - Village Soul


const cargarArchivo =
require("./cargador_datos.js");


const guardarArchivo =
require("./guardador_datos.js");


const crearMemoria =
require("./memorias.js");







// =================================
// CARGAR PERSONALIDADES
// =================================


function cargarPersonalidades(){


    const datos =
    cargarArchivo("../datos/personalidades.json");



    if(!datos){

        return [];

    }



    return datos.personalidades || [];

}









// =================================
// OBTENER PERSONALIDAD
// =================================


function obtenerPersonalidad(
id
){


    return cargarPersonalidades()
    .find(

        p=>p.id===id

    ) || null;


}









// =================================
// BUSCAR
// =================================


function buscarPersonalidad(
nombre
){


    if(!nombre){

        return null;

    }



    return cargarPersonalidades()
    .find(

        p=>

        p.nombre.toLowerCase()
        ===
        nombre.toLowerCase()

    ) || null;


}









// =================================
// ASIGNAR
// =================================


function asignarPersonalidad(
habitante,
personalidad_id
){



    const personalidad =
    obtenerPersonalidad(
        personalidad_id
    );



    if(
        !habitante ||
        !personalidad
    ){

        return null;

    }





    habitante.personalidad_id =
    personalidad.id;




    habitante.personalidad = {


        nombre:
        personalidad.nombre,


        rasgos:
        [...personalidad.rasgos],



        valores:


        {


            curiosidad:
            personalidad.curiosidad || 50,


            valentia:
            personalidad.valentia || 50,


            sociabilidad:
            personalidad.sociabilidad || 50,


            paciencia:
            personalidad.paciencia || 50


        }



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
// MODIFICADORES
// =================================


function obtenerModificador(
habitante,
tipo
){


    return (

        habitante
        ?.personalidad
        ?.valores
        ?.

        [tipo]

    )

    ||

    50;


}









// =================================
// EFECTO EN EMOCIONES
// =================================


function modificarEmocionPorPersonalidad(
habitante,
emocion,
valor
){



    const valentia =
    obtenerModificador(
        habitante,
        "valentia"
    );



    if(
        emocion==="miedo"
        &&
        valentia>70
    ){

        return valor-5;

    }





    const sociabilidad =
    obtenerModificador(
        habitante,
        "sociabilidad"
    );



    if(
        emocion==="soledad"
        &&
        sociabilidad>70
    ){

        return valor-5;

    }





    return valor;


}









// =================================
// APRENDIZAJE
// =================================


function modificarAprendizaje(
habitante,
experiencia
){



    const curiosidad =
    obtenerModificador(

        habitante,

        "curiosidad"

    );



    return experiencia +

    Math.floor(

        curiosidad / 20

    );


}









// =================================
// DECISIONES
// =================================


function influirDecision(
habitante,
decision
){



    const nombre =

    habitante
    ?.personalidad
    ?.nombre;





    switch(nombre){



        case "amable":


            if(decision==="conflicto")

                return "dialogar";


        break;





        case "curiosa":


            if(decision==="descansar")

                return "explorar";


        break;





        case "protectora":


            if(decision==="huir")

                return "defender";


        break;





        case "aventurera":


            if(decision==="quedarse")

                return "explorar";


        break;


    }





    return decision;


}








// =================================
// EVOLUCIONAR PERSONALIDAD
// =================================


function modificarPersonalidad(
habitante,
rasgo,
cantidad
){


    if(
        !habitante.personalidad
    ){

        return null;

    }




    if(
        !habitante.personalidad.rasgos.includes(rasgo)
    ){

        habitante.personalidad.rasgos.push(
            rasgo
        );

    }



    crearMemoria(

        habitante.id,

        "cambio_personalidad",

        "Desarrolló el rasgo "+rasgo,

        "media"

    );



    return habitante.personalidad;


}









module.exports={


    cargarPersonalidades,

    obtenerPersonalidad,

    buscarPersonalidad,

    asignarPersonalidad,

    obtenerModificador,

    modificarEmocionPorPersonalidad,

    modificarAprendizaje,

    influirDecision,

    modificarPersonalidad


};
