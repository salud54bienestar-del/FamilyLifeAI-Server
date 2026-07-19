// Sistema de comunicación de Village Soul

const cargarArchivo = require("./cargador_datos.js");

function hablarAlma(habitante_id, mensaje) {

    const almas = cargarArchivo("../datos/almas.json");
    const emociones = cargarArchivo("../datos/emociones.json");

    if (!almas || !emociones) {
        console.log("No se pudieron cargar los datos de comunicación.");
        return null;
    }

    const alma = almas.almas.find(
        (a) => a.id === habitante_id
    );

    const emocion = emociones.emociones.find(
        (e) => e.habitante_id === habitante_id
    );

    if (!alma || !emocion) {
        console.log("Habitante no encontrado.");
        return null;
    }

    const respuesta = {
        habitante: alma.nombre,
        estado: emocion.estado_actual,
        mensaje: mensaje
    };

    console.log("=================================");
    console.log("       COMUNICACIÓN");
    console.log("=================================");

    console.log(alma.nombre + " dice:");
    console.log(mensaje);

    return respuesta;
}


// Prueba inicial

hablarAlma(
    1,
    "Me gustaría conocer más sobre este mundo."
);

module.exports = hablarAlma;
