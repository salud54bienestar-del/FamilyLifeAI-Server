// Sistema de adopciones de Village Soul

const cargarArchivo = require("./cargador_datos.js");
const crearEvento = require("./eventos.js");
const crearMemoria = require("./memorias.js");
const { agregarMiembro } = require("./familias.js");



function evaluarFamiliaAdopcion(familia_id) {


    const familias = cargarArchivo("../datos/familias.json");
    const relaciones = cargarArchivo("../datos/relaciones.json");


    if(!familias || !relaciones){

        console.log("No se pudieron cargar los datos.");

        return null;

    }



    const familia =
    familias.familias.find(
        f => f.id === familia_id
    );



    if(!familia){

        console.log("Familia no encontrada.");

        return null;

    }



    let confianzaPareja = 0;
    let casados = false;



    relaciones.relaciones.forEach(r => {


        if(
            familia.padres.includes(r.habitante_a) ||
            familia.padres.includes(r.habitante_b)
        ){

            confianzaPareja =
            Math.max(
                confianzaPareja,
                r.confianza
            );


            if(r.estado_pareja === "casados"){

                casados = true;

            }

        }

    });





    const requisitos = {


        confianza:

        confianzaPareja >= 80,



        vivienda:

        familia.hogar !== null,



        alimentos:

        familia.recursos_compartidos?.includes("alimentos")
        ||
        false,



        estabilidad:

        true,



        matrimonio:

        casados


    };





    const aprobado =

    requisitos.confianza &&
    requisitos.vivienda &&
    requisitos.alimentos &&
    requisitos.estabilidad &&
    requisitos.matrimonio;





    return {

        familia_id,

        requisitos,

        aprobado

    };

}





function adoptarNiño(familia_id, niño_id){


    const orfanato =
    cargarArchivo("../datos/orfanato.json");


    if(!orfanato){

        return null;

    }



    const niño =
    orfanato.niños_disponibles.find(

        n => n.id === niño_id

    );



    if(!niño){

        console.log("Niño o niña no disponible.");

        return null;

    }




    const evaluacion =
    evaluarFamiliaAdopcion(familia_id);



    if(!evaluacion.aprobado){

        console.log(
            "La familia no cumple los requisitos."
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





    crearEvento(

        8,

        [niño_id],

        {

            tipo:
            "adopcion",

            familia:
            familia_id

        }

    );





    crearMemoria(

        niño_id,

        "familia",

        "Fue adoptado y encontró un nuevo hogar.",

        "alta",

        [familia_id],

        "amor"

    );





    console.log(
        "Adopción completada."
    );



    return niño;


}





module.exports = {


    evaluarFamiliaAdopcion,

    adoptarNiño


};
