// Sistema de tiempo de Village Soul

const cargarArchivo = require("./cargador_datos.js");
const pensarAlma = require("../ia/ia_almas.js");
const ejecutarAccion = require("./acciones.js");
const crearEvento = require("./eventos.js");


function actualizarVidaHabitantes() {

    console.log("Actualizando vida de habitantes...");

    // Futuras integraciones:
    // crecimiento
    // embarazo
    // cumpleaños
    // etapas de vida
    // profesiones
    // salud

}



function avanzarTiempo() {


    const datos = cargarArchivo("../datos/tiempo.json");


    if (!datos) {

        console.log("No se pudo cargar el sistema de tiempo.");

        return null;

    }


    const tiempo = datos.tiempo;


    tiempo.minuto += 10;


    if (tiempo.minuto >= 60) {

        tiempo.minuto = 0;
        tiempo.hora++;

    }


    if (tiempo.hora >= 24) {

        tiempo.hora = 0;
        tiempo.dia++;

        actualizarVidaHabitantes();

    }



    console.log("=================================");
    console.log("        TIEMPO AVANZA");
    console.log("=================================");

    console.log("Día:", tiempo.dia);
    console.log("Hora:", tiempo.hora);
    console.log("Minuto:", tiempo.minuto);



    console.log("Los habitantes están pensando...");


    const pensamiento = pensarAlma(1);


    if (pensamiento) {

        ejecutarAccion(
            1,
            pensamiento.decision
        );

    }



    if (tiempo.dia % 30 === 0) {

        crearEvento(
            2,
            [1],
            {
                tipo: "paso_del_tiempo",
                descripcion: "Ha transcurrido un ciclo completo."
            }
        );

    }



    return tiempo;

}



avanzarTiempo();


module.exports = avanzarTiempo;
