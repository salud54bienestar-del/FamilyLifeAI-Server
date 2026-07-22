// Sistema avanzado de historia del mundo - Village Soul


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
    cargarArchivo(
        "datos/historia.json"
    );



    if(!datos){

        return null;

    }



    if(!datos.historia){

        datos.historia=[];

    }



    return datos.historia;


}








// =================================
// FECHA DEL MUNDO
// =================================

function obtenerFechaMundo(){


    const tiempo =
    cargarArchivo(
        "datos/tiempo.json"
    );



    if(
        !tiempo ||
        !tiempo.tiempo
    ){

        return new Date()
        .toISOString();

    }



    return {


        dia:
        tiempo.tiempo.dia,


        mes:
        tiempo.tiempo.mes,


        año:
        tiempo.tiempo.año,


        estacion:
        tiempo.tiempo.estacion



    };


}









// =================================
// REGISTRAR HISTORIA
// =================================

function registrarHistoria(
    titulo,
    descripcion,
    tipo="general",
    participantes=[]
){



    const datos =
    cargarArchivo(
        "datos/historia.json"
    );



    if(!datos){

        return null;

    }



    if(!datos.historia){

        datos.historia=[];

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








    const acontecimiento={


        id:nuevoId,


        titulo,


        descripcion,


        tipo,


        participantes,



        fecha:
        obtenerFechaMundo(),



        importancia:
        calcularImportancia(tipo),



        fama:0,



        consecuencias:[],



        registrado:true


    };






    datos.historia.push(
        acontecimiento
    );





    guardarArchivo(

        "datos/historia.json",

        datos

    );








    crearEvento(

        "nuevo_acontecimiento",

        participantes,

        {

            titulo,

            tipo

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


        case "desastre":

            return "alta";



        case "descubrimiento":


        case "revolucion":

            return "alta";



        case "nacimiento":


        case "matrimonio":


        case "familia":

            return "media";



        case "fiesta":


        case "cultura":

            return "baja";



        case "leyenda":

            return "mitica";



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
    cargarArchivo(
        "datos/historia.json"
    );



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

        "datos/historia.json",

        datos

    );





    return historia;


}









// =================================
// BUSCAR POR TIPO
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
// BUSCAR HISTORIA DE HABITANTE
// =================================

function buscarHistoriaHabitante(
habitante_id
){


    const historia =
    cargarHistoria();



    if(!historia){

        return [];

    }





    return historia.filter(

        h=>

        h.participantes.includes(
            habitante_id
        )

    );


}








// =================================
// ÚLTIMOS EVENTOS
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



    const leyenda =
    registrarHistoria(

        titulo,

        descripcion,

        "leyenda"

    );



    if(leyenda){


        leyenda.fama=100;


    }



    return leyenda;


}









// =================================
// AUMENTAR FAMA DE HISTORIA
// =================================

function aumentarFama(
historia_id,
cantidad
){



    const datos =
    cargarArchivo(
        "datos/historia.json"
    );



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




    historia.fama += cantidad;



    if(historia.fama>100){

        historia.fama=100;

    }



    guardarArchivo(

        "datos/historia.json",

        datos

    );



    return historia;


}








module.exports={


    cargarHistoria,


    registrarHistoria,


    agregarConsecuencia,


    buscarPorTipo,


    buscarHistoriaHabitante,


    obtenerUltimos,


    crearLeyenda,


    aumentarFama


};
