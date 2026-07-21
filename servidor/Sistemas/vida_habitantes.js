// Sistema de vida diaria de habitantes - Village Soul


const cargarArchivo =
require("./cargador_datos.js");


const crearEvento =
require("./eventos.js");


const crearMemoria =
require("./memorias.js");



const {
    actualizarNecesidades
}
=
require("./necesidades.js");



const {
    actualizarEtapa
}
=
require("./etapas.js");



// =================================
// ACTUALIZAR VIDA HABITANTES
// =================================


function actualizarVidaHabitantes(){



    const almas =
    cargarArchivo("../datos/almas.json");


    const tiempoDatos =
    cargarArchivo("../datos/tiempo.json");



    if(!almas || !tiempoDatos){

        console.log(
            "Error cargando datos de vida."
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
        "Periodo actual:",
        periodo
    );





    almas.almas.forEach(

        habitante => {



            if(
                habitante.estado !== "viviendo"
            ){

                return;

            }





            // =====================
            // ETAPA DE VIDA
            // =====================


            actualizarEtapa(
                habitante
            );





            // =====================
            // NECESIDADES
            // =====================


            actualizarNecesidades(
                habitante.id
            );






            // =====================
            // DESCANSO
            // =====================


            if(
                periodo === "noche"
            ){



                if(
                    habitante.ultimo_descanso !== tiempo.dia
                ){


                    crearMemoria(

                        habitante.id,

                        "descanso",

                        habitante.nombre +
                        " descansó durante la noche.",

                        "baja"

                    );



                    habitante.ultimo_descanso =
                    tiempo.dia;


                }


            }






            // =====================
            // ACTIVIDAD DIARIA
            // =====================


            if(
                periodo === "dia"
            ){



                if(
                    habitante.ultima_actividad !== tiempo.dia
                ){


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



                    habitante.ultima_actividad =
                    tiempo.dia;


                }



            }





        }

    );





    console.log(
        "Vida de habitantes actualizada."
    );



    return almas.almas;


}







module.exports = {


    actualizarVidaHabitantes


};
