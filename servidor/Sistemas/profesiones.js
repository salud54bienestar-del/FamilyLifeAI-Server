// Sistema avanzado de profesiones - Village Soul


const cargarArchivo =
require("./cargador_datos.js");


const guardarArchivo =
require("./guardador_datos.js");


const crearEvento =
require("./eventos.js");


const crearMemoria =
require("./memorias.js");


const {
    obtenerEtapaHabitante
}
=
require("./etapas_vida.js");







// =================================
// BUSCAR PROFESIÓN
// =================================

function buscarProfesion(nombre){


    const datos =
    cargarArchivo("../datos/profesiones.json");


    if(!datos){

        return null;

    }



    return datos.profesiones.find(

        p=>
        p.nombre ===
        nombre.toLowerCase()

    ) || null;


}








// =================================
// VERIFICAR EDAD LABORAL
// =================================

function puedeTrabajar(
    habitante,
    profesion
){


    const etapa =
    obtenerEtapaHabitante(
        habitante
    );



    if(!etapa){

        return false;

    }



    if(
        etapa.nombre==="bebe" ||
        etapa.nombre==="niño"
    ){

        return false;

    }



    if(
        etapa.nombre==="adolescente"
    ){

        return profesion.tipo==="ligero";

    }



    return true;


}









// =================================
// ASIGNAR PROFESIÓN
// =================================

function asignarProfesion(
    habitante_id,
    nombre
){


    const almas =
    cargarArchivo("../datos/almas.json");


    const profesion =
    buscarProfesion(nombre);



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





    if(
        !puedeTrabajar(
            habitante,
            profesion
        )
    ){

        return null;

    }







    habitante.profesion = {


        nombre:
        profesion.nombre,


        categoria:
        profesion.categoria || "general",


        lugar_trabajo:
        profesion.lugar_trabajo || null,


        tareas:
        profesion.tareas || [],


        habilidades:
        profesion.habilidades_requeridas || [],


        horario:
        profesion.horario || {


            inicio:6,

            fin:18

        },


        nivel:1,


        experiencia:0,


        estado:"activa"


    };







    guardarArchivo(

        "../datos/almas.json",

        almas

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

        "Comenzó a trabajar como "+
        profesion.nombre,

        "media"

    );





    return habitante.profesion;


}









// =================================
// TRABAJAR
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





    const trabajo =
    habitante.profesion;




    const inicio =
    trabajo.horario.inicio;


    const fin =
    trabajo.horario.fin;




    if(
        hora < inicio ||
        hora >= fin
    ){

        trabajo.estado="descansando";

        return false;

    }





    trabajo.estado="trabajando";


    trabajo.experiencia++;





    if(
        trabajo.experiencia>=100
    ){

        subirNivel(
            habitante_id
        );

    }






    guardarArchivo(

        "../datos/almas.json",

        almas

    );






    crearMemoria(

        habitante_id,

        "trabajo",

        "Trabajó como "+
        trabajo.nombre,

        "baja"

    );





    return trabajo;


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

            nivel:
            profesion.nivel

        }

    );



    return profesion;


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









module.exports={


    buscarProfesion,

    asignarProfesion,

    trabajarHabitante,

    obtenerProfesion,

    subirNivel


};
