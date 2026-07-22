// Sistema avanzado de navegación - Village Soul


const cargarArchivo =
require("./cargador_datos.js");


const guardarArchivo =
require("./guardador_datos.js");


const crearEvento =
require("./eventos.js");


const crearMemoria =
require("./memorias.js");





// =================================
// OBTENER RUTA
// =================================

function obtenerRuta(
habitante_id
){

    const datos =
    cargarArchivo("../datos/rutas.json");


    if(!datos){

        return null;

    }


    return datos.rutas.find(

        r=>r.habitante_id===habitante_id

    ) || null;

}









// =================================
// CREAR RUTA
// =================================

function crearRuta(
habitante_id,
origen,
destino
){

    const datos =
    cargarArchivo("../datos/rutas.json");


    if(!datos){

        return null;

    }



    const ruta={


        id:
        datos.rutas.length+1,


        habitante_id,


        origen,


        destino,


        puntos:[

            origen,
            destino

        ],


        distancia:
        calcularDistancia(
            origen,
            destino
        ),


        estado:"creada"


    };





    datos.rutas.push(
        ruta
    );



    guardarArchivo(

        "../datos/rutas.json",

        datos

    );





    crearMemoria(

        habitante_id,

        "navegacion",

        "Aprendió una nueva ruta.",

        "baja"

    );



    return ruta;

}









// =================================
// CALCULAR DISTANCIA
// =================================

function calcularDistancia(
a,
b
){


    return Math.sqrt(

        Math.pow(a.x-b.x,2)

        +

        Math.pow(a.y-b.y,2)

        +

        Math.pow(a.z-b.z,2)

    );


}









// =================================
// OBTENER SIGUIENTE PASO
// =================================

function siguientePaso(
ruta,
posicionActual
){


    if(!ruta){

        return null;

    }



    let objetivo =
    ruta.destino;



    return {


        x:objetivo.x,

        y:objetivo.y,

        z:objetivo.z

    };


}









// =================================
// CREAR CAMINO AUTOMÁTICO
// =================================

function calcularCamino(
origen,
destino
){



    // Primera versión simple

    return [

        origen,

        destino

    ];

}



module.exports={


    obtenerRuta,

    crearRuta,

    calcularDistancia,

    siguientePaso,

    calcularCamino


};
