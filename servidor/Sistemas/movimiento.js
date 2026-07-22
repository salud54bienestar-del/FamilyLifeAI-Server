// Sistema avanzado de movimiento de habitantes - Village Soul


const cargarArchivo =
require("./cargador_datos.js");


const guardarArchivo =
require("./guardador_datos.js");


const crearEvento =
require("./eventos.js");


const crearMemoria =
require("./memorias.js");




// =================================
// OBTENER MOVIMIENTO
// =================================

function obtenerMovimiento(
    habitante_id
){

    const datos =
    cargarArchivo("../datos/movimientos.json");


    if(!datos){

        return null;

    }


    return datos.movimientos.find(

        m=>m.habitante_id===habitante_id

    ) || null;


}





// =================================
// CREAR MOVIMIENTO
// =================================

function crearMovimiento(
    habitante_id,
    posicionInicial={}
){


    const datos =
    cargarArchivo("../datos/movimientos.json");


    if(!datos){

        return null;

    }



    const existente =
    obtenerMovimiento(
        habitante_id
    );


    if(existente){

        return existente;

    }




    const movimiento={


        id:

        datos.movimientos.length + 1,


        habitante_id,



        posicion_actual:{

            x:posicionInicial.x || 0,

            y:posicionInicial.y || 0,

            z:posicionInicial.z || 0

        },



        destino:null,


        estado:"quieto",


        velocidad:1,


        siguiendo:false,


        ultima_actualizacion:null



    };




    datos.movimientos.push(
        movimiento
    );



    guardarArchivo(

        "../datos/movimientos.json",

        datos

    );



    crearMemoria(

        habitante_id,

        "movimiento",

        "Registró su posición inicial.",

        "baja"

    );



    return movimiento;


}








// =================================
// ESTABLECER DESTINO
// =================================

function establecerDestino(
    habitante_id,
    destino
){


    const movimiento =
    obtenerMovimiento(
        habitante_id
    );


    if(!movimiento){

        return null;

    }




    movimiento.destino={


        x:destino.x,

        y:destino.y,

        z:destino.z


    };



    movimiento.estado="caminando";



    movimiento.ultima_actualizacion =
    new Date().toISOString();





    guardarMovimiento(
        movimiento
    );




    crearEvento(

        "movimiento_iniciado",

        [
            habitante_id
        ],

        {

            destino

        }

    );



    return movimiento;


}








// =================================
// ACTUALIZAR POSICIÓN
// =================================

function actualizarPosicion(
    habitante_id,
    nuevaPosicion
){


    const movimiento =
    obtenerMovimiento(
        habitante_id
    );


    if(!movimiento){

        return null;

    }




    movimiento.posicion_actual={


        x:nuevaPosicion.x,

        y:nuevaPosicion.y,

        z:nuevaPosicion.z


    };



    movimiento.ultima_actualizacion =
    new Date().toISOString();





    verificarLlegada(
        movimiento
    );





    guardarMovimiento(
        movimiento
    );



    return movimiento;


}








// =================================
// VERIFICAR LLEGADA
// =================================

function verificarLlegada(
    movimiento
){


    if(!movimiento.destino){

        return false;

    }



    const distancia = Math.sqrt(

        Math.pow(
            movimiento.posicion_actual.x -
            movimiento.destino.x,
            2
        )

        +

        Math.pow(
            movimiento.posicion_actual.y -
            movimiento.destino.y,
            2
        )

        +

        Math.pow(
            movimiento.posicion_actual.z -
            movimiento.destino.z,
            2
        )


    );





    if(distancia <=1){


        movimiento.estado="llegado";


        crearEvento(

            "lugar_alcanzado",

            [
                movimiento.habitante_id
            ],

            {

                destino:
                movimiento.destino

            }

        );


        return true;

    }



    return false;


}








// =================================
// DETENER MOVIMIENTO
// =================================

function detenerMovimiento(
    habitante_id
){


    const movimiento =
    obtenerMovimiento(
        habitante_id
    );


    if(!movimiento){

        return null;

    }




    movimiento.estado="quieto";


    movimiento.destino=null;



    guardarMovimiento(
        movimiento
    );



    return movimiento;


}







// =================================
// GUARDAR
// =================================

function guardarMovimiento(
    movimiento
){


    const datos =
    cargarArchivo("../datos/movimientos.json");



    if(!datos){

        return null;

    }



    const index =
    datos.movimientos.findIndex(

        m=>m.id===movimiento.id

    );



    if(index!==-1){

        datos.movimientos[index]=movimiento;

    }




    guardarArchivo(

        "../datos/movimientos.json",

        datos

    );


    return movimiento;


}








module.exports={


    obtenerMovimiento,

    crearMovimiento,

    establecerDestino,

    actualizarPosicion,

    detenerMovimiento

};
