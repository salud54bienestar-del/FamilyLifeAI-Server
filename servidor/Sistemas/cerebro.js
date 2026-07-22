// ==========================================
// CEREBRO PRINCIPAL DE HABITANTES
// Village Soul
// ==========================================


const cargarArchivo =
require("./cargador_datos.js");


const crearMemoria =
require("./memorias.js");


const crearEvento =
require("./eventos.js");


const {
    procesarDecision
}
=
require("./decisiones.js");


const {
    obtenerNecesidades
}
=
require("./necesidades.js");


const {
    obtenerUbicaciones
}
=
require("./ubicaciones.js");


const {
    obtenerRutina
}
=
require("./rutinas.js");


const ejecutarAccion =
require("./acciones.js");






// ==========================================
// PENSAR HABITANTE
// ==========================================


function pensarHabitante(
habitante_id
){


    const almas =
    cargarArchivo("../datos/almas.json");



    if(!almas){

        return null;

    }




    const habitante =
    almas.almas.find(

        a=>a.id===habitante_id

    );




    if(!habitante){

        return null;

    }







    const contexto={



        necesidades:

        obtenerNecesidades(
            habitante_id
        ),




        personalidad:

        habitante.personalidad
        || null,




        profesion:

        habitante.profesion?.nombre
        || habitante.profesion
        || null,




        tiene_familia:

        habitante.familia
        ? true
        : false,




        tiene_hijos:

        habitante.hijos &&
        habitante.hijos.length>0,




        ubicacion:

        obtenerUbicaciones(
            habitante_id
        ),




        rutina:

        obtenerRutina(
            habitante_id
        )



    };









    const decision =

    procesarDecision(

        habitante_id,

        contexto

    );







    crearMemoria(

        habitante_id,

        "pensamiento",

        "Pensó hacer: "+decision,

        "media"

    );







    crearEvento(

        "pensamiento_habitante",

        [

            habitante_id

        ],

        {

            decision

        }

    );








    return {


        habitante_id,


        decision,


        contexto


    };


}









// ==========================================
// EJECUTAR PENSAMIENTO
// ==========================================


function ejecutarPensamiento(
habitante_id
){



    const pensamiento =

    pensarHabitante(

        habitante_id

    );





    if(!pensamiento){

        return null;

    }







    const resultado =

    ejecutarAccion(

        habitante_id,

        pensamiento.decision

    );







    return {


        pensamiento,


        resultado


    };


}









// ==========================================
// PENSAMIENTO DE TODOS
// ==========================================


function pensarTodos(){


    const almas =
    cargarArchivo("../datos/almas.json");



    if(
        !almas ||
        !almas.almas
    ){

        return [];

    }





    return almas.almas.map(

        alma=>

        pensarHabitante(
            alma.id
        )

    );


}









module.exports={


    pensarHabitante,


    ejecutarPensamiento,


    pensarTodos


};
