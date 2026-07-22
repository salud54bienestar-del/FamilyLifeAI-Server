// Sistema avanzado de decisiones - Village Soul


const crearMemoria =
require("./memorias.js");


const crearEvento =
require("./eventos.js");




// =================================
// PROCESAR DECISIÓN
// =================================


function procesarDecision(
    habitante_id,
    contexto={}
){



    const decision =

    analizarContexto(
        contexto
    );



    if(!decision){

        return null;

    }





    guardarDecision(

        habitante_id,

        decision

    );





    return {


        habitante_id,


        accion:
        decision.accion,



        motivo:
        decision.motivo,



        prioridad:
        decision.prioridad,



        destino:
        decision.destino || null


    };


}









// =================================
// ANALIZAR CONTEXTO
// =================================


function analizarContexto(
    contexto
){



    let opciones=[];





    // ============================
    // INTENCIÓN DEL ALMA
    // ============================


    if(contexto.intencion){


        opciones.push({


            accion:
            contexto.intencion.accion,


            motivo:
            contexto.intencion.motivo,


            prioridad:
            contexto.intencion.urgencia || 50


        });


    }







    // ============================
    // NECESIDADES
    // ============================


    if(contexto.necesidades){



        const n =
        contexto.necesidades;



        if(n.hambre <30){


            opciones.push({

                accion:"buscar_comida",

                motivo:"Tiene hambre",

                prioridad:100


            });


        }





        if(n.energia <25){


            opciones.push({

                accion:"dormir",

                motivo:"Necesita descansar",

                destino:"hogar",

                prioridad:100


            });


        }





        if(n.social <30){


            opciones.push({

                accion:"socializar",

                motivo:"Necesita compañía",

                prioridad:60


            });


        }



    }









    // ============================
    // PROFESIÓN
    // ============================


    if(contexto.profesion &&
       contexto.profesion !== "ninguna"){



        opciones.push({


            accion:

            obtenerAccionProfesion(

                contexto.profesion

            ),



            motivo:

            "Debe cumplir su trabajo",



            destino:"trabajo",



            prioridad:70


        });


    }









    // ============================
    // EMOCIONES
    // ============================


    switch(
        contexto.emocion
    ){



        case "tristeza":


            opciones.push({

                accion:"buscar_apoyo",

                motivo:"Busca apoyo emocional",

                prioridad:70

            });


        break;






        case "miedo":


            opciones.push({

                accion:"buscar_refugio",

                motivo:"Busca seguridad",

                prioridad:100

            });


        break;






        case "felicidad":


            opciones.push({

                accion:"compartir_momento",

                motivo:"Quiere compartir",

                prioridad:40

            });


        break;



    }









    // ============================
    // PERSONALIDAD
    // ============================


    switch(
        contexto.personalidad
    ){



        case "curioso":


            opciones.push({

                accion:"explorar",

                motivo:"Desea descubrir",

                prioridad:50

            });


        break;





        case "protector":


            opciones.push({

                accion:"proteger_comunidad",

                motivo:"Desea proteger",

                prioridad:70

            });


        break;





        case "amable":


            opciones.push({

                accion:"ayudar",

                motivo:"Quiere ayudar",

                prioridad:50

            });


        break;



    }









    // ============================
    // FAMILIA
    // ============================


    if(contexto.hijos > 0){


        opciones.push({

            accion:"cuidar_hijos",

            motivo:"Cuidado familiar",

            prioridad:90


        });


    }









    // ============================
    // SIN ACCIÓN
    // ============================


    if(opciones.length===0){


        return {


            accion:"descansar",


            motivo:"No hay necesidades urgentes",


            prioridad:10


        };


    }








    opciones.sort(

        (a,b)=>

        b.prioridad-a.prioridad

    );






    return opciones[0];


}









// =================================
// PROFESIONES
// =================================


function obtenerAccionProfesion(
    profesion
){


    const trabajos={


        agricultor:
        "trabajar_campo",


        herrero:
        "forjar_objetos",


        cocinero:
        "preparar_comida",


        medico:
        "atender_pacientes",


        maestro:
        "enseñar",


        guardia:
        "patrullar"


    };



    return trabajos[profesion]
    ||
    "trabajar";


}









// =================================
// GUARDAR DECISIÓN
// =================================


function guardarDecision(
    habitante_id,
    decision
){



    crearMemoria(

        habitante_id,

        "decision",

        "Decidió: "

        +

        decision.accion

        +

        " porque "

        +

        decision.motivo,

        "media"

    );






    crearEvento(

        "decision_habitante",

        [

            habitante_id

        ],

        decision

    );



}








module.exports={


    procesarDecision,


    analizarContexto


};
