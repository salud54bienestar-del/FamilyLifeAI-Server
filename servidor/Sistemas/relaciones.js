// Sistema avanzado de relaciones - Village Soul

const cargarArchivo = require("./cargador_datos.js");
const crearEvento = require("./eventos.js");
const crearMemoria = require("./memorias.js");



// =================================
// BUSCAR RELACIÓN
// =================================

function obtenerRelacion(
    habitante_a,
    habitante_b
){

    const datos =
    cargarArchivo("../datos/relaciones.json");


    if(!datos){

        return null;

    }


    return datos.relaciones.find(

        r =>

        (
            r.habitante_a === habitante_a &&
            r.habitante_b === habitante_b
        )

        ||

        (
            r.habitante_a === habitante_b &&
            r.habitante_b === habitante_a
        )

    ) || null;


}





// =================================
// CREAR RELACIÓN
// =================================

function crearRelacion(
    habitante_a,
    habitante_b,
    tipo="desconocidos"
){


    const datos =
    cargarArchivo("../datos/relaciones.json");


    if(!datos){

        return null;

    }




    const existente =
    obtenerRelacion(
        habitante_a,
        habitante_b
    );


    if(existente){

        return existente;

    }




    const nuevoId =

    datos.relaciones.length > 0

    ?

    Math.max(
        ...datos.relaciones.map(r=>r.id)
    ) + 1

    :

    1;





    const relacion = {


        id:nuevoId,


        habitante_a,


        habitante_b,


        tipo,


        nivel:"nuevo",


        confianza:0,


        afinidad:50,


        romance:0,


        estado_pareja:"ninguno",



        familia:{

            parentesco:false,

            tipo:null

        },



        historial:[

            "Primer encuentro"

        ],



        eventos_importantes:[

            {

                evento:"primer_encuentro",

                fecha:null,

                impacto:"moderado"

            }

        ]

    };





    datos.relaciones.push(
        relacion
    );





    crearEvento(

        "nueva_relacion",

        [

            habitante_a,

            habitante_b

        ],

        {

            tipo

        }

    );





    crearMemoria(

        habitante_a,

        "relacion",

        "Conoció a un nuevo habitante.",

        "media",

        [

            habitante_b

        ]

    );



    crearMemoria(

        habitante_b,

        "relacion",

        "Conoció a un nuevo habitante.",

        "media",

        [

            habitante_a

        ]

    );





    return relacion;

}







// =================================
// AUMENTAR CONFIANZA
// =================================

function aumentarConfianza(
    habitante_a,
    habitante_b,
    cantidad
){


    const relacion =
    obtenerRelacion(
        habitante_a,
        habitante_b
    );


    if(!relacion){

        return null;

    }




    relacion.confianza += cantidad;



    if(relacion.confianza > 100){

        relacion.confianza = 100;

    }



    actualizarNivelRelacion(
        relacion
    );




    crearEvento(

        "cambio_confianza",

        [

            habitante_a,

            habitante_b

        ],

        {

            confianza:
            relacion.confianza

        }

    );



    return relacion;

}






// =================================
// ROMANCE
// =================================

function aumentarRomance(
    habitante_a,
    habitante_b,
    cantidad
){


    const relacion =
    obtenerRelacion(
        habitante_a,
        habitante_b
    );


    if(!relacion){

        return null;

    }



    if(
        relacion.familia.parentesco
    ){

        return null;

    }



    relacion.romance += cantidad;



    if(relacion.romance > 100){

        relacion.romance = 100;

    }



    actualizarNivelRelacion(
        relacion
    );


    return relacion;

}







// =================================
// CASARSE
// =================================

function casarHabitantes(
    habitante_a,
    habitante_b
){


    const relacion =
    obtenerRelacion(
        habitante_a,
        habitante_b
    );


    if(!relacion){

        return null;

    }



    if(
        relacion.confianza < 80 ||
        relacion.romance < 80
    ){

        return null;

    }



    relacion.estado_pareja =
    "casados";



    relacion.historial.push(
        "Matrimonio"
    );



    crearEvento(

        "boda",

        [

            habitante_a,

            habitante_b

        ],

        {}

    );



    return relacion;

}







// =================================
// NIVEL DE RELACIÓN
// =================================

function actualizarNivelRelacion(
    relacion
){


    const valor =

    (
        relacion.confianza +
        relacion.afinidad +
        relacion.romance
    ) / 3;



    if(valor >= 80){

        relacion.nivel="mejores_amigos";

    }

   
