// ==========================================
// Sistema de Profesiones - Village Soul v3.0
// ==========================================

const cargarArchivo = require("./cargador_datos.js");
const guardarArchivo = require("./guardador_datos.js");
const crearEvento = require("./eventos.js");
const crearMemoria = require("./memorias.js");

const NIVELES_EXPERIENCIA = [
    { nivel: 1, nombre: "Inexperto", experiencia: 0 },
    { nivel: 2, nombre: "Aprendiz", experiencia: 100 },
    { nivel: 3, nombre: "Principiante", experiencia: 300 },
    { nivel: 4, nombre: "Intermedio", experiencia: 700 },
    { nivel: 5, nombre: "Avanzado", experiencia: 1500 },
    { nivel: 6, nombre: "Experto", experiencia: 3000 },
    { nivel: 7, nombre: "Maestro", experiencia: 6000 },
    { nivel: 8, nombre: "Legendario", experiencia: 12000 }
];

const PROFESIONES = {
    agricultura: [
        "Granjero",
        "Ganadero",
        "Pescador",
        "Leñador"
    ],
    construccion: [
        "Albañil",
        "Carpintero",
        "Cantero",
        "Herrero"
    ],
    comercio: [
        "Comerciante",
        "Panadero",
        "Carnicero",
        "Sastre"
    ],
    salud: [
        "Médico",
        "Enfermero",
        "Enfermera",
        "Partero",
        "Partera"
    ],
    educacion: [
        "Maestro",
        "Maestra",
        "Bibliotecario"
    ],
    seguridad: [
        "Guardia",
        "Guardia de seguridad",
        "Soldado"
    ],
    hogar: [
        "Ama de llaves",
        "Sirviente",
        "Sirvienta",
        "Cocinero",
        "Cocinera",
        "Niñero",
        "Niñera"
    ],
    orfanato: [
        "Director del orfanato",
        "Directora del orfanato",
        "Empleado del orfanato",
        "Cuidador del orfanato",
        "Cuidadora del orfanato"
    ]
};

// =================================
// ASIGNAR PROFESIÓN
// =================================

function asignarProfesion(habitante_id, nombreProfesion, categoria = "general") {
    const almas = cargarArchivo("../datos/almas.json");

    if (!almas || !Array.isArray(almas.almas)) {
        return null;
    }

    const habitante = almas.almas.find(a => a.id === habitante_id);

    if (!habitante) {
        return null;
    }

    habitante.profesion = {
        nombre: nombreProfesion,
        categoria,
        nivel: 1,
        rango: "Inexperto",
        experiencia: 0,
        experiencia_siguiente: 100
    };

    guardarArchivo("../datos/almas.json", almas);

    if (typeof crearMemoria === "function") {
        crearMemoria(
            habitante_id,
            "profesion",
            `Comenzó a trabajar como ${nombreProfesion}.`,
            "media"
        );
    }

    if (typeof crearEvento === "function") {
        crearEvento("nueva_profesion", [habitante_id], {
            profesion: nombreProfesion,
            categoria
        });
    }

    return habitante.profesion;
}

// =================================
// AGREGAR EXPERIENCIA
// =================================

function agregarExperiencia(habitante_id, cantidad) {
    const almas = cargarArchivo("../datos/almas.json");

    if (!almas || !Array.isArray(almas.almas)) {
        return null;
    }

    const habitante = almas.almas.find(a => a.id === habitante_id);

    if (!habitante || !habitante.profesion) {
        return null;
    }

    habitante.profesion.experiencia = (habitante.profesion.experiencia || 0) + cantidad;

    // Determinar el nuevo nivel y rango según la tabla
    let nuevoNivelObj = NIVELES_EXPERIENCIA[0];
    for (let i = NIVELES_EXPERIENCIA.length - 1; i >= 0; i--) {
        if (habitante.profesion.experiencia >= NIVELES_EXPERIENCIA[i].experiencia) {
            nuevoNivelObj = NIVELES_EXPERIENCIA[i];
            break;
        }
    }

    const nivelAnterior = habitante.profesion.nivel || 1;

    habitante.profesion.nivel = nuevoNivelObj.nivel;
    habitante.profesion.rango = nuevoNivelObj.nombre;

    const siguienteNivel = NIVELES_EXPERIENCIA.find(n => n.nivel === nuevoNivelObj.nivel + 1);
    habitante.profesion.experiencia_siguiente = siguienteNivel ? siguienteNivel.experiencia : "Máximo";

    guardarArchivo("../datos/almas.json", almas);

    // Si hubo subida de nivel
    if (nuevoNivelObj.nivel > nivelAnterior) {
        if (typeof crearEvento === "function") {
            crearEvento("subida_nivel_profesion", [habitante_id], {
                profesion: habitante.profesion.nombre,
                nivel: nuevoNivelObj.nivel,
                rango: nuevoNivelObj.nombre
            });
        }

        if (typeof crearMemoria === "function") {
            crearMemoria(
                habitante_id,
                "profesion",
                `Alcanzó el rango de ${nuevoNivelObj.nombre} (${habitante.profesion.nombre}).`,
                "media"
            );
        }
    }

    return habitante.profesion;
}

// =================================
// EXPORTACIÓN DE MÓDULOS
// =================================

module.exports = {
    NIVELES_EXPERIENCIA,
    PROFESIONES,
    asignarProfesion,
    agregarExperiencia
};
                
