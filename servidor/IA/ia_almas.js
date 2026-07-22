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





function pensarAlma(habitante_id){



    const almas =
    cargarArchivo("../datos/almas.json");


    const emociones =
    cargarArchivo("../datos/emociones.json");


    const habilidades =
    cargarArchivo("../datos/habilidades.json");


    const necesidades =
    cargarArchivo("../datos/necesidades.json");


    const personalidades =
    cargarArchivo("../datos/personalidades.json");


    const relaciones =
    cargarArchivo("../datos/relaciones.json");


    const familias =
    cargarArchivo("../datos/familias.json");





    if(!almas){

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
    // DATOS INTERNOS
    // =============================



    const emocion =

    emociones?.emociones.find(

        e=>e.habitante_id===habitante_id

    );





    const necesidad =

    necesidades?.necesidades.find(

        n=>n.habitante_id===habitante_id

    );





    const personalidad =

    personalidades?.personalidades.find(

        p=>p.id===alma.personalidad_id

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






    // =============================
    // ANALIZAR ESTADO
    // =============================



    let prioridad =
    "vida_normal";




    if(
        necesidad &&
        necesidad.hambre < 30
    ){

        prioridad =
        "buscar_comida";

    }



    else if(

        emocion &&
        emocion.estado_actual==="tristeza"

    ){

        prioridad =
        "buscar_apoyo";

    }




    else if(
        familia &&
        familia.hijos.length>0
    ){

        prioridad =
        "cuidar_familia";

    }






    // =============================
    // CONTEXTO IA
    // =============================



    const contexto = {


        emocion:

        emocion?.estado_actual
        ||
        "neutral",



        personalidad:

        personalidad?.nombre
        ||
        "normal",




        rasgos:

        personalidad?.rasgos
        ||
        [],




        prioridad,



        familia:

        !!familia,



        hijos:

        familia?.hijos.length || 0,



        profesion:

        alma.profesion?.nombre
        ||
        "ninguna",



        habilidades:

        habilidades?.habilidades.filter(

            h=>h.habitante_id===habitante_id

        )
        ||
        [],




        recuerdos_importantes:

        memoria.filter(

            m=>m.importancia==="alta"

        )



    };







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



        prioridad,



        contexto,



        decision



    };



}







module.exports={


    pensarAlma


};
