// Inteligencia artificial de almas - Village Soul

const cargarArchivo = require("./cargador_datos.js");


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



    console.log("=================================");
    console.log("        IA DE ALMA");
    console.log("=================================");


    console.log("Habitante:", alma.nombre);

    console.log(
        "Estado emocional:",
        estadoEmocional.estado_actual
    );


    console.log(
        "Recuerdos:",
        memorias.memorias.length
    );



    let decision = "";

    let motivo = "";



    // Prioridad familiar

    if (familiaActual) {

        decision = "cuidar familia";

        motivo = "tiene vínculos familiares importantes";


    }

    // Necesidad emocional

    else if (estadoEmocional.tristeza > 50) {


        decision = "buscar compañía";

        motivo = "necesita apoyo emocional";


    }

    else if (estadoEmocional.miedo > 50) {


        decision = "regresar a un lugar seguro";

        motivo = "busca protección";


    }

    else if (objetivoActual) {


        decision = "trabajar en su objetivo";

        motivo = "quiere avanzar en sus metas";


    }

    else if (estadoEmocional.calma > 50) {


        decision = "explorar el mundo";

        motivo = "quiere descubrir nuevas experiencias";


    }

    else {


        decision = "descansar";

        motivo = "necesita recuperar energía";


    }




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


        decision: decision,


        motivo: motivo

    };



    console.log("Decisión generada:");

    console.log(pensamiento);



    return pensamiento;

}



pensarAlma(1);


module.exports = pensarAlma;
