// Sistema de relaciones de Village Soul

const cargarArchivo = require("./cargador_datos.js");
const crearEvento = require("./eventos.js");
const crearMemoria = require("./memorias.js");


// =================================
// CREAR RELACIÓN
// =================================

function crearRelacion(habitante_a, habitante_b, tipo="desconocidos") {


    const datos =
    cargarArchivo("../datos/relaciones.json");


    if(!datos){

        console.log(
            "No se pudieron cargar las relaciones."
        );

        return null;

    }



    const relacion = {


        id:
        datos.relaciones.length + 1,



        habitante_a:
        habitante_a,



        habitante_b:
        habitante_b,



        tipo:
        tipo,



        nivel:
        "nuevo",



        confianza:
        0,



        afinidad:
        50,



        romance:
        0,



        estado_pareja:
        "ninguno",



        historial:
        [

            "Primer encuentro"

        ],



        familia:
        {

            parentesco:false,

            tipo:null

        },



        limites:
        {

            relacion_permitida:true,

            motivo_bloqueo:null

        },



        eventos_importantes:
        [

            {

                evento:
                "primer_encuentro",

                fecha:
                null,

                impacto:
                "moderado"

            }

        ]

    };





    datos.relaciones.push(relacion);





    crearEvento(

        2,

        [

            habitante_a,

            habitante_b

        ],

        {

            tipo:
            "nueva_relacion",

            relacion:
            tipo

        }

    );





    crearMemoria(

        habitante_a,

        "relacion",

        "Conoció al habitante " + habitante_b,

        "media",

        [

            habitante_b

        ],

        "social"

    );





    console.log(
        "Nueva relación creada:"
    );


    console.log(relacion);



    return relacion;


}





// =================================
// CAMBIAR CONFIANZA
// =================================


function aumentarConfianza(
    habitante_a,
    habitante_b,
    cantidad
){


    const datos =
    cargarArchivo("../datos/relaciones.json");



    if(!datos){

        return null;

    }



    const relacion =
    datos.relaciones.find(

        r =>

        (

        r.habitante_a===habitante_a &&
        r.habitante_b===habitante_b

        )

        ||

        (

        r.habitante_a===habitante_b &&
        r.habitante_b===habitante_a

        )

    );



    if(!relacion){

        return null;

    }



    relacion.confianza += cantidad;



    if(relacion.confianza > 100){

        relacion.confianza = 100;

    }



    return relacion;


}





module.exports = {


    crearRelacion,

    aumentarConfianza


};
