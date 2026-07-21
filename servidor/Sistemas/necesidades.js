// Sistema de necesidades de Village Soul

const cargarArchivo = require("./cargador_datos.js");
const crearMemoria = require("./memorias.js");



// =================================
// OBTENER NECESIDADES
// =================================

function obtenerNecesidades(habitante_id){


    const datos =
    cargarArchivo("../datos/necesidades.json");



    if(!datos){

        console.log(
            "No se pudieron cargar las necesidades."
        );

        return null;

    }



    return datos.necesidades.find(

        n => n.habitante_id === habitante_id

    ) || null;


}





// =================================
// CREAR NECESIDADES
// =================================

function crearNecesidades(habitante_id){


    const datos =
    cargarArchivo("../datos/necesidades.json");



    if(!datos){

        return null;

    }



    const nueva = {


        habitante_id,


        hambre:100,

        energia:100,

        higiene:100,

        diversion:100,

        estres:0,


        estado:"estable"


    };



    datos.necesidades.push(
        nueva
    );



    return nueva;


}






// =================================
// ACTUALIZAR NECESIDADES
// =================================

function actualizarNecesidades(habitante_id){


    const necesidad =
    obtenerNecesidades(
        habitante_id
    );



    if(!necesidad){

        return null;

    }




    // El tiempo reduce necesidades


    necesidad.hambre -= 5;

    necesidad.energia -= 4;

    necesidad.higiene -= 2;

    necesidad.diversion -= 3;




    if(necesidad.hambre < 0){

        necesidad.hambre = 0;

    }


    if(necesidad.energia < 0){

        necesidad.energia = 0;

    }


    if(necesidad.higiene < 0){

        necesidad.higiene = 0;

    }


    if(necesidad.diversion < 0){

        necesidad.diversion = 0;

    }





    // Estrés automático


    if(
        necesidad.hambre < 30 ||
        necesidad.energia < 30
    ){

        necesidad.estres += 10;

    }



    if(necesidad.estres > 100){

        necesidad.estres = 100;

    }





    actualizarEstado(
        necesidad
    );



    return necesidad;


}






// =================================
// ESTADO GENERAL
// =================================

function actualizarEstado(necesidad){


    const promedio =

    (
        necesidad.hambre +
        necesidad.energia +
        necesidad.higiene +
        necesidad.diversion
    ) / 4;




    if(promedio >= 80){

        necesidad.estado = "feliz";

    }

    else if(promedio >= 50){

        necesidad.estado = "normal";

    }

    else if(promedio >= 25){

        necesidad.estado = "preocupado";

    }

    else{

        necesidad.estado = "critico";

    }


    return necesidad;


}






// =================================
// SATISFACER NECESIDAD
// =================================

function satisfacerNecesidad(
    habitante_id,
    tipo
){


    const necesidad =
    obtenerNecesidades(
        habitante_id
    );



    if(!necesidad){

        return null;

    }




    if(tipo === "comida"){

        necesidad.hambre = 100;

    }


    if(tipo === "dormir"){

        necesidad.energia = 100;

    }


    if(tipo === "baño"){

        necesidad.higiene = 100;

    }


    if(tipo === "diversion"){

        necesidad.diversion = 100;

    }



    crearMemoria(

        habitante_id,

        "necesidad",

        "Satisfizo una necesidad: " + tipo,

        "baja"

    );



    actualizarEstado(
        necesidad
    );



    return necesidad;


}






module.exports = {


    obtenerNecesidades,

    crearNecesidades,

    actualizarNecesidades,

    satisfacerNecesidad


};
