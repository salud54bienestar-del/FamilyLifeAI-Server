// Sistema avanzado de cultura de Village Soul

const cargarArchivo = require("./cargador_datos.js");
const guardarArchivo = require("./guardador_datos.js");
const crearEvento = require("./eventos.js");
const crearMemoria = require("./memorias.js");

// =================================
// GUARDAR CULTURA (AUXILIAR)
// =================================

function guardarCultura(cultura) {
    let datos = cargarArchivo("../datos/cultura.json");

    if (!datos) {
        datos = { culturas: [] };
    }

    if (!Array.isArray(datos.culturas)) {
        datos.culturas = [];
    }

    const indice = datos.culturas.findIndex(
        c => String(c.id) === String(cultura.id)
    );

    if (indice !== -1) {
        datos.culturas[indice] = cultura;
    } else {
        datos.culturas.push(cultura);
    }

    guardarArchivo("../datos/cultura.json", datos);
    return cultura;
}

// =================================
// OBTENER CULTURA
// =================================

function obtenerCultura(cultura_id) {
    const datos = cargarArchivo("../datos/cultura.json");

    if (!datos || !Array.isArray(datos.culturas)) {
        return null;
    }

    return datos.culturas.find(
        c => String(c.id) === String(cultura_id)
    ) || null;
}

// =================================
// CREAR CULTURA
// =================================

function crearCultura(
    nombre,
    origen = "natural"
) {
    let datos = cargarArchivo("../datos/cultura.json");

    if (!datos) {
        datos = { culturas: [] };
    }

    if (!Array.isArray(datos.culturas)) {
        datos.culturas = [];
    }

    const nuevoId = datos.culturas.length > 0
        ? Math.max(...datos.culturas.map(c => Number(c.id) || 0)) + 1
        : 1;

    const cultura = {
        id: nuevoId,
        nombre: nombre || "Cultura sin nombre",
        origen,
        valores: [
            "cooperacion",
            "familia",
            "supervivencia"
        ],
        tradiciones: [],
        festividades: [],
        comidas_tipicas: [],
        arquitectura: {
            estilo: "medieval",
            materiales: [],
            decoracion: []
        },
        musica: [],
        idioma: "comun",
        reputacion: 50,
        historia: [
            {
                evento: "cultura_creada",
                fecha: new Date().toISOString()
            }
        ]
    };

    datos.culturas.push(cultura);
    guardarArchivo("../datos/cultura.json", datos);

    if (typeof crearEvento === "function") {
        crearEvento(
            "nueva_cultura",
            [],
            {
                cultura: nombre
            }
        );
    }

    return cultura;
}

// =================================
// AGREGAR TRADICIÓN
// =================================

function agregarTradicion(
    cultura_id,
    tradicion
) {
    const cultura = obtenerCultura(cultura_id);

    if (!cultura) {
        return null;
    }

    if (!Array.isArray(cultura.tradiciones)) {
        cultura.tradiciones = [];
    }

    cultura.tradiciones.push({
        nombre: tradicion,
        importancia: "media",
        fecha: new Date().toISOString()
    });

    guardarCultura(cultura);

    return cultura;
}

// =================================
// CREAR FESTIVIDAD
// =================================

function crearFestividad(
    cultura_id,
    nombre,
    motivo
) {
    const cultura = obtenerCultura(cultura_id);

    if (!cultura) {
        return null;
    }

    if (!Array.isArray(cultura.festividades)) {
        cultura.festividades = [];
    }

    cultura.festividades.push({
        nombre,
        motivo,
        actividades: [
            "reunirse",
            "comer",
            "celebrar"
        ]
    });

    guardarCultura(cultura);

    return cultura;
}

// =================================
// CAMBIAR VALORES CULTURALES
// =================================

function agregarValor(
    cultura_id,
    valor
) {
    const cultura = obtenerCultura(cultura_id);

    if (!cultura) {
        return null;
    }

    if (!Array.isArray(cultura.valores)) {
        cultura.valores = [];
    }

    if (!cultura.valores.includes(valor)) {
        cultura.valores.push(valor);
        guardarCultura(cultura);
    }

    return cultura;
}

// =================================
// INFLUENCIA CULTURAL
// =================================

function obtenerInfluencia(
    cultura_id,
    accion
) {
    const cultura = obtenerCultura(cultura_id);

    if (!cultura || !Array.isArray(cultura.valores)) {
        return 0;
    }

    if (cultura.valores.includes("familia") && accion === "ayudar_familia") {
        return 20;
    }

    if (cultura.valores.includes("exploracion") && accion === "explorar") {
        return 15;
    }

    return 0;
}

// =================================
// EVOLUCIONAR CULTURA
// =================================

function evolucionarCultura(
    cultura_id,
    cambio
) {
    const cultura = obtenerCultura(cultura_id);

    if (!cultura) {
        return null;
    }

    if (!Array.isArray(cultura.historia)) {
        cultura.historia = [];
    }

    cultura.historia.push({
        evento: cambio,
        fecha: new Date().toISOString()
    });

    cultura.reputacion = Math.min(100, (cultura.reputacion || 50) + 1);

    guardarCultura(cultura);

    return cultura;
}

// =================================
// EXPORTACIÓN DE MÓDULOS
// =================================

module.exports = {
    obtenerCultura,
    crearCultura,
    agregarTradicion,
    crearFestividad,
    agregarValor,
    obtenerInfluencia,
    evolucionarCultura
};
    
