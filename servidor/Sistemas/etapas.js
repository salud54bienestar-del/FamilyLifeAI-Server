// Sistema avanzado de etapas de vida - Village Soul

const cargarArchivo = require("./cargador_datos.js");
const crearMemoria = require("./memorias.js");
const crearEvento = require("./eventos.js");

// =================================
// ETAPAS PREDETERMINADAS
// =================================

function obtenerEtapaPredeterminada(edad) {
    if (edad <= 2) {
        return {
            nombre: "bebe",
            puede: ["dormir", "jugar"]
        };
    }

    if (edad <= 12) {
        return {
            nombre: "niño",
            puede: ["jugar", "aprender", "explorar"]
        };
    }

    if (edad <= 17) {
        return {
            nombre: "adolescente",
            puede: ["aprender", "entrenar", "trabajar_parcial"]
        };
    }

    if (edad <= 59) {
        return {
            nombre: "adulto",
            puede: ["trabajar", "formar_familia", "crear_hogar"]
        };
    }

    return {
        nombre: "adulto_mayor",
        puede: ["aconsejar", "enseñar", "cuidar_familia"]
    };
}

// =================================
// OBTENER ETAPA POR EDAD
// =================================

function obtenerEtapaPorEdad(edad) {
    const edadNumerica = Number(edad) || 0;
    const datos = cargarArchivo("../datos/etapas.json");

    if (datos && Array.isArray(datos.etapas)) {
        const encontrada = datos.etapas.find(
            etapa =>
                edadNumerica >= (etapa.edad_minima ?? 0) &&
                edadNumerica <= (etapa.edad_maxima ?? 999)
        );

        if (encontrada) {
            return encontrada;
        }
    }

    return obtenerEtapaPredeterminada(edadNumerica);
}

// =================================
// OBTENER ETAPA HABITANTE
// =================================

function obtenerEtapaHabitante(habitante) {
    if (!habitante) {
        return null;
    }

    // Si recibe ID
    if (typeof habitante === "number" || typeof habitante === "string") {
        const almas = cargarArchivo("../datos/almas.json");

        if (!almas || !Array.isArray(almas.almas)) {
            return null;
        }

        habitante = almas.almas.find(
            a => String(a.id) === String(habitante)
        );

        if (!habitante) {
            return null;
        }
    }

    return obtenerEtapaPorEdad(habitante.edad || 0);
}

// =================================
// ACTUALIZAR ETAPA
// =================================

function actualizarEtapa(habitante) {
    if (!habitante) {
        return null;
    }

    const nueva = obtenerEtapaHabitante(habitante);

    if (!nueva) {
        return habitante;
    }

    const anterior = habitante.etapa_vida || null;
    habitante.etapa_vida = nueva.nombre;

    if (anterior !== nueva.nombre && habitante.id) {
        if (typeof crearEvento === "function") {
            crearEvento(
                "cambio_etapa_vida",
                [habitante.id],
                {
                    anterior,
                    nueva: nueva.nombre,
                    edad: habitante.edad
                }
            );
        }

        if (typeof crearMemoria === "function") {
            crearMemoria(
                habitante.id,
                "etapa_vida",
                "Ahora pertenece a la etapa " + nueva.nombre,
                "alta"
            );
        }
    }

    return habitante;
}

// =================================
// CUMPLIR AÑO
// =================================

function cumplirAño(habitante) {
    if (!habitante) {
        return null;
    }

    habitante.edad = (habitante.edad || 0) + 1;
    actualizarEtapa(habitante);

    return habitante;
}

// =================================
// ACCIONES
// =================================

function obtenerAccionesEtapa(habitante) {
    const etapa = obtenerEtapaHabitante(habitante);
    return etapa?.puede || [];
}

function puedeRealizarAccion(habitante, accion) {
    return obtenerAccionesEtapa(habitante).includes(accion);
}

function esAdulto(habitante) {
    const etapa = obtenerEtapaHabitante(habitante);

    return (
        etapa &&
        (etapa.nombre === "adulto" || etapa.nombre === "adulto_mayor")
    );
}

// =================================
// EXPORTACIÓN DE MÓDULOS
// =================================

module.exports = {
    obtenerEtapaPorEdad,
    obtenerEtapaHabitante,
    actualizarEtapa,
    cumplirAño,
    obtenerAccionesEtapa,
    puedeRealizarAccion,
    esAdulto
};
        
