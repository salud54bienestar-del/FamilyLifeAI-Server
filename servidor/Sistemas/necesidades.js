// Sistema avanzado de necesidades de Village Soul

const cargarArchivo = require("./cargador_datos.js");
const crearMemoria = require("./memorias.js");
const cambiarEmocion = require("./emociones.js");



// =================================
// OBTENER NECESIDADES
// =================================

function obtenerNecesidades(habitante_id){


    const datos =
    cargarArchivo("../datos/necesidades.json");


    if(!datos){

        console.log(
            "No se pudieron cargar necesidades."
        );

        return null;

    }



    return datos.necesidades.find(

        n => n.habitante_id === habitante_id

    ) || null;


}






// =================================
// CREAR NECESIDADES
// =================================

function crearNecesidades(habitante_id){


    const datos =
    cargarArchivo("../datos/necesidades.json");


    if(!datos){

        return null;

    }



    const nueva = {


        habitante_id,


        hambre:100,

        energia:100,

        higiene:100,

        diversion:100,


        estres:0,


        estado:"estable",


        ultima_actualizacion:0


    };



    datos.necesidades.push(nueva);



    return nueva;

}







// =================================
// ACTUALIZAR NECESIDADES
// Tiempo Village Soul
// =================================

function actualizarNecesidades(
    habitante_id,
    ciclo = 1
){


    const necesidad =
    obtenerNecesidades(
        habitante_id
    );



    if(!necesidad){

        return null;

    }



    /*
    
    Un ciclo representa una actualización
    del mundo, no un día real.

    */


    necesidad.hambre -= 2 * ciclo;

    necesidad.energia -= 1 * ciclo;

    necesidad.higiene -= 1 * ciclo;

    necesidad.diversion -= 1 * ciclo;




    limitar(necesidad);




    if(
        necesidad.hambre < 30 ||
        necesidad.energia < 30
    ){

        necesidad.estres += 5;

    }




    limitar(necesidad);



    actualizarEstado(necesidad);



    return necesidad;


}







// =================================
// LIMITAR VALORES
// =================================

function limitar(necesidad){


    const valores = [

        "hambre",
        "energia",
        "higiene",
        "diversion",
        "estres"

    ];



    valores.forEach(v=>{


        if(necesidad[v] > 100){

            necesidad[v]=100;

        }


        if(necesidad[v] < 0){

            necesidad[v]=0;

        }


    });


}







// =================================
// ESTADO GENERAL
// =================================

function actualizarEstado(necesidad){


    const promedio =

    (
        necesidad.hambre +
        necesidad.energia +
        necesidad.higiene +
        necesidad.diversion

    ) / 4;




    if(promedio >=80){

        necesidad.estado="feliz";

    }

    else if(promedio >=50){

        necesidad.estado="normal";

    }

    else if(promedio >=25){

        necesidad.estado="preocupado";

    }

    else{

        necesidad.estado="critico";

    }


    return necesidad;

}







// =================================
// SATISFACER NECESIDAD
// =================================

function satisfacerNecesidad(
    habitante_id,
    tipo
){


    const necesidad =
    obtenerNecesidades(
        habitante_id
    );



    if(!necesidad){

        return null;

    }




    switch(tipo){


        case "comida":

            necesidad.hambre=100;

        break;



        case "dormir":

            necesidad.energia=100;

        break;



        case "baño":

            necesidad.higiene=100;

        break;



        case "diversion":

            necesidad.diversion=100;

        break;


    }





    crearMemoria(

        habitante_id,

        "necesidad",

        "Satisfizo la necesidad de " + tipo,

        "baja"

    );




    actualizarEstado(necesidad);



    return necesidad;


}






module.exports={


    obtenerNecesidades,

    crearNecesidades,

    actualizarNecesidades,

    satisfacerNecesidad


};
