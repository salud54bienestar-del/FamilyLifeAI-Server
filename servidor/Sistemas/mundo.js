// ==========================================
// Sistema avanzado del mundo - Village Soul
// ==========================================


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






    // Datos nuevos compatibles


    if(!datos.lugares){

        datos.lugares=[];

    }



    if(!datos.recursos){

        datos.recursos={};

    }



    if(datos.poblacion===undefined){

        datos.poblacion=0;

    }



    if(datos.hora_actual===undefined){

        datos.hora_actual=0;

    }



    if(!datos.clima){

        datos.clima="soleado";

    }



    if(datos.seguridad===undefined){

        datos.seguridad=100;

    }



    if(datos.felicidad_comunidad===undefined){

        datos.felicidad_comunidad=80;

    }



    if(datos.nivel_desarrollo===undefined){

        datos.nivel_desarrollo=1;

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
// AVANZAR HORA
// =================================


function avanzarHora(){


    const mundo =
    obtenerMundo();



    if(!mundo){

        return null;

    }




    mundo.hora_actual++;





    if(mundo.hora_actual>=24){


        mundo.hora_actual=0;


        avanzarDia();


    }






    guardarMundo(
        mundo
    );





    crearEvento(

        "avance_hora",

        [],

        {

            hora:
            mundo.hora_actual

        }

    );





    return mundo;


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

            "El mundo cambió a "+estacion,

            "general"

        );

    }






    return mundo;


}









// =================================
// CAMBIAR CLIMA
// =================================


function cambiarClima(
clima
){


    const mundo =
    obtenerMundo();



    if(!mundo){

        return null;

    }




    const anterior =
    mundo.clima;



    mundo.clima =
    clima;




    guardarMundo(
        mundo
    );





    crearEvento(

        "cambio_clima",

        [],

        {

            anterior,

            nuevo:
            clima

        }

    );





    return mundo;


}









// =================================
// CAMBIAR ESTADO
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
// SEGURIDAD
// =================================


function modificarSeguridad(
cantidad
){


    const mundo =
    obtenerMundo();



    if(!mundo){

        return null;

    }



    mundo.seguridad += cantidad;




    mundo.seguridad = Math.max(

        0,

        Math.min(

            100,

            mundo.seguridad

        )

    );





    guardarMundo(
        mundo
    );



    return mundo.seguridad;


}









// =================================
// FELICIDAD COMUNIDAD
// =================================


function modificarFelicidad(
cantidad
){


    const mundo =
    obtenerMundo();



    if(!mundo){

        return null;

    }



    mundo.felicidad_comunidad += cantidad;




    mundo.felicidad_comunidad = Math.max(

        0,

        Math.min(

            100,

            mundo.felicidad_comunidad

        )

    );





    guardarMundo(
        mundo
    );



    return mundo.felicidad_comunidad;


}









// =================================
// DESARROLLO
// =================================


function aumentarDesarrollo(){


    const mundo =
    obtenerMundo();



    if(!mundo){

        return null;

    }



    mundo.nivel_desarrollo++;





    guardarMundo(
        mundo
    );



    crearEvento(

        "desarrollo_comunidad",

        [],

        {

            nivel:
            mundo.nivel_desarrollo

        }

    );





    return mundo.nivel_desarrollo;


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




    const id =

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


        id,

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





    return lugar;


}









// =================================
// POBLACIÓN
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



    if(mundo.poblacion<0){

        mundo.poblacion=0;

    }




    guardarMundo(
        mundo
    );



    return mundo.poblacion;


}









// =================================
// RECURSOS
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
    mundo.recursos[recurso]===undefined
    ){

        mundo.recursos[recurso]=0;

    }




    mundo.recursos[recurso]+=cantidad;



    if(mundo.recursos[recurso]<0){

        mundo.recursos[recurso]=0;

    }





    guardarMundo(
        mundo
    );



    return mundo.recursos;


}









// =================================
// CONTEXTO PARA IA
// =================================


function obtenerContextoIA(){


    const mundo =
    obtenerMundo();



    if(!mundo){

        return null;

    }



    return {


        hora:
        mundo.hora_actual,


        clima:
        mundo.clima,


        estacion:
        mundo.estacion,


        seguridad:
        mundo.seguridad,


        felicidad:
        mundo.felicidad_comunidad,


        desarrollo:
        mundo.nivel_desarrollo,


        estado:
        mundo.estado


    };


}









// =================================
// RESUMEN
// =================================


function obtenerResumenMundo(){


    const mundo =
    obtenerMundo();



    if(!mundo){

        return null;

    }



    return {


        nombre:mundo.nombre,

        dia:mundo.dia_actual,

        hora:mundo.hora_actual,

        clima:mundo.clima,

        estacion:mundo.estacion,

        poblacion:mundo.poblacion,

        estado:mundo.estado,

        lugares:mundo.lugares.length


    };


}









function obtenerEstadoMundo(){


    return obtenerMundo();


}









module.exports={


    obtenerMundo,

    guardarMundo,

    avanzarHora,

    avanzarDia,

    cambiarEstacion,

    cambiarClima,

    cambiarEstado,

    modificarSeguridad,

    modificarFelicidad,

    aumentarDesarrollo,

    agregarLugar,

    descubrirLugar,

    actualizarPoblacion,

    modificarRecurso,

    obtenerContextoIA,

    obtenerResumenMundo,

    obtenerEstadoMundo


};
