// Sistema de lugares de trabajo - Village Soul

const cargarArchivo = require("./cargador_datos.js");
const crearEvento = require("./eventos.js");
const crearMemoria = require("./memorias.js");



// Buscar un lugar de trabajo

function buscarLugar(nombreLugar) {

    const lugares =
        cargarArchivo("../datos/lugares_trabajo.json");


    if (!lugares) {

        return null;

    }


    return lugares.lugares_trabajo.find(

        lugar =>
            lugar.nombre.toLowerCase() ===
            nombreLugar.toLowerCase()

    );

}




// Asignar lugar de trabajo a un habitante

function asignarLugarTrabajo(habitante_id, nombreLugar) {


    const almas =
        cargarArchivo("../datos/almas.json");


    const lugar =
        buscarLugar(nombreLugar);



    if (!almas || !lugar) {

        console.log(
            "No se pudo encontrar el lugar de trabajo."
        );

        return null;

    }



    const habitante =
        almas.almas.find(

            a => a.id === habitante_id

        );



    if (!habitante) {

        console.log(
            "Habitante no encontrado."
        );

        return null;

    }



    habitante.lugar_trabajo = {


        nombre:
            lugar.nombre,


        categoria:
            lugar.categoria,


        servicios:
            lugar.servicios,


        estado:
            "activo"


    };




    crearEvento(

        "asignacion_lugar_trabajo",

        [habitante_id],

        {
            lugar:
                lugar.nombre
        }

    );




    crearMemoria(

        habitante_id,

        "trabajo",

        "Comenzó a trabajar en " +
        lugar.nombre,

        "media",

        [],

        "motivacion"

    );




    console.log(
        "Lugar de trabajo asignado:"
    );

    console.log(
        habitante.lugar_trabajo
    );



    return habitante.lugar_trabajo;


}





// Obtener lugar actual de un habitante

function obtenerLugarTrabajo(habitante_id) {


    const almas =
        cargarArchivo("../datos/almas.json");



    if (!almas) {

        return null;

    }



    const habitante =
        almas.almas.find(

            a => a.id === habitante_id

        );



    return habitante?.lugar_trabajo || null;


}





// Mostrar todos los lugares disponibles

function obtenerLugares() {


    const lugares =
        cargarArchivo("../datos/lugares_trabajo.json");



    return lugares?.lugares_trabajo || [];

}




module.exports = {

    buscarLugar,

    asignarLugarTrabajo,

    obtenerLugarTrabajo,

    obtenerLugares

};
