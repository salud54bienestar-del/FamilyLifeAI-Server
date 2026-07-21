// Sistema de acciones de Village Soul

const cargarArchivo = require("./cargador_datos.js");
const crearEvento = require("./eventos.js");
const crearMemoria = require("./memorias.js");
const obtenerLugarTrabajo =
require("./lugares_trabajo.js").obtenerLugarTrabajo;



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



    let nombreAccion;


    if (typeof accion === "object") {

        nombreAccion = accion.eleccion;

    } else {

        nombreAccion = accion;

    }



    crearMemoria(

        habitante_id,

        "accion",

        "El habitante realizó: " + nombreAccion,

        "media"

    );



    let resultadoAccion = "";

    let evento = null;



    switch (nombreAccion) {



        case "explorar el mundo":
        case "explorar_el_mundo":


            if (!mundo.lugares) {

                mundo.lugares = [];

            }


            mundo.lugares.push({

                id: mundo.lugares.length + 1,

                nombre: "Nueva zona descubierta",

                tipo: "zona",

                descubierto: true

            });


            resultadoAccion =
            "Descubrió un nuevo lugar y ganó experiencia.";


            evento = 1;


            break;



        case "buscar compañía":
        case "buscar_compania":


            resultadoAccion =
            "El habitante busca fortalecer sus relaciones.";


            evento = 2;


            break;



        case "cuidar familia":
        case "cuidar_familia":
        case "proteger_familia":


            resultadoAccion =
            "El habitante protegió y cuidó a su familia.";


            evento = 2;


            break;



        case "crear_vinculos":


            resultadoAccion =
            "El habitante intenta crear una nueva amistad.";


            evento = 2;


            break;



        case "resolver_conflicto":


            resultadoAccion =
            "El habitante intenta solucionar un problema.";


            break;



        case "trabajar en su objetivo":


            resultadoAccion =
            "El habitante avanzó hacia su meta.";


            break;



        case "descansar":


            resultadoAccion =
            "El habitante recuperó energía.";


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




        // NUEVO SISTEMA LABORAL



        case "ir_al_trabajo":


            const lugar =
            obtenerLugarTrabajo(habitante_id);



            if (lugar) {

                resultadoAccion =
                "El habitante fue a trabajar en " +
                lugar.nombre + ".";

            } else {

                resultadoAccion =
                "El habitante no tiene un lugar de trabajo asignado.";

            }


            break;




        case "trabajar":


            const trabajo =
            obtenerLugarTrabajo(habitante_id);



            if (trabajo) {

                resultadoAccion =
                "El habitante realizó sus tareas en " +
                trabajo.nombre +
                " y ganó experiencia.";

            } else {

                resultadoAccion =
                "El habitante no tiene trabajo.";

            }


            break;




        case "terminar_turno":


            resultadoAccion =
            "El habitante terminó su jornada laboral y regresó a casa.";


            break;




        case "cuidar_ninos":


            resultadoAccion =
            "El habitante cuidó a los niños del establecimiento.";


            evento = 8;


            break;




        case "proteger_comunidad":


            resultadoAccion =
            "El guardia protegió la comunidad de amenazas.";


            evento = 2;


            break;




        case "atender_pacientes":


            resultadoAccion =
            "El trabajador de salud atendió a los habitantes.";


            break;




        case "cocinar":


            resultadoAccion =
            "El cocinero preparó alimentos para la comunidad.";


            break;




        default:


            resultadoAccion =
            "El habitante realizó una acción nueva sin consecuencias definidas.";


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

        accion: nombreAccion,

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
