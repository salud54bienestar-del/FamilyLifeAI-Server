// Sistema de decisiones de Village Soul

const cargarArchivo = require("./cargador_datos.js");


function procesarDecision(id, contexto = {}) {


    const datos = cargarArchivo("./decisiones.json");


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



    if (contexto.familia) {

        eleccion = "proteger_familia";

    }


    if (contexto.emocion === "tristeza") {

        eleccion = "buscar_apoyo";

    }


    if (contexto.relacion === "conflicto") {

        eleccion = "resolver_conflicto";

    }


    if (contexto.objetivo === "crear_una_familia") {

        eleccion = "crear_vinculos";

    }



    const resultado = {


        habitante_id: decision.habitante_id,

        situacion: decision.situacion,

        eleccion: eleccion,

        resultado: decision.resultado,

        contexto: contexto

    };



    console.log("Decisión generada:");

    console.log(resultado);



    return resultado;

}



procesarDecision(
    1,
    {
        familia: true,
        emocion: "felicidad"
    }
);



module.exports = procesarDecision;
