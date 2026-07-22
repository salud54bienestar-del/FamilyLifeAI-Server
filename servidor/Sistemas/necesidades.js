// Sistema avanzado de necesidades - Village Soul


const cargarArchivo =
require("./cargador_datos.js");


const guardarArchivo =
require("./guardador_datos.js");


const crearMemoria =
require("./memorias.js");


const crearEvento =
require("./eventos.js");


const {
    cambiarEmocion
}
=
require("./emociones.js");



const {
    obtenerEtapaHabitante
}
=
require("./etapas_vida.js");







// =================================
// OBTENER NECESIDADES
// =================================


function obtenerNecesidades(
habitante_id
){


    const datos =
    cargarArchivo("../datos/necesidades.json");


    if(!datos){

        return null;

    }



    return datos.necesidades.find(

        n =>
        n.habitante_id === habitante_id

    ) || null;


}







// =================================
// CREAR NECESIDADES
// =================================


function crearNecesidades(
habitante_id,
etapa="adulto"
){


    const datos =
    cargarArchivo("../datos/necesidades.json");



    if(!datos){

        return null;

    }



    const existente =
    obtenerNecesidades(
        habitante_id
    );



    if(existente){

        return existente;

    }





    const nueva = {


        habitante_id,


        hambre:100,


        energia:100,


        higiene:100,


        diversion:


        etapa==="niño"

        ?

        100

        :

        70,



        social:70,


        carino:80,


        seguridad:100,


        descanso:100,


        estres:0,



        estado:"estable",



        ultima_actualizacion:"inicio"

    };





    datos.necesidades.push(
        nueva
    );



    guardarArchivo(

        "../datos/necesidades.json",

        datos

    );



    return nueva;


}









// =================================
// ACTUALIZAR NECESIDADES
// =================================


function actualizarNecesidades(
habitante_id,
ciclo=1
){


    const necesidad =
    obtenerNecesidades(
        habitante_id
    );


    if(!necesidad){

        return null;

    }



    let consumo = 1;





    const almas =
    cargarArchivo("../datos/almas.json");



    const alma =
    almas?.almas.find(

        a=>a.id===habitante_id

    );




    if(alma?.profesion?.estado==="activa"){

        consumo = 2;

    }






    necesidad.hambre -=
    2 * ciclo * consumo;



    necesidad.energia -=
    1 * ciclo * consumo;



    necesidad.higiene -=
    1 * ciclo;



    necesidad.diversion -=
    1 * ciclo;



    necesidad.social -=
    1 * ciclo;



    necesidad.descanso -=
    1 * ciclo;







    limitar(
        necesidad
    );





    revisarEstados(

        habitante_id,

        necesidad

    );





    actualizarEstado(
        necesidad
    );





    guardarNecesidades();



    return necesidad;


}









// =================================
// REVISAR ESTADOS
// =================================


function revisarEstados(
habitante_id,
necesidad
){


    if(necesidad.hambre < 20){


        cambiarEmocion(

            habitante_id,

            "tristeza",

            10,

            "hambre extrema"

        );



        crearEvento(

            "necesidad_critica",

            [
                habitante_id
            ],

            {
                necesidad:"hambre"
            }

        );

    }






    if(necesidad.energia < 20){


        cambiarEmocion(

            habitante_id,

            "estres",

            10,

            "agotamiento"

        );


    }





    if(necesidad.social < 20){


        cambiarEmocion(

            habitante_id,

            "soledad",

            10,

            "aislamiento"

        );


    }


}









// =================================
// LIMITAR
// =================================


function limitar(
objeto
){


    Object.keys(objeto)
    .forEach(

        key=>{


            if(
                typeof objeto[key]
                ===
                "number"
            ){


                objeto[key]=Math.max(

                    0,

                    Math.min(

                        100,

                        objeto[key]

                    )

                );


            }


        }

    );


}









// =================================
// ESTADO GENERAL
// =================================


function actualizarEstado(
necesidad
){


    const promedio =

    (

    necesidad.hambre+

    necesidad.energia+

    necesidad.higiene+

    necesidad.diversion+

    necesidad.social

    ) / 5;





    if(promedio>=80)

        necesidad.estado="feliz";

    else if(promedio>=50)

        necesidad.estado="normal";

    else if(promedio>=25)

        necesidad.estado="preocupado";

    else

        necesidad.estado="critico";




    return necesidad;


}









// =================================
// SATISFACER
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
            necesidad.descanso=100;

        break;




        case "social":

            necesidad.social=100;

        break;




        case "diversion":

            necesidad.diversion=100;

        break;




        case "carino":

            necesidad.carino=100;

        break;


    }






    crearMemoria(

        habitante_id,

        "necesidad",

        "Satisfizo: "+tipo,

        "baja"

    );




    guardarNecesidades();



    return necesidad;


}








function guardarNecesidades(){


    const datos =
    cargarArchivo("../datos/necesidades.json");



    guardarArchivo(

        "../datos/necesidades.json",

        datos

    );


}







module.exports={


    obtenerNecesidades,

    crearNecesidades,

    actualizarNecesidades,

    satisfacerNecesidad


};
