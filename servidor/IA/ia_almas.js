// Inteligencia artificial de almas - Village Soul

const cargarArchivo = require("../sistemas/cargador_datos.js");
const procesarDecision = require("../sistemas/decisiones.js");


function pensarAlma(habitante_id) {


    const almas = cargarArchivo("../datos/almas.json");
    const emociones = cargarArchivo("../datos/emociones.json");
    const memorias = cargarArchivo("../datos/memorias.json");
    const objetivos = cargarArchivo("../datos/objetivos.json");
    const relaciones = cargarArchivo("../datos/relaciones.json");
    const familias = cargarArchivo("../datos/familias.json");


    if (
        !almas ||
        !emociones ||
        !memorias ||
        !objetivos ||
        !relaciones ||
        !familias
    ) {

        console.log("No se pudieron cargar los datos de la IA.");

        return null;

    }



    const alma = almas.almas.find(
        (a) => a.id === habitante_id
    );


    const estadoEmocional = emociones.emociones.find(
        (e) => e.habitante_id === habitante_id
    );


    const objetivoActual = objetivos.objetivos.find(
        (o) =>
            o.habitante_id === habitante_id &&
            o.estado === "activo"
    );


    const relacionActual = relaciones.relaciones.find(
        (r) =>
            r.habitante_1 === habitante_id ||
            r.habitante_2 === habitante_id
    );


    const familiaActual = familias.familias.find(
        (f) =>
            f.miembros.includes(habitante_id)
    );



    if (!alma || !estadoEmocional) {

        console.log("Habitante no encontrado.");

        return null;

    }



    const contexto = {

        familia:
            !!familiaActual,


        emocion:
            estadoEmocional.estado_actual,


        emociones_secundarias:
            estadoEmocional.emociones_secundarias || {},


        objetivo:
            objetivoActual
            ? objetivoActual.titulo
            : null,


        relacion:
            relacionActual
            ? relacionActual.tipo
            : null,


        personalidad:
            alma.personalidad_id,


        recuerdos:
            memorias.memorias.filter(
                (m) => m.habitante_id === habitante_id
            )

    };



    console.log("=================================");
    console.log("        IA DE ALMA");
    console.log("=================================");


    console.log("Habitante:", alma.nombre);
    console.log("Estado emocional:", estadoEmocional.estado_actual);



    const decisionFinal = procesarDecision(
        habitante_id,
        contexto
    );



    const pensamiento = {

        habitante: alma.nombre,


        objetivo:
            objetivoActual
            ? objetivoActual.titulo
            : "sin objetivo",


        relacion:
            relacionActual
            ? relacionActual.tipo
            : "sin relaciones",


        familia:
            familiaActual
            ? "tiene familia"
            : "sin familia",


        decision:
            decisionFinal
            ? decisionFinal.eleccion
            : "sin decisión",


        contexto: contexto

    };



    console.log("Pensamiento generado:");
    console.log(pensamiento);



    return pensamiento;

}



pensarAlma(1);


module.exports = pensarAlma;
