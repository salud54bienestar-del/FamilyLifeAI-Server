// Sistema avanzado de necesidades de Village Soul

const cargarArchivo =
require("./cargador_datos.js");

const guardarArchivo =
require("./guardador_datos.js");

const crearMemoria =
require("./memorias.js");


const {
    cambiarEmocion
} =
require("./emociones.js");





// =================================
// OBTENER NECESIDADES
// =================================

function obtenerNecesidades(habitante_id){


    const datos =
    cargarArchivo("../datos/necesidades.json");


    if(!datos){

        console.log(
            "No se pudieron cargar necesidades."
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

function crearNecesidades(
    habitante_id
){


    const datos =
    cargarArchivo("../datos/necesidades.json");



    if(!datos){

        return null;

    }




    const existe =
    obtenerNecesidades(
        habitante_id
    );



    if(existe){

        return existe;

    }






    const nueva = {


        habitante_id,


        hambre:100,


        energia:100,


        higiene:100,


        diversion:100,


        social:50,


        carino:80,


        seguridad:100,


        descanso:100,


        estres:0,


        estado:"estable",


        ultima_actualizacion:"dia_1"


    };






    datos.necesidades.push(
        nueva
    );





    guardarArchivo(

        "../datos/necesidades.json",

        datos

    );





    return nueva;


}









// =================================
// ACTUALIZAR NECESIDADES
// =================================

function actualizarNecesidades(
    habitante_id,
    ciclo = 1
){


    const necesidad =
    obtenerNecesidades(
        habitante_id
    );



    if(!necesidad){

        return null;

    }







    necesidad.hambre -= 2 * ciclo;


    necesidad.energia -= 1 * ciclo;


    necesidad.higiene -= 1 * ciclo;


    necesidad.diversion -= 1 * ciclo;


    necesidad.social -= 1 * ciclo;



    necesidad.descanso -= 1 * ciclo;







    limitar(
        necesidad
    );








    // ============================
    // EFECTOS EN EMOCIONES
    // ============================



    if(necesidad.hambre < 30){


        cambiarEmocion(

            habitante_id,

            "tristeza",

            5,

            "hambre"

        );


    }




    if(necesidad.energia < 30){


        cambiarEmocion(

            habitante_id,

            "estres",

            5,

            "cansancio"

        );


    }




    if(necesidad.diversion < 30){


        cambiarEmocion(

            habitante_id,

            "aburrimiento",

            5,

            "falta de diversión"

        );


    }





    if(necesidad.social < 30){


        cambiarEmocion(

            habitante_id,

            "soledad",

            5,

            "falta de interacción"

        );


    }







    actualizarEstado(
        necesidad
    );






    const datos =
    cargarArchivo("../datos/necesidades.json");



    guardarArchivo(

        "../datos/necesidades.json",

        datos

    );






    return necesidad;


}









// =================================
// LIMITAR VALORES
// =================================

function limitar(necesidad){


    Object.keys(necesidad).forEach(

        valor => {


            if(
                typeof necesidad[valor]
                ===
                "number"
            ){


                if(necesidad[valor] > 100){

                    necesidad[valor]=100;

                }



                if(necesidad[valor] < 0){

                    necesidad[valor]=0;

                }


            }


        }

    );


}









// =================================
// ESTADO GENERAL
// =================================

function actualizarEstado(
    necesidad
){


    const promedio =

    (

        necesidad.hambre +

        necesidad.energia +

        necesidad.higiene +

        necesidad.diversion +

        necesidad.social

    ) / 5;






    if(promedio >=80){

        necesidad.estado="feliz";

    }

    else if(promedio >=50){

        necesidad.estado="normal";

    }

    else if(promedio >=25){

        necesidad.estado="preocupado";

    }

    else{

        necesidad.estado="critico";

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






    switch(tipo){


        case "comida":

            necesidad.hambre=100;

        break;




        case "dormir":

            necesidad.energia=100;

            necesidad.descanso=100;

        break;




        case "baño":

            necesidad.higiene=100;

        break;




        case "diversion":

            necesidad.diversion=100;

        break;




        case "social":

            necesidad.social=100;

        break;




        case "carino":

            necesidad.carino=100;

        break;



    }








    crearMemoria(

        habitante_id,

        "necesidad",

        "Satisfizo la necesidad de " + tipo,

        "baja"

    );







    actualizarEstado(
        necesidad
    );





    const datos =
    cargarArchivo("../datos/necesidades.json");



    guardarArchivo(

        "../datos/necesidades.json",

        datos

    );





    return necesidad;


}








module.exports = {


    obtenerNecesidades,

    crearNecesidades,

    actualizarNecesidades,

    satisfacerNecesidad


};
