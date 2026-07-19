// Sistema de memorias de Village Soul

const cargarArchivo = require("./cargador_datos.js");


function crearMemoria(
    habitante_id,
    tipo,
    descripcion,
    importancia,
    personas = [],
    emocion = "neutral"
) {


    const datos = cargarArchivo("../datos/memorias.json");


    if (!datos) {

        console.log("No se pudieron cargar las memorias.");

        return null;

    }



    let impacto = "ninguno";


    if (importancia === "alta") {

        impacto = "fuerte";

    } else if (importancia === "media") {

        impacto = "moderado";

    }



    const memoria = {


        id: datos.memorias.length + 1,


        habitante_id: habitante_id,


        tipo: tipo,


        descripcion: descripcion,


        importancia: importancia,


        emocion: emocion,


        personas_relacionadas: personas,


        impacto_comportamiento: impacto,


        fecha: new Date().toISOString()


    };



    datos.memorias.push(memoria);



    console.log("Nueva memoria creada:");

    console.log(memoria);



    return memoria;

}



crearMemoria(

    1,

    "familia",

    "El habitante creó un vínculo importante con otro miembro de la comunidad.",

    "media",

    [2],

    "felicidad"

);



module.exports = crearMemoria;
