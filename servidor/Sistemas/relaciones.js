// Sistema de relaciones de Village Soul

const cargarArchivo = require("./cargador_datos.js");
const crearEvento = require("./eventos.js");
const crearMemoria = require("./memorias.js");


function crearRelacion(habitante1, habitante2, tipo) {


    const datos = cargarArchivo("../datos/relaciones.json");


    if (!datos) {

        console.log("No se pudieron cargar las relaciones.");

        return null;

    }



    const relacion = {


        id: datos.relaciones.length + 1,


        habitante_1: habitante1,

        habitante_2: habitante2,


        tipo: tipo,


        confianza: 0,

        romance: 0,


        estado: "nuevo",


        estado_pareja: "ninguno",


        compatibilidad: 50,


        limites: {

            parentesco: false,

            relacion_permitida: true

        },


        historia: [],


        eventos: []

    };



    datos.relaciones.push(relacion);



    crearEvento(

        2,

        [habitante1, habitante2],

        {
            tipo_relacion: tipo
        }

    );



    crearMemoria(

        habitante1,

        "relacion",

        "Comenzó una relación con el habitante " + habitante2,

        "media"

    );



    console.log("Nueva relación creada:");

    console.log(relacion);



    return relacion;

}



crearRelacion(
    1,
    2,
    "desconocidos"
);



module.exports = crearRelacion;
