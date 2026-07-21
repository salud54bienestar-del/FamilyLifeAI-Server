// Sistema avanzado de profesiones - Village Soul

const cargarArchivo = require("./cargador_datos.js");
const crearEvento = require("./eventos.js");
const crearMemoria = require("./memorias.js");




// =================================
// BUSCAR PROFESIÓN
// =================================

function buscarProfesion(nombreProfesion) {


    const catalogo =
    cargarArchivo("../datos/profesiones.json");


    if(!catalogo){

        return null;

    }



    return catalogo.profesiones.find(

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



    if(!almas || !profesion){

        console.log(
            "No se pudieron cargar los datos."
        );

        return null;

    }





    const habitante =
    almas.almas.find(

        a=>a.id===habitante_id

    );



    if(!habitante){

        console.log(
            "Habitante no encontrado."
        );

        return null;

    }





    habitante.profesion = {


        nombre:
        profesion.nombre,


        categoria:
        profesion.categoria ||
        "general",



        lugar_trabajo:
        profesion.lugar_trabajo ||
        null,



        edificio_requerido:
        profesion.edificio_requerido ||
        null,



        habilidades:
        profesion.habilidades_requeridas ||
        [],



        tareas:
        profesion.tareas ||
        [],



        interacciones:
        profesion.interacciones ||
        [],



        nivel:
        1,



        experiencia:
        0,



        estado:
        "activa"


    };






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

        "Comenzó a trabajar como " +
        profesion.nombre,

        "media",

        [],

        "motivacion"

    );





    return habitante.profesion;


}







// =================================
// CAMBIAR PROFESIÓN
// =================================

function cambiarProfesion(
    habitante_id,
    nuevaProfesion
){


    const profesion =
    buscarProfesion(nuevaProfesion);



    const almas =
    cargarArchivo("../datos/almas.json");



    if(!almas || !profesion){

        return null;

    }



    const habitante =
    almas.almas.find(

        a=>a.id===habitante_id

    );



    if(!habitante){

        return null;

    }





    habitante.profesion = {


        nombre:
        profesion.nombre,


        categoria:
        profesion.categoria ||
        "general",



        lugar_trabajo:
        profesion.lugar_trabajo ||
        null,



        habilidades:
        profesion.habilidades_requeridas ||
        [],



        tareas:
        profesion.tareas ||
        [],



        interacciones:
        profesion.interacciones ||
        [],



        nivel:
        1,



        experiencia:
        0,



        estado:
        "activa"


    };







    crearMemoria(

        habitante_id,

        "profesion",

        "Cambió de profesión a " +
        profesion.nombre,
