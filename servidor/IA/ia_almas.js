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
    const profesiones = cargarArchivo("../datos/profesiones.json");
    const lugares = cargarArchivo("../datos/lugares_trabajo.json");


    if (
        !almas ||
        !emociones ||
        !objetivos ||
        !relaciones ||
        !familias ||
        !personalidades ||
        !profesiones ||
        !lugares
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
    // GUÍAS ESPECIALES
    // ==============================


    if (alma.tipo === "guia") {


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





    // ==============================
    // EMOCIONES
    // ==============================


    const emocionActual =
    emociones.emociones.find(
        e => e.habitante_id === habitante_id
    );





    // ==============================
    // PROFESIÓN
    // ==============================


    const profesionActual =
    profesiones.profesiones.find(
        p => p.nombre === alma.profesion.nombre
    );





    // ==============================
    // LUGAR DE TRABAJO
    // ==============================


    let lugarTrabajo = null;


    if(profesionActual){


        lugarTrabajo =
        lugares.lugares.find(
            l => l.nombre === profesionActual.lugar_trabajo
        );


    }






    // ==============================
    // FAMILIA
    // ==============================


    const tieneFamilia =
    alma.familia &&
    alma.familia.length > 0;






    // ==============================
    // OBJETIVO
    // ==============================


    const objetivoActual =
    alma.objetivos?.[0]
    ||
    "explorar el mundo";







    // ==============================
    // CONTEXTO DE VIDA
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



        hijos:
        alma.familia?.hijos
        ||
        [],



        profesion:
        alma.profesion?.nombre
        ||
        "sin_profesion",



        lugar_trabajo:
        lugarTrabajo?.nombre
        ||
        "ninguno",



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
    // DECISIÓN DE IA
    // ==============================


    const decision =
    procesarDecision(
        habitante_id,
        contexto
    );





    return {


        habitante_id,

        nombre:
        alma.nombre,


        tipo:
        alma.tipo
        ||
        "habitante",



        estado:
        "pensando",



        personalidad,



        profesion:
        profesionActual,



        contexto,



        decision


    };


}




module.exports = {

    pensarAlma

};
