// Sistema de acciones de Village Soul

const cargarArchivo = require("./cargador_datos.js");
const crearEvento = require("./eventos.js");
const crearMemoria = require("./memorias.js");

function ejecutarAccion(habitante_id, accion) {

    console.log("=================================");
    console.log("        ACCIÓN");
    console.log("=================================");

    console.log("Habitante:", habitante_id);
    console.log("Acción:", accion);

    const mundo = cargarArchivo("../datos/mundo.json");

    if (!mundo) {
        console.log("No se pudo cargar el mundo.");
        return null;
    }

    crearEvento(
        "Nueva acción",
        "Un habitante realizó: " + accion
    );

    crearMemoria(
        habitante_id,
        "accion",
        "El habitante realizó la acción: " + accion,
        "media"
    );


    let resultadoAccion = "";


    switch (accion) {

        case "explorar el mundo":

            mundo.lugares.push({
                id: mundo.lugares.length + 1,
                nombre: "Nueva zona descubierta",
                tipo: "zona",
                descubierto: true
            });

            resultadoAccion = "Descubrió un nuevo lugar.";
            break;


        case "buscar compañía":

            resultadoAccion = "El habitante busca fortalecer sus relaciones.";
            break;


        case "regresar a un lugar seguro":

            resultadoAccion = "El habitante regresó para sentirse protegido.";
            break;


        case "trabajar en su objetivo":

            resultadoAccion = "El habitante avanzó hacia su meta.";
            break;


        case "descansar":

            resultadoAccion = "El habitante recuperó energía.";
            break;


        default:

            resultadoAccion = "Realizó una acción desconocida.";
            break;
    }


    const resultado = {
        habitante_id: habitante_id,
        accion: accion,
        resultado: resultadoAccion,
        estado: "completada"
    };


    console.log("Resultado:");
    console.log(resultado);

    return resultado;
}


// Prueba inicial

ejecutarAccion(
    1,
    "explorar el mundo"
);


module.exports = ejecutarAccion;
