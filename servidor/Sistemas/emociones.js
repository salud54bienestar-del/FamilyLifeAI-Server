// Sistema emocional de Village Soul

const cargarArchivo = require("./cargador_datos.js");
const crearMemoria = require("./memorias.js");


function cambiarEmocion(
    habitante_id,
    emocion,
    cantidad,
    motivo = "evento"
) {


    const datos = cargarArchivo("../datos/emociones.json");


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

    }

    else if (
        estado.emociones_secundarias &&
        estado.emociones_secundarias[emocion] !== undefined
    ) {

        estado.emociones_secundarias[emocion] += cantidad;

    }


    limitarValores(estado);



    estado.ultima_emocion_importante = {

        evento: motivo,

        fecha: new Date().toISOString()

    };



    actualizarEstadoActual(estado);



    crearMemoria(

        habitante_id,

        "emocion",

        "Su emoción cambió por: " + motivo,

        "media",

        [],

        emocion

    );



    console.log("Emoción actualizada:");

    console.log(estado);



    return estado;

}



function limitarValores(estado) {


    Object.keys(estado).forEach((clave) => {

        if (typeof estado[clave] === "number") {

            if (estado[clave] > 100) {

                estado[clave] = 100;

            }


            if (estado[clave] < 0) {

                estado[clave] = 0;

            }

        }

    });



    if (estado.emociones_secundarias) {

        Object.keys(estado.emociones_secundarias).forEach((clave) => {

            if (estado.emociones_secundarias[clave] > 100) {

                estado.emociones_secundarias[clave] = 100;

            }


            if (estado.emociones_secundarias[clave] < 0) {

                estado.emociones_secundarias[clave] = 0;

            }

        });

    }

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

        case "primer_encuentro":

            cambiarEmocion(habitante_id,"felicidad",5,"primer encuentro");
            cambiarEmocion(habitante_id,"confianza",5,"primer encuentro");

            break;


        case "amistad":

            cambiarEmocion(habitante_id,"felicidad",10,"amistad");
            cambiarEmocion(habitante_id,"confianza",10,"amistad");

            break;


        case "nacimiento":

            cambiarEmocion(habitante_id,"felicidad",20,"nacimiento");
            cambiarEmocion(habitante_id,"amor",20,"nacimiento");
            cambiarEmocion(habitante_id,"orgullo",10,"nacimiento");

            break;


        case "boda":

            cambiarEmocion(habitante_id,"felicidad",20,"boda");
            cambiarEmocion(habitante_id,"amor",20,"boda");

            break;


        case "divorcio":

            cambiarEmocion(habitante_id,"tristeza",20,"divorcio");
            cambiarEmocion(habitante_id,"soledad",10,"divorcio");

            break;


        case "conflicto":

            cambiarEmocion(habitante_id,"tristeza",15,"conflicto");
            cambiarEmocion(habitante_id,"ira",10,"conflicto");

            break;


        case "familia":

            cambiarEmocion(habitante_id,"confianza",15,"familia");

            break;


        default:

            console.log(
                "Evento emocional sin efecto definido:" + evento
            );

            break;

    }

}



module.exports = {

    cambiarEmocion,

    aplicarEventoEmocional

};
