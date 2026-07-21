// Sistema de personalidades de Village Soul

const cargarArchivo = require("./cargador_datos.js");
const crearMemoria = require("./memorias.js");




// =================================
// CARGAR PERSONALIDADES
// =================================

function cargarPersonalidades(){

    const datos =
    cargarArchivo("../datos/personalidades.json");


    if(!datos){

        console.log(
            "No se pudieron cargar las personalidades."
        );

        return null;

    }


    return datos.personalidades || [];

}







// =================================
// OBTENER PERSONALIDAD POR ID
// =================================

function obtenerPersonalidad(id){


    const personalidades =
    cargarPersonalidades();



    if(!personalidades){

        return null;

    }



    return personalidades.find(

        p => p.id === id

    ) || null;


}







// =================================
// BUSCAR PERSONALIDAD POR NOMBRE
// =================================

function buscarPersonalidad(nombre){



    const personalidades =
    cargarPersonalidades();



    if(
        !personalidades ||
        !nombre
    ){

        return null;

    }



    return personalidades.find(

        p =>
        p.nombre === nombre.toLowerCase()

    ) || null;


}







// =================================
// ASIGNAR PERSONALIDAD
// =================================

function asignarPersonalidad(
    habitante,
    personalidad_id
){



    if(!habitante){

        return null;

    }



    const personalidad =
    obtenerPersonalidad(
        personalidad_id
    );



    if(!personalidad){

        console.log(
            "Personalidad no encontrada."
        );

        return null;

    }





    habitante.personalidad = {


        id:
        personalidad.id,


        nombre:
        personalidad.nombre,


        rasgos:
        [...personalidad.rasgos],


        curiosidad:
        personalidad.curiosidad,


        valentia:
        personalidad.valentia,


        sociabilidad:
        personalidad.sociabilidad,


        paciencia:
        personalidad.paciencia


    };







    crearMemoria(

        habitante.id,

        "personalidad",

        "Su personalidad se definió como " +
        personalidad.nombre,

        "alta"

    );





    return habitante.personalidad;


}







// =================================
// OBTENER RASGOS
// =================================

function obtenerRasgos(habitante){


    if(
        !habitante ||
        !habitante.personalidad
    ){

        return [];

    }



    return habitante.personalidad.rasgos || [];

}







// =================================
// OBTENER VALOR DE PERSONALIDAD
// =================================

function obtenerModificador(
    habitante,
    tipo
){



    if(
        !habitante ||
        !habitante.personalidad
    ){

        return 0;

    }



    return habitante.personalidad[tipo] || 0;


}







// =================================
// INFLUIR EN DECISIONES
// =================================

function influirDecision(
    habitante,
    decision
){



    if(
        !habitante ||
        !habitante.personalidad
    ){

        return decision;

    }




    const personalidad =
    habitante.personalidad.nombre;





    if(
        personalidad === "amable"
    ){


        if(decision === "conflicto"){

            return "buscar_dialogo";

        }


    }







    if(
        personalidad === "curiosa"
    ){


        if(decision === "descansar"){

            return "explorar";

        }


    }







    if(
        personalidad === "protectora"
    ){


        if(decision === "huir"){

            return "proteger_aliados";

        }


    }





    return decision;


}







module.exports = {


    cargarPersonalidades,

    obtenerPersonalidad,

    buscarPersonalidad,

    asignarPersonalidad,

    obtenerRasgos,

    obtenerModificador,

    influirDecision


};
