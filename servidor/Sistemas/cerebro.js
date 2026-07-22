// Sistema central de inteligencia - Village Soul


const cargarArchivo =
require("./cargador_datos.js");


const necesidades =
require("./necesidades.js");


const emociones =
require("./emociones.js");


const rutinas =
require("./rutinas.js");


const decisiones =
require("./decisiones.js");


const acciones =
require("./acciones.js");


const crearEvento =
require("./eventos.js");





// =================================
// PENSAMIENTO DEL HABITANTE
// =================================

function pensar(
habitante_id,
horaActual
){



    const almas =
    cargarArchivo("../datos/almas.json");



    if(!almas){

        return null;

    }





    const habitante =
    almas.almas.find(

        a=>a.id===habitante_id

    );





    if(!habitante){

        return null;

    }








    // Necesidades


    const estadoNecesidades =

    necesidades.obtenerNecesidades(

        habitante_id

    );







    // Emoción


    const emocion =

    habitante.emocion ||

    "neutral";








    // Rutina


    const rutina =

    rutinas.actualizarRutina(

        habitante_id,

        horaActual,

        {

            etapa:
            habitante.etapa

        }

    );









    // Decisión


    const decision =

    decisiones.procesarDecision(

        habitante_id,

        {


            necesidades:
            estadoNecesidades,


            emocion,


            rutina:


            rutina,


            personalidad:

            habitante.personalidad,


            profesion:

            habitante.profesion?.nombre


        }

    );







    if(!decision){

        return null;

    }








    // Ejecutar acción


    const resultado =

    acciones(

        habitante_id,

        decision.decision

    );









    crearEvento(

        "pensamiento_habitante",

        [

            habitante_id

        ],

        {

            decision,

            resultado

        }

    );







    return {


        habitante:

        habitante.nombre,


        decision,


        resultado


    };


}









// =================================
// CICLO DE VIDA
// =================================

function cicloVida(
habitante_id,
hora
){


    return pensar(

        habitante_id,

        hora

    );


}









module.exports={


    pensar,

    cicloVida


};
