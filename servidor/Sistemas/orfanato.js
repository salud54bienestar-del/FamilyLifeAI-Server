// Sistema de orfanato de Village Soul

const cargarArchivo = require("./cargador_datos.js");
const crearEvento = require("./eventos.js");
const crearMemoria = require("./memorias.js");



// ==============================
// OBTENER ORFANATO
// ==============================

function obtenerOrfanato() {

    const datos =
    cargarArchivo("../datos/orfanato.json");


    if(!datos){

        console.log(
            "No se pudo cargar el orfanato."
        );

        return null;

    }


    return datos.orfanato;

}





// ==============================
// ASIGNAR PERSONAL
// ==============================

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

        habitante_id,

        profesion,

        estado:"activo"

    });



    crearMemoria(

        habitante_id,

        "profesion",

        "Comenzó a trabajar en el Hogar Nuevo Amanecer como " + profesion,

        "media"

    );



    crearEvento(

        12,

        [habitante_id],

        {

            lugar:"Hogar Nuevo Amanecer",

            profesion:profesion

        }

    );



    return orfanato;

}





// ==============================
// REGISTRAR NIÑO/A
// ==============================

function registrarInfante(datosInfante){


    const datos =
    cargarArchivo("../datos/orfanato.json");


    if(!datos){

        return null;

    }



    const orfanato =
    datos.orfanato;



    let grupo;



    if(datosInfante.edad <= 2){

        grupo="bebes";

    }

    else if(datosInfante.edad < 13){

        grupo="niños";

    }

    else{

        grupo="adolescentes";

    }





    const nuevoInfante={


        id:
        Date.now(),


        nombre:
        datosInfante.nombre,


        edad:
        datosInfante.edad,


        genero:
        datosInfante.genero,


        personalidad:
        datosInfante.personalidad ||
        "desconocida",


        apariencia:
        datosInfante.apariencia ||
        "aleatoria",


        estado:
        "disponible_adopcion"


    };



    if(!orfanato[grupo]){

        orfanato[grupo]=[];

    }



    orfanato[grupo].push(nuevoInfante);



    orfanato.ocupacion++;



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





// ==============================
// LISTAR NIÑOS PARA ADOPCIÓN
// ==============================

function listarAdopciones(){


    const orfanato =
    obtenerOrfanato();



    if(!orfanato){

        return [];

    }



    return [

        ...orfanato.bebes,

        ...orfanato.niños,

        ...orfanato.adolescentes

    ]

    .filter(

        niño =>
        niño.estado==="disponible_adopcion"

    );

}





// ==============================
// REGISTRAR SOLICITUD
// ==============================

function crearSolicitudAdopcion(
    familia_id,
    infante_id
){


    const datos =
    cargarArchivo("../datos/orfanato.json");


    if(!datos){

        return null;

    }



    const orfanato =
    datos.orfanato;



    const solicitud={


        id:
        Date.now(),


        familia_id,


        infante_id,


        estado:
        "pendiente",


        fecha:
        null

    };



    orfanato.solicitudes_adopcion.push(
        solicitud
    );



    return solicitud;

}





module.exports={


    obtenerOrfanato,

    asignarTrabajador,

    registrarInfante,

    listarAdopciones,

    crearSolicitudAdopcion


};
