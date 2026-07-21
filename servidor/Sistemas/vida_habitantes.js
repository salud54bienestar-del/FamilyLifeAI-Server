// Sistema de vida diaria de habitantes - Village Soul


const cargarArchivo =
require("./cargador_datos.js");


const crearEvento =
require("./eventos.js");


const crearMemoria =
require("./memorias.js");



const {
    actualizarCrecimiento
}
=
require("./crecimiento.js");



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



const {
    avanzarEmbarazos
}
=
require("./embarazo.js");




// =================================
// ACTUALIZAR VIDA HABITANTES
// =================================


function actualizarVidaHabitantes(){



    const almas =
    cargarArchivo("../datos/almas.json");



    const tiempoDatos =
    cargarArchivo("../datos/tiempo.json");



    if(
        !almas ||
        !tiempoDatos
    ){

        console.log(
            "No se pudieron cargar datos de vida."
        );

        return null;

    }





    const tiempo =
    tiempoDatos.tiempo;





    let periodo;



    if(
        tiempo.hora >= 6 &&
        tiempo.hora < 12
    ){

        periodo="mañana";

    }

    else if(
        tiempo.hora >=12 &&
        tiempo.hora <18
    ){

        periodo="dia";

    }

    else if(
        tiempo.hora >=18 &&
        tiempo.hora <22
    ){

        periodo="tarde";

    }

    else{

        periodo="noche";

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





            console.log(
                "Actualizando habitante:",
                habitante.nombre
            );





            // =========================
            // ETAPA DE VIDA
            // =========================


            actualizarEtapa(
                habitante
            );








            // =========================
            // NECESIDADES
            // =========================


            actualizarNecesidades(

                habitante.id

            );









            // =========================
            // DESCANSO
            // =========================


            if(
                periodo === "noche"
            ){



                if(
                    habitante.ultimo_descanso
                    !==
                    tiempo.dia
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








            // =========================
            // ACTIVIDAD DIARIA
            // =========================


            if(
                periodo === "dia"
            ){



                crearEvento(

                    "actividad_diaria",

                    [
                        habitante.id
                    ],

                    {

                        habitante:
                        habitante.nombre,


                        actividad:
                        "rutina diaria"

                    }

                );


            }





        }

    );







    // =========================
    // CRECIMIENTO
    // =========================


    actualizarCrecimiento();







    // =========================
    // EMBARAZOS
    // =========================


    avanzarEmbarazos();







    console.log(
        "Vida de habitantes actualizada correctamente."
    );




    return almas.almas;



}





module.exports = {


    actualizarVidaHabitantes


};
