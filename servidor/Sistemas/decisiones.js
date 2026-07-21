// Sistema de decisiones de Village Soul

const cargarArchivo = require("./cargador_datos.js");


function procesarDecision(id, contexto = {}) {


    const datos = cargarArchivo("../datos/decisiones.json");


    if (!datos) {

        console.log("No se pudieron cargar las decisiones.");

        return null;

    }


    const decision = datos.decisiones.find(
        d => d.id === id
    );


    if (!decision) {

        console.log("Decisión no encontrada.");

        return null;

    }



    let eleccion = decision.eleccion;



    // ==============================
    // EMOCIONES PRINCIPALES
    // ==============================


    switch(contexto.emocion) {

        case "tristeza":

            eleccion = "buscar_apoyo";

        break;


        case "asustado":

            eleccion = "buscar_refugio";

        break;


        case "enojado":

            eleccion = "calmarse";

        break;

    }




    // ==============================
    // EMOCIONES SECUNDARIAS
    // ==============================


    const emociones = contexto.emociones_secundarias || {};


    if(emociones.soledad > 60){

        eleccion = "buscar_compañia";

    }


    else if(emociones.estres > 70){

        eleccion = "descansar";

    }


    else if(emociones.amor > 70){

        eleccion = "cuidar_familia";

    }



    // ==============================
    // PERSONALIDAD
    // ==============================


    if(contexto.personalidad){


        if(
            contexto.personalidad === "amable" &&
            contexto.familia
        ){

            eleccion = "ayudar_familia";

        }



        if(
            contexto.personalidad === "aventurero"
        ){

            eleccion = "explorar_el_mundo";

        }


    }





    // ==============================
    // RELACIONES
    // ==============================


    if(contexto.relacion === "conflicto"){

        eleccion = "resolver_conflicto";

    }




    // ==============================
    // OBJETIVOS
    // ==============================


    const objetivo = contexto.objetivo?.toLowerCase();



    if(objetivo === "crear una amistad"){

        eleccion = "crear_vinculos";

    }



    else if(objetivo === "conocer el mundo"){

        eleccion = "explorar_el_mundo";

    }



    else if(objetivo === "crear_una_familia"){

        eleccion = "crear_familia";

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
