// Sistema de matrimonio de Village Soul

const cargarArchivo = require("./cargador_datos.js");

const crearEvento = require("./eventos.js");

const crearMemoria = require("./memorias.js");


const {
    crearFamiliaMatrimonio
} = require("./familias.js");


const {
    obtenerEtapaHabitante
} = require("./etapas_vida.js");




// =================================
// OBTENER HABITANTE
// =================================

function obtenerHabitante(id){


    const datos =
    cargarArchivo("../datos/almas.json");


    if(!datos){

        return null;

    }


    return datos.almas.find(

        a=>a.id===id

    ) || null;


}






// =================================
// VERIFICAR EDAD LEGAL
// =================================

function puedeCasarse(
    habitante_id
){


    const habitante =
    obtenerHabitante(
        habitante_id
    );


    if(!habitante){

        return false;

    }



    const etapa =
    obtenerEtapaHabitante(
        habitante
    );



    if(!etapa){

        return false;

    }



    return (

        etapa.nombre === "adulto"

        ||

        etapa.nombre === "adulto_mayor"

    );


}








// =================================
// EVALUAR MATRIMONIO
// =================================

function evaluarMatrimonio(
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

        r=>

        (
            r.habitante_a===habitante_a &&
            r.habitante_b===habitante_b
        )

        ||

        (
            r.habitante_a===habitante_b &&
            r.habitante_b===habitante_a
        )

    );



    if(!relacion){

        return null;

    }




    const requisitos = {


        edad_a:
        puedeCasarse(habitante_a),


        edad_b:
        puedeCasarse(habitante_b),


        confianza:
        relacion.confianza >= 80,


        romance:
        relacion.romance >= 80



    };





    return {


        habitante_a,


        habitante_b,


        requisitos,


        aprobado:

        Object.values(requisitos)
        .every(
            r=>r===true
        )


    };


}









// =================================
// CASARSE
// =================================

function casarse(
    habitante_a,
    habitante_b
){



    const evaluacion =
    evaluarMatrimonio(
        habitante_a,
        habitante_b
    );



    if(
        !evaluacion ||
        !evaluacion.aprobado
    ){

        console.log(
            "No cumplen los requisitos para matrimonio."
        );


        return null;

    }





    const relaciones =
    cargarArchivo("../datos/relaciones.json");



    const relacion =
    relaciones.relaciones.find(

        r=>

        (
            r.habitante_a===habitante_a &&
            r.habitante_b===habitante_b
        )

        ||

        (
            r.habitante_a===habitante_b &&
            r.habitante_b===habitante_a
        )

    );





    relacion.estado_pareja =
    "casados";


    relacion.tipo =
    "matrimonio";



    relacion.historial.push(

        "Matrimonio celebrado"

    );







    const familia =

    crearFamiliaMatrimonio(

        habitante_a,

        habitante_b

    );







    crearEvento(

        "matrimonio",

        [

            habitante_a,

            habitante_b

        ],

        {

            familia_id:
            familia?.id || null

        }

    );







    crearMemoria(

        habitante_a,

        "matrimonio",

        "Se casó con el habitante "+habitante_b,

        "alta"

    );



    crearMemoria(

        habitante_b,

        "matrimonio",

        "Se casó con el habitante "+habitante_a,

        "alta"

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

        r=>

        (
            r.habitante_a===habitante_a &&
            r.habitante_b===habitante_b
        )

        ||

        (
            r.habitante_a===habitante_b &&
            r.habitante_b===habitante_a
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

        "divorcio",

        [

            habitante_a,

            habitante_b

        ],

        {}

    );



    return relacion;


}








module.exports = {


    evaluarMatrimonio,

    puedeCasarse,

    casarse,

    divorciarse


};
