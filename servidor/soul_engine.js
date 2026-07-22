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
        "Cargando sistemas activos..."
    );





    sistemas.activos.forEach(

        sistema=>{


            console.log(
                "✓ " + sistema
            );


        }

    );





    console.log(
        ""
    );



    console.log(
        "Sistemas en desarrollo:"
    );



    sistemas.desarrollo.forEach(

        sistema=>{


            console.log(
                "○ " + sistema
            );


        }

    );







    // =============================
    // CARGAR MUNDO
    // =============================


    console.log(
        "Cargando mundo..."
    );



    const mundo =
    cargarArchivo(
        "datos/mundo.json"
    );




    if(mundo){


        console.log(

            "Mundo:",
            mundo.nombre

        );


        console.log(

            "Estado:",
            mundo.estado

        );


    }

    else{


        console.log(
            "No se pudo cargar el mundo."
        );


    }







    // =============================
    // CARGAR ALMAS
    // =============================



    console.log(
        "Inicializando almas..."
    );



    const almas =
    cargarArchivo(
        "datos/almas.json"
    );






    if(almas && almas.almas){



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

    else{


        console.log(
            "No existen almas cargadas."
        );


    }







    // =============================
    // EVENTO DE INICIO
    // =============================



    crearEvento(

        "inicio_mundo",

        [],

        {

            mensaje:
            "Soul Engine iniciado"


        }

    );







    console.log(
        "================================="
    );


    console.log(
        "Soul Engine activo."
    );


    console.log(
        "================================="
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


        console.log(
            "No se pudo procesar el alma:",
            id
        );


        return null;


    }





    console.log(

        "Pensamiento:",
        pensamiento.decision

    );




    return pensamiento;



}








module.exports = {


    iniciarSoulEngine,


    procesarAlma


};
