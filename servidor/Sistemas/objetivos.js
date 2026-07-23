// Sistema avanzado de objetivos de habitantes - Village Soul 2.0

const cargarArchivo = require("./cargador_datos.js");
const guardarArchivo = require("./guardador_datos.js");
const crearEvento = require("./eventos.js");
const crearMemoria = require("./memorias.js");

// =================================
// CARGAR OBJETIVOS
// =================================

function cargarObjetivos() {
    const datos = cargarArchivo("../datos/objetivos.json");

    if (!datos || !datos.objetivos) {
        return [];
    }

    return datos.objetivos;
}

// =================================
// OBTENER OBJETIVOS
// =================================

function obtenerObjetivos(habitante_id) {
    return cargarObjetivos().filter(o => o.habitante_id === habitante_id);
}

// =================================
// OBJETIVO ACTIVO
// =================================

function obtenerObjetivoActivo(habitante_id) {
    return obtenerObjetivos(habitante_id).find(o => o.estado === "activo") || null;
}

// =================================
// CREAR OBJETIVO
// =================================

function crearObjetivo(
    habitante_id,
    titulo,
    descripcion,
    tipo = "general",
    prioridad = "media",
    requisitos = []
) {
    const datos = cargarArchivo("../datos/objetivos.json") || { objetivos: [] };

    if (!Array.isArray(datos.objetivos)) {
        datos.objetivos = [];
    }

    const nuevoId = datos.objetivos.length > 0
        ? Math.max(...datos.objetivos.map(o => o.id || 0)) + 1
        : 1;

    const objetivo = {
        id: nuevoId,
        habitante_id,
        titulo,
        descripcion,
        tipo,
        prioridad,
        progreso: 0,
        estado: "activo",
        requisitos: Array.isArray(requisitos) ? requisitos : [],
        recompensa: {
            experiencia: 50
        }
    };

    datos.objetivos.push(objetivo);
    guardarArchivo("../datos/objetivos.json", datos);

    crearMemoria(
        habitante_id,
        "objetivo",
        "Tiene una nueva meta: " + titulo,
        "media"
    );

    console.log(`🎯 Nuevo objetivo para habitante ${habitante_id}: ${titulo}`);

    return objetivo;
}

// =================================
// ACTUALIZAR PROGRESO
// =================================

function actualizarProgreso(objetivo_id, cantidad) {
    const datos = cargarArchivo("../datos/objetivos.json");

    if (!datos || !datos.objetivos) {
        return null;
    }

    const objetivo = datos.objetivos.find(o => o.id === objetivo_id);

    if (!objetivo) {
        return null;
    }

    objetivo.progreso += cantidad;

    if (objetivo.progreso >= 100) {
        objetivo.progreso = 100;
        objetivo.estado = "completado";

        crearEvento("objetivo_completado", [objetivo.habitante_id], {
            objetivo: objetivo.titulo
        });

        crearMemoria(
            objetivo.habitante_id,
            "logro",
            "Completó la meta: " + objetivo.titulo,
            "alta",
            [],
            "felicidad"
        );
    }

    guardarArchivo("../datos/objetivos.json", datos);

    return objetivo;
}

// =================================
// VERIFICAR REQUISITOS
// =================================

function verificarRequisitosObjetivo(objetivo) {
    if (!objetivo || !Array.isArray(objetivo.requisitos) || objetivo.requisitos.length === 0) {
        return true;
    }

    return objetivo.requisitos.every(req => req.cumplido === true);
}

// =================================
// EXPORTACIÓN DE MÓDULOS
// =================================

module.exports = {
    cargarObjetivos,
    obtenerObjetivos,
    obtenerObjetivoActivo,
    crearObjetivo,
    actualizarProgreso,
    verificarRequisitosObjetivo
};
