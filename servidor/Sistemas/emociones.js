// Sistema avanzado de emociones - Village Soul
// Control emocional de habitantes y conexión con IA

const cargarArchivo = require("./cargador_datos.js");
const guardarArchivo = require("./guardador_datos.js");
const crearMemoria = require("./memorias.js");

// =================================
// OBTENER EMOCIONES
// =================================

function obtenerEmociones(habitante_id) {
    const datos = cargarArchivo("../datos/emociones.json");

    if (!datos || !datos.emociones) {
        return null;
    }

    return datos.emociones.find(e => e.habitante_id === habitante_id) || null;
}

// =================================
// CREAR EMOCIÓN
// =================================

function crearEmocion(habitante_id) {
    const datos = cargarArchivo("../datos/emociones.json") || { emociones: [] };

    if (!datos.emociones) {
        datos.emociones = [];
    }

    const existente = datos.emociones.find(e => e.habitante_id === habitante_id);
    if (existente) {
        return existente;
    }

    const nueva = {
        habitante_id,

        // Emociones principales (0 - 100)
        felicidad: 50,
        confianza: 50,
        miedo: 0,
        tristeza: 0,
        ira: 0,
        calma: 50,

        // Emociones complejas/secundarias
        emociones_secundarias: {
            amor: 0,
            soledad: 0,
            orgullo: 0,
            estres: 0,
            aburrimiento: 0,
            curiosidad: 0,
            esperanza: 0,
            motivacion: 0,
            culpa: 0,
            ansiedad: 0
        },

        // Estado actual
        emocion_actual: "neutral",
        intensidad: 0,
        estabilidad_emocional: 70,
        ultima_actualizacion: new Date().toISOString()
    };

    datos.emociones.push(nueva);
    guardarArchivo("../datos/emociones.json", datos);

    return nueva;
}

// =================================
// LIMITAR EMOCIONES (0 - 100)
// =================================

function limitarEmociones(estado) {
    if (!estado) return;

    const emocionesPrincipales = ["felicidad", "confianza", "miedo", "tristeza", "ira", "calma"];
    emocionesPrincipales.forEach(key => {
        if (typeof estado[key] === "number") {
            estado[key] = Math.max(0, Math.min(100, estado[key]));
        }
    });

    if (estado.emociones_secundarias) {
        Object.keys(estado.emociones_secundarias).forEach(key => {
            estado.emociones_secundarias[key] = Math.max(0, Math.min(100, estado.emociones_secundarias[key]));
        });
    }
}

// =================================
// CAMBIAR EMOCIÓN
// =================================

function cambiarEmocion(habitante_id, emocion, cantidad, motivo = "") {
    const datos = cargarArchivo("../datos/emociones.json") || { emociones: [] };

    let index = datos.emociones.findIndex(e => e.habitante_id === habitante_id);
    let estado = index !== -1 ? datos.emociones[index] : null;

    if (!estado) {
        estado = crearEmocion(habitante_id);
        datos.emociones = cargarArchivo("../datos/emociones.json")?.emociones || [];
        index = datos.emociones.findIndex(e => e.habitante_id === habitante_id);
    }

    // Modificar emoción principal o secundaria
    if (estado[emocion] !== undefined) {
        estado[emocion] += cantidad;
    } else {
        if (!estado.emociones_secundarias) {
            estado.emociones_secundarias = {};
        }
        if (estado.emociones_secundarias[emocion] === undefined) {
            estado.emociones_secundarias[emocion] = 0;
        }
        estado.emociones_secundarias[emocion] += cantidad;
    }

    limitarEmociones(estado);
    actualizarEmocionActual(estado);

    estado.ultima_actualizacion = new Date().toISOString();

    if (index !== -1) {
        datos.emociones[index] = estado;
    }

    guardarArchivo("../datos/emociones.json", datos);

    crearMemoria(
        habitante_id,
        "emocion",
        "Sintió " + emocion + (motivo ? " por " + motivo : ""),
        "baja",
        [],
        emocion
    );

    return estado;
}

// =================================
// EMOCIÓN DOMINANTE Y ESTABILIDAD
// =================================

function actualizarEmocionActual(estado) {
    if (!estado) return null;

    const emociones = {
        felicidad: estado.felicidad || 0,
        tristeza: estado.tristeza || 0,
        miedo: estado.miedo || 0,
        ira: estado.ira || 0,
        calma: estado.calma || 0,
        amor: estado.emociones_secundarias?.amor || 0,
        soledad: estado.emociones_secundarias?.soledad || 0,
        estres: estado.emociones_secundarias?.estres || 0,
        curiosidad: estado.emociones_secundarias?.curiosidad || 0,
        motivacion: estado.emociones_secundarias?.motivacion || 0
    };

    let dominante = "neutral";
    let intensidad = 0;

    Object.keys(emociones).forEach(emocion => {
        if (emociones[emocion] > intensidad) {
            intensidad = emociones[emocion];
            dominante = emocion;
        }
    });

    estado.emocion_actual = dominante;
    estado.intensidad = intensidad;

    // Suma correcta agrupada de emociones negativas
    const tristeza = estado.tristeza || 0;
    const miedo = estado.miedo || 0;
    const ira = estado.ira || 0;
    const estres = estado.emociones_secundarias?.estres || 0;

    const negativas = tristeza + miedo + ira + estres;

    estado.estabilidad_emocional = Math.max(
        0,
        Math.min(100, 100 - (negativas / 4))
    );

    return estado;
}

// =================================
// EVOLUCIÓN NATURAL (Recuperación)
// =================================

function evolucionarEmociones(habitante_id) {
    const datos = cargarArchivo("../datos/emociones.json");
    if (!datos || !datos.emociones) return null;

    const index = datos.emociones.findIndex(e => e.habitante_id === habitante_id);
    if (index === -1) return null;

    const estado = datos.emociones[index];

    // Recuperación progresiva natural
    estado.tristeza -= 1;
    estado.miedo -= 1;
    estado.ira -= 1;
    estado.calma += 1;

    if (estado.emociones_secundarias) {
        estado.emociones_secundarias.estres -= 1;
        estado.emociones_secundarias.soledad -= 0.5;
        estado.emociones_secundarias.aburrimiento -= 0.5;
    }

    limitarEmociones(estado);
    actualizarEmocionActual(estado);

    estado.ultima_actualizacion = new Date().toISOString();
    datos.emociones[index] = estado;

    guardarArchivo("../datos/emociones.json", datos);

    return estado;
}

// =================================
// NECESIDADES → EMOCIONES (Completo)
// =================================

function actualizarEmocionesPorNecesidades(habitante_id, necesidades) {
    if (!necesidades) return null;

    // Impacto de Hambre
    if (necesidades.hambre < 30) {
        cambiarEmocion(habitante_id, "tristeza", 5, "hambre");
        cambiarEmocion(habitante_id, "ira", 3, "hambre");
    }

    // Impacto de Energía / Sueño
    if (necesidades.energia < 25) {
        cambiarEmocion(habitante_id, "estres", 5, "cansancio");
        cambiarEmocion(habitante_id, "calma", -5, "agotamiento");
    }

    // Impacto de Socialización
    if (necesidades.social < 30) {
        cambiarEmocion(habitante_id, "soledad", 5, "falta de interacción");
    } else if (necesidades.social > 70) {
        cambiarEmocion(habitante_id, "felicidad", 3, "buena compañía");
    }

    return obtenerEmociones(habitante_id);
}

// =================================
// EXPORTACIÓN DE MÓDULOS
// =================================

module.exports = {
    obtenerEmociones,
    crearEmocion,
    cambiarEmocion,
    actualizarEmocionActual,
    evolucionarEmociones,
    actualizarEmocionesPorNecesidades
};
    
