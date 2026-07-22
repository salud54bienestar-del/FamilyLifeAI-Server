// Sistema avanzado de lugares de trabajo - Village Soul


const cargarArchivo =
require("./cargador_datos.js");


const guardarArchivo =
require("./guardador_datos.js");


const crearEvento =
require("./eventos.js");


const crearMemoria =
require("./memorias.js");






// =================================
// BUSCAR LUGAR
// =================================

function buscarLugar(nombre){


    const datos =
    cargarArchivo("../datos/lugares_trabajo.json");



    if(!datos){

        return null;

    }



    return datos.lugares_trabajo.find(

        lugar =>

        lugar.nombre.toLowerCase()
        ===
        nombre.toLowerCase()

    ) || null;


}









// =================================
// VERIFICAR ESPACIO
// =================================

function tieneEspacio(
lugar,
habitante_id
){


    if(!lugar.capacidad){

        return true;

    }



    if(!lugar.trabajadores){

        lugar.trabajadores=[];

    }



    return (

        lugar.trabajadores.length
        <
        lugar.capacidad

        ||

        lugar.trabajadores.includes(
            habitante_id
        )

    );


}









// =================================
// ASIGNAR LUGAR
// =================================

function asignarLugarTrabajo(
habitante_id,
nombreLugar
){



    const almas =
    cargarArchivo("../datos/almas.json");


    const lugares =
    cargarArchivo("../datos/lugares_trabajo.json");



    const lugar =
    buscarLugar(nombreLugar);




    if(
        !almas ||
        !lugares ||
        !lugar
    ){

        return null;

    }





    const habitante =
    almas.almas.find(

        a=>a.id===habitante_id

    );



    if(!habitante){

        return null;

    }







    if(
        !tieneEspacio(
            lugar,
            habitante_id
        )
    ){

        return null;

    }








    habitante.lugar_trabajo={


        id:
        lugar.id,


        nombre:
        lugar.nombre,


        categoria:
        lugar.categoria,


        estado:
        "activo"


    };






    if(!lugar.trabajadores){

        lugar.trabajadores=[];

    }



    if(
        !lugar.trabajadores.includes(
            habitante_id
        )
    ){

        lugar.trabajadores.push(
            habitante_id
        );

    }







    guardarArchivo(

        "../datos/almas.json",

        almas

    );



    guardarArchivo(

        "../datos/lugares_trabajo.json",

        lugares

    );







    crearEvento(

        "asignacion_lugar_trabajo",

        [
            habitante_id
        ],

        {

            lugar:
            lugar.nombre

        }

    );






    crearMemoria(

        habitante_id,

        "trabajo",

        "Comenzó a trabajar en "+
        lugar.nombre,

        "media"

    );






    return habitante.lugar_trabajo;


}









// =================================
// OBTENER LUGAR ACTUAL
// =================================

function obtenerLugarTrabajo(
habitante_id
){


    const almas =
    cargarArchivo("../datos/almas.json");



    if(!almas){

        return null;

    }



    const habitante =
    almas.almas.find(

        a=>a.id===habitante_id

    );



    return habitante?.lugar_trabajo || null;


}









// =================================
// LISTAR LUGARES
// =================================

function obtenerLugares(){


    const datos =
    cargarArchivo("../datos/lugares_trabajo.json");



    return datos?.lugares_trabajo || [];


}








// =================================
// QUITAR TRABAJO
// =================================

function retirarLugarTrabajo(
habitante_id
){


    const almas =
    cargarArchivo("../datos/almas.json");


    if(!almas){

        return null;

    }



    const habitante =
    almas.almas.find(

        a=>a.id===habitante_id

    );



    if(!habitante){

        return null;

    }



    habitante.lugar_trabajo=null;



    guardarArchivo(

        "../datos/almas.json",

        almas

    );



    return true;


}







module.exports={


    buscarLugar,

    asignarLugarTrabajo,

    obtenerLugarTrabajo,

    obtenerLugares,

    retirarLugarTrabajo


};
