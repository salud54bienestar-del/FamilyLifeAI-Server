// Inteligencia artificial de almas - Village Soul

const cargarArchivo = require("../Sistemas/cargador_datos.js");
const procesarDecision = require("../Sistemas/decisiones.js");


function pensarAlma(habitante_id) {


    const almas = cargarArchivo("../datos/almas.json");
    const emociones = cargarArchivo("../datos/emociones.json");
    const objetivos = cargarArchivo("../datos/objetivos.json");
    const relaciones = cargarArchivo("../datos/relaciones.json");
    const familias = cargarArchivo("../datos/familias.json");


    if (
        !almas ||
        !emociones ||
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



    const emocionActual = emociones.emociones.find(
        e => e.habitante_id === habitante_id
    );



    const objetivoActual = alma.objetivos[0] || "explorar el mundo";



    const tieneFamilia = alma.familia && alma.familia.length > 0;



    const contexto = {

        emocion:
            emocionActual?.estado_actual || "neutral",


        emociones_secundarias:
            emocionActual?.emociones_secundarias || {},


        familia:
            tieneFamilia,


        objetivo:
            objetivoActual

    };



    const decision = procesarDecision(
        1,
        contexto
    );



    return {

        habitante_id: habitante_id,

        nombre: alma.nombre,

        estado: "pensando",

        contexto: contexto,

        decision: decision

    };

}



module.exports = {
    pensarAlma
};
