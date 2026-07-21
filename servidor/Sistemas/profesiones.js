// Sistema avanzado de profesiones - Village Soul


const cargarArchivo =
require("./cargador_datos.js");


const crearEvento =
require("./eventos.js");


const crearMemoria =
require("./memorias.js");





// =================================
// BUSCAR PROFESIÓN
// =================================

function buscarProfesion(nombreProfesion){


    const datos =
    cargarArchivo("../datos/profesiones.json");



    if(!datos){

        return null;

    }



    return datos.profesiones.find(

        p =>
        p.nombre === nombreProfesion.toLowerCase()

    );


}








// =================================
// ASIGNAR PROFESIÓN
// =================================

function asignarProfesion(
    habitante_id,
    nombreProfesion
){


    const almas =
    cargarArchivo("../datos/almas.json");


    const profesion =
    buscarProfesion(nombreProfesion);



    if(
        !almas ||
        !profesion
    ){

        return null;

    }





    const habitante =
    almas.almas.find(

        a=>a.id===habitante_id

    );



    if(!habitante){

        return null;

    }





    habitante.profesion = crearDatosProfesion(
        profesion
    );





    crearEvento(

        "nueva_profesion",

        [
            habitante_id
        ],

        {
            profesion:
            profesion.nombre
        }

    );





    crearMemoria(

        habitante_id,

        "profesion",

        "Comenzó como " +
        profesion.nombre,

        "media"

    );



    return habitante.profesion;


}








// =================================
// CREAR DATOS PROFESIÓN
// =================================

function crearDatosProfesion(profesion){


    return {


        nombre:
        profesion.nombre,


        categoria:
        profesion.categoria || "general",



        lugar_trabajo:
        profesion.lugar_trabajo || null,



        edificio_requerido:
        profesion.edificio_requerido || null,



        habilidades:
        profesion.habilidades_requeridas || [],



        tareas:
        profesion.tareas || [],



        interacciones:
        profesion.interacciones || [],



        nivel:1,


        experiencia:0,


        estado:"activa"



    };


}








// =================================
// CAMBIAR PROFESIÓN
// =================================

function cambiarProfesion(
    habitante_id,
    nuevaProfesion
){


    return asignarProfesion(

        habitante_id,

        nuevaProfesion

    );


}








// =================================
// OBTENER PROFESIÓN
// =================================

function obtenerProfesion(
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



    return habitante?.profesion || null;


}








// =================================
// TRABAJAR HABITANTE
// =================================

function trabajarHabitante(
    habitante_id,
    hora
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



    if(
        !habitante ||
        !habitante.profesion
    ){

        return null;

    }





    const profesion =
    habitante.profesion;





    // Horario por defecto

    const inicio = 6;

    const fin = 18;





    if(
        hora < inicio ||
        hora >= fin
    ){

        return false;

    }







    profesion.experiencia += 1;







    crearMemoria(

        habitante_id,

        "trabajo",

        "Trabajó como " +
        profesion.nombre,

        "baja"

    );








    if(
        profesion.experiencia >= 100
    ){

        subirNivel(
            habitante_id
        );

    }





    return profesion;


}








// =================================
// SUBIR NIVEL
// =================================

function subirNivel(
    habitante_id
){


    const profesion =
    obtenerProfesion(
        habitante_id
    );



    if(!profesion){

        return null;

    }




    profesion.nivel++;

    profesion.experiencia=0;





    crearEvento(

        "subida_nivel_profesion",

        [
            habitante_id
        ],

        {

            profesion:
            profesion.nombre,

            nivel:
            profesion.nivel

        }

    );





    return profesion;


}








module.exports = {


    buscarProfesion,

    asignarProfesion,

    cambiarProfesion,

    obtenerProfesion,

    trabajarHabitante,

    subirNivel


};
