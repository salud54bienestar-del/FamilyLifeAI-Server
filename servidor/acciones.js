// Sistema de acciones de Village Soul

const crearEvento = require("./eventos.js");
const crearMemoria = require("./memorias.js");

function ejecutarAccion(habitante_id, accion) {

    console.log("=================================");
    console.log("        ACCIÓN");
    console.log("=================================");

    console.log("Habitante:", habitante_id);
    console.log("Acción:", accion);

    crearEvento(
        "Nueva acción",
        "Un habitante realizó: " + accion
    );

    crearMemoria(
        habitante_id,
        "accion",
        "El habitante realizó la acción: " + accion,
        "media"
    );

    const resultado = {
        habitante_id: habitante_id,
        accion: accion,
        estado: "completada"
    };

    console.log("Resultado:");
    console.log(resultado);

    return resultado;
}


// Prueba inicial

ejecutarAccion(
    1,
    "explorar el mundo"
);

module.exports = ejecutarAccion;
