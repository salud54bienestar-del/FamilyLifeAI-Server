// Sistema avanzado de navegación - Village Soul

const cargarArchivo = require("./cargador_datos.js");
const guardarArchivo = require("./guardador_datos.js");
const crearEvento = require("./eventos.js");
const crearMemoria = require("./memorias.js");

// =================================
// OBTENER RUTA
// =================================

function obtenerRuta(habitante_id) {
    const datos = cargarArchivo("../datos/rutas.json");

    if (!datos || !Array.isArray(datos.rutas)) {
        return null;
    }

    return datos.rutas.find(r => r.habitante_id === habitante_id) || null;
}

// =================================
// CALCULAR DISTANCIA (3D / 2D)
// =================================

function calcularDistancia(a, b) {
    if (!a || !b) return 0;

    const ax = a.x || 0;
    const ay = a.y || 0;
    const az = a.z || 0;

    const bx = b.x || 0;
    const by = b.y || 0;
    const bz = b.z || 0;

    return Math.sqrt(
        Math.pow(bx - ax, 2) +
        Math.pow(by - ay, 2) +
        Math.pow(bz - az, 2)
    );
}

// =================================
// CREAR RUTA
// =================================

function crearRuta(habitante_id, origen, destino) {
    let datos = cargarArchivo("../datos/rutas.json");

    if (!datos) {
        datos = { rutas: [] };
    }

    if (!Array.isArray(datos.rutas)) {
        datos.rutas = [];
    }

    const id = datos.rutas.length > 0
        ? Math.max(...datos.rutas.map(r => r.id || 0)) + 1
        : 1;

    const ruta = {
        id,
        habitante_id,
        origen,
        destino,
        puntos: [origen, destino],
        distancia: calcularDistancia(origen, destino),
        estado: "creada"
    };

    datos.rutas.push(ruta);
    guardarArchivo("../datos/rutas.json", datos);

    if (typeof crearMemoria === "function") {
        crearMemoria(
            habitante_id,
            "navegacion",
            "Aprendió una nueva ruta.",
            "baja"
        );
    }

    if (typeof crearEvento === "function") {
        crearEvento("nueva_ruta", [habitante_id], {
            origen,
            destino,
            distancia: ruta.distancia
        });
    }

    return ruta;
}

// =================================
// OBTENER SIGUIENTE PASO
// =================================

function siguientePaso(ruta, posicionActual, velocidad = 1.0) {
    if (!ruta || !ruta.destino) {
        return null;
    }

    const objetivo = ruta.destino;

    if (!posicionActual) {
        return {
            x: objetivo.x || 0,
            y: objetivo.y || 0,
            z: objetivo.z || 0
        };
    }

    const dist = calcularDistancia(posicionActual, objetivo);

    // Si ya llegó al destino
    if (dist <= velocidad) {
        return {
            x: objetivo.x || 0,
            y: objetivo.y || 0,
            z: objetivo.z || 0,
            llegado: true
        };
    }

    // Paso interpolado hacia la meta
    const dx = ((objetivo.x || 0) - (posicionActual.x || 0)) / dist;
    const dy = ((objetivo.y || 0) - (posicionActual.y || 0)) / dist;
    const dz = ((objetivo.z || 0) - (posicionActual.z || 0)) / dist;

    return {
        x: (posicionActual.x || 0) + dx * velocidad,
        y: (posicionActual.y || 0) + dy * velocidad,
        z: (posicionActual.z || 0) + dz * velocidad,
        llegado: false
    };
}

// =================================
// CREAR CAMINO AUTOMÁTICO
// =================================

function calcularCamino(origen, destino) {
    // Versión base extensible para Waypoints / A* Pathfinding
    return [
        origen,
        destino
    ];
}

// =================================
// EXPORTACIÓN DE MÓDULOS
// =================================

module.exports = {
    obtenerRuta,
    crearRuta,
    calcularDistancia,
    siguientePaso,
    calcularCamino
};
    
