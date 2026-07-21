// Sistema de decisiones avanzado de Village Soul

const cargarArchivo = require("./cargador_datos.js");
const crearMemoria = require("./memorias.js");
const crearEvento = require("./eventos.js");




// ==================================
// PROCESAR DECISIÓN
// ==================================

function procesarDecision(
    id,
    contexto = {}
){



    const datos =
    cargarArchivo("../datos/decisiones.json");



    if(!datos){

        console.log(
            "No se pudieron cargar las decisiones."
        );

        return null;

    }




    const decision =
    datos.decisiones.find(

        d=>d.id===id

    );




    if(!decision){

        console.log(
            "Decisión no encontrada."
        );

        return null;

    }





    let eleccion =
    decision.eleccion;






    // ==================================
    // EMOCIONES
    // ==================================


    switch(contexto.emocion){


        case "tristeza":

            eleccion="buscar_apoyo";

        break;


        case "miedo":

        case "asustado":

            eleccion="buscar_refugio";

        break;


        case "ira":

        case "enojado":

            eleccion="calmarse";

        break;


        case "feliz":

            eleccion="compartir_momento";

        break;


    }








    // ==================================
    // PERSONALIDAD
    // ==================================


    let personalidad =
    contexto.personalidad;



    if(
        typeof personalidad === "object"
    ){

        personalidad =
        personalidad.nombre;

    }





    switch(personalidad){


        case "amable":

            eleccion =
            contexto.familia
            ?
            "proteger_familia"
            :
            "ayudar_habitante";

        break;



        case "curiosa":

            eleccion =
            "explorar_el_mundo";

        break;



        case "protectora":

            eleccion =
            "ayudar_comunidad";

        break;


    }








    // ==================================
    // FAMILIA
    // ==================================


    if(
        contexto.tiene_hijos
    ){

        eleccion =
        "cuidar_hijos";

    }




    if(
        contexto.estado_pareja==="casado"
        &&
        contexto.desea_hijos
    ){

        eleccion =
        "formar_familia";

    }







    // ==================================
    // PROFESIÓN
    // ==================================


    if(contexto.profesion){


        switch(contexto.profesion){


            case "medico":

                eleccion="atender_pacientes";

            break;


            case "cocinero":

                eleccion="preparar_comida";

            break;


            case "guardia":

                eleccion="patrullar_comunidad";

            break;


            case "maestro":

                eleccion="enseñar";

            break;


        }


    }








    // ==================================
    // RESULTADO
    // ==================================


    let resultadoTexto =
    "Sin resultado definido.";





    if(
        decision.resultados &&
        decision.resultados[eleccion]
    ){

        resultadoTexto =
        decision.resultados[eleccion];

    }





    const resultado = {


        habitante_id:
        decision.habitante_id,


        situacion:
        decision.situacion,


        eleccion,


        resultado:
        resultadoTexto,


        contexto


    };






    // ==================================
    // MEMORIA Y EVENTO
    // ==================================


    if(decision.habitante_id){


        crearMemoria(

            decision.habitante_id,

            "decision",

            "Tomó la decisión: "
            + eleccion,

            "media"

        );



        crearEvento(

            "decision_habitante",

            [
                decision.habitante_id
            ],

            {
                decision:eleccion
            }

        );


    }







    console.log(
        "Decisión:",
        eleccion
    );



    return resultado;


}






module.exports={

    procesarDecision

};
