// Sistema avanzado de recursos - Village Soul 2.0

const cargarArchivo = require("./cargador_datos.js");
const guardarArchivo = require("./guardador_datos.js");
const crearEvento = require("./eventos.js");
const crearMemoria = require("./memorias.js");

const historiaModulo = require("./historia.js");
const registrarHistoria = historiaModulo ? historiaModulo.registrarHistoria : null;

// =================================
// CREAR RECURSOS INICIALES
// =================================

function crearRecursosIniciales() {
    let datos = cargarArchivo("../datos/recursos.json");

    if (!datos) {
        datos = { recursos: {} };
    }

    if (!datos.recursos) {
        datos.recursos = {};
    }

    datos.recursos.alimentos = datos.recursos.alimentos || {
        trigo: 0,
        pan: 0,
        zanahoria: 0,
        papa: 0,
        carne: 0,
        pescado: 0
    };

    datos.recursos.materiales = datos.recursos.materiales || {
        madera: 0,
        piedra: 0,
        hierro: 0,
        oro: 0,
        diamante: 0
    };

    datos.recursos.economia = datos.recursos.economia || {
        esmeraldas: 0,
        comercio: 0,
        prosperidad: 50
    };

    if (datos.recursos.energia === undefined) {
        datos.recursos.energia = 100;
    }

    guardarArchivo("../datos/recursos.json", datos);

    return datos.recursos;
}

// =================================
// OBTENER RECURSOS
// =================================

function obtenerRecursos() {
    const datos = cargarArchivo("../datos/recursos.json");

    if (!datos || !datos.recursos) {
        return crearRecursosIniciales();
    }

    return datos.recursos;
}

// =================================
// AGREGAR RECURSO
// =================================

function agregarRecurso(categoria, recurso, cantidad) {
    let datos = cargarArchivo("../datos/recursos.json");

    if (!datos || !datos.recursos) {
        crearRecursosIniciales();
        datos = cargarArchivo("../datos/recursos.json");
    }

    if (!datos.recursos[categoria]) {
        datos.recursos[categoria] = {};
    }

    if (datos.recursos[categoria][recurso] === undefined) {
        datos.recursos[categoria][recurso] = 0;
    }

    datos.recursos[categoria][recurso] += cantidad;

    if (datos.recursos[categoria][recurso] < 0) {
        datos.recursos[categoria][recurso] = 0;
    }

    guardarArchivo("../datos/recursos.json", datos);

    return datos.recursos[categoria][recurso];
}

// =================================
// OBTENER CANTIDAD
// =================================

function obtenerCantidadRecurso(categoria, recurso) {
    const recursos = obtenerRecursos();

    if (!recursos || !recursos[categoria]) {
        return 0;
    }

    return recursos[categoria][recurso] || 0;
}

// =================================
// CONSUMIR RECURSO
// =================================

function consumirRecurso(categoria, recurso, cantidad) {
    const actual = obtenerCantidadRecurso(categoria, recurso);

    if (actual < cantidad) {
        return false;
    }

    agregarRecurso(categoria, recurso, -cantidad);

    return true;
}

// =================================
// PRODUCCIÓN
// =================================

function producirRecurso(habitante_id, categoria, recurso, cantidad) {
    agregarRecurso(categoria, recurso, cantidad);

    crearEvento("produccion_recurso", [habitante_id], {
        recurso,
        cantidad
    });

    crearMemoria(
        habitante_id,
        "trabajo",
        "Produjo " + cantidad + " unidades de " + recurso,
        "baja"
    );

    return true;
}

// =================================
// COMERCIO
// =================================

function comerciar(entregado, cantidad_entregada, recibido, cantidad_recibida) {
    if (!consumirRecurso(entregado.categoria, entregado.nombre, cantidad_entregada)) {
        return false;
    }

    agregarRecurso(recibido.categoria, recibido.nombre, cantidad_recibida);

    crearEvento("comercio", [], {
        entregado,
        recibido
    });

    if (typeof registrarHistoria === "function") {
        registrarHistoria(
            "Comercio realizado",
            "La aldea intercambió recursos.",
            "economia"
        );
    }

    return true;
}

// =================================
// LIMITAR ECONOMÍA
// =================================

function limitarEconomia(economia) {
    if (!economia) return;

    if (economia.prosperidad > 100) {
        economia.prosperidad = 100;
    }

    if (economia.prosperidad < 0) {
        economia.prosperidad = 0;
    }
}

// =================================
// ACTUALIZAR ECONOMÍA
// =================================

function actualizarEconomia() {
    let datos = cargarArchivo("../datos/recursos.json");

    if (!datos || !datos.recursos) {
        crearRecursosIniciales();
        datos = cargarArchivo("../datos/recursos.json");
    }

    const recursos = datos.recursos;
    const alimentos = recursos.alimentos || {};

    const total = Object.values(alimentos).reduce((a, b) => a + b, 0);

    recursos.economia = recursos.economia || { prosperidad: 50 };

    if (total > 500) {
        recursos.economia.prosperidad += 5;
    } else if (total < 50) {
        recursos.economia.prosperidad -= 5;
    }

    limitarEconomia(recursos.economia);

    guardarArchivo("../datos/recursos.json", { recursos });

    return recursos.economia;
}

// =================================
// EXPORTACIÓN DE MÓDULOS
// =================================

module.exports = {
    obtenerRecursos,
    crearRecursosIniciales,
    agregarRecurso,
    consumirRecurso,
    obtenerCantidadRecurso,
    producirRecurso,
    comerciar,
    actualizarEconomia
};
    
