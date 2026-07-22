// Motor principal de Village Soul


console.log("=================================");
console.log("          SOUL ENGINE");
console.log("=================================");



const cargarArchivo =
require("./sistemas/cargador_datos.js");



const sistemas =
require("./sistemas.js");



const crearEvento =
require("./sistemas/eventos.js");



const {
    pensarAlma
}
=
require("./IA/ia_almas.js");







// =================================
// INICIAR MOTOR
// =================================

function iniciarSoulEngine(){



    console.log(
        "Cargando sistemas..."
    );



    sistemas.forEach(

        sistema => {

            console.log(
                "✓ " + sistema
            );

        }

    );







    console.log(
        "Cargando mundo..."
    );



    const mundo =
    cargarArchivo(
        "../datos/mundo.json"
    );



    if(mundo){


        console.log(
            "Mundo:",
            mundo.nombre
        );


    }







    console.log(
        "Inicializando almas..."
    );



    const almas =
    cargarArchivo(
        "../datos/almas.json"
    );




    if(almas){


        almas.almas.forEach(

            alma=>{


                console.log(

                    "Alma:",
                    alma.nombre,
                    "ID:",
                    alma.id

                );



            }


        );


    }







    crearEvento(

        "inicio_mundo",

        [],

        {

            mensaje:
            "Soul Engine iniciado"

        }

    );







    console.log(
        "Soul Engine activo."
    );



    return true;


}









// =================================
// PROCESAR PENSAMIENTO DE ALMA
// =================================

function procesarAlma(
    id
){



    const pensamiento =
    pensarAlma(id);



    if(!pensamiento){

        return null;

    }



    console.log(

        "Pensamiento:",
        pensamiento.decision

    );



    return pensamiento;


}








module.exports={


    iniciarSoulEngine,

    procesarAlma


};
