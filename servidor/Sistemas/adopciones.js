// Sistema de adopciones de Village Soul

const cargarArchivo = require("./cargador_datos.js");
const crearEvento = require("./eventos.js");
const crearMemoria = require("./memorias.js");
const { agregarMiembro } = require("./familias.js");



// ==============================
// EVALUAR FAMILIA
// ==============================

function evaluarFamiliaAdopcion(familia_id){


    const familias =
    cargarArchivo("../datos/familias.json");

    const relaciones =
    cargarArchivo("../datos/relaciones.json");


    if(!familias || !relaciones){

        return null;

    }



    const familia =
    familias.familias.find(
        f=>f.id===familia_id
    );



    if(!familia){

        return null;

    }



    let confianzaPareja = 0;
    let casados = false;



    relaciones.relaciones.forEach(r=>{


        if(
            familia.padres.includes(r.habitante_a) ||
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




    const requisitos={


        confianza:

        confianzaPareja>=80
        ||
        familiaMonoparental,



        vivienda:

        familia.hogar!==null,



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
        .every(r=>r===true)


    };


}






// ==============================
// ADOPTAR NIÑO/A
// ==============================


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




    const lista = [

        ...orfanato.bebes,

        ...orfanato.niños,

        ...orfanato.adolescentes

    ];




    const niño =
    lista.find(
        n=>n.id===niño_id
    );



    if(!niño){

        console.log(
            "Infante no encontrado."
        );

        return null;

    }




    const evaluacion =
    evaluarFamiliaAdopcion(
        familia_id
    );



    if(!evaluacion.aprobado){

        console.log(
            "Familia rechazada."
        );

        return null;

    }





    agregarMiembro(
        familia_id,
        niño_id
    );



    niño.estado =
    "adoptado";


    niño.familia_nueva =
    familia_id;




    if(!orfanato.adopciones_realizadas){

        orfanato.adopciones_realizadas=[];

    }



    orfanato.adopciones_realizadas.push({

        niño: niño_id,

        familia: familia_id,

        fecha:null

    });





    crearEvento(

        8,

        [niño_id],

        {

            tipo:"adopcion_exitosa",

            familia:
            familia_id

        }

    );





    crearMemoria(

        niño_id,

        "familia",

        "Encontró una nueva familia mediante adopción.",

        "alta",

        [familia_id],

        "amor"

    );





    return niño;


}





module.exports={

    evaluarFamiliaAdopcion,

    adoptarNiño

};
