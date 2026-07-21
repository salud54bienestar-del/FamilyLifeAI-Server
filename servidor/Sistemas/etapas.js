// Sistema de etapas de vida - Village Soul

const cargarArchivo = require("./cargador_datos.js");
const crearMemoria = require("./memorias.js");
const crearEvento = require("./eventos.js");




// =================================
// OBTENER ETAPA POR EDAD
// =================================

function obtenerEtapaPorEdad(edad){


    const datos =
    cargarArchivo("../datos/etapas_vida.json");



    if(!datos){

        console.log(
            "No se pudieron cargar las etapas de vida."
        );

        return null;

    }



    return datos.etapas.find(

        etapa =>

        edad >= etapa.edad_minima &&
        edad <= etapa.edad_maxima

    ) || null;


}





// =================================
// OBTENER ETAPA DE HABITANTE
// =================================

function obtenerEtapaHabitante(habitante){


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

function actualizarEtapa(habitante){


    if(!habitante){

        return null;

    }



    const nuevaEtapa =
    obtenerEtapaHabitante(
        habitante
    );



    if(!nuevaEtapa){

        return habitante;

    }




    const etapaAnterior =
    habitante.etapa || null;



    habitante.etapa =
    nuevaEtapa.nombre;




    if(
        etapaAnterior !== nuevaEtapa.nombre
    ){


        crearEvento(

            "cambio_etapa_vida",

            [
                habitante.id
            ],

            {

                anterior:
                etapaAnterior,

                nueva:
                nuevaEtapa.nombre

            }

        );





        crearMemoria(

            habitante.id,

            "crecimiento",

            "Alcanzó la etapa de " +
            nuevaEtapa.nombre,

            "alta"

        );


    }



    return habitante;


}





// =================================
// OBTENER ACCIONES DISPONIBLES
// =================================

function obtenerAccionesEtapa(habitante){


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
// VERIFICAR SI PUEDE HACER ALGO
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





module.exports = {


    obtenerEtapaPorEdad,

    obtenerEtapaHabitante,

    actualizarEtapa,

    obtenerAccionesEtapa,

    puedeRealizarAccion


};
