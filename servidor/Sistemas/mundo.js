// Sistema avanzado del mundo - Village Soul


const cargarArchivo =
require("./cargador_datos.js");


const guardarArchivo =
require("./guardador_datos.js");


const crearEvento =
require("./eventos.js");




// Historia opcional

let registrarHistoria = null;


try{

    registrarHistoria =
    require("./historia.js")
    .registrarHistoria;

}
catch(error){

    console.log(
        "Sistema de historia pendiente."
    );

}






// =================================
// OBTENER MUNDO
// =================================

function obtenerMundo(){


    const datos =
    cargarArchivo(
        "datos/mundo.json"
    );



    if(!datos){

        console.log(
            "No se pudo cargar el mundo."
        );

        return null;

    }





    if(!datos.lugares){

        datos.lugares=[];

    }



    if(!datos.recursos){

        datos.recursos={};

    }



    if(!datos.poblacion){

        datos.poblacion=0;

    }



    return datos;


}







// =================================
// GUARDAR MUNDO
// =================================

function guardarMundo(
    mundo
){


    return guardarArchivo(

        "datos/mundo.json",

        mundo

    );


}







// =================================
// AVANZAR DÍA
// =================================

function avanzarDia(){


    const mundo =
    obtenerMundo();



    if(!mundo){

        return null;

    }



    mundo.dia_actual++;





    guardarMundo(
        mundo
    );






    crearEvento(

        "nuevo_dia",

        [],

        {

            dia:
            mundo.dia_actual

        }

    );






    return mundo;


}







// =================================
// CAMBIAR ESTACIÓN
// =================================

function cambiarEstacion(
    estacion
){


    const mundo =
    obtenerMundo();



    if(!mundo){

        return null;

    }




    const anterior =
    mundo.estacion;




    mundo.estacion =
    estacion;





    guardarMundo(
        mundo
    );





    crearEvento(

        "cambio_estacion",

        [],

        {

            anterior,

            nueva:
            estacion

        }

    );





    if(registrarHistoria){


        registrarHistoria(

            "Cambio de estación",

            "El mundo cambió a " + estacion,

            "general"

        );

    }






    return mundo;


}







// =================================
// CAMBIAR ESTADO DEL MUNDO
// =================================

function cambiarEstado(
    estado
){


    const mundo =
    obtenerMundo();



    if(!mundo){

        return null;

    }



    mundo.estado =
    estado;



    guardarMundo(
        mundo
    );



    return mundo;


}








// =================================
// AGREGAR LUGAR
// =================================

function agregarLugar(
    nombre,
    tipo
){


    const mundo =
    obtenerMundo();



    if(!mundo){

        return null;

    }





    const nuevoId =

    mundo.lugares.length > 0

    ?

    Math.max(

        ...mundo.lugares.map(
            l=>l.id
        )

    ) + 1

    :

    1;







    const lugar={


        id:nuevoId,


        nombre,


        tipo,


        descubierto:false,


        habitantes:[]


    };





    mundo.lugares.push(
        lugar
    );





    guardarMundo(
        mundo
    );





    return lugar;


}







// =================================
// DESCUBRIR LUGAR
// =================================

function descubrirLugar(
    id
){


    const mundo =
    obtenerMundo();



    if(!mundo){

        return null;

    }



    const lugar =
    mundo.lugares.find(

        l=>l.id===id

    );



    if(!lugar){

        return null;

    }




    lugar.descubierto=true;




    guardarMundo(
        mundo
    );





    crearEvento(

        "descubrimiento",

        [],

        {

            lugar:
            lugar.nombre

        }

    );





    if(registrarHistoria){


        registrarHistoria(

            "Nuevo descubrimiento",

            "Fue descubierto " + lugar.nombre,

            "descubrimiento"

        );


    }






    return lugar;


}








// =================================
// ACTUALIZAR POBLACIÓN
// =================================

function actualizarPoblacion(
    cantidad
){


    const mundo =
    obtenerMundo();



    if(!mundo){

        return null;

    }




    mundo.poblacion += cantidad;




    if(mundo.poblacion < 0){

        mundo.poblacion=0;

    }





    guardarMundo(
        mundo
    );





    return mundo.poblacion;


}








// =================================
// MODIFICAR RECURSOS
// =================================

function modificarRecurso(
    recurso,
    cantidad
){


    const mundo =
    obtenerMundo();



    if(!mundo){

        return null;

    }




    if(
        mundo.recursos[recurso] === undefined
    ){

        mundo.recursos[recurso]=0;

    }




    mundo.recursos[recurso]+=cantidad;





    if(
        mundo.recursos[recurso]<0
    ){

        mundo.recursos[recurso]=0;

    }





    guardarMundo(
        mundo
    );





    return mundo.recursos;


}









// =================================
// RESUMEN DEL MUNDO
// =================================

function obtenerResumenMundo(){


    const mundo =
    obtenerMundo();



    if(!mundo){

        return null;

    }





    return {


        nombre:
        mundo.nombre,


        dia:
        mundo.dia_actual,


        estacion:
        mundo.estacion,


        poblacion:
        mundo.poblacion,


        estado:
        mundo.estado,


        lugares:
        mundo.lugares.length


    };


}









// =================================
// ESTADO COMPLETO PARA IA
// =================================

function obtenerEstadoMundo(){


    const mundo =
    obtenerMundo();



    if(!mundo){

        return null;

    }



    return {


        nombre:
        mundo.nombre,


        dia:
        mundo.dia_actual,


        estacion:
        mundo.estacion,


        poblacion:
        mundo.poblacion,


        recursos:
        mundo.recursos,


        lugares:
        mundo.lugares,


        estado:
        mundo.estado



    };


}








module.exports={


    obtenerMundo,

    guardarMundo,

    avanzarDia,

    cambiarEstacion,

    cambiarEstado,

    agregarLugar,

    descubrirLugar,

    actualizarPoblacion,

    modificarRecurso,

    obtenerResumenMundo,

    obtenerEstadoMundo


};
