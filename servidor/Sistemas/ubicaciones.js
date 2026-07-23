// Sistema avanzado de ubicaciones personales - Village Soul 2.0

const cargarArchivo = require("./cargador_datos.js");
const guardarArchivo = require("./guardador_datos.js");
const crearEvento = require("./eventos.js");
const crearMemoria = require("./memorias.js");

// =================================
// OBTENER UBICACIÓN
// =================================

function obtenerUbicacion(habitante_id) {
    const datos = cargarArchivo("../datos/ubicaciones.json");

    if (!datos || !datos.ubicaciones) {
        return null;
    }

    return datos.ubicaciones.find(u => u.habitante_id === habitante_id) || null;
}

// Compatibilidad con otros sistemas
function obtenerUbicaciones(habitante_id) {
    return obtenerUbicacion(habitante_id);
}

// =================================
// CREAR UBICACIÓN
// =================================

function crearUbicacion(habitante_id) {
    const datos = cargarArchivo("../datos/ubicaciones.json") || { ubicaciones: [] };

    if (!Array.isArray(datos.ubicaciones)) {
        datos.ubicaciones = [];
    }

    const existente = obtenerUbicacion(habitante_id);
    if (existente) {
        return existente;
    }

    const ubicacion = {
        id: datos.ubicaciones.length > 0
            ? Math.max(...datos.ubicaciones.map(u => u.id || 0)) + 1
            : 1,
        habitante_id,
        hogar: null,
        trabajo: null,
        escuela: null,
        lugares_favoritos: [],
        lugares_visitados: [],
        familiares: [],
        amigos: [],
        pareja: null,
        ultima_posicion: null,
        ultima_actualizacion: new Date().toISOString()
    };

    datos.ubicaciones.push(ubicacion);
    guardarArchivo("../datos/ubicaciones.json", datos);

    crearMemoria(
        habitante_id,
        "ubicacion",
        "Creó su memoria espacial.",
        "baja"
    );

    return ubicacion;
}

// Alias para evitar errores de llamada
function crearUbicaciones(habitante_id) {
    return crearUbicacion(habitante_id);
}

// =================================
// ACTUALIZAR REGISTRO GLOBAL
// =================================

function actualizar(ubicacion) {
    ubicacion.ultima_actualizacion = new Date().toISOString();

    const datos = cargarArchivo("../datos/ubicaciones.json") || { ubicaciones: [] };

    if (!Array.isArray(datos.ubicaciones)) {
        datos.ubicaciones = [];
    }

    const index = datos.ubicaciones.findIndex(
        u => u.habitante_id === ubicacion.habitante_id || u.id === ubicacion.id
    );

    if (index !== -1) {
        datos.ubicaciones[index] = ubicacion;
    } else {
        datos.ubicaciones.push(ubicacion);
    }

    guardarArchivo("../datos/ubicaciones.json", datos);
}

// =================================
// ESTABLECER HOGAR
// =================================

function establecerHogar(habitante_id, posicion) {
    let ubicacion = obtenerUbicacion(habitante_id);

    if (!ubicacion) {
        ubicacion = crearUbicacion(habitante_id);
    }

    ubicacion.hogar = {
        x: Number(posicion.x) || 0,
        y: Number(posicion.y) || 0,
        z: Number(posicion.z) || 0,
        nombre: posicion.nombre || "hogar"
    };

    actualizar(ubicacion);

    crearEvento("nuevo_hogar", [habitante_id], { posicion });

    crearMemoria(
        habitante_id,
        "hogar",
        "Registró su nuevo hogar.",
        "media"
    );

    return ubicacion.hogar;
}

// =================================
// ESTABLECER TRABAJO
// =================================

function establecerTrabajo(habitante_id, trabajo) {
    let ubicacion = obtenerUbicacion(habitante_id);

    if (!ubicacion) {
        ubicacion = crearUbicacion(habitante_id);
    }

    ubicacion.trabajo = {
        id: trabajo.id || null,
        nombre: trabajo.nombre || "trabajo",
        x: Number(trabajo.x) || 0,
        y: Number(trabajo.y) || 0,
        z: Number(trabajo.z) || 0
    };

    actualizar(ubicacion);

    return ubicacion.trabajo;
}

// =================================
// ESTABLECER ESCUELA
// =================================

function establecerEscuela(habitante_id, escuela) {
    let ubicacion = obtenerUbicacion(habitante_id);

    if (!ubicacion) {
        ubicacion = crearUbicacion(habitante_id);
    }

    ubicacion.escuela = escuela;
    actualizar(ubicacion);

    return escuela;
}

// =================================
// GESTIÓN DE AMIGOS
// =================================

function agregarAmigo(habitante_id, amigo_id) {
    let ubicacion = obtenerUbicacion(habitante_id);

    if (!ubicacion) {
        ubicacion = crearUbicacion(habitante_id);
    }

    if (!Array.isArray(ubicacion.amigos)) {
        ubicacion.amigos = [];
    }

    if (!ubicacion.amigos.includes(amigo_id)) {
        ubicacion.amigos.push(amigo_id);
    }

    actualizar(ubicacion);

    return ubicacion.amigos;
}

// =================================
// GESTIÓN DE FAMILIA
// =================================

function agregarFamiliar(habitante_id, familiar_id, parentesco) {
    let ubicacion = obtenerUbicacion(habitante_id);

    if (!ubicacion) {
        ubicacion = crearUbicacion(habitante_id);
    }

    if (!Array.isArray(ubicacion.familiares)) {
        ubicacion.familiares = [];
    }

    const existe = ubicacion.familiares.find(f => f.habitante_id === familiar_id);

    if (!existe) {
        ubicacion.familiares.push({
            habitante_id: familiar_id,
            parentesco
        });
    }

    actualizar(ubicacion);

    return ubicacion.familiares;
}

// =================================
// OBTENER DESTINOS
// =================================

function obtenerDestino(habitante_id, tipo) {
    const ubicacion = obtenerUbicacion(habitante_id);

    if (!ubicacion) {
        return null;
    }

    return ubicacion[tipo] || null;
}

// =================================
// EXPORTACIÓN DE MÓDULOS
// =================================

module.exports = {
    obtenerUbicacion,
    obtenerUbicaciones,
    crearUbicacion,
    crearUbicaciones,
    establecerHogar,
    establecerTrabajo,
    establecerEscuela,
    agregarAmigo,
    agregarFamiliar,
    obtenerDestino
};
        
