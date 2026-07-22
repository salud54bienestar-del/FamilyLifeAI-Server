// Sistema avanzado de etapas de vida - Village Soul


const cargarArchivo =
require("./cargador_datos.js");


const crearMemoria =
require("./memorias.js");


const crearEvento =
require("./eventos.js");







// =================================
// OBTENER ETAPA POR EDAD
// =================================

function obtenerEtapaPorEdad(
    edad
){


    const datos =
    cargarArchivo(
        "../datos/etapas_vida.json"
    );



    if(!datos){

        return null;

    }



    return datos.etapas.find(

        etapa =>

        edad >= etapa.edad_minima &&

        edad <= etapa.edad_maxima

    ) || null;


}









// =================================
// OBTENER ETAPA HABITANTE
// =================================

function obtenerEtapaHabitante(
    habitante
){


    if(!habitante){

        return null;

    }



    return obtenerEtapaPorEdad(

        habitante.edad || 0

    );


}









// =================================
// ACTUALIZAR ETAPA
// =================================

function actualizarEtapa(
    habitante
){


    if(!habitante){

        return null;

    }



    const etapaNueva =

    obtenerEtapaHabitante(
        habitante
    );



    if(!etapaNueva){

        return habitante;

    }





    const anterior =

    habitante.etapa_vida || null;





    habitante.etapa_vida =

    etapaNueva.nombre;






    if(
        anterior !== etapaNueva.nombre
    ){



        crearEvento(

            "cambio_etapa_vida",

            [
                habitante.id
            ],

            {

                anterior,

                nueva:
                etapaNueva.nombre

            }

        );





        crearMemoria(

            habitante.id,

            "crecimiento",

            "Ahora está en la etapa: "+
            etapaNueva.nombre,

            "alta"

        );







        // Mayoría de edad


        if(
            etapaNueva.nombre==="adulto"
        ){


            crearEvento(

                "mayoria_edad",

                [
                    habitante.id
                ],

                {}

            );



            crearMemoria(

                habitante.id,

                "vida",

                "Llegó a la adultez.",

                "alta"

            );


        }




    }





    return habitante;


}









// =================================
// AUMENTAR EDAD
// =================================

function cumplirAño(
    habitante
){


    if(!habitante){

        return null;

    }



    habitante.edad++;




    actualizarEtapa(
        habitante
    );




    return habitante;


}









// =================================
// ACCIONES DISPONIBLES
// =================================

function obtenerAccionesEtapa(
    habitante
){



    const etapa =

    obtenerEtapaHabitante(
        habitante
    );



    if(!etapa){

        return [];

    }



    return etapa.puede || [];


}









// =================================
// VERIFICAR ACCIÓN
// =================================

function puedeRealizarAccion(
    habitante,
    accion
){


    const acciones =

    obtenerAccionesEtapa(
        habitante
    );



    return acciones.includes(
        accion
    );


}









// =================================
// VERIFICAR ADULTO
// =================================

function esAdulto(
    habitante
){


    const etapa =

    obtenerEtapaHabitante(
        habitante
    );



    return (

        etapa &&

        (
            etapa.nombre==="adulto"

            ||

            etapa.nombre==="adulto_mayor"

        )

    );


}









module.exports={


    obtenerEtapaPorEdad,

    obtenerEtapaHabitante,

    actualizarEtapa,

    cumplirAño,

    obtenerAccionesEtapa,

    puedeRealizarAccion,

    esAdulto


};
