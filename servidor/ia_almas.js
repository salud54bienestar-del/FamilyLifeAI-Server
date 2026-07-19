// Inteligencia artificial de almas - Village Soul

const cargarArchivo = require("./cargador_datos.js");

function pensarAlma(habitante_id) {

    const almas = cargarArchivo("../datos/almas.json");
    const emociones = cargarArchivo("../datos/emociones.json");
    const memorias = cargarArchivo("../datos/memorias.json");

    if (!almas || !emociones || !memorias) {
        console.log("No se pudieron cargar los datos de la IA.");
        return null;
    }

    const alma = almas.almas.find(
        (a) => a.id === habitante_id
    );

    const estadoEmocional = emociones.emociones.find(
        (e) => e.habitante_id === habitante_id
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

    console.log("La IA está analizando...");

    const pensamiento = {
        habitante: alma.nombre,
        decision: "explorar el mundo",
        motivo: "curiosidad y deseo de conocer"
    };

    console.log("Decisión generada:");
    console.log(pensamiento);

    return pensamiento;
}

pensarAlma(1);

module.exports = pensarAlma;
