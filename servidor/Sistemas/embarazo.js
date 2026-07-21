// Sistema de embarazo de Village Soul

const cargarArchivo = require("./cargador_datos.js");
const crearEvento = require("./eventos.js");
const crearMemoria = require("./memorias.js");

const {
    registrarNacimiento
} = require("./nacimientos.js");




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

        aprobado:

        Object.values(requisitos)
        .every(r=>r===true),


        requisitos

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


    if(!evaluacion || !evaluacion.aprobado){

        console.log(
            "No puede iniciar embarazo."
        );

        return null;

    }




    const datos =
    cargarArchivo("../datos/embarazos.json");



    if(!datos){

        return null;

    }





    const activo =
    datos.embarazos.find(

        e =>

        e.madre === madre_id &&
        e.estado === "embarazada"

    );



    if(activo){

        console.log(
            "Ya existe un embarazo."
        );

        return null;

    }





    const embarazo = {


        id:

        datos.embarazos.length + 1,


        madre:

        madre_id,


        padre:

        padre_id,


        dias:

        0,


        meses:

        0,


        duracion_dias:

        270,


        etapa:

        "primer_trimestre",



        estado:

        "embarazada",



        salud_madre:

        100,


        salud_bebe:

        100,


        complicaciones:

        [],



        bebe_id:

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

            tipo:
            "embarazo_iniciado"

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







// =================================
// AVANZAR UN DÍA VILLAGE SOUL
// =================================

function avanzarEmbarazos(
    familia_id
){


    const datos =
    cargarArchivo("../datos/embarazos.json");


    if(!datos){

        return null;

    }



    datos.embarazos.forEach(

        embarazo => {



            if(
                embarazo.estado !== "embarazada"
            ){

                return;

            }




            embarazo.dias++;




            // Cada 30 días = 1 mes

            embarazo.meses =
            Math.floor(
                embarazo.dias / 30
            );





            if(embarazo.meses <= 3){

                embarazo.etapa =
                "primer_trimestre";

            }


            else if(embarazo.meses <= 6){

                embarazo.etapa =
                "segundo_trimestre";

            }


            else {

                embarazo.etapa =
                "tercer_trimestre";

            }







            if(
                embarazo.dias >=
                embarazo.duracion_dias
            ){


                registrarNacimiento(

                    embarazo.id,

                    familia_id,

                    {

                        nombre:
                        "Nuevo habitante"

                    }

                );



                embarazo.estado =
                "finalizado";


            }



        }

    );



    return datos.embarazos;

}






module.exports = {


    evaluarEmbarazo,

    iniciarEmbarazo,

    avanzarEmbarazos


};
