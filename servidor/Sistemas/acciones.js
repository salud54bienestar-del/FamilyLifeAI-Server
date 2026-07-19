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



    crearMemoria(

        habitante_id,

        "accion",

        "El habitante realizó: " + accion,

        "media"

    );



    let resultadoAccion = "";

    let evento = null;



    switch (accion) {


        case "explorar el mundo":


            mundo.lugares.push({

                id: mundo.lugares.length + 1,

                nombre: "Nueva zona descubierta",

                tipo: "zona",

                descubierto: true

            });


            resultadoAccion =
            "Descubrió un nuevo lugar.";


            evento = 1;


            break;



        case "buscar compañía":


            resultadoAccion =
            "El habitante busca fortalecer sus relaciones.";


            evento = 2;


            break;



        case "cuidar familia":


            resultadoAccion =
            "El habitante dedicó tiempo a su familia.";


            evento = 2;


            break;



        case "trabajar en su objetivo":


            resultadoAccion =
            "El habitante avanzó hacia su meta.";


            break;



        case "casarse":


            resultadoAccion =
            "Dos habitantes formaron una familia.";


            evento = 6;


            break;



        case "adoptar":


            resultadoAccion =
            "El habitante creó un vínculo familiar mediante adopción.";


            evento = 8;


            break;



        case "descansar":


            resultadoAccion =
            "El habitante recuperó energía.";


            break;



        default:


            resultadoAccion =
            "Realizó una acción desconocida.";


            break;

    }



    if (evento) {

        crearEvento(

            evento,

            [habitante_id]

        );

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



ejecutarAccion(

    1,

    "explorar el mundo"

);



module.exports = ejecutarAccion;
