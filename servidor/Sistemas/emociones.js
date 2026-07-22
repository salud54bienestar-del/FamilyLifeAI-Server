// Sistema avanzado de emociones - Village Soul
// Control emocional de habitantes y conexión con IA


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
    cargarArchivo(
        "../datos/emociones.json"
    );



    if(
        !datos ||
        !datos.emociones
    ){

        return null;

    }





    return datos.emociones.find(

        e =>
        e.habitante_id === habitante_id

    ) || null;


}









// =================================
// CREAR EMOCIÓN
// =================================


function crearEmocion(
    habitante_id
){


    const datos =
    cargarArchivo(
        "../datos/emociones.json"
    );



    if(!datos){

        return null;

    }




    if(!datos.emociones){

        datos.emociones=[];

    }





    const existente =
    obtenerEmociones(
        habitante_id
    );



    if(existente){

        return existente;

    }







    const nueva={



        habitante_id,



        // emociones principales


        felicidad:50,


        confianza:50,


        miedo:0,


        tristeza:0,


        ira:0,



        calma:50,







        // emociones complejas


        emociones_secundarias:{



            amor:0,


            soledad:0,


            orgullo:0,


            estres:0,


            aburrimiento:0,


            curiosidad:0,


            esperanza:0,


            motivacion:0,


            culpa:0,


            ansiedad:0


        },






        // estado actual


        emocion_actual:"neutral",


        intensidad:0,



        estabilidad_emocional:70,



        ultima_actualizacion:

        new Date().toISOString()



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
    cargarArchivo(
        "../datos/emociones.json"
    );



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








    // Crear emociones secundarias
    // si no existen


    if(
        estado[emocion] === undefined
    ){



        if(
            !estado.emociones_secundarias
        ){

            estado.emociones_secundarias={};

        }





        if(
            estado.emociones_secundarias[emocion]===undefined
        ){

            estado.emociones_secundarias[emocion]=0;

        }





        estado.emociones_secundarias[emocion]+=cantidad;



    }


    else{


        estado[emocion]+=cantidad;


    }








    limitarEmociones(
        estado
    );





    actualizarEmocionActual(
        estado
    );






    estado.ultima_actualizacion =

    new Date().toISOString();








    guardarArchivo(

        "../datos/emociones.json",

        datos

    );







    crearMemoria(

        habitante_id,

        "emocion",

        "Sintió "+emocion+

        (motivo ?

        " por "+motivo

        :

        ""),

        "baja",

        [],

        emocion

    );








    return estado;


    }







// =================================
// EMOCIÓN DOMINANTE
// =================================


function actualizarEmocionActual(
    estado
){



    const emociones = {



        felicidad:
        estado.felicidad || 0,


        tristeza:
        estado.tristeza || 0,


        miedo:
        estado.miedo || 0,


        ira:
        estado.ira || 0,


        calma:
        estado.calma || 0,



        amor:
        estado.emociones_secundarias?.amor || 0,


        soledad:
        estado.emociones_secundarias?.soledad || 0,


        estres:
        estado.emociones_secundarias?.estres || 0,


        curiosidad:
        estado.emociones_secundarias?.curiosidad || 0,


        motivacion:
        estado.emociones_secundarias?.motivacion || 0


    };








    let dominante="neutral";


    let intensidad=0;








    Object.keys(emociones)

    .forEach(

        emocion=>{


            if(
                emociones[emocion] > intensidad
            ){


                intensidad =
                emociones[emocion];


                dominante =
                emocion;


            }


        }

    );







    estado.emocion_actual =
    dominante;



    estado.intensidad =
    intensidad;








    const negativas =


    (

        estado.tristeza || 0

        +

        estado.miedo || 0

        +

        estado.ira || 0

        +

        (estado.emociones_secundarias?.estres || 0)

    );







    estado.estabilidad_emocional =


    Math.max(

        0,

        Math.min(

            100,

            100 -

            negativas / 4

        )

    );







    return estado;


}









// =================================
// EVOLUCIÓN NATURAL
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








    // Recuperación natural


    estado.tristeza -= 1;


    estado.miedo -= 1;


    estado.ira -= 1;


    estado.calma += 1;







    if(
        estado.emociones_secundarias
    ){



        estado.emociones_secundarias.estres -= 1;


        estado.emociones_secundarias.soledad -= 0.5;


        estado.emociones_secundarias.aburrimiento -= 0.5;


    }








    limitarEmociones(
        estado
    );




    actualizarEmocionActual(
        estado
    );






    estado.ultima_actualizacion =

    new Date().toISOString();







    const datos =
    cargarArchivo(
        "../datos/emociones.json"
    );





    if(datos){


        const index =

        datos.emociones.findIndex(

            e=>

            e.habitante_id===habitante_id

        );




        if(index!==-1){


            datos.emociones[index]=estado;


        }



        guardarArchivo(

            "../datos/emociones.json",

            datos

        );


    }






    return estado;


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


   
