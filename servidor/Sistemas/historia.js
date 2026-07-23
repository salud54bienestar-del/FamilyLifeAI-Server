// Sistema avanzado de historia del mundo - Village Soul

const cargarArchivo = require("./cargador_datos.js");
const guardarArchivo = require("./guardador_datos.js");
const crearEvento = require("./eventos.js");

// =================================
// CARGAR HISTORIA
// =================================

function cargarHistoria() {
    const datos = cargarArchivo("../datos/historia.json");

    if (!datos || !Array.isArray(datos.historia)) {
        return [];
    }

    return datos.historia;
}

// =================================
// FECHA DEL MUNDO
// =================================

function obtenerFechaMundo() {
    const tiempo = cargarArchivo("../datos/tiempo.json");

    if (!tiempo || !tiempo.tiempo) {
        return new Date().toISOString();
    }

    return {
        dia: tiempo.tiempo.dia ?? 1,
        mes: tiempo.tiempo.mes ?? 1,
        año: tiempo.tiempo.año ?? 1,
        estacion: tiempo.tiempo.estacion ?? "primavera"
    };
}

// =================================
// IMPORTANCIA
// =================================

function calcularImportancia(tipo) {
    switch (tipo) {
        case "fundacion":
            return "legendaria";

        case "guerra":
        case "desastre":
        case "descubrimiento":
        case "revolucion":
            return "alta";

        case "nacimiento":
        case "matrimonio":
        case "familia":
            return "media";

        case "fiesta":
        case "cultura":
            return "baja";

        case "leyenda":
            return "mitica";

        default:
            return "normal";
    }
}

// =================================
// REGISTRAR HISTORIA
// =================================

function registrarHistoria(
    titulo,
    descripcion,
    tipo = "general",
    participantes = []
) {
    let datos = cargarArchivo("../datos/historia.json");

    if (!datos) {
        datos = { historia: [] };
    }

    if (!Array.isArray(datos.historia)) {
        datos.historia = [];
    }

    const nuevoId = datos.historia.length > 0
        ? Math.max(...datos.historia.map(h => Number(h.id) || 0)) + 1
        : 1;

    const acontecimiento = {
        id: nuevoId,
        titulo: titulo || "Sin título",
        descripcion: descripcion || "",
        tipo,
        participantes: Array.isArray(participantes) ? participantes : [],
        fecha: obtenerFechaMundo(),
        importancia: calcularImportancia(tipo),
        fama: 0,
        consecuencias: [],
        registrado: true
    };

    datos.historia.push(acontecimiento);
    guardarArchivo("../datos/historia.json", datos);

    if (typeof crearEvento === "function") {
        crearEvento(
            "nuevo_acontecimiento",
            acontecimiento.participantes,
            {
                titulo,
                tipo
            }
        );
    }

    return acontecimiento;
}

// =================================
// AGREGAR CONSECUENCIA
// =================================

function agregarConsecuencia(historia_id, consecuencia) {
    const datos = cargarArchivo("../datos/historia.json");

    if (!datos || !Array.isArray(datos.historia)) {
        return null;
    }

    const historia = datos.historia.find(h => Number(h.id) === Number(historia_id));

    if (!historia) {
        return null;
    }

    if (!Array.isArray(historia.consecuencias)) {
        historia.consecuencias = [];
    }

    historia.consecuencias.push(consecuencia);
    guardarArchivo("../datos/historia.json", datos);

    return historia;
}

// =================================
// BUSCAR POR TIPO
// =================================

function buscarPorTipo(tipo) {
    const historia = cargarHistoria();
    return historia.filter(h => h.tipo === tipo);
}

// =================================
// BUSCAR HISTORIA DE HABITANTE
// =================================

function buscarHistoriaHabitante(habitante_id) {
    const historia = cargarHistoria();

    return historia.filter(h =>
        Array.isArray(h.participantes) &&
        h.participantes.some(p => String(p) === String(habitante_id))
    );
}

// =================================
// ÚLTIMOS EVENTOS
// =================================

function obtenerUltimos(cantidad = 10) {
    const historia = cargarHistoria();
    return historia.slice(-cantidad);
}

// =================================
// AUMENTAR FAMA DE HISTORIA
// =================================

function aumentarFama(historia_id, cantidad) {
    const datos = cargarArchivo("../datos/historia.json");

    if (!datos || !Array.isArray(datos.historia)) {
        return null;
    }

    const historia = datos.historia.find(h => Number(h.id) === Number(historia_id));

    if (!historia) {
        return null;
    }

    historia.fama = Math.min(100, (historia.fama || 0) + cantidad);

    guardarArchivo("../datos/historia.json", datos);
    return historia;
}

// =================================
// CREAR LEYENDA
// =================================

function crearLeyenda(titulo, descripcion) {
    const leyenda = registrarHistoria(titulo, descripcion, "leyenda");

    if (leyenda) {
        return aumentarFama(leyenda.id, 100);
    }

    return leyenda;
}

// =================================
// EXPORTACIÓN DE MÓDULOS
// =================================

module.exports = {
    cargarHistoria,
    registrarHistoria,
    agregarConsecuencia,
    buscarPorTipo,
    buscarHistoriaHabitante,
    obtenerUltimos,
    crearLeyenda,
    aumentarFama
};
            
