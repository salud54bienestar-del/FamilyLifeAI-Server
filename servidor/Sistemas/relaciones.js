// Sistema avanzado de relaciones - Village Soul


const cargarArchivo =
require("./cargador_datos.js");


const crearEvento =
require("./eventos.js");


const crearMemoria =
require("./memorias.js");



const {
    obtenerEtapaHabitante
}
=
require("./etapas.js");





// =================================
// CREAR RELACIÓN
// =================================


function crearRelacion(
    habitante_a,
    habitante_b,
    tipo="desconocidos"
){


    const datos =
    cargarArchivo("../datos/relaciones.json");



    const almas =
    cargarArchivo("../datos/almas.json");



    if(
        !datos ||
        !almas
    ){

        return null;

    }




    const personaA =
    almas.almas.find(
        a=>a.id===habitante_a
    );


    const personaB =
    almas.almas.find(
        a=>a.id===habitante_b
    );



    if(
        !personaA ||
        !personaB
    ){

        return null;

    }






    const etapaA =
    obtenerEtapaHabitante(personaA);


    const etapaB =
    obtenerEtapaHabitante(personaB);





    // Evitar romance en menores

    if(
        tipo==="romance" &&
        (
            etapaA.nombre !== "adulto" ||
            etapaB.nombre !== "adulto"
        )
    ){

        console.log(
            "No se puede crear relación romántica."
        );

        tipo="amistad";

    }







    const relacion = {


        id:
        datos.relaciones.length + 1,



        habitante_a,

        habitante_b,



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



        familia:
        {

            parentesco:false,

            tipo:null

        },



        historial:
        [

            "Primer encuentro"

        ],



        eventos_importantes:
        [

            {

                evento:
                "primer_encuentro",

                fecha:null,

                impacto:"moderado"

            }

        ]

    };







    datos.relaciones.push(
        relacion
    );






    crearEvento(

        "nueva_relacion",

        [

            habitante_a,

            habitante_b

        ],

        {

            tipo

        }

    );






    crearMemoria(

        habitante_a,

        "relacion",

        "Conoció a " + personaB.nombre,

        "media",

        [

            habitante_b

        ],

        "social"

    );





    return relacion;

}









// =================================
// AUMENTAR CONFIANZA
// =================================


function aumentarConfianza(
    habitante_a,
    habitante_b,
    cantidad
){


    const relacion =
    buscarRelacion(
        habitante_a,
        habitante_b
    );



    if(!relacion){

        return null;

    }



    relacion.confianza += cantidad;



    if(
        relacion.confianza > 100
    ){

        relacion.confianza=100;

    }



    return relacion;

}








// =================================
// BUSCAR RELACIÓN
// =================================


function buscarRelacion(
    habitante_a,
    habitante_b
){


    const datos =
    cargarArchivo("../datos/relaciones.json");



    if(!datos){

        return null;

    }



    return datos.relaciones.find(

        r=>

        (
            r.habitante_a===habitante_a &&
            r.habitante_b===habitante_b
        )

        ||

        (
            r.habitante_a===habitante_b &&
            r.habitante_b===habitante_a
        )

    ) || null;


}








// =================================
// AUMENTAR ROMANCE
// =================================


function aumentarRomance(
    habitante_a,
    habitante_b,
    cantidad
){


    const relacion =
    buscarRelacion(
        habitante_a,
        habitante_b
    );



    if(!relacion){

        return null;

    }



    relacion.romance += cantidad;



    if(
        relacion.romance > 100
    ){

        relacion.romance=100;

    }



    return relacion;

}







module.exports = {


    crearRelacion,

    buscarRelacion,

    aumentarConfianza,

    aumentarRomance


};
