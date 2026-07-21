// Sistema de vida diaria de habitantes - Village Soul

const cargarArchivo = require("./cargador_datos.js");
const crearEvento = require("./eventos.js");
const crearMemoria = require("./memorias.js");

const {
    actualizarCrecimiento
} = require("./crecimiento.js");



// =================================
// ACTUALIZAR VIDA DIARIA
// =================================

function actualizarVidaHabitantes(){


    const almas =
    cargarArchivo("../datos/almas.json");


    const tiempoDatos =
    cargarArchivo("../datos/tiempo.json");



    if(!almas || !tiempoDatos){

        console.log(
            "No se pudieron cargar datos de vida."
        );

        return null;

    }



    const tiempo =
    tiempoDatos.tiempo;



    let periodo;



    if(tiempo.hora >= 6 && tiempo.hora < 12){

        periodo = "mañana";

    }

    else if(tiempo.hora >= 12 && tiempo.hora < 18){

        periodo = "dia";

    }

    else if(tiempo.hora >= 18 && tiempo.hora < 22){

        periodo = "tarde";

    }

    else{

        periodo = "noche";

    }





    console.log(
        "Periodo:",
        periodo
    );





    almas.almas.forEach(habitante => {



        if(
            habitante.estado !== "viviendo"
        ){

            return;

        }





        console.log(

            habitante.nombre +
            " está en periodo " +
            periodo

        );





        // Rutina nocturna

        if(periodo === "noche"){


            crearMemoria(

                habitante.id,

                "rutina",

                "Descansó durante la noche.",

                "baja"

            );


        }





        // Rutina diaria

        if(periodo === "dia"){


            crearEvento(

                "actividad_diaria",

                [
                    habitante.id
                ],

                {

                    actividad:
                    "rutina diaria"

                }

            );


        }




    });





    // Revisar crecimiento

    actualizarCrecimiento();



    return almas.almas;

}





module.exports = {


    actualizarVidaHabitantes


};
