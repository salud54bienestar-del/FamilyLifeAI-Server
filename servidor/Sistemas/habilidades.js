// Sistema avanzado de habilidades - Village Soul


const cargarArchivo =
require("./cargador_datos.js");


const guardarArchivo =
require("./guardador_datos.js");


const crearMemoria =
require("./memorias.js");


const crearEvento =
require("./eventos.js");






// =================================
// OBTENER HABILIDADES
// =================================

function obtenerHabilidades(
    habitante_id
){


    const datos =
    cargarArchivo("../datos/habilidades.json");



    if(!datos){

        return null;

    }



    return datos.habilidades.find(

        h =>
        h.habitante_id === habitante_id

    ) || null;


}








// =================================
// CREAR HABILIDADES
// =================================

function crearHabilidades(
    habitante_id
){


    const datos =
    cargarArchivo("../datos/habilidades.json");



    if(!datos){

        return null;

    }





    const existente =
    obtenerHabilidades(
        habitante_id
    );



    if(existente){

        return existente;

    }






    const nuevasHabilidades = {


        habitante_id,



        habilidades:{


            agricultura:{

                nivel:0,

                experiencia:0

            },


            cocina:{

                nivel:0,

                experiencia:0

            },


            forja:{

                nivel:0,

                experiencia:0

            },


            construccion:{

                nivel:0,

                experiencia:0

            },


            combate:{

                nivel:0,

                experiencia:0

            },


            comercio:{

                nivel:0,

                experiencia:0

            },


            medicina:{

                nivel:0,

                experiencia:0

            },


            creatividad:{

                nivel:0,

                experiencia:0

            }


        }


    };





    datos.habilidades.push(
        nuevasHabilidades
    );





    guardarArchivo(

        "../datos/habilidades.json",

        datos

    );





    return nuevasHabilidades;


}









// =================================
// AUMENTAR EXPERIENCIA
// =================================

function aumentarHabilidad(
    habitante_id,
    habilidad,
    cantidad
){



    const datos =
    obtenerHabilidades(
        habitante_id
    );



    if(!datos){

        return null;

    }





    if(
        !datos.habilidades[habilidad]
    ){

        datos.habilidades[habilidad]={

            nivel:0,

            experiencia:0

        };

    }





    datos.habilidades[habilidad].experiencia += cantidad;






    subirNivelHabilidad(

        datos,

        habilidad,

        habitante_id

    );






    guardarArchivoHabilidades();



    return datos.habilidades[habilidad];


}









// =================================
// SUBIR NIVEL
// =================================

function subirNivelHabilidad(
    datos,
    habilidad,
    habitante_id
){



    const habilidadDatos =
    datos.habilidades[habilidad];



    if(
        habilidadDatos.experiencia >=100
    ){


        habilidadDatos.nivel++;


        habilidadDatos.experiencia=0;





        crearEvento(

            "subida_habilidad",

            [
                habitante_id
            ],

            {

                habilidad,

                nivel:
                habilidadDatos.nivel

            }

        );





        crearMemoria(

            habitante_id,

            "aprendizaje",

            "Mejoró la habilidad de "+
            habilidad,

            "media"

        );



    }


}








// =================================
// VERIFICAR HABILIDAD
// =================================

function tieneHabilidad(
    habitante_id,
    habilidad,
    nivelNecesario
){


    const datos =
    obtenerHabilidades(
        habitante_id
    );



    if(!datos){

        return false;

    }





    const habilidadActual =
    datos.habilidades[habilidad];



    if(!habilidadActual){

        return false;

    }





    return (

        habilidadActual.nivel >=
        nivelNecesario

    );


}








// =================================
// APRENDER HABILIDAD NUEVA
// =================================

function aprenderHabilidad(
    habitante_id,
    habilidad
){



    const datos =
    obtenerHabilidades(
        habitante_id
    );



    if(!datos){

        return null;

    }





    if(
        !datos.habilidades[habilidad]
    ){


        datos.habilidades[habilidad]={

            nivel:1,

            experiencia:0

        };


    }







    crearMemoria(

        habitante_id,

        "aprendizaje",

        "Aprendió la habilidad "+
        habilidad,

        "media"

    );







    guardarArchivoHabilidades();




    return datos.habilidades[habilidad];


}








// =================================
// GUARDAR
// =================================

function guardarArchivoHabilidades(){



    const datos =
    cargarArchivo("../datos/habilidades.json");



    guardarArchivo(

        "../datos/habilidades.json",

        datos

    );


}








// =================================
// LISTAR HABILIDADES
// =================================

function listarHabilidades(){


    const datos =
    cargarArchivo("../datos/habilidades.json");



    if(!datos){

        return [];

    }



    return datos.habilidades;


}








module.exports={


    obtenerHabilidades,

    crearHabilidades,

    aumentarHabilidad,

    tieneHabilidad,

    aprenderHabilidad,

    listarHabilidades


};
