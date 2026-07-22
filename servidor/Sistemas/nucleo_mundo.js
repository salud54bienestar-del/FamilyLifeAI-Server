// Sistema núcleo avanzado del mundo - Village Soul


const cargarArchivo =
require("./cargador_datos.js");


const guardarArchivo =
require("./guardador_datos.js");


const crearEvento =
require("./eventos.js");








// =================================
// OBTENER NÚCLEO DEL MUNDO
// =================================

function obtenerNucleo(){


    const datos =
    cargarArchivo("../datos/nucleo_mundo.json");



    if(!datos){

        console.log(
            "No se pudo cargar el núcleo del mundo."
        );

        return null;

    }



    return datos;


}









// =================================
// OBTENER SISTEMAS ACTIVOS
// =================================

function obtenerSistemas(){


    const nucleo =
    obtenerNucleo();



    if(!nucleo){

        return [];

    }



    return nucleo.sistemas || [];


}









// =================================
// VERIFICAR SISTEMA ACTIVO
// =================================

function sistemaActivo(
    nombre
){


    return obtenerSistemas()
    .includes(nombre);


}









// =================================
// VERIFICAR SISTEMAS NECESARIOS
// =================================

function verificarSistemas(){


    const requeridos=[


        "tiempo",

        "almas",

        "memorias",

        "emociones",

        "relaciones",

        "familias",

        "objetivos",

        "decisiones",

        "profesiones",

        "recursos",

        "cultura",

        "historia"


    ];





    const activos =
    obtenerSistemas();





    return {


        activos,


        faltantes:

        requeridos.filter(

            sistema =>
            !activos.includes(sistema)

        ),



        correcto:

        requeridos.every(

            sistema =>
            activos.includes(sistema)

        )


    };


}









// =================================
// INFORMACIÓN DEL MUNDO
// =================================

function obtenerInformacionMundo(){



    const mundo =
    cargarArchivo("../datos/mundo.json");



    if(!mundo){

        return null;

    }





    return {


        nombre:
        mundo.nombre || "Sin nombre",



        dia:
        mundo.dia_actual || 1,



        estacion:
        mundo.estacion || "primavera",



        estado:
        mundo.estado || "tranquilo",



        poblacion:
        mundo.poblacion || 0,



        aldeas:
        mundo.aldeas || [],



        epoca:
        mundo.epoca || "inicio"


    };


}









// =================================
// ESTADÍSTICAS DEL MUNDO
// =================================

function obtenerEstadisticas(){



    const almas =
    cargarArchivo("../datos/almas.json");



    const familias =
    cargarArchivo("../datos/familias.json");



    const recursos =
    cargarArchivo("../datos/recursos.json");





    return {


        habitantes:

        almas?.almas.length || 0,



        familias:

        familias?.familias.length || 0,



        recursos:

        recursos?.recursos || {}



    };


}









// =================================
// ACTUALIZAR ESTADO DEL MUNDO
// =================================

function actualizarEstado(
nuevoEstado
){



    const datos =
    cargarArchivo("../datos/mundo.json");



    if(!datos){

        return null;

    }



    datos.estado =
    nuevoEstado;




    guardarArchivo(

        "../datos/mundo.json",

        datos

    );




    crearEvento(

        "cambio_estado_mundo",

        [],

        {

            estado:
            nuevoEstado

        }

    );





    return datos;

}









// =================================
// INICIALIZAR MUNDO
// =================================

function iniciarMundo(){



    const nucleo =
    obtenerNucleo();



    const mundo =
    obtenerInformacionMundo();



    if(
        !nucleo ||
        !mundo
    ){

        return null;

    }






    const sistemas =
    verificarSistemas();






    console.log("===============================");

    console.log(
        "     VILLAGE SOUL INICIADO"
    );

    console.log("===============================");





    console.log(
        "Mundo:",
        mundo.nombre
    );



    console.log(
        "Día:",
        mundo.dia
    );



    console.log(
        "Estación:",
        mundo.estacion
    );



    console.log(
        "Sistemas activos:",
        sistemas.activos.length
    );





    if(
        !sistemas.correcto
    ){

        console.log(
            "Sistemas faltantes:",
            sistemas.faltantes
        );

    }







    crearEvento(

        "inicio_mundo",

        [],

        {

            mundo:
            mundo.nombre

        }

    );







    return {


        nucleo,


        mundo,


        sistemas


    };


}








module.exports={


    obtenerNucleo,

    obtenerSistemas,

    sistemaActivo,

    verificarSistemas,

    obtenerInformacionMundo,

    obtenerEstadisticas,

    actualizarEstado,

    iniciarMundo


};
