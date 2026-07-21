// Sistema avanzado de profesiones - Village Soul

const cargarArchivo = require("./cargador_datos.js");
const crearEvento = require("./eventos.js");
const crearMemoria = require("./memorias.js");



function buscarProfesion(nombreProfesion) {

    const catalogo =
        cargarArchivo("../datos/profesiones.json");


    if (!catalogo) {

        return null;

    }


    return catalogo.profesiones.find(

        p => p.nombre === nombreProfesion.toLowerCase()

    );

}




function asignarProfesion(habitante_id, nombreProfesion) {


    const almas =
        cargarArchivo("../datos/almas.json");


    const profesionExiste =
        buscarProfesion(nombreProfesion);



    if (!almas || !profesionExiste) {

        console.log("No se pudieron cargar los datos.");

        return null;

    }



    const habitante =
        almas.almas.find(

            a => a.id === habitante_id

        );



    if (!habitante) {

        console.log("Habitante no encontrado.");

        return null;

    }



    habitante.profesion = {


        nombre:
            profesionExiste.nombre,


        categoria:
            profesionExiste.categoria || "general",


        lugar_trabajo:
            profesionExiste.lugar_trabajo || null,


        edificio_requerido:
            profesionExiste.edificio_requerido || null,


        habilidades:
            profesionExiste.habilidades_requeridas || [],


        tareas:
            profesionExiste.tareas || [],


        interacciones:
            profesionExiste.interacciones || [],


        nivel: 1,


        experiencia: 0,


        estado: "activa"



    };




    crearEvento(

        "nueva_profesion",

        [habitante_id],

        {
            profesion:
                profesionExiste.nombre
        }

    );




    crearMemoria(

        habitante_id,

        "profesion",

        "Comenzó a trabajar como " +
        profesionExiste.nombre,

        "media",

        [],

        "motivacion"

    );



    console.log("Profesión asignada:");

    console.log(habitante.profesion);



    return habitante.profesion;


}





function cambiarProfesion(habitante_id, nuevaProfesion) {


    const nueva =
        buscarProfesion(nuevaProfesion);



    const almas =
        cargarArchivo("../datos/almas.json");



    if (!almas || !nueva) {

        return null;

    }



    const habitante =
        almas.almas.find(

            a => a.id === habitante_id

        );



    if (!habitante) {

        return null;

    }



    habitante.profesion = {


        nombre:
            nueva.nombre,


        categoria:
            nueva.categoria || "general",


        lugar_trabajo:
            nueva.lugar_trabajo || null,


        habilidades:
            nueva.habilidades_requeridas || [],


        tareas:
            nueva.tareas || [],


        nivel: 1,


        experiencia: 0,


        estado: "activa"


    };



    crearMemoria(

        habitante_id,

        "profesion",

        "Cambió de profesión a " +
        nueva.nombre,

        "media",

        [],

        "motivacion"

    );



    return habitante.profesion;


}





function obtenerProfesion(habitante_id) {


    const almas =
        cargarArchivo("../datos/almas.json");



    if (!almas) {

        return null;

    }



    const habitante =
        almas.almas.find(

            a => a.id === habitante_id

        );



    return habitante?.profesion || null;


}





function obtenerTodasLasProfesiones() {


    const catalogo =
        cargarArchivo("../datos/profesiones.json");



    return catalogo?.profesiones || [];


}





module.exports = {


    asignarProfesion,

    cambiarProfesion,

    obtenerProfesion,

    obtenerTodasLasProfesiones


};
