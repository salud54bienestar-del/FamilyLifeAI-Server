// Sistema emocional de Village Soul

const cargarArchivo = require("./cargador_datos.js");
const crearMemoria = require("./memorias.js");


function cambiarEmocion(
    habitante_id,
    emocion,
    cantidad,
    motivo = "evento"
) {


    const datos = cargarArchivo("./emociones.json");


    if (!datos) {

        console.log("No se pudieron cargar las emociones.");

        return null;

    }



    const estado = datos.emociones.find(
        (e) => e.habitante_id === habitante_id
    );



    if (!estado) {

        console.log("Habitante emocional no encontrado.");

        return null;

    }



    if (estado[emocion] !== undefined) {

        estado[emocion] += cantidad;


        // Limitar valores entre 0 y 100

        if (estado[emocion] > 100) {

            estado[emocion] = 100;

        }


        if (estado[emocion] < 0) {

            estado[emocion] = 0;

        }

    }



    estado.ultima_emocion_importante = {

        evento: motivo,

        fecha: new Date().toISOString()

    };



    actualizarEstadoActual(estado);



    crearMemoria(

        habitante_id,

        "emocion",

        "Su emoción cambió: " + emocion,

        "media",

        [],

        emocion

    );



    console.log("Emoción actualizada:");

    console.log(estado);



    return estado;

}



function actualizarEstadoActual(estado) {


    if (estado.tristeza > 60) {

        estado.estado_actual = "triste";

    }

    else if (estado.miedo > 60) {

        estado.estado_actual = "asustado";

    }

    else if (estado.ira > 60) {

        estado.estado_actual = "enojado";

    }

    else if (estado.felicidad > 70) {

        estado.estado_actual = "feliz";

    }

    else if (estado.calma > 70) {

        estado.estado_actual = "tranquila";

    }

    else {

        estado.estado_actual = "neutral";

    }

}



function aplicarEventoEmocional(
    habitante_id,
    evento
) {


    switch(evento) {


        case "amistad":

            cambiarEmocion(
                habitante_id,
                "felicidad",
                10,
                "nueva amistad"
            );

            cambiarEmocion(
                habitante_id,
                "confianza",
                10,
                "nueva amistad"
            );

            break;



        case "conflicto":

            cambiarEmocion(
                habitante_id,
                "tristeza",
                15,
                "conflicto"
            );

            cambiarEmocion(
                habitante_id,
                "ira",
                10,
                "conflicto"
            );

            break;



        case "nacimiento":

            cambiarEmocion(
                habitante_id,
                "felicidad",
                20,
                "nacimiento"
            );

            cambiarEmocion(
                habitante_id,
                "amor",
                20,
                "nacimiento"
            );

            break;



        case "familia":

            cambiarEmocion(
                habitante_id,
                "confianza",
                15,
                "familia"
            );

            break;


        default:

            console.log(
                "Evento emocional sin efecto definido."
            );

            break;

    }


}



module.exports = {

    cambiarEmocion,

    aplicarEventoEmocional

};
