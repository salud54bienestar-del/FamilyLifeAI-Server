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

function obtenerEtapaPorEdad(edad){


    const datos =
    cargarArchivo(
        "../datos/etapas.json"
    );



    if(
        datos &&
        datos.etapas
    ){


        const encontrada =
        datos.etapas.find(

            etapa =>

            edad >= etapa.edad_minima &&

            edad <= etapa.edad_maxima

        );



        if(encontrada){

            return encontrada;

        }


    }




    return obtenerEtapaPredeterminada(
        edad
    );


}








// =================================
// ETAPAS PREDETERMINADAS
// =================================

function obtenerEtapaPredeterminada(edad){



    if(edad <= 2){

        return {

            nombre:"bebe",

            puede:[

                "dormir",

                "jugar"

            ]

        };

    }



    if(edad <=12){

        return {

            nombre:"niño",

            puede:[

                "jugar",

                "aprender",

                "explorar"

            ]

        };

    }




    if(edad <=17){

        return {

            nombre:"adolescente",

            puede:[

                "aprender",

                "entrenar",

                "trabajar_parcial"

            ]

        };

    }





    if(edad <=59){

        return {

            nombre:"adulto",

            puede:[

                "trabajar",

                "formar_familia",

                "crear_hogar"

            ]

        };

    }




    return {

        nombre:"adulto_mayor",

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




    // Si recibe ID

    if(typeof habitante === "number"){


        const almas =
        cargarArchivo(
            "../datos/almas.json"
        );



        habitante =
        almas?.almas.find(

            a=>a.id===habitante

        );



        if(!habitante){

            return null;

        }

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




    const nueva =

    obtenerEtapaHabitante(
        habitante
    );



    if(!nueva){

        return habitante;

    }



    const anterior =

    habitante.etapa_vida || null;





    habitante.etapa_vida =
    nueva.nombre;






    if(
        anterior !== nueva.nombre
    ){



        crearEvento(

            "cambio_etapa_vida",

            [

                habitante.id

            ],

            {

                anterior,

                nueva:nueva.nombre,

                edad:habitante.edad

            }

        );






        crearMemoria(

            habitante.id,

            "etapa_vida",

            "Ahora pertenece a la etapa "+

            nueva.nombre,

            "alta"

        );




    }





    return habitante;


}









// =================================
// CUMPLIR AÑO
// =================================

function cumplirAño(
habitante
){



    if(!habitante){

        return null;

    }



    habitante.edad =
    (habitante.edad || 0)+1;




    actualizarEtapa(
        habitante
    );



    return habitante;


}









// =================================
// ACCIONES
// =================================

function obtenerAccionesEtapa(
habitante
){



    const etapa =

    obtenerEtapaHabitante(
        habitante
    );



    return etapa?.puede || [];



}








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
