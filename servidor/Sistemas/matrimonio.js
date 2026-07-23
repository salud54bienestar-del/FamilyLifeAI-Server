// Sistema de matrimonio de Village Soul

const cargarArchivo = require("./cargador_datos.js");
const guardarArchivo = require("./guardador_datos.js");
const crearEvento = require("./eventos.js");
const crearMemoria = require("./memorias.js");

const { crearFamiliaMatrimonio } = require("./familias.js");
const { obtenerEtapaHabitante } = require("./etapas_vida.js");

// =================================
// OBTENER HABITANTE
// =================================

function obtenerHabitante(id) {
    const datos = cargarArchivo("../datos/almas.json");

    if (!datos || !datos.almas) {
        return null;
    }

    return datos.almas.find(a => a.id === id) || null;
}

// =================================
// VERIFICAR EDAD LEGAL
// =================================

function puedeCasarse(habitante_id) {
    const habitante = obtenerHabitante(habitante_id);

    if (!habitante) {
        return false;
    }

    const etapa = obtenerEtapaHabitante(habitante);

    if (!etapa) {
        return false;
    }

    return (
        etapa.nombre === "adulto" ||
        etapa.nombre === "adulto_mayor"
    );
}

// =================================
// EVALUAR MATRIMONIO
// =================================

function evaluarMatrimonio(habitante_a, habitante_b) {
    const relaciones = cargarArchivo("../datos/relaciones.json");

    if (!relaciones || !relaciones.relaciones) {
        return null;
    }

    const relacion = relaciones.relaciones.find(r =>
        (r.habitante_a === habitante_a && r.habitante_b === habitante_b) ||
        (r.habitante_a === habitante_b && r.habitante_b === habitante_a)
    );

    if (!relacion) {
        return null;
    }

    const requisitos = {
        edad_a: puedeCasarse(habitante_a),
        edad_b: puedeCasarse(habitante_b),
        confianza: (relacion.confianza || 0) >= 80,
        romance: (relacion.romance || 0) >= 80
    };

    return {
        habitante_a,
        habitante_b,
        requisitos,
        aprobado: Object.values(requisitos).every(r => r === true)
    };
}

// =================================
// CASARSE
// =================================

function casarse(habitante_a, habitante_b) {
    const evaluacion = evaluarMatrimonio(habitante_a, habitante_b);

    if (!evaluacion || !evaluacion.aprobado) {
        console.log("No cumplen los requisitos para matrimonio.");
        return null;
    }

    const relaciones = cargarArchivo("../datos/relaciones.json");

    if (!relaciones || !relaciones.relaciones) {
        return null;
    }

    const relacion = relaciones.relaciones.find(r =>
        (r.habitante_a === habitante_a && r.habitante_b === habitante_b) ||
        (r.habitante_a === habitante_b && r.habitante_b === habitante_a)
    );

    if (!relacion) {
        return null;
    }

    // Actualizar relación
    relacion.estado_pareja = "casados";
    relacion.tipo = "matrimonio";

    if (!Array.isArray(relacion.historial)) {
        relacion.historial = [];
    }
    relacion.historial.push("Matrimonio celebrado");

    // Guardar cambios en el archivo de relaciones
    guardarArchivo("../datos/relaciones.json", relaciones);

    // Crear la estructura familiar
    const familia = crearFamiliaMatrimonio(habitante_a, habitante_b);

    // Disparar evento
    crearEvento("matrimonio", [habitante_a, habitante_b], {
        familia_id: familia?.id || null
    });

    // Guardar memorias de ambos
    crearMemoria(
        habitante_a,
        "matrimonio",
        "Se casó con el habitante " + habitante_b,
        "alta",
        [habitante_b]
    );

    crearMemoria(
        habitante_b,
        "matrimonio",
        "Se casó con el habitante " + habitante_a,
        "alta",
        [habitante_a]
    );

    return {
        relacion,
        familia
    };
}

// =================================
// DIVORCIO
// =================================

function divorciarse(habitante_a, habitante_b) {
    const relaciones = cargarArchivo("../datos/relaciones.json");

    if (!relaciones || !relaciones.relaciones) {
        return null;
    }

    const relacion = relaciones.relaciones.find(r =>
        (r.habitante_a === habitante_a && r.habitante_b === habitante_b) ||
        (r.habitante_a === habitante_b && r.habitante_b === habitante_a)
    );

    if (!relacion) {
        return null;
    }

    // Actualizar estado de relación
    relacion.estado_pareja = "divorciados";

    if (!Array.isArray(relacion.historial)) {
        relacion.historial = [];
    }
    relacion.historial.push("Divorcio");

    // Guardar cambios en el archivo de relaciones
    guardarArchivo("../datos/relaciones.json", relaciones);

    // Disparar evento y memorias
    crearEvento("divorcio", [habitante_a, habitante_b], {});

    crearMemoria(
        habitante_a,
        "divorcio",
        "Se divorció del habitante " + habitante_b,
        "alta",
        [habitante_b]
    );

    crearMemoria(
        habitante_b,
        "divorcio",
        "Se divorció del habitante " + habitante_a,
        "alta",
        [habitante_a]
    );

    return relacion;
}

// =================================
// EXPORTACIÓN DE MÓDULOS
// =================================

module.exports = {
    evaluarMatrimonio,
    puedeCasarse,
    casarse,
    divorciarse
};
    
