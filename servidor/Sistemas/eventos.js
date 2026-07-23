// Sistema avanzado de eventos - Village Soul

const cargarArchivo = require("./cargador_datos.js");
const guardarArchivo = require("./guardador_datos.js");
const crearMemoria = require("./memorias.js");
const emociones = require("./emociones.js");

const MAX_EVENTOS = 10000;

// =================================
// BUSCAR EVENTO BASE
// =================================

function obtenerEventoBase(id) {
    const sistema = cargarArchivo("../datos/sistema_eventos.json");

    if (!sistema || !Array.isArray(sistema.eventos_disponibles)) {
        return null;
    }

    return sistema.eventos_disponibles.find(
        evento =>
            String(evento.id) === String(id) ||
            (evento.nombre && evento.nombre.toLowerCase() === String(id).toLowerCase())
    ) || null;
}

// =================================
// CREAR EVENTO
// =================================

function crearEvento(
    id,
    participantes = [],
    datosExtra = {}
) {
    let eventoBase = obtenerEventoBase(id);

    // Evento genérico si no existe
    if (!eventoBase) {
        eventoBase = {
            id,
            tipo: "sistema",
            nombre: String(id),
            descripcion: datosExtra.descripcion || "Evento del mundo generado automáticamente.",
            importancia: "baja",
            emocion: "neutral"
        };
    }

    let datosEventos = cargarArchivo("../datos/eventos.json");

    if (!datosEventos) {
        datosEventos = { eventos: [] };
    }

    if (!Array.isArray(datosEventos.eventos)) {
        datosEventos.eventos = [];
    }

    const nuevoId = datosEventos.eventos.length > 0
        ? Math.max(...datosEventos.eventos.map(e => Number(e.id) || 0)) + 1
        : 1;

    const participantesArray = Array.isArray(participantes) ? participantes : [participantes];

    const evento = {
        id: nuevoId,
        tipo: eventoBase.tipo || "sistema",
        nombre: eventoBase.nombre || String(id),
        descripcion: datosExtra.descripcion || eventoBase.descripcion || "Sin descripción",
        categoria: eventoBase.categoria || "general",
        importancia: eventoBase.importancia || "media",
        participantes: participantesArray,
        datos: datosExtra,
        fecha: new Date().toISOString()
    };

    datosEventos.eventos.push(evento);

    // Limitar historia de eventos
    if (datosEventos.eventos.length > MAX_EVENTOS) {
        datosEventos.eventos.shift();
    }

    guardarArchivo("../datos/eventos.json", datosEventos);

    // Efectos en habitantes
    participantesArray.forEach(habitante_id => {
        if (typeof crearMemoria === "function") {
            crearMemoria(
                habitante_id,
                "evento",
                evento.descripcion,
                evento.importancia,
                participantesArray,
                eventoBase.emocion || "neutral"
            );
        }

        if (eventoBase.efectos && emociones && typeof emociones.cambiarEmocion === "function") {
            Object.keys(eventoBase.efectos).forEach(emocion => {
                emociones.cambiarEmocion(
                    habitante_id,
                    emocion,
                    eventoBase.efectos[emocion],
                    evento.nombre
                );
            });
        }
    });

    return evento;
}

// =================================
// EVENTO PERSONALIZADO
// =================================

function crearEventoPersonalizado(
    nombre,
    participantes = [],
    descripcion = "",
    importancia = "media"
) {
    return crearEvento(
        nombre,
        participantes,
        {
            descripcion,
            personalizado: true
        }
    );
}

// =================================
// OBTENER EVENTOS
// =================================

function obtenerEventos() {
    const datos = cargarArchivo("../datos/eventos.json");

    if (!datos || !Array.isArray(datos.eventos)) {
        return [];
    }

    return datos.eventos;
}

// =================================
// EXPORTACIÓN DE MÓDULOS
// =================================

module.exports = {
    crearEvento,
    crearEventoPersonalizado,
    obtenerEventos,
    obtenerEventoBase
};
