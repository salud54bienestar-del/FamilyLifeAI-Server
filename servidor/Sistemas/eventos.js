// Sistema de eventos de Village Soul

const cargarArchivo = require("./cargador_datos.js");
const crearMemoria = require("./memorias.js");
const emociones = require("./emociones.js");


function crearEvento(id, participantes = [], datosExtra = {}) {


    const sistemaEventos = cargarArchivo("../datos/sistema_eventos.json");


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


        id: id,

        nombre: eventoBase.nombre,

        descripcion: eventoBase.descripcion,

        tipo: eventoBase.tipo,

        fecha: new Date().toISOString(),

        participantes: participantes,

        datos: datosExtra,

        importancia: eventoBase.importancia || "media"

    };



    console.log("Nuevo evento creado:");

    console.log(evento);




    participantes.forEach((habitante) => {



        crearMemoria(

            habitante,

            "evento",

            evento.nombre,

            evento.importancia,

            participantes,

            eventoBase.emocion || "neutral"

        );



        emociones.aplicarEventoEmocional(

            habitante,

            evento.nombre

        );



    });



    return evento;

}




// Evento inicial

crearEvento(

    1,

    [1],

    {

        inicio: "primera historia del mundo"

    }

);



module.exports = crearEvento;
