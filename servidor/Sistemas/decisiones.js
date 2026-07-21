// Sistema de decisiones de Village Soul

const cargarArchivo = require("./cargador_datos.js");


function procesarDecision(id, contexto = {}) {


    const datos = cargarArchivo("../datos/decisiones.json");


    if (!datos) {

        console.log("No se pudieron cargar las decisiones.");

        return null;

    }


    const decision = datos.decisiones.find(
        (d) => d.id === id
    );


    if (!decision) {

        console.log("Decisión no encontrada.");

        return null;

    }



    let eleccion = decision.eleccion;



    // Prioridad por emociones principales

    if (contexto.emocion === "tristeza") {

        eleccion = "buscar_apoyo";

    }

    else if (contexto.emocion === "asustado") {

        eleccion = "buscar_refugio";

    }

    else if (contexto.emocion === "enojado") {

        eleccion = "calmarse";

    }



    // Prioridad por emociones secundarias

    if (contexto.emociones_secundarias) {


        if (contexto.emociones_secundarias.soledad > 60) {

            eleccion = "buscar_compañia";

        }


        else if (contexto.emociones_secundarias.amor > 70) {

            eleccion = "cuidar_familia";

        }


        else if (contexto.emociones_secundarias.estres > 70) {

            eleccion = "descansar";

        }


        else if (contexto.emociones_secundarias.esperanza > 80) {

            eleccion = "explorar_el_mundo";

        }

    }



    // Prioridad familiar

    if (contexto.familia) {

        eleccion = "proteger_familia";

    }



    // Relaciones

    if (contexto.relacion === "conflicto") {

        eleccion = "resolver_conflicto";

    }



    // Objetivos

    if (contexto.objetivo === "Crear una amistad") {

        eleccion = "crear_vinculos";

    }


    else if (contexto.objetivo === "Conocer el mundo") {

        eleccion = "explorar_el_mundo";

    }


    else if (contexto.objetivo === "crear_una_familia") {

        eleccion = "crear_familia";

    }



    // Influencia de personalidad

    if (contexto.personalidad) {


        if (contexto.personalidad === "amable") {


            if (
                !contexto.familia &&
                contexto.emocion === "tranquila"
            ) {

                eleccion = "ayudar_habitante";

            }

        }



        else if (contexto.personalidad === "aventurero") {


            if (
                contexto.emocion === "tranquila"
            ) {

                eleccion = "explorar_el_mundo";

            }

        }


    }



    const resultado = {

        habitante_id: decision.habitante_id,

        situacion: decision.situacion,

        eleccion: eleccion,

        resultado: decision.resultado,

        contexto: contexto

    };



    console.log("=================================");
    console.log("        DECISIÓN");
    console.log("=================================");


    console.log("Habitante:", decision.habitante_id);

    console.log("Elección:", eleccion);


    console.log("Resultado:");

    console.log(resultado);



    return resultado;

}



module.exports = procesarDecision;
