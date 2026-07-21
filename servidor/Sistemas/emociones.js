// Sistema avanzado de necesidades - Village Soul


const cargarArchivo =
require("./cargador_datos.js");


const crearMemoria =
require("./memorias.js");



const {
    actualizarEmocionesPorNecesidades
}
=
require("./emociones.js");






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
    etapa="bebe"
){


    const datos =
    cargarArchivo("../datos/necesidades.json");



    if(!datos){

        return null;

    }




    const existe =
    obtenerNecesidades(
        habitante_id
    );



    if(existe){

        return existe;

    }





    let necesidades;





    // =========================
    // BEBÉ
    // =========================

    if(etapa==="bebe"){


        necesidades={


            habitante_id,


            etapa,


            hambre:100,


            energia:100,


            higiene:100,


            diversion:50,


            cariño:100,


            sueño:100,


            estado:
            "dependiente"


        };


    }







    // =========================
    // NIÑO
    // =========================

    else if(etapa==="niño"){


        necesidades={


            habitante_id,


            etapa,


            hambre:100,


            energia:100,


            higiene:90,


            diversion:100,


            cariño:80,


            sueño:90,


            estado:
            "estable"


        };


    }







    // =========================
    // ADOLESCENTE
    // =========================

    else if(etapa==="adolescente"){


        necesidades={


            habitante_id,


            etapa,


            hambre:100,


            energia:100,


            higiene:100,


            diversion:90,


            cariño:60,


            sueño:80,


            estado:
            "estable"


        };


    }







    // =========================
    // ADULTO
    // =========================

    else{


        necesidades={


            habitante_id,


            etapa:"adulto",


            hambre:100,


            energia:100,


            higiene:100,


            diversion:80,


            cariño:60,


            sueño:80,


            estado:
            "estable"


        };


    }







    datos.necesidades.push(
        necesidades
    );



    return necesidades;


}









// =================================
// ACTUALIZAR NECESIDADES
// =================================

function actualizarNecesidades(
    habitante_id
){



    const necesidad =
    obtenerNecesidades(
        habitante_id
    );



    if(!necesidad){

        return null;

    }






    // Consumo diario


    necesidad.hambre -= 5;


    necesidad.energia -= 4;


    necesidad.higiene -= 2;


    necesidad.diversion -= 3;






    if(
        necesidad.etapa==="bebe"
    ){

        necesidad.cariño -= 1;

    }







    limitarNecesidades(
        necesidad
    );





    actualizarEstado(
        necesidad
    );





    actualizarEmocionesPorNecesidades(

        habitante_id,

        necesidad

    );





    return necesidad;


}







// =================================
// LIMITAR VALORES
// =================================

function limitarNecesidades(
    necesidad
){



    Object.keys(necesidad)
    .forEach(

        clave=>{


            if(
                typeof necesidad[clave]
                ===
                "number"
            ){


                if(
                    necesidad[clave] < 0
                ){

                    necesidad[clave]=0;

                }



                if(
                    necesidad[clave] > 100
                ){

                    necesidad[clave]=100;

                }


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

        necesidad.hambre +

        necesidad.energia +

        necesidad.higiene +

        necesidad.diversion

    ) / 4;






    if(promedio>=80){

        necesidad.estado="feliz";

    }

    else if(promedio>=50){

        necesidad.estado="normal";

    }

    else if(promedio>=25){

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



        case "jugar":

            necesidad.diversion=100;

        break;



        case "cariño":

            necesidad.cariño=100;

        break;



    }







    crearMemoria(

        habitante_id,

        "necesidad",

        "Satisfizo la necesidad: "+tipo,

        "baja"

    );






    actualizarEstado(
        necesidad
    );



    return necesidad;


}







module.exports={


    obtenerNecesidades,

    crearNecesidades,

    actualizarNecesidades,

    satisfacerNecesidad


};
