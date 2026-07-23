// Sistema avanzado de lugares de trabajo - Village Soul

const cargarArchivo = require("./cargador_datos.js");
const guardarArchivo = require("./guardador_datos.js");
const crearEvento = require("./eventos.js");
const crearMemoria = require("./memorias.js");

// =================================
// BUSCAR LUGAR
// =================================

function buscarLugar(nombre) {
    const datos = cargarArchivo("../datos/lugares_trabajo.json");

    if (!datos || !Array.isArray(datos.lugares_trabajo)) {
        return null;
    }

    return datos.lugares_trabajo.find(
        lugar => lugar.nombre && lugar.nombre.toLowerCase() === nombre.toLowerCase()
    ) || null;
}

// =================================
// VERIFICAR ESPACIO
// =================================

function tieneEspacio(lugar, habitante_id) {
    if (!lugar) return false;

    if (!lugar.capacidad) {
        return true;
    }

    if (!Array.isArray(lugar.trabajadores)) {
        lugar.trabajadores = [];
    }

    return (
        lugar.trabajadores.length < lugar.capacidad ||
        lugar.trabajadores.includes(habitante_id)
    );
}

// =================================
// ASIGNAR LUGAR
// =================================

function asignarLugarTrabajo(habitante_id, nombreLugar) {
    const almas = cargarArchivo("../datos/almas.json");
    let lugares = cargarArchivo("../datos/lugares_trabajo.json");

    if (!almas || !Array.isArray(almas.almas) || !lugares || !Array.isArray(lugares.lugares_trabajo)) {
        return null;
    }

    const lugarIndex = lugares.lugares_trabajo.findIndex(
        l => l.nombre && l.nombre.toLowerCase() === nombreLugar.toLowerCase()
    );

    if (lugarIndex === -1) {
        return null;
    }

    const lugar = lugares.lugares_trabajo[lugarIndex];
    const habitante = almas.almas.find(a => String(a.id) === String(habitante_id));

    if (!habitante || !tieneEspacio(lugar, habitante_id)) {
        return null;
    }

    // Asignar en el habitante
    habitante.lugar_trabajo = {
        id: lugar.id,
        nombre: lugar.nombre,
        categoria: lugar.categoria,
        estado: "activo"
    };

    // Actualizar trabajadores en la entidad del lugar
    if (!Array.isArray(lugar.trabajadores)) {
        lugar.trabajadores = [];
    }

    if (!lugar.trabajadores.includes(habitante_id)) {
        lugar.trabajadores.push(habitante_id);
    }

    guardarArchivo("../datos/almas.json", almas);
    guardarArchivo("../datos/lugares_trabajo.json", lugares);

    if (typeof crearEvento === "function") {
        crearEvento(
            "asignacion_lugar_trabajo",
            [habitante_id],
            { lugar: lugar.nombre }
        );
    }

    if (typeof crearMemoria === "function") {
        crearMemoria(
            habitante_id,
            "trabajo",
            "Comenzó a trabajar en " + lugar.nombre,
            "media"
        );
    }

    return habitante.lugar_trabajo;
}

// =================================
// OBTENER LUGAR ACTUAL
// =================================

function obtenerLugarTrabajo(habitante_id) {
    const almas = cargarArchivo("../datos/almas.json");

    if (!almas || !Array.isArray(almas.almas)) {
        return null;
    }

    const habitante = almas.almas.find(a => String(a.id) === String(habitante_id));
    return habitante?.lugar_trabajo || null;
}

// =================================
// LISTAR LUGARES
// =================================

function obtenerLugares() {
    const datos = cargarArchivo("../datos/lugares_trabajo.json");
    return datos?.lugares_trabajo || [];
}

// =================================
// QUITAR TRABAJO
// =================================

function retirarLugarTrabajo(habitante_id) {
    const almas = cargarArchivo("../datos/almas.json");
    let lugares = cargarArchivo("../datos/lugares_trabajo.json");

    if (!almas || !Array.isArray(almas.almas)) {
        return null;
    }

    const habitante = almas.almas.find(a => String(a.id) === String(habitante_id));

    if (!habitante) {
        return null;
    }

    const lugarAnteriorId = habitante.lugar_trabajo?.id;
    habitante.lugar_trabajo = null;

    // Retirar del array de trabajadores en lugares_trabajo.json
    if (lugares && Array.isArray(lugares.lugares_trabajo) && lugarAnteriorId) {
        const lugar = lugares.lugares_trabajo.find(l => l.id === lugarAnteriorId);
        if (lugar && Array.isArray(lugar.trabajadores)) {
            lugar.trabajadores = lugar.trabajadores.filter(id => String(id) !== String(habitante_id));
            guardarArchivo("../datos/lugares_trabajo.json", lugares);
        }
    }

    guardarArchivo("../datos/almas.json", almas);
    return true;
}

// =================================
// EXPORTACIÓN DE MÓDULOS
// =================================

module.exports = {
    buscarLugar,
    asignarLugarTrabajo,
    obtenerLugarTrabajo,
    obtenerLugares,
    retirarLugarTrabajo
};
