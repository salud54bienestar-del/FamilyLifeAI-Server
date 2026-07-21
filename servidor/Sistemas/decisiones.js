// Sistema de decisiones avanzado de Village Soul

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



    // ==================================
    // ESTADO EMOCIONAL PRINCIPAL
    // ==================================


    switch(contexto.emocion) {


        case "tristeza":

            eleccion = "buscar_apoyo";

        break;


        case "miedo":

        case "asustado":

            eleccion = "buscar_refugio";

        break;


        case "ira":

        case "enojado":

            eleccion = "calmarse";

        break;


        case "feliz":

            eleccion = "compartir_momento";

        break;

    }





    // ==================================
    // EMOCIONES SECUNDARIAS
    // ==================================


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


    else if(emociones.esperanza > 80){

        eleccion = "crear_objetivos";

    }





    // ==================================
    // PERSONALIDAD
    // ==================================


    switch(contexto.personalidad) {


        case "amable":


            if(contexto.familia){

                eleccion =
                "proteger_familia";

            }


        break;



        case "curiosa":


            eleccion =
            "explorar_el_mundo";


        break;



        case "protectora":


            eleccion =
            "ayudar_comunidad";


        break;



        case "aventurero":


            eleccion =
            "explorar_el_mundo";


        break;

    }





    // ==================================
    // FAMILIA Y RELACIONES
    // ==================================


    if(contexto.estado_pareja === "casado"){


        if(contexto.desea_hijos){

            eleccion =
            "formar_familia";

        }


    }



    if(contexto.tiene_hijos){


        eleccion =
        "cuidar_hijos";


    }





    // ==================================
    // SISTEMA DE ADOPCIÓN
    // ==================================


    if(contexto.interes_adopcion){


        if(

            contexto.confianza_pareja >= 80 &&
            contexto.vivienda &&
            contexto.alimentos &&
            contexto.estabilidad_emocional === "alta" &&
            contexto.estado_pareja === "casado"

        ){

            eleccion =
            "solicitar_adopcion";


        }


        else {


            eleccion =
            "mejorar_condiciones_familia";

        }

    }





    // ==================================
    // PROFESIONES
    // ==================================


    switch(contexto.profesion) {


        case "trabajador_social":

            eleccion =
            "evaluar_adopcion";


        break;



        case "cuidador_orfanato":

            eleccion =
            "cuidar_ninos";


        break;



        case "guardia_seguridad":

            eleccion =
            "patrullar_comunidad";


        break;



        case "medico":

            eleccion =
            "atender_pacientes";


        break;



        case "pediatra":

            eleccion =
            "cuidar_bebes";


        break;



        case "niñera":

            eleccion =
            "cuidar_hijos";


        break;



        case "cocinero":

            eleccion =
            "preparar_comida";


        break;



        case "ama_de_llaves":

            eleccion =
            "mantener_hogar";


        break;

    }





    // ==================================
    // OBJETIVOS
    // ==================================


    const objetivo =
    contexto.objetivo?.toLowerCase();



    if(objetivo === "conocer el mundo"){

        eleccion =
        "explorar_el_mundo";

    }


    else if(objetivo === "crear una amistad"){

        eleccion =
        "buscar_compañia";

    }


    else if(
        objetivo === "formar una familia"
    ){

        eleccion =
        "crear_familia";

    }





    // ==================================
    // RESULTADO
    // ==================================


    let resultadoTexto =
    "La decisión todavía no tiene resultado definido.";





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


    console.log(resultado);




    return resultado;


}





module.exports = procesarDecision;
