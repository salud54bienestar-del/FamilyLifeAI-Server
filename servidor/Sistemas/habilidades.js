// Sistema avanzado de habilidades - Village Soul

const cargarArchivo = require("./cargador_datos.js");
const guardarArchivo = require("./guardador_datos.js");
const crearMemoria = require("./memorias.js");
const crearEvento = require("./eventos.js");

// =================================
// GUARDAR HABILIDADES (AUXILIAR)
// =================================

function guardarHabilidades(habilidadActualizada) {
    let datos = cargarArchivo("../datos/habilidades.json");

    if (!datos) {
        datos = { habilidades: [] };
    }

    if (!Array.isArray(datos.habilidades)) {
        datos.habilidades = [];
    }

    const index = datos.habilidades.findIndex(
        h => String(h.habitante_id) === String(habilidadActualizada.habitante_id)
    );

    if (index !== -1) {
        datos.habilidades[index] = habilidadActualizada;
    } else {
        datos.habilidades.push(habilidadActualizada);
    }

    guardarArchivo("../datos/habilidades.json", datos);
}

// =================================
// OBTENER HABILIDADES
// =================================

function obtenerHabilidades(habitante_id) {
    const datos = cargarArchivo("../datos/habilidades.json");

    if (!datos || !Array.isArray(datos.habilidades)) {
        return null;
    }

    return datos.habilidades.find(
        h => String(h.habitante_id) === String(habitante_id)
    ) || null;
}

// =================================
// CREAR HABILIDADES
// =================================

function crearHabilidades(habitante_id) {
    let datos = cargarArchivo("../datos/habilidades.json");

    if (!datos) {
        datos = { habilidades: [] };
    }

    if (!Array.isArray(datos.habilidades)) {
        datos.habilidades = [];
    }

    const existente = obtenerHabilidades(habitante_id);
    if (existente) {
        return existente;
    }

    const nuevasHabilidades = {
        habitante_id,
        habilidades: {
            agricultura: { nivel: 0, experiencia: 0 },
            cocina: { nivel: 0, experiencia: 0 },
            forja: { nivel: 0, experiencia: 0 },
            construccion: { nivel: 0, experiencia: 0 },
            combate: { nivel: 0, experiencia: 0 },
            comercio: { nivel: 0, experiencia: 0 },
            medicina: { nivel: 0, experiencia: 0 },
            creatividad: { nivel: 0, experiencia: 0 }
        }
    };

    datos.habilidades.push(nuevasHabilidades);
    guardarArchivo("../datos/habilidades.json", datos);

    return nuevasHabilidades;
}

// =================================
// SUBIR NIVEL DE HABILIDAD
// =================================

function subirNivelHabilidad(datosHabitante, habilidad, habitante_id) {
    const habilidadDatos = datosHabitante.habilidades[habilidad];

    while (habilidadDatos.experiencia >= 100) {
        habilidadDatos.nivel++;
        habilidadDatos.experiencia -= 100;

        if (typeof crearEvento === "function") {
            crearEvento(
                "subida_habilidad",
                [habitante_id],
                {
                    habilidad,
                    nivel: habilidadDatos.nivel
                }
            );
        }

        if (typeof crearMemoria === "function") {
            crearMemoria(
                habitante_id,
                "aprendizaje",
                "Mejoró la habilidad de " + habilidad + " a nivel " + habilidadDatos.nivel,
                "media"
            );
        }
    }
}

// =================================
// AUMENTAR EXPERIENCIA
// =================================

function aumentarHabilidad(habitante_id, habilidad, cantidad) {
    let datosHabitante = obtenerHabilidades(habitante_id);

    if (!datosHabitante) {
        datosHabitante = crearHabilidades(habitante_id);
    }

    if (!datosHabitante.habilidades[habilidad]) {
        datosHabitante.habilidades[habilidad] = {
            nivel: 0,
            experiencia: 0
        };
    }

    datosHabitante.habilidades[habilidad].experiencia += cantidad;

    subirNivelHabilidad(datosHabitante, habilidad, habitante_id);
    guardarHabilidades(datosHabitante);

    return datosHabitante.habilidades[habilidad];
}

// =================================
// VERIFICAR HABILIDAD
// =================================

function tieneHabilidad(habitante_id, habilidad, nivelNecesario) {
    const datosHabitante = obtenerHabilidades(habitante_id);

    if (!datosHabitante || !datosHabitante.habilidades[habilidad]) {
        return false;
    }

    return datosHabitante.habilidades[habilidad].nivel >= nivelNecesario;
}

// =================================
// APRENDER HABILIDAD NUEVA
// =================================

function aprenderHabilidad(habitante_id, habilidad) {
    let datosHabitante = obtenerHabilidades(habitante_id);

    if (!datosHabitante) {
        datosHabitante = crearHabilidades(habitante_id);
    }

    if (!datosHabitante.habilidades[habilidad]) {
        datosHabitante.habilidades[habilidad] = {
            nivel: 1,
            experiencia: 0
        };
    } else if (datosHabitante.habilidades[habilidad].nivel === 0) {
        datosHabitante.habilidades[habilidad].nivel = 1;
    }

    if (typeof crearMemoria === "function") {
        crearMemoria(
            habitante_id,
            "aprendizaje",
            "Aprendió la habilidad " + habilidad,
            "media"
        );
    }

    guardarHabilidades(datosHabitante);

    return datosHabitante.habilidades[habilidad];
}

// =================================
// LISTAR HABILIDADES
// =================================

function listarHabilidades() {
    const datos = cargarArchivo("../datos/habilidades.json");

    if (!datos || !Array.isArray(datos.habilidades)) {
        return [];
    }

    return datos.habilidades;
}

// =================================
// EXPORTACIÓN DE MÓDULOS
// =================================

module.exports = {
    obtenerHabilidades,
    crearHabilidades,
    aumentarHabilidad,
    tieneHabilidad,
    aprenderHabilidad,
    listarHabilidades
};
            
