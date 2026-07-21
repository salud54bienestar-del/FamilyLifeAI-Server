// Sistema de orfanato de Village Soul

const cargarArchivo = require("./cargador_datos.js");
const crearEvento = require("./eventos.js");
const crearMemoria = require("./memorias.js");



// Obtener datos del orfanato

function obtenerOrfanato() {

    const datos = cargarArchivo("../datos/orfanato.json");


    if(!datos){

        console.log("No se pudo cargar el orfanato.");

        return null;

    }


    return datos.orfanatos[0];

}





// Registrar trabajador del orfanato

function asignarTrabajador(
    habitante_id,
    profesion
){

    const orfanato =
    obtenerOrfanato();


    if(!orfanato){

        return null;

    }


    if(!orfanato.personal){

        orfanato.personal = [];

    }


    orfanato.personal.push({

        habitante_id: habitante_id,

        profesion: profesion,

        estado: "activo"

    });



    crearMemoria(

        habitante_id,

        "profesion",

        "Comenzó a trabajar en el Hogar Nuevo Amanecer como " + profesion,

        "media"

    );



    console.log(
        "Trabajador añadido al orfanato."
    );


    return orfanato;

}





// Registrar niño o niña en el orfanato

function registrarInfante(datosInfante){


    const datos =
    cargarArchivo("../datos/orfanato.json");


    if(!datos){

        return null;

    }



    const orfanato =
    datos.orfanatos[0];



    if(!orfanato.ninos){

        orfanato.ninos=[];

    }



    const nuevoInfante={


        id:
        orfanato.ninos.length + 1,


        nombre:
        datosInfante.nombre,


        edad:
        datosInfante.edad,


        genero:
        datosInfante.genero,


        personalidad:
        datosInfante.personalidad || "desconocida",


        apariencia:
        datosInfante.apariencia || "aleatoria",


        estado:
        "disponible_adopcion"


    };



    orfanato.ninos.push(nuevoInfante);



    crearEvento(

        8,

        [],

        {

            tipo:"nuevo_infante_orfanato",

            nombre:nuevoInfante.nombre

        }

    );



    return nuevoInfante;

}





// Buscar niños disponibles

function listarAdopciones(){


    const orfanato =
    obtenerOrfanato();



    if(!orfanato){

        return [];

    }



    return orfanato.ninos.filter(

        niño =>
        niño.estado === "disponible_adopcion"

    );

}





module.exports={


    obtenerOrfanato,

    asignarTrabajador,

    registrarInfante,

    listarAdopciones


};
