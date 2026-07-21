// Sistema de objetivos de habitantes - Village Soul


const cargarArchivo =
require("./cargador_datos.js");


const crearEvento =
require("./eventos.js");


const crearMemoria =
require("./memorias.js");





// =================================
// OBTENER OBJETIVOS DE HABITANTE
// =================================

function obtenerObjetivos(habitante_id){


    const datos =
    cargarArchivo("../datos/objetivos.json");



    if(!datos){

        console.log(
            "No se pudieron cargar los objetivos."
        );

        return null;

    }



    return datos.objetivos.filter(

        objetivo =>
        objetivo.habitante_id === habitante_id

    );


}






// =================================
// OBTENER OBJETIVO ACTIVO
// =================================

function obtenerObjetivoActivo(
    habitante_id
){


    const objetivos =
    obtenerObjetivos(
        habitante_id
    );



    if(!objetivos){

        return null;

    }



    return objetivos.find(

        objetivo =>
        objetivo.estado === "activo"

    ) || null;


}






// =================================
// CREAR OBJETIVO
// =================================

function crearObjetivo(
    habitante_id,
    titulo,
    descripcion,
    tipo="general",
    prioridad="media"
){


    const datos =
    cargarArchivo("../datos/objetivos.json");



    if(!datos){

        return null;

    }





    const nuevoId =

    datos.objetivos.length > 0

    ?

    Math.max(
        ...datos.objetivos.map(
            o=>o.id
        )
    ) + 1

    :

    1;





    const objetivo = {


        id:
        nuevoId,


        habitante_id,


        titulo,


        descripcion,


        tipo,


        progreso:0,


        estado:"activo",


        prioridad,


        requisitos:[],


        recompensa:"experiencia"


    };





    datos.objetivos.push(
        objetivo
    );






    crearEvento(

        "nuevo_objetivo",

        [

            habitante_id

        ],

        {

            objetivo:
            titulo

        }

    );






    crearMemoria(

        habitante_id,

        "objetivo",

        "Tiene un nuevo objetivo: " +
        titulo,

        "media"

    );





    return objetivo;


}







// =================================
// ACTUALIZAR PROGRESO
// =================================

function actualizarProgreso(
    objetivo_id,
    cantidad
){


    const datos =
    cargarArchivo("../datos/objetivos.json");



    if(!datos){

        return null;

    }





    const objetivo =
    datos.objetivos.find(

        o=>o.id===objetivo_id

    );



    if(!objetivo){

        return null;

    }





    objetivo.progreso += cantidad;




    if(objetivo.progreso >= 100){


        objetivo.progreso = 100;


        objetivo.estado =
        "completado";



        crearEvento(

            "objetivo_completado",

            [

                objetivo.habitante_id

            ],

            {

                objetivo:
                objetivo.titulo

            }

        );




        crearMemoria(

            objetivo.habitante_id,

            "logro",

            "Completó el objetivo: " +
            objetivo.titulo,

            "alta"

        );


    }





    return objetivo;


}






// =================================
// CAMBIAR ESTADO OBJETIVO
// =================================

function cambiarEstadoObjetivo(
    objetivo_id,
    estado
){


    const datos =
    cargarArchivo("../datos/objetivos.json");



    if(!datos){

        return null;

    }



    const objetivo =
    datos.objetivos.find(

        o=>o.id===objetivo_id

    );



    if(!objetivo){

        return null;

    }



    objetivo.estado = estado;



    return objetivo;


}






// =================================
// DESBLOQUEAR OBJETIVO
// =================================

function desbloquearObjetivo(
    objetivo_id
){


    return cambiarEstadoObjetivo(

        objetivo_id,

        "activo"

    );


}






// =================================
// COMPLETAR OBJETIVO MANUAL
// =================================

function completarObjetivo(
    objetivo_id
){


    const objetivo =
    actualizarProgreso(

        objetivo_id,

        100

    );


    return objetivo;


}







module.exports = {


    obtenerObjetivos,

    obtenerObjetivoActivo,

    crearObjetivo,

    actualizarProgreso,

    cambiarEstadoObjetivo,

    desbloquearObjetivo,

    completarObjetivo


};
