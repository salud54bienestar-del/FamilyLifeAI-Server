// Motor principal avanzado de Village Soul


console.log("=================================");
console.log("          SOUL ENGINE");
console.log("=================================");



const cargarArchivo =
require("./sistemas/cargador_datos.js");


const sistemas =
require("./sistemas.js");


const crearEvento =
require("./sistemas/eventos.js");



let estadoMotor = {


    activo:false,

    fecha_inicio:null,

    sistemas_cargados:0,

    habitantes:0


};





// =================================
// INICIAR MOTOR
// =================================


function iniciarSoulEngine(){



    console.log(
        "Cargando sistemas activos..."
    );





    let sistemasCorrectos=0;



    sistemas.activos.forEach(

        sistema=>{


            console.log(
                "✓",
                sistema
            );


            sistemasCorrectos++;


        }

    );





    estadoMotor.sistemas_cargados =
    sistemasCorrectos;







    console.log(
        ""
    );



    console.log(
        "Sistemas en desarrollo:"
    );



    sistemas.desarrollo.forEach(

        sistema=>{


            console.log(
                "○",
                sistema
            );


        }

    );








    // =============================
    // MUNDO
    // =============================


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
            "Error cargando mundo."
        );


    }








    // =============================
    // ALMAS
    // =============================



    const almas =
    cargarArchivo(
        "datos/almas.json"
    );




    if(
        almas &&
        almas.almas
    ){



        estadoMotor.habitantes =
        almas.almas.length;



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
            "No existen almas."
        );


    }









    // =============================
    // ESTADO
    // =============================


    estadoMotor.activo=true;


    estadoMotor.fecha_inicio =
    new Date().toISOString();








    console.log(
        "Motor preparado:"
    );


    console.log(
        estadoMotor
    );







    crearEvento(

        "soul_engine_inicio",

        [],

        {


            mensaje:
            "Village Soul Engine iniciado",


            habitantes:
            estadoMotor.habitantes


        }

    );







    console.log(
        "================================="
    );


    console.log(
        "Soul Engine activo."
    );


    console.log(
        "=================================");





    return estadoMotor;


}









// =================================
// PROCESAR PENSAMIENTO
// =================================


function procesarAlma(id){


    try{


        const {
            pensarAlma
        }
        =
        require("./IA/ia_almas.js");



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

    catch(error){


        console.log(
            "Error IA:",
            error.message
        );


        return null;


    }


}









function obtenerEstadoMotor(){


    return estadoMotor;


}








module.exports={


    iniciarSoulEngine,

    procesarAlma,

    obtenerEstadoMotor


};
