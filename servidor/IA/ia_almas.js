// Inteligencia artificial de almas - Village Soul

const cargarArchivo = require("../Sistemas/cargador_datos.js");
const procesarDecision = require("../Sistemas/decisiones.js");


function pensarAlma(habitante_id) {

    const almas = cargarArchivo("datos/almas.json");
    const emociones = cargarArchivo("datos/emociones.json");
    const memorias = cargarArchivo("datos/memorias.json");
    const objetivos = cargarArchivo("datos/objetivos.json");
    const relaciones = cargarArchivo("datos/relaciones.json");
    const familias = cargarArchivo("datos/familias.json");


    if (
        !almas ||
        !emociones ||
        !memorias ||
        !objetivos ||
        !relaciones ||
        !familias
    ) {

        console.log("No se pudieron cargar los datos de la IA.");

        return null;
    }


    const alma = almas.almas.find(
        a => a.id === habitante_id
    );


    if (!alma) {

        console.log("No existe el habitante:", habitante_id);

        return null;
    }


    console.log("Pensando alma:", alma.nombre);


    return {
        habitante_id: habitante_id,
        estado: "pensando",
        decision: "explorar el mundo"
    };

}


module.exports = {
    pensarAlma
};
