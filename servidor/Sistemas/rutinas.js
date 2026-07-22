// Sistema avanzado de rutinas de habitantes - Village Soul


const cargarArchivo =
require("./cargador_datos.js");


const guardarArchivo =
require("./guardador_datos.js");


const crearEvento =
require("./eventos.js");


const crearMemoria =
require("./memorias.js");








// =================================
// OBTENER RUTINA
// =================================

function obtenerRutina(
    habitante_id
){


    const datos =
    cargarArchivo("../datos/rutinas.json");


    if(!datos){

        return null;

    }



    return datos.rutinas.find(

        r=>r.habitante_id===habitante_id

    ) || null;


}









// =================================
// CREAR RUTINA
// =================================

function crearRutina(
    habitante_id,
    etapa="adulto"
){



    const datos =
    cargarArchivo("../datos/rutinas.json");



    if(!datos){

        return null;

    }



    const rutina = {


        id:
        datos.rutinas.length + 1,


        habitante_id,



        etapa,



        horario:
        generarHorario(etapa),



        actividad_actual:
        "descansar",



        ultima_actualizacion:
        null



    };





    datos.rutinas.push(
        rutina
    );





    guardarArchivo(

        "../datos/rutinas.json",

        datos

    );





    crearMemoria(

        habitante_id,

        "rutina",

        "Creó una rutina diaria.",

        "baja"

    );





    return rutina;


}









// =================================
// GENERAR HORARIO POR ETAPA
// =================================

function generarHorario(
etapa
){


    switch(etapa){



        case "bebe":


            return [

                {
                    hora:0,
                    accion:"dormir"
                },

                {
                    hora:8,
                    accion:"comer"
                },

                {
                    hora:12,
                    accion:"interactuar_familia"
                }

            ];





        case "niño":


            return [

                {
                    hora:7,
                    accion:"despertar"
                },

                {
                    hora:9,
                    accion:"jugar"
                },

                {
                    hora:13,
                    accion:"aprender"
                },

                {
                    hora:18,
                    accion:"familia"
                },

                {
                    hora:21,
                    accion:"dormir"
                }

            ];







        case "adolescente":


            return [

                {
                    hora:7,
                    accion:"entrenar_habilidad"
                },

                {
                    hora:10,
                    accion:"socializar"
                },

                {
                    hora:14,
                    accion:"aprender"
                },

                {
                    hora:18,
                    accion:"hobby"
                },

                {
                    hora:22,
                    accion:"descansar"
                }

            ];







        case "adulto":


            return [

                {
                    hora:6,
                    accion:"despertar"
                },

                {
                    hora:8,
                    accion:"trabajar"
                },

                {
                    hora:17,
                    accion:"familia"
                },

                {
                    hora:20,
                    accion:"hobby"
                },

                {
                    hora:23,
                    accion:"dormir"
                }

            ];








        case "adulto_mayor":


            return [

                {
                    hora:7,
                    accion:"pasear"
                },

                {
                    hora:10,
                    accion:"enseñar"
                },

                {
                    hora:15,
                    accion:"socializar"
                },

                {
                    hora:21,
                    accion:"descansar"
                }

            ];





        default:


            return [

                {
                    hora:8,
                    accion:"trabajar"
                }

            ];


    }


}









// =================================
// ACTUALIZAR RUTINA
// =================================

function actualizarRutina(
    habitante_id,
    horaActual,
    contexto={}
){



    let rutina =
    obtenerRutina(
        habitante_id
    );



    if(!rutina){

        rutina =
        crearRutina(
            habitante_id,
            contexto.etapa || "adulto"
        );

    }





    const actividad =
    rutina.horario.find(

        a=>a.hora===horaActual

    );





    if(!actividad){

        return rutina;

    }






    rutina.actividad_actual =
    actividad.accion;



    rutina.ultima_actualizacion =
    new Date().toISOString();





    guardarRutina(
        rutina
    );





    crearEvento(

        "actividad_rutina",

        [

            habitante_id

        ],

        {

            actividad:
            actividad.accion

        }

    );





    return rutina;


}









// =================================
// MODIFICAR POR PROFESIÓN
// =================================

function adaptarRutinaProfesion(
rutina,
profesion
){


    if(!rutina || !profesion){

        return rutina;

    }





    if(
        profesion==="agricultor"
    ){

        rutina.horario.push({

            hora:9,

            accion:"trabajar_campo"

        });

    }





    if(
        profesion==="herrero"
    ){

        rutina.horario.push({

            hora:9,

            accion:"forjar"

        });

    }






    if(
        profesion==="maestro"
    ){

        rutina.horario.push({

            hora:9,

            accion:"enseñar"

        });

    }



    return rutina;


}









// =================================
// GUARDAR
// =================================

function guardarRutina(
rutina
){


    const datos =
    cargarArchivo("../datos/rutinas.json");



    if(!datos){

        return null;

    }



    const index =
    datos.rutinas.findIndex(

        r=>r.id===rutina.id

    );



    if(index!==-1){

        datos.rutinas[index]=rutina;

    }





    guardarArchivo(

        "../datos/rutinas.json",

        datos

    );


    return rutina;


}








module.exports={


    obtenerRutina,

    crearRutina,

    actualizarRutina,

    adaptarRutinaProfesion,

    generarHorario


};
