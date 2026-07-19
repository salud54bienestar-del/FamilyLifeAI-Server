// Sistema de profesiones de Village Soul

const cargarArchivo = require("./cargador_datos.js");
const crearEvento = require("./eventos.js");
const crearMemoria = require("./memorias.js");


function asignarProfesion(habitante_id, profesion) {

    const datos = cargarArchivo("../datos/profesiones.json");

    if (!datos) {

        console.log("No se pudieron cargar las profesiones.");

        return null;

    }


    const registro = {

        id: datos.profesiones.length + 1,

        habitante_id: habitante_id,

        profesion: profesion,

        nivel: 1,

        experiencia: 0,

        estado: "activa",

        fecha_inicio: new Date().toISOString()

    };


    datos.profesiones.push(registro);


    crearEvento(

        12,

        [habitante_id],

        {

            profesion: profesion

        }

    );


    crearMemoria(

        habitante_id,

        "profesion",

        "Comenzó a trabajar como " + profesion + ".",

        "media",

        [],

        "motivacion"

    );


    console.log("Profesión asignada:");

    console.log(registro);


    return registro;

}



function cambiarProfesion(habitante_id, nuevaProfesion) {

    const datos = cargarArchivo("../datos/profesiones.json");

    if (!datos) {

        return null;

    }


    const profesion = datos.profesiones.find(

        (p) => p.habitante_id === habitante_id

    );


    if (!profesion) {

        console.log("El habitante no tiene profesión.");

        return null;

    }


    profesion.profesion = nuevaProfesion;
    profesion.nivel = 1;
    profesion.experiencia = 0;
    profesion.fecha_inicio = new Date().toISOString();


    crearMemoria(

        habitante_id,

        "profesion",

        "Cambió de profesión a " + nuevaProfesion + ".",

        "media",

        [],

        "motivacion"

    );


    console.log("Profesión actualizada.");

    console.log(profesion);


    return profesion;

}



function obtenerProfesion(habitante_id) {

    const datos = cargarArchivo("../datos/profesiones.json");

    if (!datos) {

        return null;

    }


    return datos.profesiones.find(

        (p) => p.habitante_id === habitante_id

    );

}



// Prueba inicial

asignarProfesion(

    1,

    "Aprendiz"

);



module.exports = {

    asignarProfesion,

    cambiarProfesion,

    obtenerProfesion

};
