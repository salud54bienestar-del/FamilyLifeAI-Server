// Inteligencia artificial avanzada de almas - Village Soul


const cargarArchivo =
require("../sistemas/cargador_datos.js");



const {
    procesarDecision
}
=
require("../sistemas/decisiones.js");



const {
    obtenerMemorias
}
=
require("../sistemas/memorias.js");








// =================================
// PENSAMIENTO DEL ALMA
// =================================


function pensarAlma(
    habitante_id
){



    const almas =
    cargarArchivo("../datos/almas.json");



    if(!almas || !almas.almas){

        console.log(
            "No existen almas cargadas."
        );

        return null;

    }







    const alma =

    almas.almas.find(

        a=>a.id===habitante_id

    );





    if(!alma){

        return null;

    }








    // =============================
    // CARGAR SISTEMAS INTERNOS
    // =============================



    const emociones =

    cargarArchivo("../datos/emociones.json");



    const necesidades =

    cargarArchivo("../datos/necesidades.json");



    const personalidades =

    cargarArchivo("../datos/personalidades.json");



    const relaciones =

    cargarArchivo("../datos/relaciones.json");



    const familias =

    cargarArchivo("../datos/familias.json");



    const habilidades =

    cargarArchivo("../datos/habilidades.json");







    // =============================
    // OBTENER INFORMACIÓN
    // =============================



    const emocion =

    emociones?.emociones.find(

        e=>

        e.habitante_id===habitante_id

    );





    const necesidad =

    necesidades?.necesidades.find(

        n=>

        n.habitante_id===habitante_id

    );






    const personalidad =

    personalidades?.personalidades.find(

        p=>

        p.id===alma.personalidad_id

    );







    const memoria =

    obtenerMemorias(

        habitante_id

    );







    const familia =

    familias?.familias.find(

        f=>

        f.miembros.includes(

            habitante_id

        )

    );







    const relacionesHabitante =

    relaciones?.relaciones.filter(

        r=>

        r.habitante_a===habitante_id

        ||

        r.habitante_b===habitante_id

    )

    ||

    [];








    const habilidadesHabitante =

    habilidades?.habilidades.filter(

        h=>

        h.habitante_id===habitante_id

    )

    ||

    [];









    // =============================
    // ANALIZAR PRIORIDAD
    // =============================



    let intencion = {

        accion:"vida_normal",

        motivo:"sin problemas",

        urgencia:20

    };







    if(

        necesidad &&

        necesidad.hambre < 30

    ){


        intencion={


            accion:"buscar_comida",

            motivo:"hambre baja",

            urgencia:90


        };


    }






    else if(

        necesidad &&

        necesidad.energia < 30

    ){



        intencion={


            accion:"descansar",

            motivo:"falta de energía",

            urgencia:80


        };


    }







    else if(

        emocion &&

        emocion.emocion_actual==="tristeza"

    ){



        intencion={


            accion:"buscar_apoyo",

            motivo:"tristeza emocional",

            urgencia:70


        };


    }








    else if(

        familia &&

        familia.hijos &&

        familia.hijos.length>0

    ){



        intencion={


            accion:"cuidar_familia",

            motivo:"protección familiar",

            urgencia:60


        };


    }








    // =============================
    // CREAR CONTEXTO
    // =============================



    const contexto={



        emocion:

        emocion?.emocion_actual

        ||

        "neutral",





        personalidad:

        personalidad?.nombre

        ||

        alma.temperamento

        ||

        "neutral",





        rasgos:

        personalidad?.rasgos

        ||

        alma.rasgos_iniciales

        ||

        [],





        necesidades:

        necesidad

        ||

        {},





        intencion,







        familia:


        !!familia,




        hijos:

        familia?.hijos?.length

        ||

        0,






        profesion:


        alma.profesion?.nombre

        ||

        "ninguna",






        habilidades:

        habilidadesHabitante,






        relaciones:

        relacionesHabitante,







        recuerdos_importantes:

        memoria.filter(

            m=>

            m.importancia==="alta"

        )



    };









    // =============================
    // TOMAR DECISIÓN
    // =============================



    const decision =

    procesarDecision(

        habitante_id,

        contexto

    );








    return {


        habitante_id,


        nombre:

        alma.nombre,



        estado:

        "pensando",




        intencion,





        contexto,





        decision



    };



}










module.exports={


    pensarAlma


};
