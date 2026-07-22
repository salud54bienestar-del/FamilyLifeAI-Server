// Sistema avanzado de etapas de vida - Village Soul


const cargarArchivo =
require("./cargador_datos.js");


const crearMemoria =
require("./memorias.js");


const crearEvento =
require("./eventos.js");





// =================================
// OBTENER ETAPA POR EDAD
// =================================

function obtenerEtapaPorEdad(
    edad
){


    const datos =
    cargarArchivo(
        "../datos/etapas_vida.json"
    );



    if(
        datos &&
        datos.etapas
    ){


        return datos.etapas.find(

            etapa =>

            edad >= etapa.edad_minima &&

            edad <= etapa.edad_maxima

        ) || obtenerEtapaPredeterminada(edad);


    }



    return obtenerEtapaPredeterminada(edad);


}







// =================================
// ETAPAS POR DEFECTO
// =================================

function obtenerEtapaPredeterminada(
edad
){


    if(edad <= 2){

        return {

            nombre:"bebe",

            edad_minima:0,

            edad_maxima:2,

            puede:[

                "dormir",

                "jugar"

            ]

        };

    }




    if(edad <= 12){

        return {

            nombre:"niño",

            edad_minima:3,

            edad_maxima:12,

            puede:[

                "jugar",

                "aprender",

                "explorar"

            ]

        };

    }





    if(edad <= 17){

        return {

            nombre:"adolescente",

            edad_minima:13,

            edad_maxima:17,

            puede:[

                "aprender",

                "entrenar",

                "trabajar_parcial"

            ]

        };

    }







    if(edad <= 59){

        return {

            nombre:"adulto",

            edad_minima:18,

            edad_maxima:59,

            puede:[

                "trabajar",

                "formar_familia",

                "crear_hogar"

            ]

        };

    }






    return {

        nombre:"adulto_mayor",

        edad_minima:60,

        edad_maxima:999,

        puede:[

            "aconsejar",

            "enseñar",

            "cuidar_familia"

        ]

    };


}









// =================================
// OBTENER ETAPA HABITANTE
// =================================

function obtenerEtapaHabitante(
    habitante
){


    if(!habitante){

        return null;

    }



    return obtenerEtapaPorEdad(

        habitante.edad || 0

    );


}









// =================================
// ACTUALIZAR ETAPA
// =================================

function actualizarEtapa(
    habitante
){


    if(!habitante){

        return null;

    }




    const etapaNueva =

    obtenerEtapaHabitante(
        habitante
    );



    if(!etapaNueva){

        return habitante;

    }





    const anterior =

    habitante.etapa_vida || null;






    habitante.etapa_vida =

    etapaNueva.nombre;







    if(
        anterior !== etapaNueva.nombre
    ){



        crearEvento(

            "cambio_etapa_vida",

            [
                habitante.id
            ],

            {

                anterior,

                nueva:
                etapaNueva.nombre

            }

        );







        crearMemoria(

            habitante.id,

            "etapa_vida",

            "Cambió a la etapa de "+
            etapaNueva.nombre,

            "alta"

        );






        // Desbloqueo de adultez

        if(
            etapaNueva.nombre==="adulto"
        ){


            crearEvento(

                "mayoria_edad",

                [
                    habitante.id
                ],

                {

                    edad:
                    habitante.edad

                }

            );



        }




    }





    return habitante;


}









// =================================
// AUMENTAR EDAD
// =================================

function cumplirAño(
    habitante
){


    if(!habitante){

        return null;

    }



    habitante.edad =
    (habitante.edad || 0) + 1;




    actualizarEtapa(
        habitante
    );




    return habitante;


}









// =================================
// ACCIONES DISPONIBLES
// =================================

function obtenerAccionesEtapa(
    habitante
){



    const etapa =

    obtenerEtapaHabitante(
        habitante
    );



    if(!etapa){

        return [];

    }



    return etapa.puede || [];


}









// =================================
// VERIFICAR ACCIÓN
// =================================

function puedeRealizarAccion(
    habitante,
    accion
){


    return obtenerAccionesEtapa(
        habitante
    )
    .includes(
        accion
    );


}









// =================================
// VERIFICAR ADULTO
// =================================

function esAdulto(
    habitante
){


    const etapa =

    obtenerEtapaHabitante(
        habitante
    );



    return (

        etapa &&

        (

            etapa.nombre==="adulto"

            ||

            etapa.nombre==="adulto_mayor"

        )

    );


}









module.exports={


    obtenerEtapaPorEdad,

    obtenerEtapaHabitante,

    actualizarEtapa,

    cumplirAño,

    obtenerAccionesEtapa,

    puedeRealizarAccion,

    esAdulto


};
