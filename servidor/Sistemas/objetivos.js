// Sistema de objetivos de habitantes - Village Soul


const cargarArchivo =
require("./cargador_datos.js");


const crearEvento =
require("./eventos.js");


const crearMemoria =
require("./memorias.js");






// =================================
// CARGAR OBJETIVOS
// =================================

function cargarObjetivos(){


    const datos =
    cargarArchivo("../datos/objetivos.json");


    if(!datos){

        console.log(
            "No se pudieron cargar los objetivos."
        );

        return null;

    }


    return datos.objetivos || [];

}







// =================================
// OBTENER OBJETIVOS DE HABITANTE
// =================================

function obtenerObjetivos(
    habitante_id
){


    const objetivos =
    cargarObjetivos();



    if(!objetivos){

        return [];

    }



    return objetivos.filter(

        objetivo =>
        objetivo.habitante_id === habitante_id

    );


}







// =================================
// OBJETIVO ACTIVO
// =================================

function obtenerObjetivoActivo(
    habitante_id
){


    const objetivos =
    obtenerObjetivos(
        habitante_id
    );



    return objetivos.find(

        objetivo =>

        objetivo.estado === "activo"

    ) || null;


}







// =================================
// BUSCAR POR TIPO
// =================================

function obtenerObjetivosPorTipo(
    habitante_id,
    tipo
){


    return obtenerObjetivos(
        habitante_id
    )
    .filter(

        objetivo =>
        objetivo.tipo === tipo

    );


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


        id:nuevoId,


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

        "Comenzó un nuevo objetivo: " +
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




    if(objetivo.progreso > 100){

        objetivo.progreso = 100;

    }


    if(objetivo.progreso < 0){

        objetivo.progreso = 0;

    }







    if(objetivo.progreso >= 100){


        objetivo.estado =
        "completado";



        crearEvento(

            "objetivo_completado",

            [
                objetivo.habitante_id
            ],

            {

                objetivo:
                objetivo.titulo,

                recompensa:
                objetivo.recompensa

            }

        );





        crearMemoria(

            objetivo.habitante_id,

            "logro",

            "Completó: " +
            objetivo.titulo,

            "alta"

        );


    }





    return objetivo;


}







// =================================
// CAMBIAR ESTADO
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



    crearMemoria(

        objetivo.habitante_id,

        "objetivo",

        "Su objetivo cambió a: " + estado,

        "baja"

    );



    return objetivo;


}







// =================================
// DESBLOQUEAR
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
// COMPLETAR
// =================================

function completarObjetivo(
    objetivo_id
){

    return actualizarProgreso(

        objetivo_id,

        100

    );

}







module.exports = {


    cargarObjetivos,

    obtenerObjetivos,

    obtenerObjetivoActivo,

    obtenerObjetivosPorTipo,

    crearObjetivo,

    actualizarProgreso,

    cambiarEstadoObjetivo,

    desbloquearObjetivo,

    completarObjetivo


};
