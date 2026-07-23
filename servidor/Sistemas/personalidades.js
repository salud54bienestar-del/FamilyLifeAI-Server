// Sistema avanzado de personalidades - Village Soul 2.0

const cargarArchivo = require("./cargador_datos.js");
const guardarArchivo = require("./guardador_datos.js");
const crearMemoria = require("./memorias.js");

// =================================
// CARGAR PERSONALIDADES
// =================================

function cargarPersonalidades() {
    const datos = cargarArchivo("../datos/personalidades.json");

    if (!datos || !Array.isArray(datos.personalidades)) {
        return [];
    }

    return datos.personalidades;
}

// =================================
// OBTENER PERSONALIDAD POR ID
// =================================

function obtenerPersonalidad(id) {
    return cargarPersonalidades().find(p => p.id === id) || null;
}

// =================================
// BUSCAR PERSONALIDAD POR NOMBRE
// =================================

function buscarPersonalidad(nombre) {
    if (!nombre) {
        return null;
    }

    return cargarPersonalidades().find(
        p => p.nombre && p.nombre.toLowerCase() === nombre.toLowerCase()
    ) || null;
}

// =================================
// ASIGNAR PERSONALIDAD A HABITANTE
// =================================

function asignarPersonalidad(habitante, personalidad_id) {
    const personalidad = obtenerPersonalidad(personalidad_id);

    if (!habitante || !personalidad) {
        return null;
    }

    habitante.personalidad_id = personalidad.id;

    habitante.personalidad = {
        nombre: personalidad.nombre,
        rasgos: Array.isArray(personalidad.rasgos) ? [...personalidad.rasgos] : [],
        valores: {
            curiosidad: personalidad.curiosidad ?? 50,
            valentia: personalidad.valentia ?? 50,
            sociabilidad: personalidad.sociabilidad ?? 50,
            paciencia: personalidad.paciencia ?? 50
        }
    };

    if (typeof crearMemoria === "function") {
        crearMemoria(
            habitante.id,
            "personalidad",
            "Desarrolló una personalidad " + personalidad.nombre,
            "alta"
        );
    }

    // Persistir cambios en almas.json
    const almas = cargarArchivo("../datos/almas.json");
    if (almas && Array.isArray(almas.almas)) {
        const almaIndex = almas.almas.findIndex(a => a.id === habitante.id);
        if (almaIndex !== -1) {
            almas.almas[almaIndex] = habitante;
            guardarArchivo("../datos/almas.json", almas);
        }
    }

    return habitante.personalidad;
}

// =================================
// MODIFICADORES
// =================================

function obtenerModificador(habitante, tipo) {
    return habitante?.personalidad?.valores?.[tipo] ?? 50;
}

// =================================
// EFECTO EN EMOCIONES
// =================================

function modificarEmocionPorPersonalidad(habitante, emocion, valor) {
    const valentia = obtenerModificador(habitante, "valentia");

    if (emocion === "miedo" && valentia > 70) {
        return Math.max(0, valor - 5);
    }

    const sociabilidad = obtenerModificador(habitante, "sociabilidad");

    if (emocion === "soledad" && sociabilidad > 70) {
        return Math.max(0, valor - 5);
    }

    return valor;
}

// =================================
// APRENDIZAJE
// =================================

function modificarAprendizaje(habitante, experiencia) {
    const curiosidad = obtenerModificador(habitante, "curiosidad");

    return experiencia + Math.floor(curiosidad / 20);
}

// =================================
// INFLUENCIA EN DECISIONES
// =================================

function influirDecision(habitante, decision) {
    const nombre = habitante?.personalidad?.nombre?.toLowerCase();

    if (!nombre) return decision;

    switch (nombre) {
        case "amable":
            if (decision === "conflicto") return "dialogar";
            break;

        case "curiosa":
        case "curioso":
            if (decision === "descansar") return "explorar";
            break;

        case "protectora":
        case "protector":
            if (decision === "huir") return "defender";
            break;

        case "aventurera":
        case "aventurero":
            if (decision === "quedarse") return "explorar";
            break;
    }

    return decision;
}

// =================================
// EVOLUCIONAR PERSONALIDAD
// =================================

function modificarPersonalidad(habitante, rasgo, cantidad = 5) {
    if (!habitante || !habitante.personalidad) {
        return null;
    }

    if (!Array.isArray(habitante.personalidad.rasgos)) {
        habitante.personalidad.rasgos = [];
    }

    // Si es un valor numérico existente, lo incrementamos
    if (habitante.personalidad.valores && habitante.personalidad.valores[rasgo] !== undefined) {
        habitante.personalidad.valores[rasgo] = Math.max(
            0,
            Math.min(100, habitante.personalidad.valores[rasgo] + cantidad)
        );
    } else if (!habitante.personalidad.rasgos.includes(rasgo)) {
        habitante.personalidad.rasgos.push(rasgo);
    }

    // 1. Crear memoria del cambio
    if (typeof crearMemoria === "function") {
        crearMemoria(
            habitante.id,
            "cambio_personalidad",
            "Desarrolló el rasgo " + rasgo,
            "media"
        );
    }

    // 2. Guardar cambios en el archivo almas.json para asegurar persistencia
    const almas = cargarArchivo("../datos/almas.json");
    if (almas && Array.isArray(almas.almas)) {
        const almaIndex = almas.almas.findIndex(a => a.id === habitante.id);
        if (almaIndex !== -1) {
            almas.almas[almaIndex] = habitante;
            guardarArchivo("../datos/almas.json", almas);
        }
    }

    return habitante.personalidad;
}

// =================================
// EXPORTACIÓN DE MÓDULOS
// =================================

module.exports = {
    cargarPersonalidades,
    obtenerPersonalidad,
    buscarPersonalidad,
    asignarPersonalidad,
    obtenerModificador,
    modificarEmocionPorPersonalidad,
    modificarAprendizaje,
    influirDecision,
    modificarPersonalidad
};
                        
