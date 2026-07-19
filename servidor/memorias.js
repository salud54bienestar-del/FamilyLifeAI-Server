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



    const memoria = {


        id: datos.memorias.length + 1,


        habitante_id: habitante_id,


        tipo: tipo,


        descripcion: descripcion,


        importancia: importancia,


        emocion: emocion,


        personas_relacionadas: personas,


        afecta_comportamiento: importancia === "alta",


        fecha: new Date().toISOString()


    };



    datos.memorias.push(memoria);



    console.log("Nueva memoria creada:");

    console.log(memoria);



    return memoria;

}



// Prueba inicial

crearMemoria(

    1,

    "familia",

    "El habitante creó un vínculo importante con otro miembro de la comunidad.",

    "media",

    [2],

    "felicidad"

);



module.exports = crearMemoria;
