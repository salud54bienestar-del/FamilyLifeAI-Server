// Sistema avanzado de comportamiento de habitantes - Village Soul

const cargarArchivo = require("./cargador_datos.js");
const guardarArchivo = require("./guardador_datos.js");
const crearEvento = require("./eventos.js");
const crearMemoria = require("./memorias.js");

const MAX_HISTORIAL = 100;

// =================================
// GUARDAR COMPORTAMIENTO (AUXILIAR)
// =================================

function guardarComportamiento(comportamiento) {
    let datos = cargarArchivo("../datos/comportamientos.json");

    if (!datos) {
        datos = { comportamientos: [] };
    }

    if (!Array.isArray(datos.comportamientos)) {
        datos.comportamientos = [];
    }

    const indice = datos.comportamientos.findIndex(
        c => String(c.id) === String(comportamiento.id) || String(c.habitante_id) === String(comportamiento.habitante_id)
    );

    if (indice !== -1) {
        datos.comportamientos[indice] = comportamiento;
    } else {
        datos.comportamientos.push(comportamiento);
    }

    guardarArchivo("../datos/comportamientos.json", datos);
    return comportamiento;
}

// =================================
// OBTENER COMPORTAMIENTO
// =================================

function obtenerComportamiento(habitante_id) {
    const datos = cargarArchivo("../datos/comportamientos.json");

    if (!datos || !Array.isArray(datos.comportamientos)) {
        return null;
    }

    return datos.comportamientos.find(
        c => String(c.habitante_id) === String(habitante_id)
    ) || null;
}

// =================================
// CREAR COMPORTAMIENTO
// =================================

function crearComportamiento(habitante_id) {
    let datos = cargarArchivo("../datos/comportamientos.json");

    if (!datos) {
        datos = { comportamientos: [] };
    }

    if (!Array.isArray(datos.comportamientos)) {
        datos.comportamientos = [];
    }

    const existente = obtenerComportamiento(habitante_id);
    if (existente) {
        return existente;
    }

    const nuevoId = datos.comportamientos.length > 0
        ? Math.max(...datos.comportamientos.map(c => Number(c.id) || 0)) + 1
        : 1;

    const comportamiento = {
        id: nuevoId,
        habitante_id,
        estado_actual: "idle",
        accion_actual: "descansar",
        destino: null,
        siguiendo: null,
        objetivo_actual: null,
        ultima_action: null,
        historial: []
    };

    datos.comportamientos.push(comportamiento);
    guardarArchivo("../datos/comportamientos.json", datos);

    return comportamiento;
}

// =================================
// EJECUTAR ACCIÓN
// =================================

function ejecutarAccion(
    habitante_id,
    accion,
    datosExtra = {}
) {
    let comportamiento = obtenerComportamiento(habitante_id);

    if (!comportamiento) {
        comportamiento = crearComportamiento(habitante_id);
    }

    comportamiento.accion_actual = accion;
    comportamiento.estado_actual = "ejecutando";
    comportamiento.ultima_accion = new Date().toISOString();

    if (!Array.isArray(comportamiento.historial)) {
        comportamiento.historial = [];
    }

    comportamiento.historial.push({
        accion,
        fecha: comportamiento.ultima_accion,
        datos: datosExtra
    });

    if (comportamiento.historial.length > MAX_HISTORIAL) {
        comportamiento.historial.shift();
    }

    realizarAccionBase(
        comportamiento,
        accion,
        datosExtra
    );

    guardarComportamiento(comportamiento);

    if (typeof crearEvento === "function") {
        crearEvento(
            "accion_habitante",
            [habitante_id],
            { accion }
        );
    }

    if (typeof crearMemoria === "function") {
        crearMemoria(
            habitante_id,
            "accion",
            "Realizó la acción: " + accion,
            "baja"
        );
    }

    return comportamiento;
}

// =================================
// ACCIONES DISPONIBLES
// =================================

function realizarAccionBase(
    comportamiento,
    accion,
    datos
) {
    switch (String(accion).toLowerCase()) {
        case "caminar":
            comportamiento.estado_actual = "movimiento";
            break;

        case "dormir":
            comportamiento.estado_actual = "descansando";
            break;

        case "trabajar":
            comportamiento.estado_actual = "trabajando";
            break;

        case "comer":
            comportamiento.estado_actual = "alimentandose";
            break;

        case "hablar":
            comportamiento.estado_actual = "socializando";
            break;

        case "ayudar":
            comportamiento.estado_actual = "ayudando";
            break;

        case "proteger":
            comportamiento.estado_actual = "defendiendo";
            break;

        case "explorar":
            comportamiento.estado_actual = "explorando";
            break;

        case "seguir_jugador":
            comportamiento.siguiendo = datos?.jugador || null;
            break;

        case "ir_a_casa":
            comportamiento.destino = datos?.casa || null;
            break;

        default:
            comportamiento.estado_actual = "idle";
    }
}

// =================================
// CAMBIAR ESTADO
// =================================

function cambiarEstado(
    habitante_id,
    estado
) {
    let comportamiento = obtenerComportamiento(habitante_id);

    if (!comportamiento) {
        comportamiento = crearComportamiento(habitante_id);
    }

    comportamiento.estado_actual = estado;
    guardarComportamiento(comportamiento);

    return comportamiento;
}

// =================================
// OBTENER ACCIÓN ACTUAL
// =================================

function obtenerAccionActual(habitante_id) {
    const comportamiento = obtenerComportamiento(habitante_id);
    return comportamiento ? comportamiento.accion_actual : null;
}

// =================================
// EXPORTACIÓN DE MÓDULOS
// =================================

module.exports = {
    obtenerComportamiento,
    crearComportamiento,
    ejecutarAccion,
    cambiarEstado,
    obtenerAccionActual
};
    
