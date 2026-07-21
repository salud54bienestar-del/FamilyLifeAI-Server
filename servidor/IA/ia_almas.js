// Inteligencia artificial de almas - Village Soul

const cargarArchivo = require("../Sistemas/cargador_datos.js");
const procesarDecision = require("../Sistemas/decisiones.js");


function pensarAlma(habitante_id) {


    const almas = cargarArchivo("../datos/almas.json");
    const emociones = cargarArchivo("../datos/emociones.json");
    const objetivos = cargarArchivo("../datos/objetivos.json");
    const relaciones = cargarArchivo("../datos/relaciones.json");
    const familias = cargarArchivo("../datos/familias.json");
    const personalidades = cargarArchivo("../datos/personalidades.json");


    if (
        !almas ||
        !emociones ||
        !objetivos ||
        !relaciones ||
        !familias ||
        !personalidades
    ) {

        console.log("No se pudieron cargar los datos de la IA.");

        return null;
    }



    const alma = almas.almas.find(
        a => a.id === habitante_id
    );



    if (!alma) {

        console.log(
            "No existe el habitante:",
            habitante_id
        );

        return null;
    }



    console.log(
        "Pensando alma:",
        alma.nombre
    );



    // ==============================
    // ALMAS ESPECIALES (GUÍAS)
    // ==============================


    if (alma.tipo === "guia") {


        console.log(
            "Tipo de alma: guía"
        );


        return {


            habitante_id: alma.id,

            nombre: alma.nombre,

            tipo: "guia",

            estado: "asistiendo",


            funcion:
            "Ayudar al jugador y explicar el mundo de Village Soul",


            objetivos:
            alma.objetivos


        };


    }





    // ==============================
    // PERSONALIDAD
    // ==============================


    const personalidad =
    personalidades.personalidades.find(
        p => p.id === alma.personalidad_id
    );



    if (personalidad) {

        console.log(
            "Personalidad:",
            personalidad.nombre
        );

    }

    else {

        console.log(
            "Personalidad no encontrada."
        );

    }





    // ==============================
    // EMOCIONES
    // ==============================


    const emocionActual =
    emociones.emociones.find(
        e => e.habitante_id === habitante_id
    );





    // ==============================
    // OBJETIVO ACTUAL
    // ==============================


    const objetivoActual =
    alma.objetivos?.[0]
    ||
    "explorar el mundo";





    // ==============================
    // FAMILIA
    // ==============================


    const tieneFamilia =
    alma.familia &&
    alma.familia.length > 0;






    // ==============================
    // CONTEXTO DE DECISIÓN
    // ==============================


    const contexto = {


        emocion:
        emocionActual?.estado_actual
        ||
        "neutral",



        emociones_secundarias:
        emocionActual?.emociones_secundarias
        ||
        {},



        familia:
        tieneFamilia,



        objetivo:
        objetivoActual,



        personalidad:
        personalidad?.nombre
        ||
        "desconocida",



        rasgos:
        personalidad?.rasgos
        ||
        []


    };






    // ==============================
    // TOMAR DECISIÓN
    // ==============================


    const decision =
    procesarDecision(
        habitante_id,
        contexto
    );






    return {


        habitante_id:


        habitante_id,


        nombre:


        alma.nombre,



        tipo:


        alma.tipo
        ||
        "habitante",



        estado:


        "pensando",



        personalidad:


        personalidad,



        contexto:


        contexto,



        decision:


        decision


    };


}




module.exports = {

    pensarAlma

};
