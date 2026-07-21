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
    const lugaresTrabajo = cargarArchivo("../datos/lugares_trabajo.json");



    if (
        !almas ||
        !emociones ||
        !objetivos ||
        !relaciones ||
        !familias ||
        !personalidades ||
        !lugaresTrabajo
    ) {

        console.log(
            "No se pudieron cargar los datos de la IA."
        );

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
    // ALMAS ESPECIALES
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
    // PROFESIÓN Y TRABAJO
    // ==============================


    const profesionActual =
    alma.profesion || null;



    let lugarTrabajo = null;



    if(profesionActual){


        lugarTrabajo =
        lugaresTrabajo.lugares_trabajo.find(

            lugar =>

            lugar.profesiones.includes(
                profesionActual.nombre
            )

        );

    }





    // ==============================
    // SISTEMA FAMILIAR
    // ==============================


    const familiaActual =
    familias.familias.find(

        familia =>

        familia.miembros.includes(
            habitante_id
        )

    );



    const tieneFamilia =
    familiaActual ? true : false;



    const tieneHijos =
    familiaActual &&
    familiaActual.hijos &&
    familiaActual.hijos.length > 0;



    let pareja = null;



    const relacionPareja =
    relaciones.relaciones.find(

        r =>

        (

            r.habitante_a === habitante_id ||

            r.habitante_b === habitante_id

        )

        &&

        (

            r.estado_pareja === "casado"

            ||

            r.tipo === "pareja"

        )

    );



    if(relacionPareja){


        pareja =

        relacionPareja.habitante_a === habitante_id

        ?

        relacionPareja.habitante_b

        :

        relacionPareja.habitante_a;


    }






    // ==============================
    // OBJETIVO ACTUAL
    // ==============================


    const objetivoActual =

    alma.objetivos?.[0]

    ||

    "explorar el mundo";







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



        estabilidad_emocional:

        emocionActual?.estabilidad_emocional

        ||

        50,



        familia:

        tieneFamilia,



        estado_pareja:

        pareja ? "casado" : "soltero",



        pareja:

        pareja,



        tiene_hijos:

        tieneHijos,



        cantidad_hijos:

        familiaActual?.hijos?.length || 0,



        vivienda:

        familiaActual?.hogar ? true : false,



        objetivo:

        objetivoActual,



        personalidad:

        personalidad?.nombre

        ||

        "desconocida",



        rasgos:

        personalidad?.rasgos

        ||

        [],




        // PROFESIONES


        profesion:

        profesionActual?.nombre

        ||

        "sin_profesion",



        nivel_profesion:

        profesionActual?.nivel

        ||

        1,



        lugar_trabajo:

        lugarTrabajo?.nombre

        ||

        "sin_lugar",



        tareas_trabajo:

        lugarTrabajo?.servicios

        ||

        [],



        puede_iniciar_adopcion:

        (

            pareja &&

            familiaActual?.hogar &&

            emocionActual?.estabilidad_emocional >= 70

        )

        ? true

        : false


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


        habitante_id:


        habitante_id,



        nombre:


        alma.nombre,



        tipo:


        alma.tipo ||

        "habitante",



        estado:


        "pensando",



        personalidad:


        personalidad,



        profesion:


        profesionActual,



        lugar_trabajo:


        lugarTrabajo,



        familia:


        familiaActual,



        contexto:


        contexto,



        decision:


        decision


    };


}





module.exports = {

    pensarAlma

};
