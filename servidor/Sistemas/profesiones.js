// Sistema avanzado de profesiones - Village Soul

const cargarArchivo = require("./cargador_datos.js");
const crearEvento = require("./eventos.js");
const crearMemoria = require("./memorias.js");


// Asignar profesión a un habitante

function asignarProfesion(habitante_id, nombreProfesion) {

    const catalogo = cargarArchivo("../datos/profesiones.json");
    const almas = cargarArchivo("../datos/almas.json");


    if (!catalogo || !almas) {

        console.log("No se pudieron cargar los datos.");

        return null;

    }


    const profesion = catalogo.profesiones.find(

        p => p.nombre === nombreProfesion.toLowerCase()

    );


    if (!profesion) {

        console.log(
            "Profesión no encontrada:",
            nombreProfesion
        );

        return null;

    }


    const habitante = almas.almas.find(

        a => a.id === habitante_id

    );


    if (!habitante) {

        console.log("Habitante no encontrado.");

        return null;

    }



    habitante.profesion = {

        nombre: profesion.nombre,

        categoria:
            profesion.categoria || "general",

        lugar_trabajo:
            profesion.lugar_trabajo || null,

        habilidades:
            profesion.habilidades || [],

        nivel: 1,

        experiencia: 0,

        estado: "activa"

    };



    crearEvento(

        "nueva_profesion",

        [habitante_id],

        {

            profesion: profesion.nombre

        }

    );



    crearMemoria(

        habitante_id,

        "profesion",

        "Comenzó su vida laboral como " +
        profesion.nombre,

        "media",

        [],

        "motivacion"

    );



    console.log(
        "Profesión asignada:",
        habitante.profesion
    );


    return habitante.profesion;

}




// Cambiar profesión

function cambiarProfesion(habitante_id, nuevaProfesion) {


    const catalogo = cargarArchivo("../datos/profesiones.json");
    const almas = cargarArchivo("../datos/almas.json");


    if (!catalogo || !almas) {

        return null;

    }



    const profesion =
        catalogo.profesiones.find(

            p => p.nombre === nuevaProfesion.toLowerCase()

        );



    if (!profesion) {

        console.log("Profesión inexistente.");

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

        nombre: profesion.nombre,

        categoria:
            profesion.categoria || "general",

        lugar_trabajo:
            profesion.lugar_trabajo || null,

        habilidades:
            profesion.habilidades || [],

        nivel: 1,

        experiencia: 0,

        estado: "activa"

    };



    crearMemoria(

        habitante_id,

        "profesion",

        "Cambió de profesión a " +
        profesion.nombre,

        "media",

        [],

        "motivacion"

    );



    return habitante.profesion;

}




// Obtener profesión actual

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



    if (!habitante) {

        return null;

    }



    return habitante.profesion || null;

}




// Obtener todas las profesiones disponibles

function obtenerCatalogoProfesiones() {


    const catalogo =
        cargarArchivo("../datos/profesiones.json");


    if (!catalogo) {

        return [];

    }


    return catalogo.profesiones;

}




module.exports = {

    asignarProfesion,

    cambiarProfesion,

    obtenerProfesion,

    obtenerCatalogoProfesiones

};
