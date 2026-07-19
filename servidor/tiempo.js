// Sistema de tiempo de Village Soul

const cargarArchivo = require("./cargador_datos.js");
const pensarAlma = require("./ia_almas.js");
const ejecutarAccion = require("./acciones.js");
const crearEvento = require("./eventos.js");


function actualizarVidaHabitantes() {

    console.log("Actualizando vida de habitantes...");

    // Aquí después conectaremos:
    // crecimiento
    // embarazo
    // cumpleaños
    // etapas de vida

}


function avanzarTiempo() {


    const tiempo = cargarArchivo("../datos/tiempo.json");


    if (!tiempo) {

        console.log("No se pudo cargar el sistema de tiempo.");

        return null;
    }


    tiempo.dia_actual++;


    console.log("=================================");
    console.log("        TIEMPO AVANZA");
    console.log("=================================");


    console.log("Día actual:", tiempo.dia_actual);

    console.log("Estación:", tiempo.estacion);



    actualizarVidaHabitantes();



    console.log("Los habitantes están pensando...");


    const pensamiento = pensarAlma(1);



    if (pensamiento) {

        ejecutarAccion(
            1,
            pensamiento.decision
        );

    }



    if (tiempo.dia_actual % 30 === 0) {

        crearEvento(
            2,
            [1],
            {
                tipo: "paso_del_tiempo",
                descripcion: "Ha pasado un ciclo importante."
            }
        );

    }



    return tiempo;

}



avanzarTiempo();


module.exports = avanzarTiempo;
