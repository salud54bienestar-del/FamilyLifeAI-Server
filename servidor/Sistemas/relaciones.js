// Sistema avanzado de relaciones - Village Soul


const cargarArchivo =
require("./cargador_datos.js");


const guardarArchivo =
require("./guardador_datos.js");


const crearMemoria =
require("./memorias.js");


const cambiarEmocion =
require("./emociones.js").cambiarEmocion;


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

        "media"

    );


    crearMemoria(

        habitante_b,

        "relacion",

        "Conoció a un nuevo habitante.",

        "media"

    );



    return relacion;


}








// =================================
// VERIFICAR ROMANCE POR EDAD
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


    relacion.confianza += cantidad / 2;



    limitarRelacion(
        relacion
    );



    cambiarEmocion(

        habitante_a,

        "felicidad",

        cantidad / 2,

        "amistad"

    );



    guardarRelaciones();



    return relacion;


}









// =================================
// AUMENTAR ROMANCE
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



    relacion.compromiso += cantidad/2;



    limitarRelacion(
        relacion
    );



    cambiarEmocion(

        habitante_a,

        "felicidad",

        cantidad / 2,

        "romance"

    );



    guardarRelaciones();



    return relacion;


}







// =================================
// TERMINAR RELACIÓN
// =================================

function terminarRelacion(
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



    relacion.estado_pareja =
    "terminada";


    relacion.romance = 0;


    relacion.compromiso = 0;


    relacion.historial.push(
        "Relación terminada"
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
// LIMITAR
// =================================

function limitarRelacion(
    relacion
){


    [

        "confianza",

        "afinidad",

        "respeto",

        "amistad",

        "romance",

        "compromiso"

    ].forEach(

        valor=>{


            if(relacion[valor]>100)

                relacion[valor]=100;


            if(relacion[valor]<0)

                relacion[valor]=0;


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

    terminarRelacion,

    puedeTenerRomance


};
