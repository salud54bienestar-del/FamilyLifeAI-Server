// Sistema de orfanato (Hogar Nuevo Amanecer) - Village Soul 2.0

const cargarArchivo = require("./cargador_datos.js");
const guardarArchivo = require("./guardador_datos.js");
const crearEvento = require("./eventos.js");
const crearMemoria = require("./memorias.js");

// ==============================
// OBTENER ORFANATO
// ==============================

function obtenerOrfanato() {
    const datos = cargarArchivo("../datos/orfanato.json");

    if (!datos || !datos.orfanato) {
        console.log("No se pudo cargar el archivo del orfanato.");
        return null;
    }

    return datos.orfanato;
}

// ==============================
// ASIGNAR PERSONAL
// ==============================

function asignarTrabajador(habitante_id, profesion) {
    const datos = cargarArchivo("../datos/orfanato.json");

    if (!datos || !datos.orfanato) {
        return null;
    }

    const orfanato = datos.orfanato;

    if (!Array.isArray(orfanato.personal)) {
        orfanato.personal = [];
    }

    orfanato.personal.push({
        habitante_id,
        profesion,
        estado: "activo"
    });

    guardarArchivo("../datos/orfanato.json", datos);

    crearMemoria(
        habitante_id,
        "profesion",
        "Comenzó a trabajar en el Hogar Nuevo Amanecer como " + profesion,
        "media"
    );

    crearEvento("asignacion_trabajo", [habitante_id], {
        lugar: "Hogar Nuevo Amanecer",
        profesion: profesion
    });

    return orfanato;
}

// ==============================
// REGISTRAR NIÑO/A
// ==============================

function registrarInfante(datosInfante) {
    const datos = cargarArchivo("../datos/orfanato.json");

    if (!datos || !datos.orfanato) {
        return null;
    }

    const orfanato = datos.orfanato;
    let grupo;

    if (datosInfante.edad <= 2) {
        grupo = "bebes";
    } else if (datosInfante.edad < 13) {
        grupo = "niños";
    } else {
        grupo = "adolescentes";
    }

    const nuevoInfante = {
        id: Date.now(),
        nombre: datosInfante.nombre,
        edad: datosInfante.edad,
        genero: datosInfante.genero || "desconocido",
        personalidad: datosInfante.personalidad || "desconocida",
        apariencia: datosInfante.apariencia || "aleatoria",
        estado: "disponible_adopcion"
    };

    if (!Array.isArray(orfanato[grupo])) {
        orfanato[grupo] = [];
    }

    orfanato[grupo].push(nuevoInfante);

    if (typeof orfanato.ocupacion !== "number") {
        orfanato.ocupacion = 0;
    }
    orfanato.ocupacion++;

    guardarArchivo("../datos/orfanato.json", datos);

    crearEvento("ingreso_orfanato", [], {
        tipo: "nuevo_infante_orfanato",
        nombre: nuevoInfante.nombre
    });

    console.log("🏫 Infante registrado en el orfanato:", nuevoInfante.nombre);

    return nuevoInfante;
}

// ==============================
// LISTAR NIÑOS PARA ADOPCIÓN
// ==============================

function listarAdopciones() {
    const orfanato = obtenerOrfanato();

    if (!orfanato) {
        return [];
    }

    const todos = [
        ...(orfanato.bebes || []),
        ...(orfanato.niños || []),
        ...(orfanato.adolescentes || [])
    ];

    return todos.filter(niño => niño.estado === "disponible_adopcion");
}

// ==============================
// REGISTRAR SOLICITUD
// ==============================

function crearSolicitudAdopcion(familia_id, infante_id) {
    const datos = cargarArchivo("../datos/orfanato.json");

    if (!datos || !datos.orfanato) {
        return null;
    }

    const orfanato = datos.orfanato;

    if (!Array.isArray(orfanato.solicitudes_adopcion)) {
        orfanato.solicitudes_adopcion = [];
    }

    const solicitud = {
        id: Date.now(),
        familia_id,
        infante_id,
        estado: "pendiente",
        fecha: null
    };

    orfanato.solicitudes_adopcion.push(solicitud);
    guardarArchivo("../datos/orfanato.json", datos);

    return solicitud;
}

// ==============================
// EXPORTACIÓN DE MÓDULOS
// ==============================

module.exports = {
    obtenerOrfanato,
    asignarTrabajador,
    registrarInfante,
    listarAdopciones,
    crearSolicitudAdopcion
};
    
