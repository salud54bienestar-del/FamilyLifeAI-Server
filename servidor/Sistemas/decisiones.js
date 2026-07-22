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


        decision:decision.accion,


        motivo:decision.motivo,


        destino:decision.destino || null



    };


}









// =================================
// ANALIZAR CONTEXTO
// =================================

function analizarContexto(
contexto
){


    let opciones=[];







// ===============================
// NECESIDADES
// ===============================


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









// ===============================
// RUTINA
// ===============================


if(contexto.rutina){


    switch(
        contexto.rutina.actividad_actual
    ){



        case "trabajar":


            opciones.push({

                accion:"ir_al_trabajo",

                motivo:"Horario laboral",

                destino:"trabajo",

                prioridad:90

            });


        break;



        case "familia":


            opciones.push({

                accion:"visitar_familia",

                motivo:"Tiempo familiar",

                prioridad:70

            });


        break;



        case "dormir":


            opciones.push({

                accion:"ir_a_casa",

                motivo:"Hora de dormir",

                destino:"hogar",

                prioridad:90

            });


        break;



    }


}









// ===============================
// PROFESIÓN
// ===============================


if(contexto.profesion){


    opciones.push({

        accion:
        obtenerAccionProfesion(
            contexto.profesion
        ),


        motivo:
        "Responsabilidad laboral",


        destino:"trabajo",


        prioridad:70


    });


}









// ===============================
// EMOCIONES
// ===============================


if(contexto.emocion){



switch(contexto.emocion){



case "tristeza":


opciones.push({

    accion:"buscar_apoyo",

    motivo:"Busca compañía",

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

    motivo:"Quiere socializar",

    prioridad:40

});


break;



}



}









// ===============================
// PERSONALIDAD
// ===============================


if(contexto.personalidad){



switch(contexto.personalidad){



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

motivo:"Protege a otros",

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


}









// ===============================
// FAMILIA
// ===============================


if(contexto.hijos){


opciones.push({

accion:"cuidar_hijos",

motivo:"Responsabilidad familiar",

prioridad:90

});


}











// SI NO TIENE NADA QUE HACER


if(opciones.length===0){


return {


accion:"descansar",

motivo:"No tiene necesidades urgentes",

prioridad:10


};


}








// ORDENAR


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



return trabajos[profesion] || "trabajar";


}









// =================================
// GUARDAR
// =================================


function guardarDecision(
habitante_id,
decision
){


crearMemoria(

habitante_id,

"decision",

"Decidió: "+decision.accion+
" porque "+decision.motivo,

"media"

);



crearEvento(

"decision_habitante",

[habitante_id],

decision

);



}








module.exports={


procesarDecision,

analizarContexto


};
