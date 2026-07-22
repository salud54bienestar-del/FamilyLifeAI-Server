// Sistema de emociones de Village Soul

const cargarArchivo =
require("./cargador_datos.js");

const guardarArchivo =
require("./guardador_datos.js");

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



    if(!habitante.emociones){

        habitante.emociones={};

    }



    return habitante.emociones;


}








// =================================
// CAMBIAR EMOCIÓN
// =================================

function cambiarEmocion(
    habitante_id,
    emocion,
    cantidad,
    motivo=""
){


    const datos =
    cargarArchivo("../datos/almas.json");


    if(!datos){

        return null;

    }




    const habitante =
    datos.almas.find(

        a=>a.id===habitante_id

    );



    if(!habitante){

        return null;

    }






    if(!habitante.emociones){

        habitante.emociones={};

    }





    // Emociones principales

    const principales=[

        "felicidad",
        "confianza",
        "miedo",
        "tristeza",
        "ira",
        "calma"

    ];







    if(principales.includes(emocion)){


        if(
            habitante.emociones[emocion]===undefined
        ){

            habitante.emociones[emocion]=0;

        }


        habitante.emociones[emocion]+=cantidad;


    }

    else{


        // Emociones secundarias


        if(!habitante.emociones.emociones_secundarias){


            habitante.emociones.emociones_secundarias={};


        }



        if(
            habitante.emociones.emociones_secundarias[emocion]
            ===
            undefined
        ){

            habitante.emociones.emociones_secundarias[emocion]=0;

        }




        habitante.emociones.emociones_secundarias[emocion]+=cantidad;


    }







    limitarEmociones(

        habitante.emociones

    );






    guardarArchivo(

        "../datos/almas.json",

        datos

    );







    if(cantidad!==0){


        crearMemoria(

            habitante_id,

            "emocion",

            "Sintió " + emocion +
            " por " + motivo,

            "baja"

        );


    }





    return habitante.emociones;


}









// =================================
// LIMITAR EMOCIONES
// =================================

function limitarEmociones(
emociones
){



    Object.keys(emociones)
    .forEach(

        e=>{


            if(
                typeof emociones[e]
                ===
                "number"
            ){


                if(emociones[e]>100){

                    emociones[e]=100;

                }



                if(emociones[e]<0){

                    emociones[e]=0;

                }


            }



            if(
                typeof emociones[e]
                ===
                "object"
            ){


                limitarEmociones(

                    emociones[e]

                );

            }



        }

    );


}









// =================================
// NECESIDADES → EMOCIONES
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



    if(necesidades.carino < 30){

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







module.exports={


    obtenerEmociones,

    cambiarEmocion,

    actualizarEmocionesPorNecesidades


};
