// Sistema avanzado de emociones - Village Soul


const cargarArchivo =
require("./cargador_datos.js");


const guardarArchivo =
require("./guardador_datos.js");


const crearMemoria =
require("./memorias.js");







// =================================
// OBTENER EMOCIONES
// =================================


function obtenerEmociones(
habitante_id
){


    const datos =
    cargarArchivo("../datos/emociones.json");



    if(!datos){

        return null;

    }




    return datos.emociones.find(

        e=>
        e.habitante_id===habitante_id

    ) || null;


}








// =================================
// CREAR EMOCIÓN
// =================================


function crearEmocion(
habitante_id
){


    const datos =
    cargarArchivo("../datos/emociones.json");



    if(!datos){

        return null;

    }



    const existe =
    obtenerEmociones(
        habitante_id
    );



    if(existe){

        return existe;

    }





    const nueva={


        habitante_id,


        felicidad:50,


        confianza:50,


        miedo:0,


        tristeza:0,


        ira:0,


        calma:50,



        emociones_secundarias:{


            amor:0,

            soledad:0,

            orgullo:0,

            estres:0,

            aburrimiento:0


        },



        emocion_actual:
        "neutral",



        estabilidad_emocional:50



    };





    datos.emociones.push(
        nueva
    );



    guardarArchivo(

        "../datos/emociones.json",

        datos

    );



    return nueva;


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
    cargarArchivo("../datos/emociones.json");



    if(!datos){

        return null;

    }



    let estado =
    obtenerEmociones(
        habitante_id
    );



    if(!estado){

        estado =
        crearEmocion(
            habitante_id
        );

    }





    if(
        estado[emocion] !== undefined
    ){

        estado[emocion]+=cantidad;

    }

    else{


        if(
        !estado.emociones_secundarias
        ){

            estado.emociones_secundarias={};

        }



        if(
        !estado.emociones_secundarias[emocion]
        ){

            estado.emociones_secundarias[emocion]=0;

        }



        estado.emociones_secundarias[emocion]+=cantidad;


    }







    limitarEmociones(
        estado
    );



    actualizarEmocionActual(
        estado
    );





    guardarArchivo(

        "../datos/emociones.json",

        datos

    );






    crearMemoria(

        habitante_id,

        "emocion",

        "Sintió "+emocion+
        " por "+motivo,

        "baja"

    );





    return estado;


}









// =================================
// EMOCIÓN DOMINANTE
// =================================


function actualizarEmocionActual(
estado
){



    const emociones={


        felicidad:
        estado.felicidad,


        miedo:
        estado.miedo,


        tristeza:
        estado.tristeza,


        ira:
        estado.ira,


        calma:
        estado.calma


    };





    let mayor =
    "neutral";


    let valor=0;




    Object.keys(emociones)
    .forEach(

        e=>{


            if(emociones[e]>valor){

                valor=
                emociones[e];

                mayor=e;

            }


        }

    );




    estado.emocion_actual =
    mayor;



    estado.estabilidad_emocional =
    100 -

    (

    estado.tristeza+
    estado.miedo+
    estado.ira

    )/3;



    limitarEmociones(
        estado
    );



}









// =================================
// RECUPERACIÓN NATURAL
// =================================


function evolucionarEmociones(
habitante_id
){



    const estado =
    obtenerEmociones(
        habitante_id
    );



    if(!estado){

        return null;

    }



    estado.tristeza-=1;

    estado.ira-=1;

    estado.miedo-=1;



    estado.calma+=1;



    limitarEmociones(
        estado
    );



    actualizarEmocionActual(
        estado
    );



    return estado;


}









// =================================
// LIMITAR
// =================================


function limitarEmociones(
obj
){



    Object.keys(obj)
    .forEach(

        key=>{


            if(
                typeof obj[key]==="number"
            ){


                obj[key]=Math.max(

                    0,

                    Math.min(

                        100,

                        obj[key]

                    )

                );


            }



            if(
                typeof obj[key]==="object"
            ){

                limitarEmociones(
                    obj[key]
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




    if(necesidades.hambre<30){

        cambiarEmocion(

            habitante_id,

            "tristeza",

            5,

            "hambre"

        );

    }





    if(necesidades.energia<30){

        cambiarEmocion(

            habitante_id,

            "estres",

            5,

            "cansancio"

        );

    }





    if(necesidades.social<30){

        cambiarEmocion(

            habitante_id,

            "soledad",

            5,

            "soledad"

        );

    }



    return obtenerEmociones(
        habitante_id
    );


}








module.exports={


    obtenerEmociones,

    crearEmocion,

    cambiarEmocion,

    evolucionarEmociones,

    actualizarEmocionesPorNecesidades


};
