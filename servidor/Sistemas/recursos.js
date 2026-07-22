// Sistema avanzado de recursos - Village Soul


const cargarArchivo =
require("./cargador_datos.js");


const guardarArchivo =
require("./guardador_datos.js");


const crearEvento =
require("./eventos.js");


const crearMemoria =
require("./memorias.js");







// =================================
// OBTENER RECURSOS DEL MUNDO
// =================================

function obtenerRecursos(){


    const datos =
    cargarArchivo("../datos/recursos.json");



    if(!datos){

        return null;

    }



    return datos.recursos;

}









// =================================
// CREAR RECURSOS INICIALES
// =================================

function crearRecursosIniciales(){



    const datos =
    cargarArchivo("../datos/recursos.json");



    if(!datos){

        return null;

    }





    if(!datos.recursos){


        datos.recursos = {


            alimentos:{


                trigo:0,

                pan:0,

                zanahoria:0,

                papa:0,

                carne:0,

                pescado:0


            },



            materiales:{


                madera:0,

                piedra:0,

                hierro:0,

                oro:0,

                diamante:0


            },



            economia:{


                esmeraldas:0,

                comercio:0,


                prosperidad:50


            },



            energia:100



        };




    }





    guardarArchivo(

        "../datos/recursos.json",

        datos

    );





    return datos.recursos;


}









// =================================
// AÑADIR RECURSO
// =================================

function agregarRecurso(
categoria,
recurso,
cantidad
){



    const datos =
    cargarArchivo("../datos/recursos.json");



    if(!datos){

        return null;

    }





    if(
        !datos.recursos[categoria]
    ){

        datos.recursos[categoria]={};

    }





    if(
        !datos.recursos[categoria][recurso]
    ){

        datos.recursos[categoria][recurso]=0;

    }






    datos.recursos[categoria][recurso]
    += cantidad;





    if(
        datos.recursos[categoria][recurso] < 0
    ){

        datos.recursos[categoria][recurso]=0;

    }






    guardarRecursos(datos);




    return datos.recursos[categoria][recurso];


}









// =================================
// CONSUMIR RECURSO
// =================================

function consumirRecurso(
categoria,
recurso,
cantidad
){



    const actual =
    obtenerCantidadRecurso(

        categoria,

        recurso

    );





    if(actual < cantidad){

        return false;

    }





    agregarRecurso(

        categoria,

        recurso,

        -cantidad

    );





    return true;


}









// =================================
// OBTENER CANTIDAD
// =================================

function obtenerCantidadRecurso(
categoria,
recurso
){



    const recursos =
    obtenerRecursos();



    if(
        !recursos ||
        !recursos[categoria]
    ){

        return 0;

    }





    return recursos[categoria][recurso] || 0;


}









// =================================
// PRODUCCIÓN POR TRABAJO
// =================================

function producirRecurso(
habitante_id,
categoria,
recurso,
cantidad
){



    agregarRecurso(

        categoria,

        recurso,

        cantidad

    );





    crearEvento(

        "produccion_recurso",

        [

            habitante_id

        ],

        {

            recurso,

            cantidad

        }

    );





    crearMemoria(

        habitante_id,

        "trabajo",

        "Produjo " +
        cantidad +
        " de " +
        recurso,

        "baja"

    );





    return true;


}









// =================================
// COMERCIO
// =================================

function comerciar(
recurso_entregado,
cantidad_entregada,
recurso_recibido,
cantidad_recibida
){



    if(
        !consumirRecurso(

            recurso_entregado.categoria,

            recurso_entregado.nombre,

            cantidad_entregada

        )
    ){

        return false;

    }





    agregarRecurso(

        recurso_recibido.categoria,

        recurso_recibido.nombre,

        cantidad_recibida

    );






    crearEvento(

        "comercio",

        [],

        {

            entregado:
            recurso_entregado,

            recibido:
            recurso_recibido

        }

    );





    return true;


}









// =================================
// ACTUALIZAR ECONOMÍA
// =================================

function actualizarEconomia(){



    const datos =
    cargarArchivo("../datos/recursos.json");



    if(!datos){

        return null;

    }





    const alimentos =
    datos.recursos.alimentos;



    const totalAlimentos =

    Object.values(alimentos)
    .reduce(

        (a,b)=>a+b,

        0

    );





    if(totalAlimentos > 500){


        datos.recursos.economia.prosperidad += 5;


    }

    else if(totalAlimentos < 50){


        datos.recursos.economia.prosperidad -= 5;


    }





    if(
        datos.recursos.economia.prosperidad >100
    ){

        datos.recursos.economia.prosperidad=100;

    }



    if(
        datos.recursos.economia.prosperidad <0
    ){

        datos.recursos.economia.prosperidad=0;

    }






    guardarRecursos(datos);



    return datos.recursos.economia;


}









// =================================
// GUARDAR
// =================================

function guardarRecursos(datos){


    guardarArchivo(

        "../datos/recursos.json",

        datos

    );


}








module.exports={


    obtenerRecursos,

    crearRecursosIniciales,

    agregarRecurso,

    consumirRecurso,

    obtenerCantidadRecurso,

    producirRecurso,

    comerciar,

    actualizarEconomia


};
