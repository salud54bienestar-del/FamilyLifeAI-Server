// Sistema de decisiones de Village Soul

const cargarArchivo = require("./cargador_datos.js");

function procesarDecision(id) {

    const datos = cargarArchivo("../datos/decisiones.json");

    if (!datos) {
        console.log("No se pudieron cargar las decisiones.");
        return null;
    }

    const decision = datos.decisiones.find(
        (d) => d.id === id
    );

    if (!decision) {
        console.log("Decisión no encontrada.");
        return null;
    }

    console.log("=================================");
    console.log("        DECISIÓN");
    console.log("=================================");

    console.log("Habitante ID:", decision.habitante_id);
    console.log("Situación:", decision.situacion);

    console.log("Opciones:");
    decision.opciones.forEach((opcion) => {
        console.log("- " + opcion);
    });

    console.log("Elección:", decision.eleccion);
    console.log("Resultado:", decision.resultado);

    return decision;
}

// Prueba inicial con la decisión de Luna

procesarDecision(1);

module.exports = procesarDecision;
