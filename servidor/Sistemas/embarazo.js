// Sistema de embarazo de Village Soul

const cargarArchivo = require("./cargador_datos.js");
const crearEvento = require("./eventos.js");
const crearMemoria = require("./memorias.js");



// =================================
// EVALUAR EMBARAZO
// =================================

function evaluarEmbarazo(
    madre_id,
    padre_id
){


    const relaciones =
    cargarArchivo("../datos/relaciones.json");


    if(!relaciones){

        return null;

    }



    const pareja =
    relaciones.relaciones.find(

        r =>

        (
            r.habitante_a === madre_id &&
            r.habitante_b === padre_id
        )

        ||

        (
            r.habitante_a === padre_id &&
            r.habitante_b === madre_id
        )

    );



    if(!pareja){

        console.log(
            "No existe relación."
        );

        return null;

    }




    const requisitos = {


        matrimonio:

        pareja.estado_pareja === "casados",



        romance:

        pareja.romance >= 80,



        confianza:

        pareja.confianza >= 80


    };





    return {


        madre_id,

        padre_id,


        requisitos,


        aprobado:

        Object.values(requisitos)
        .every(r=>r===true)


    };


}






// =================================
// INICIAR EMBARAZO
// =================================

function iniciarEmbarazo(
    madre_id,
    padre_id
){



    const evaluacion =
    evaluarEmbarazo(
        madre_id,
        padre_id
    );



    if(!evaluacion){

        return null;

    }



    if(!evaluacion.aprobado){

        console.log(
            "No cumplen requisitos para embarazo."
        );

        return null;

    }





    const datos =
    cargarArchivo("../datos/embarazos.json");



    if(!datos){

        return null;

    }




    const embarazo = {


        id:

        datos.embarazos.length + 1,


        madre:

        madre_id,


        padre:

        padre_id,



        tiempo:

        0,



        estado:

        "embarazada",



        fecha_inicio:

        null



    };





    datos.embarazos.push(
        embarazo
    );





    crearEvento(

        9,

        [

            madre_id,

            padre_id

        ],

        {

            tipo:"embarazo_iniciado"

        }

    );





    crearMemoria(

        madre_id,

        "embarazo",

        "Comenzó un embarazo.",

        "alta"

    );




    return embarazo;


}





module.exports={


    evaluarEmbarazo,

    iniciarEmbarazo


};
