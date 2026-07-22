// Sistema avanzado de relaciones - Village Soul


const cargarArchivo =
require("./cargador_datos.js");


const guardarArchivo =
require("./guardador_datos.js");


const crearEvento =
require("./eventos.js");


const crearMemoria =
require("./memorias.js");


const cambiarEmocion =
require("./emociones.js");



const obtenerEtapaHabitante =
require("./etapas_vida.js").obtenerEtapaHabitante;







// =================================
// OBTENER RELACIÓN
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
        ...datos.relaciones.map(
            r=>r.id
        )
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


        respeto:50,


        amistad:0,


        romance:0,


        compromiso:0,


        estado_pareja:"ninguno",


        conviven:false,


        fecha_inicio:null,


        fecha_matrimonio:null,



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

                fecha:
                new Date().toISOString(),

                impacto:"moderado"

            }

        ]


    };







    datos.relaciones.push(
        relacion
    );



    guardarArchivo(

        "../datos/relaciones.json",

        datos

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
// VERIFICAR EDAD ROMANCE
// =================================

function puedeTenerRomance(
    habitante_id
){


    const almas =
    cargarArchivo("../datos/almas.json");


    if(!almas){

        return false;

    }



    const habitante =
    almas.almas.find(

        a=>a.id===habitante_id

    );



    if(!habitante){

        return false;

    }




    const etapa =
    obtenerEtapaHabitante(
        habitante
    );



    if(!etapa){

        return false;

    }



    return (

        etapa.nombre==="adulto"

        ||

        etapa.nombre==="adulto_mayor"

    );


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



    limitarRelacion(
        relacion
    );


    actualizarNivelRelacion(
        relacion
    );



    guardarRelaciones();



    return relacion;


}








// =================================
// AUMENTAR AMISTAD
// =================================

function aumentarAmistad(
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



    relacion.amistad += cantidad;


    relacion.confianza += cantidad/2;



    limitarRelacion(
        relacion
    );



    actualizarNivelRelacion(
        relacion
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



    if(
        !puedeTenerRomance(habitante_a)

        ||

        !puedeTenerRomance(habitante_b)

    ){

        return null;

    }




    const relacion =
    obtenerRelacion(
        habitante_a,
        habitante_b
    );



    if(!relacion){

        return null;

    }



    if(relacion.familia.parentesco){

        return null;

    }



    relacion.romance += cantidad;



    limitarRelacion(
        relacion
    );



    actualizarNivelRelacion(
        relacion
    );



    return relacion;


}









// =================================
// MATRIMONIO
// =================================

function casarHabitantes(
    habitante_a,
    habitante_b
){



    if(
        !puedeTenerRomance(habitante_a)

        ||

        !puedeTenerRomance(habitante_b)

    ){

        return null;

    }





    const relacion =
    obtenerRelacion(
        habitante_a,
        habitante_b
    );



    if(!relacion){

        return null;

    }





    if(

        relacion.confianza < 80

        ||

        relacion.romance < 80

    ){

        return null;

    }




    relacion.estado_pareja =
    "casados";


    relacion.fecha_matrimonio =
    new Date().toISOString();



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



    crearMemoria(

        habitante_a,

        "matrimonio",

        "Se casó con otro habitante.",

        "alta"

    );



    crearMemoria(

        habitante_b,

        "matrimonio",

        "Se casó con otro habitante.",

        "alta"

    );



    guardarRelaciones();



    return relacion;


}









// =================================
// ACTUALIZAR NIVEL
// =================================

function actualizarNivelRelacion(
    relacion
){


    const valor =

    (

        relacion.confianza +

        relacion.afinidad +

        relacion.amistad +

        relacion.romance

    ) / 4;




    if(valor >=80){

        relacion.nivel =
        "muy_cercanos";

    }

    else if(valor >=60){

        relacion.nivel =
        "amigos";

    }

    else if(valor >=40){

        relacion.nivel =
        "conocidos";

    }

    else{

        relacion.nivel =
        "nuevo";

    }



}








// =================================
// LIMITAR VALORES
// =================================

function limitarRelacion(
relacion
){


    const valores=[

        "confianza",

        "afinidad",

        "respeto",

        "amistad",

        "romance",

        "compromiso"

    ];



    valores.forEach(

        v=>{


            if(relacion[v]>100){

                relacion[v]=100;

            }


            if(relacion[v]<0){

                relacion[v]=0;

            }


        }

    );


}








// =================================
// GUARDAR
// =================================

function guardarRelaciones(){


    const datos =
    cargarArchivo("../datos/relaciones.json");


    guardarArchivo(

        "../datos/relaciones.json",

        datos

    );

}







module.exports={


    obtenerRelacion,

    crearRelacion,

    aumentarConfianza,

    aumentarAmistad,

    aumentarRomance,

    casarHabitantes,

    puedeTenerRomance


};
