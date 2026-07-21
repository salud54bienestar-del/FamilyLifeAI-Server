// Sistema de adopciones de Village Soul

const cargarArchivo = require("./cargador_datos.js");
const crearEvento = require("./eventos.js");
const crearMemoria = require("./memorias.js");

const { agregarMiembro } = require("./familias.js");
const { crearAlma } = require("./almas.js");



// =================================
// EVALUAR FAMILIA PARA ADOPCIÓN
// =================================

function evaluarFamiliaAdopcion(familia_id){


    const familias =
    cargarArchivo("../datos/familias.json");


    const relaciones =
    cargarArchivo("../datos/relaciones.json");



    if(!familias || !relaciones){

        console.log(
            "No se pudieron cargar datos familiares."
        );

        return null;

    }



    const familia =
    familias.familias.find(
        f=>f.id===familia_id
    );



    if(!familia){

        console.log(
            "Familia no encontrada."
        );

        return null;

    }



    let confianzaPareja = 0;

    let casados = false;



    relaciones.relaciones.forEach(r=>{


        if(

            familia.padres.includes(r.habitante_a)

            ||

            familia.padres.includes(r.habitante_b)

        ){


            confianzaPareja =
            Math.max(
                confianzaPareja,
                r.confianza
            );



            if(
                r.estado_pareja==="casados"
            ){

                casados=true;

            }


        }


    });





    const familiaMonoparental =
    familia.padres.length===1;





    const requisitos = {


        confianza:

        confianzaPareja >= 80
        ||
        familiaMonoparental,



        vivienda:

        familia.hogar !== null,



        alimentos:

        familia.recursos_compartidos
        ?.includes("alimentos")
        ||
        false,



        estabilidad:

        true,



        matrimonio:

        casados
        ||
        familiaMonoparental


    };





    return {


        familia_id,

        requisitos,


        aprobado:

        Object.values(requisitos)
        .every(
            r=>r===true
        )


    };


}







// =================================
// CREAR SOLICITUD DE ADOPCIÓN
// =================================


function crearSolicitudAdopcion(
    familia_id,
    niño_id
){


    const datos =
    cargarArchivo("../datos/orfanato.json");



    if(!datos){

        return null;

    }



    if(!datos.orfanato.solicitudes_adopcion){

        datos.orfanato.solicitudes_adopcion=[];

    }



    const solicitud = {


        id:

        datos.orfanato.solicitudes_adopcion.length + 1,


        familia:

        familia_id,


        niño:

        niño_id,


        estado:

        "pendiente",


        fecha:

        null


    };



    datos.orfanato.solicitudes_adopcion.push(
        solicitud
    );



    return solicitud;

}







// =================================
// ADOPTAR NIÑO/A
// =================================


function adoptarNiño(
    familia_id,
    niño_id
){


    const datos =
    cargarArchivo("../datos/orfanato.json");



    if(!datos){

        return null;

    }



    const orfanato =
    datos.orfanato;



    const listaInfantes = [

        ...orfanato.bebes,

        ...orfanato.niños,

        ...orfanato.adolescentes

    ];



    const niño =
    listaInfantes.find(
        n=>n.id===niño_id
    );



    if(!niño){

        console.log(
            "Niño o niña no encontrado."
        );

        return null;

    }





    const evaluacion =
    evaluarFamiliaAdopcion(
        familia_id
    );



    if(!evaluacion.aprobado){

        console.log(
            "La familia no cumple requisitos."
        );

        return null;

    }





    // Crear alma real del niño

    const nuevaAlma =
    crearAlma({

        nombre:
        niño.nombre,


        edad:
        niño.edad,


        personalidad_id:
        niño.personalidad_id || null,


        tipo:
        "habitante",


        objetivos:[

            "conocer su nueva familia",

            "crecer",

            "desarrollar habilidades"

        ]

    });







    if(!nuevaAlma){

        console.log(
            "No se pudo crear el alma."
        );

        return null;

    }





    // Agregar a familia


    agregarMiembro(

        familia_id,

        nuevaAlma.id

    );






    niño.estado =
    "adoptado";



    niño.familia_nueva =
    familia_id;



    niño.alma_id =
    nuevaAlma.id;






    orfanato.adopciones_realizadas.push({

        niño:nuevaAlma.id,

        familia:
        familia_id,

        fecha:null


    });







    // Memorias


    crearMemoria(

        nuevaAlma.id,

        "adopcion",

        "Encontró una nueva familia mediante adopción.",

        "alta",

        [familia_id],

        "amor"

    );







    crearEvento(

        8,

        [nuevaAlma.id],

        {

            tipo:
            "adopcion_exitosa",

            familia:
            familia_id

        }

    );







    console.log(
        "Adopción completada:"
    );


    console.log(
        nuevaAlma
    );



    return nuevaAlma;


}







module.exports = {


    evaluarFamiliaAdopcion,

    crearSolicitudAdopcion,

    adoptarNiño


};
