// Sistema de familias de Village Soul

const cargarArchivo = require("./cargador_datos.js");
const crearEvento = require("./eventos.js");
const crearMemoria = require("./memorias.js");


function crearFamilia(apellido = "") {

    const datos = cargarArchivo("../datos/familias.json");

    if (!datos) {

        console.log("No se pudieron cargar las familias.");

        return null;

    }


    const familia = {

        id: datos.familias.length + 1,

        apellido: apellido,

        miembros: [],

        padres: [],

        hijos: [],

        generacion: 1,

        tipo_familia: "nuclear",

        estado: "activa",

        custodia: {},

        historial: []

    };


    datos.familias.push(familia);


    crearEvento(

        2,

        [],

        {

            sistema: "familias",

            accion: "crear_familia"

        }

    );


    console.log("Nueva familia creada:");

    console.log(familia);


    return familia;

}



function agregarMiembro(idFamilia, habitante_id) {

    const datos = cargarArchivo("../datos/familias.json");

    if (!datos) {

        return null;

    }


    const familia = datos.familias.find(

        (f) => f.id === idFamilia

    );


    if (!familia) {

        console.log("Familia no encontrada.");

        return null;

    }


    if (!familia.miembros.includes(habitante_id)) {

        familia.miembros.push(habitante_id);

    }


    crearMemoria(

        habitante_id,

        "familia",

        "Se unió a una familia.",

        "alta",

        familia.miembros,

        "amor"

    );


    console.log("Miembro agregado.");

    return familia;

}



function eliminarMiembro(idFamilia, habitante_id) {

    const datos = cargarArchivo("../datos/familias.json");

    if (!datos) {

        return null;

    }


    const familia = datos.familias.find(

        (f) => f.id === idFamilia

    );


    if (!familia) {

        return null;

    }


    familia.miembros = familia.miembros.filter(

        (id) => id !== habitante_id

    );


    console.log("Miembro eliminado.");

    return familia;

}



function obtenerFamilia(habitante_id) {

    const datos = cargarArchivo("../datos/familias.json");

    if (!datos) {

        return null;

    }


    return datos.familias.find(

        (familia) => familia.miembros.includes(habitante_id)

    );

}



// Prueba inicial

crearFamilia("Soul");


module.exports = {

    crearFamilia,

    agregarMiembro,

    eliminarMiembro,

    obtenerFamilia

};
