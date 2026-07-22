// Sistema avanzado de decisiones - Village Soul


const cargarArchivo =
require("./cargador_datos.js");


const crearMemoria =
require("./memorias.js");


const crearEvento =
require("./eventos.js");








// ==================================
// PROCESAR DECISIÓN
// ==================================

function procesarDecision(
    habitante_id,
    contexto={}
){



    const decision =
    analizarContexto(
        habitante_id,
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


        decision,


        contexto



    };


}









// ==================================
// ANALIZAR CONTEXTO
// ==================================

function analizarContexto(
habitante_id,
contexto
){



    const opciones=[];






    // ==============================
    // NECESIDADES
    // ==============================


    if(contexto.necesidades){



        if(
            contexto.necesidades.hambre < 30
        ){

            opciones.push({

                accion:"buscar_comida",

                prioridad:100

            });

        }





        if(
            contexto.necesidades.energia < 30
        ){

            opciones.push({

                accion:"dormir",

                prioridad:100

            });

        }






        if(
            contexto.necesidades.social < 30
        ){

            opciones.push({

                accion:"buscar_compañia",

                prioridad:60

            });

        }






        if(
            contexto.necesidades.seguridad <30
        ){

            opciones.push({

                accion:"buscar_refugio",

                prioridad:100

            });

        }


    }









    // ==============================
    // EMOCIONES
    // ==============================


    if(contexto.emocion){



        switch(contexto.emocion){



            case "tristeza":


                opciones.push({

                    accion:"buscar_apoyo",

                    prioridad:70

                });


            break;





            case "miedo":


                opciones.push({

                    accion:"protegerse",

                    prioridad:90

                });


            break;





            case "ira":


                opciones.push({

                    accion:"calmarse",

                    prioridad:70

                });


            break;





            case "feliz":


                opciones.push({

                    accion:"compartir_momento",

                    prioridad:40

                });


            break;



        }


    }









    // ==============================
    // OBJETIVOS
    // ==============================


    if(contexto.objetivo){



        opciones.push({


            accion:

            contexto.objetivo.accion

            ||

            "trabajar_objetivo",



            prioridad:80



        });


    }








    // ==============================
    // PERSONALIDAD
    // ==============================


    if(contexto.personalidad){



        const personalidad =

        typeof contexto.personalidad === "object"

        ?

        contexto.personalidad.nombre

        :

        contexto.personalidad;







        switch(personalidad){



            case "amable":


                opciones.push({

                    accion:"ayudar_habitante",

                    prioridad:50

                });


            break;





            case "curioso":


                opciones.push({

                    accion:"explorar",

                    prioridad:50

                });


            break;





            case "protector":


                opciones.push({

                    accion:"proteger_comunidad",

                    prioridad:70

                });


            break;





            case "aventurero":


                opciones.push({

                    accion:"viajar",

                    prioridad:50

                });


            break;



        }



    }









    // ==============================
    // FAMILIA
    // ==============================


    if(
        contexto.tiene_familia
    ){


        opciones.push({

            accion:"visitar_familia",

            prioridad:40

        });


    }






    if(
        contexto.tiene_hijos
    ){


        opciones.push({

            accion:"cuidar_hijos",

            prioridad:90

        });


    }









    // ==============================
    // PROFESIÓN
    // ==============================


    if(
        contexto.profesion
    ){


        opciones.push({

            accion:
            obtenerAccionProfesion(
                contexto.profesion
            ),

            prioridad:60

        });


    }







    if(
        opciones.length===0
    ){

        return "descansar";

    }







    opciones.sort(

        (a,b)=>

        b.prioridad-a.prioridad

    );






    return opciones[0].accion;


}









// ==================================
// ACCIONES DE PROFESIÓN
// ==================================

function obtenerAccionProfesion(
profesion
){



    const acciones={


        agricultor:
        "trabajar_campo",


        herrero:
        "forjar_objetos",


        cocinero:
        "preparar_comida",


        medico:
        "atender_enfermos",


        maestro:
        "enseñar",


        guardia:
        "patrullar"


    };





    return acciones[profesion]

    ||

    "trabajar";


}









// ==================================
// GUARDAR DECISIÓN
// ==================================

function guardarDecision(
habitante_id,
decision
){



    crearMemoria(

        habitante_id,

        "decision",

        "Decidió realizar: "+decision,

        "media"

    );





    crearEvento(

        "decision_habitante",

        [

            habitante_id

        ],

        {

            decision

        }

    );


}








module.exports={


    procesarDecision,

    analizarContexto


};
