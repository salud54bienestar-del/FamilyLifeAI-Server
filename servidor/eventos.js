// Sistema de eventos de Village Soul

const cargarArchivo = require("./cargador_datos.js");

function crearEvento(id) {
    const sistemaEventos = cargarArchivo("./sistema_eventos.json");

    if (!sistemaEventos) {
        console.log("No se pudo cargar el sistema de eventos.");
        return null;
    }

    const eventoBase = sistemaEventos.eventos_disponibles.find(
        (evento) => evento.id === id
    );

    if (!eventoBase) {
        console.log("Evento no encontrado.");
        return null;
    }

    const evento = {
        nombre: eventoBase.nombre,
        descripcion: eventoBase.descripcion,
        tipo: eventoBase.tipo,
        fecha: new Date().toISOString()
    };

    console.log("Nuevo evento creado:");
    console.log(evento);

    return evento;
}

// Evento inicial de prueba

crearEvento(1);

module.exports = crearEvento;
