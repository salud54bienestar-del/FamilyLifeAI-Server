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
    // PROFESIONES
    // ==============================


    const profesion =
    contexto.profesion?.toLowerCase();



    switch(profesion){


        case "agricultor":

            eleccion = "trabajar_granja";

        break;



        case "trabajador_social":

            eleccion = "evaluar_adopciones";

        break;



        case "cuidador_orfanato":

            eleccion = "cuidar_ninos";

        break;



        case "guardia_seguridad":

            eleccion = "patrullar_comunidad";

        break;



        case "medico":

        case "pediatra":

            eleccion = "atender_pacientes";

        break;



        case "enfermero":

            eleccion = "cuidar_pacientes";

        break;



        case "maestro":

            eleccion = "enseñar_ninos";

        break;



        case "cocinero":

        case "chef_restaurante":

            eleccion = "preparar_comida";

        break;



        case "ama_de_llaves":

        case "sirvienta":

            eleccion = "mantener_hogar";

        break;



        case "niñera":

            eleccion = "cuidar_hijos";

        break;


    }





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


    const emociones =
    contexto.emociones_secundarias || {};



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

            eleccion = "proteger_familia";

        }



        else if(
            contexto.personalidad === "curiosa"
        ){

            eleccion = "explorar_el_mundo";

        }



        else if(
            contexto.personalidad === "protectora"
        ){

            eleccion = "ayudar_comunidad";

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


    const objetivo =
    contexto.objetivo?.toLowerCase();



    if(objetivo === "crear una amistad"){

        eleccion = "buscar_compañia";

    }


    else if(objetivo === "conocer el mundo"){

        eleccion = "explorar_el_mundo";

    }


    else if(objetivo === "formar una familia"){

        eleccion = "crear_familia";

    }





    // ==============================
    // RESULTADO
    // ==============================


    let resultadoTexto =
    "La decisión no tiene un resultado definido todavía.";



    if(decision.resultados){

        if(decision.resultados[eleccion]){

            resultadoTexto =
            decision.resultados[eleccion];

        }

    }





    const resultado = {


        habitante_id:
        decision.habitante_id,


        situacion:
        decision.situacion,


        eleccion:
        eleccion,


        resultado:
        resultadoTexto,


        contexto:
        contexto


    };





    console.log("=================================");
    console.log("        DECISIÓN");
    console.log("=================================");


    console.log("Habitante:",
    decision.habitante_id);


    console.log("Elección:",
    eleccion);


    console.log("Resultado:");

    console.log(resultado);



    return resultado;


}



module.exports = procesarDecision;
