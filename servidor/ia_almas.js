// Inteligencia artificial de almas - Village Soul

const cargarArchivo = require("./cargador_datos.js");

function pensarAlma(habitante_id) {

    const almas = cargarArchivo("../datos/almas.json");
    const emociones = cargarArchivo("../datos/emociones.json");
    const memorias = cargarArchivo("../datos/memorias.json");
    const objetivos = cargarArchivo("../datos/objetivos.json");
    const relaciones = cargarArchivo("../datos/relaciones.json");

    if (!almas || !emociones || !memorias || !objetivos || !relaciones) {
        console.log("No se pudieron cargar los datos de la IA.");
        return null;
    }

    const alma = almas.almas.find(
        (a) => a.id === habitante_id
    );

    const estadoEmocional = emociones.emociones.find(
        (e) => e.habitante_id === habitante_id
    );

    const objetivoActual = objetivos.objetivos.find(
        (o) => o.habitante_id === habitante_id && o.estado === "activo"
    );

    const relacionActual = relaciones.relaciones.find(
        (r) => r.habitante_a === habitante_id || r.habitante_b === habitante_id
    );

    if (!alma || !estadoEmocional) {
        console.log("Habitante no encontrado.");
        return null;
    }

    console.log("=================================");
    console.log("        IA DE ALMA");
    console.log("=================================");

    console.log("Habitante:", alma.nombre);
    console.log("Personalidad ID:", alma.personalidad_id);
    console.log("Estado emocional:", estadoEmocional.estado_actual);
    console.log("Recuerdos:", memorias.memorias.length);

    if (objetivoActual) {
        console.log("Objetivo actual:", objetivoActual.titulo);
    }

    if (relacionActual) {
        console.log("Relación actual:", relacionActual.tipo);
        console.log("Nivel de confianza:", relacionActual.confianza);
    }

    console.log("La IA está analizando...");

    const pensamiento = {
        habitante: alma.nombre,
        objetivo: objetivoActual ? objetivoActual.titulo : "sin objetivo",
        relacion: relacionActual ? relacionActual.tipo : "sin relaciones",
        decision: "explorar el mundo",
        motivo: "cumplir sus metas, aprender y relacionarse con otros habitantes"
    };

    console.log("Decisión generada:");
    console.log(pensamiento);

    return pensamiento;
}

pensarAlma(1);

module.exports = pensarAlma;
