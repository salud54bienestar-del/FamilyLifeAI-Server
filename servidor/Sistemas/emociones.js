// Sistema emocional avanzado de Village Soul

const cargarArchivo = require("./cargador_datos.js");
const crearMemoria = require("./memorias.js");




// =================================
// OBTENER EMOCIONES
// =================================

function obtenerEmocion(habitante_id){


    const datos =
    cargarArchivo("../datos/emociones.json");



    if(!datos){

        console.log(
            "No se pudieron cargar las emociones."
        );

        return null;

    }



    return datos.emociones.find(

        e => e.habitante_id === habitante_id

    ) || null;


}






// =================================
// CAMBIAR EMOCIÓN
// =================================

function cambiarEmocion(
    habitante_id,
    emocion,
    cantidad,
    motivo="evento"
){


    const estado =
    obtenerEmocion(
        habitante_id
    );



    if(!estado){

        console.log(
            "Estado emocional no encontrado."
        );

        return null;

    }




    // Emociones principales

    if(
        estado[emocion] !== undefined
    ){

        estado[emocion] += cantidad;

    }



    // Emociones secundarias

    else {


        if(
            !estado.emociones_secundarias
        ){

            estado.emociones_secundarias = {};

        }



        if(
            estado.emociones_secundarias[emocion] === undefined
        ){

            estado.emociones_secundarias[emocion] = 0;

        }



        estado.emociones_secundarias[emocion] += cantidad;


    }




    limitarValores(
        estado
    );



    estado.ultima_emocion_importante = {


        evento:
        motivo,


        fecha:
        new Date().toISOString()


    };



    actualizarEstadoActual(
        estado
    );



    crearMemoria(

        habitante_id,

        "emocion",

        "Cambió su estado emocional por: " + motivo,

        "media",

        [],

        emocion

    );



    return estado;


}







// =================================
// LIMITAR VALORES
// =================================

function limitarValores(estado){



    const emocionesPrincipales = [

        "felicidad",

        "confianza",

        "miedo",

        "tristeza",

        "ira",

        "calma"

    ];




    emocionesPrincipales.forEach(

        emocion => {


            if(
                estado[emocion] !== undefined
            ){


                if(
                    estado[emocion] > 100
                ){

                    estado[emocion] = 100;

                }



                if(
                    estado[emocion] < 0
                ){

                    estado[emocion] = 0;

                }


            }


        }

    );






    if(
        estado.emociones_secundarias
    ){


        Object.keys(
            estado.emociones_secundarias
        )
        .forEach(

            emocion => {


                if(
                    estado.emociones_secundarias[emocion] > 100
                ){

                    estado.emociones_secundarias[emocion] = 100;

                }



                if(
                    estado.emociones_secundarias[emocion] < 0
                ){

                    estado.emociones_secundarias[emocion] = 0;

                }


            }

        );


    }



}








// =================================
// ACTUALIZAR ESTADO GENERAL
// =================================

function actualizarEstadoActual(
    estado
){



    const secundarias =
    estado.emociones_secundarias || {};





    if(
        estado.tristeza > 60
    ){

        estado.estado_actual =
        "triste";

    }



    else if(
        estado.miedo > 60
    ){

        estado.estado_actual =
        "asustado";

    }



    else if(
        estado.ira > 60
    ){

        estado.estado_actual =
        "enojado";

    }



    else if(
        secundarias.soledad > 60
    ){

        estado.estado_actual =
        "solo";

    }



    else if(
        estado.felicidad > 70
    ){

        estado.estado_actual =
        "feliz";

    }



    else if(
        estado.calma > 70
    ){

        estado.estado_actual =
        "tranquilo";

    }



    else{

        estado.estado_actual =
        "neutral";

    }



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




    if(
        necesidades.hambre < 30
    ){

        cambiarEmocion(

            habitante_id,

            "tristeza",

            5,

            "hambre"

        );

    }





    if(
        necesidades.energia < 30
    ){

        cambiarEmocion(

            habitante_id,

            "estres",

            5,

            "cansancio"

        );

    }





    if(
        necesidades.diversion < 30
    ){

        cambiarEmocion(

            habitante_id,

            "aburrimiento",

            5,

            "falta de diversión"

        );

    }



}








// =================================
// EVENTOS IMPORTANTES
// =================================

function aplicarEventoEmocional(
    habitante_id,
    evento
){



    const eventos = {


        primer_encuentro: [

            ["felicidad",5],

            ["confianza",5]

        ],



        amistad:[

            ["felicidad",10],

            ["confianza",10]

        ],



        nacimiento:[

            ["felicidad",20],

            ["amor",20],

            ["orgullo",10]

        ],



        boda:[

            ["felicidad",20],

            ["amor",20]

        ],



        divorcio:[

            ["tristeza",20],

            ["soledad",10]

        ],



        conflicto:[

            ["tristeza",15],

            ["ira",10]

        ],



        familia:[

            ["confianza",15]

        ]

    };





    const cambios =
    eventos[evento];



    if(!cambios){

        return null;

    }





    cambios.forEach(

        cambio => {


            cambiarEmocion(

                habitante_id,

                cambio[0],

                cambio[1],

                evento

            );


        }

    );



}








module.exports = {


    obtenerEmocion,

    cambiarEmocion,

    actualizarEmocionesPorNecesidades,

    aplicarEventoEmocional


};
