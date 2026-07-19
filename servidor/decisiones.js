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



    console.log("=================================");

    console.log("        DECISIÓN");

    console.log("=================================");



    console.log(
        "Habitante ID:",
        decision.habitante_id
    );


    console.log(
        "Situación:",
        decision.situacion
    );



    console.log("Opciones:");



    decision.opciones.forEach((opcion) => {

        console.log("- " + opcion);

    });



    let eleccion = decision.eleccion;



    // Influencia por contexto


    if (contexto.familia) {


        eleccion = "proteger_familia";


    }


    if (contexto.emocion === "tristeza") {


        eleccion = "buscar_apoyo";


    }


    if (contexto.relacion === "conflicto") {


        eleccion = "resolver_conflicto";


    }



    const resultado = {


        habitante_id: decision.habitante_id,


        situacion: decision.situacion,


        eleccion: eleccion,


        resultado: decision.resultado,


        contexto: contexto


    };



    console.log("Elección:", eleccion);


    console.log("Resultado:", resultado);



    return resultado;

}



// Prueba inicial

procesarDecision(

    1,

    {

        familia: true,

        emocion: "felicidad"

    }

);



module.exports = procesarDecision;
