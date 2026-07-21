// Sistema de matrimonio de Village Soul

const cargarArchivo = require("./cargador_datos.js");
const crearEvento = require("./eventos.js");
const crearMemoria = require("./memorias.js");

const {
    crearFamiliaMatrimonio
} = require("./familias.js");


// =================================
// EVALUAR MATRIMONIO
// =================================

function evaluarMatrimonio(habitante_a, habitante_b){


    const relaciones =
    cargarArchivo("../datos/relaciones.json");


    if(!relaciones){

        return null;

    }



    const relacion =
    relaciones.relaciones.find(

        r =>

        (
            r.habitante_a === habitante_a &&
            r.habitante_b === habitante_b
        )

        ||

        (
            r.habitante_a === habitante_b &&
            r.habitante_b === habitante_a
        )

    );



    if(!relacion){

        console.log(
            "No existe relación entre habitantes."
        );

        return null;

    }




    const requisitos = {


        confianza:
        relacion.confianza >= 80,


        romance:
        relacion.romance >= 80,


        permitido:
        relacion.limites.relacion_permitida === true


    };





    return {


        habitante_a,

        habitante_b,

        requisitos,


        aprobado:

        Object.values(requisitos)
        .every(r=>r===true)


    };


}






// =================================
// CASARSE
// =================================

function casarse(habitante_a, habitante_b){



    const relaciones =
    cargarArchivo("../datos/relaciones.json");



    if(!relaciones){

        return null;

    }



    const relacion =
    relaciones.relaciones.find(

        r =>

        (
        r.habitante_a === habitante_a &&
        r.habitante_b === habitante_b
        )

        ||

        (
        r.habitante_a === habitante_b &&
        r.habitante_b === habitante_a
        )

    );



    if(!relacion){

        return null;

    }





    const evaluacion =
    evaluarMatrimonio(
        habitante_a,
        habitante_b
    );



    if(!evaluacion.aprobado){

        console.log(
            "No cumplen requisitos."
        );

        return null;

    }





    // Cambiar estado de relación

    relacion.estado_pareja =
    "casados";


    relacion.tipo =
    "pareja_matrimonio";



    relacion.historial.push(

        "Matrimonio celebrado"

    );





    // CREAR FAMILIA AUTOMÁTICA

    const familia =

    crearFamiliaMatrimonio(

        habitante_a,

        habitante_b

    );





    crearEvento(

        6,

        [

            habitante_a,

            habitante_b

        ],

        {

            tipo:"matrimonio",

            familia_id:
            familia?.id || null

        }

    );





    crearMemoria(

        habitante_a,

        "matrimonio",

        "Se casó con el habitante " + habitante_b,

        "alta",

        [

            habitante_b

        ],

        "amor"

    );





    return {


        relacion,


        familia


    };


}







// =================================
// DIVORCIO
// =================================

function divorciarse(
    habitante_a,
    habitante_b
){


    const relaciones =
    cargarArchivo("../datos/relaciones.json");


    if(!relaciones){

        return null;

    }



    const relacion =
    relaciones.relaciones.find(

        r =>

        (
        r.habitante_a === habitante_a &&
        r.habitante_b === habitante_b
        )

        ||

        (
        r.habitante_a === habitante_b &&
        r.habitante_b === habitante_a
        )

    );



    if(!relacion){

        return null;

    }



    relacion.estado_pareja =
    "divorciados";



    relacion.historial.push(

        "Divorcio"

    );





    crearEvento(

        7,

        [

            habitante_a,

            habitante_b

        ],

        {

            tipo:"divorcio"

        }

    );



    return relacion;


}





module.exports={


    evaluarMatrimonio,

    casarse,

    divorciarse


};
