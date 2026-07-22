// Sistema de emociones de Village Soul

const cargarArchivo =
require("./cargador_datos.js");

const crearMemoria =
require("./memorias.js");




// =================================
// OBTENER EMOCIONES
// =================================

function obtenerEmociones(habitante_id){


    const datos =
    cargarArchivo("../datos/almas.json");


    if(!datos){

        return null;

    }


    const habitante =
    datos.almas.find(

        a => a.id === habitante_id

    );


    if(!habitante){

        return null;

    }


    return habitante.emociones || null;


}





// =================================
// CAMBIAR EMOCIÓN
// =================================

function cambiarEmocion(
    habitante_id,
    emocion,
    cantidad,
    motivo = ""
){


    const emociones =
    obtenerEmociones(
        habitante_id
    );


    if(!emociones){

        return null;

    }



    if(emociones[emocion] === undefined){

        emociones[emocion] = 0;

    }



    emociones[emocion] += cantidad;



    limitarEmociones(
        emociones
    );



    if(cantidad !== 0){

        crearMemoria(

            habitante_id,

            "emocion",

            "Sintió " + emocion +
            " por " + motivo,

            "baja"

        );

    }



    return emociones;

}





// =================================
// LIMITAR VALORES
// =================================

function limitarEmociones(emociones){


    Object.keys(emociones)
    .forEach(

        e=>{

            if(
                typeof emociones[e] === "number"
            ){


                if(emociones[e] > 100){

                    emociones[e]=100;

                }


                if(emociones[e] < 0){

                    emociones[e]=0;

                }

            }

        }

    );


}





// =================================
// EMOCIONES SEGÚN NECESIDADES
// =================================

function actualizarEmocionesPorNecesidades(
    habitante_id,
    necesidades
){


    if(!necesidades){

        return null;

    }



    if(necesidades.hambre < 30){


        cambiarEmocion(

            habitante_id,

            "tristeza",

            5,

            "hambre"

        );

    }



    if(necesidades.energia < 30){


        cambiarEmocion(

            habitante_id,

            "estres",

            5,

            "cansancio"

        );

    }



    if(necesidades.diversion < 30){


        cambiarEmocion(

            habitante_id,

            "aburrimiento",

            5,

            "falta de diversión"

        );

    }



    if(necesidades.cariño < 30){


        cambiarEmocion(

            habitante_id,

            "soledad",

            5,

            "falta de cariño"

        );

    }



    return obtenerEmociones(
        habitante_id
    );


}





module.exports = {


    obtenerEmociones,

    cambiarEmocion,

    actualizarEmocionesPorNecesidades


};
