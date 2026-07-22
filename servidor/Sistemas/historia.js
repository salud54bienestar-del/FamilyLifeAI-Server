// Sistema de historia del mundo - Village Soul


const cargarArchivo =
require("./cargador_datos.js");


const guardarArchivo =
require("./guardador_datos.js");


const crearEvento =
require("./eventos.js");









// =================================
// CARGAR HISTORIA
// =================================

function cargarHistoria(){


    const datos =
    cargarArchivo("../datos/historia.json");



    if(!datos){

        return null;

    }



    if(!datos.historia){

        datos.historia=[];

    }



    return datos.historia;


}









// =================================
// REGISTRAR ACONTECIMIENTO
// =================================

function registrarHistoria(
    titulo,
    descripcion,
    tipo="general",
    participantes=[]
){



    const datos =
    cargarArchivo("../datos/historia.json");



    if(!datos){

        return null;

    }




    const nuevoId =


    datos.historia.length > 0


    ?

    Math.max(

        ...datos.historia.map(

            h=>h.id

        )

    ) + 1


    :


    1;







    const acontecimiento = {


        id:nuevoId,


        titulo,


        descripcion,


        tipo,



        participantes,



        fecha:

        new Date().toISOString(),



        importancia:
        calcularImportancia(tipo),



        consecuencias:[]



    };







    datos.historia.push(
        acontecimiento
    );






    guardarArchivo(

        "../datos/historia.json",

        datos

    );





    crearEvento(

        "nuevo_acontecimiento",

        participantes,

        {

            titulo

        }

    );







    return acontecimiento;


}









// =================================
// IMPORTANCIA
// =================================

function calcularImportancia(
tipo
){



    switch(tipo){



        case "fundacion":

            return "legendaria";



        case "guerra":

            return "alta";



        case "descubrimiento":

            return "alta";



        case "nacimiento":

            return "media";



        case "matrimonio":

            return "media";



        case "fiesta":

            return "baja";



        default:

            return "normal";


    }


}









// =================================
// AGREGAR CONSECUENCIA
// =================================

function agregarConsecuencia(
    historia_id,
    consecuencia
){



    const datos =
    cargarArchivo("../datos/historia.json");



    if(!datos){

        return null;

    }




    const historia =
    datos.historia.find(

        h=>h.id===historia_id

    );



    if(!historia){

        return null;

    }





    historia.consecuencias.push(
        consecuencia
    );





    guardarArchivo(

        "../datos/historia.json",

        datos

    );





    return historia;


}









// =================================
// BUSCAR HISTORIA POR TIPO
// =================================

function buscarPorTipo(
    tipo
){



    const historia =
    cargarHistoria();



    if(!historia){

        return [];

    }





    return historia.filter(

        h=>h.tipo===tipo

    );


}









// =================================
// ÚLTIMOS ACONTECIMIENTOS
// =================================

function obtenerUltimos(
cantidad=10
){



    const historia =
    cargarHistoria();



    if(!historia){

        return [];

    }





    return historia.slice(
        -cantidad
    );


}









// =================================
// CREAR LEYENDA
// =================================

function crearLeyenda(
titulo,
descripcion
){



    return registrarHistoria(

        titulo,

        descripcion,

        "leyenda"

    );


}








module.exports={


    cargarHistoria,

    registrarHistoria,

    agregarConsecuencia,

    buscarPorTipo,

    obtenerUltimos,

    crearLeyenda


};
