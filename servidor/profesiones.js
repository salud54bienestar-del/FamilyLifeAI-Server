// Sistema de profesiones de Village Soul

const cargarArchivo = require("./cargador_datos.js");
const crearEvento = require("./eventos.js");
const crearMemoria = require("./memorias.js");


function asignarProfesion(habitante_id, nombreProfesion) {

    const catalogo = cargarArchivo("../datos/profesiones.json");
    const almas = cargarArchivo("../datos/almas.json");

    if (!catalogo || !almas) {

        console.log("No se pudieron cargar los datos.");

        return null;

    }


    const profesionExiste = catalogo.profesiones.find(

        (p) => p.nombre === nombreProfesion.toLowerCase()

    );


    if (!profesionExiste) {

        console.log("La profesión no existe.");

        return null;

    }


    const habitante = almas.almas.find(

        (a) => a.id === habitante_id

    );


    if (!habitante) {

        console.log("Habitante no encontrado.");

        return null;

    }


    habitante.profesion = {

        nombre: profesionExiste.nombre,

        nivel: 1,

        experiencia: 0,

        estado: "activa"

    };


    crearEvento(

        12,

        [habitante_id],

        {

            profesion: profesionExiste.nombre

        }

    );


    crearMemoria(

        habitante_id,

        "profesion",

        "Comenzó a trabajar como " + profesionExiste.nombre + ".",

        "media",

        [],

        "motivacion"

    );


    console.log("Profesión asignada:");

    console.log(habitante.profesion);


    return habitante.profesion;

}



function cambiarProfesion(habitante_id, nuevaProfesion) {

    const catalogo = cargarArchivo("../datos/profesiones.json");
    const almas = cargarArchivo("../datos/almas.json");

    if (!catalogo || !almas) {

        return null;

    }


    const profesionExiste = catalogo.profesiones.find(

        (p) => p.nombre === nuevaProfesion.toLowerCase()

    );


    if (!profesionExiste) {

        console.log("La profesión no existe.");

        return null;

    }


    const habitante = almas.almas.find(

        (a) => a.id === habitante_id

    );


    if (!habitante) {

        console.log("Habitante no encontrado.");

        return null;

    }


    habitante.profesion.nombre = profesionExiste.nombre;
    habitante.profesion.nivel = 1;
    habitante.profesion.experiencia = 0;
    habitante.profesion.estado = "activa";


    crearMemoria(

        habitante_id,

        "profesion",

        "Cambió de profesión a " + profesionExiste.nombre + ".",

        "media",

        [],

        "motivacion"

    );


    console.log("Profesión actualizada:");

    console.log(habitante.profesion);


    return habitante.profesion;

}



function obtenerProfesion(habitante_id) {

    const almas = cargarArchivo("../datos/almas.json");


    if (!almas) {

        return null;

    }


    const habitante = almas.almas.find(

        (a) => a.id === habitante_id

    );


    if (!habitante) {

        return null;

    }


    return habitante.profesion;

}



// Prueba inicial

asignarProfesion(

    1,

    "agricultor"

);



module.exports = {

    asignarProfesion,

    cambiarProfesion,

    obtenerProfesion

};
