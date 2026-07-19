// Sistema de relaciones de Village Soul

const cargarArchivo = require("./cargador_datos.js");

function crearRelacion(habitante1, habitante2, tipo) {

    const datos = cargarArchivo("../datos/relaciones.json");

    if (!datos) {
        console.log("No se pudieron cargar las relaciones.");
        return null;
    }

    const relacion = {
        id: datos.relaciones.length + 1,
        habitante_1: habitante1,
        habitante_2: habitante2,
        tipo: tipo,
        confianza: 0,
        estado: "nuevo"
    };

    datos.relaciones.push(relacion);

    console.log("Nueva relación creada:");
    console.log(relacion);

    return relacion;
}


// Prueba inicial

crearRelacion(
    1,
    2,
    "amistad"
);

module.exports = crearRelacion;
