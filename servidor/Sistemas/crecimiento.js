// Sistema de crecimiento de habitantes - Village Soul

const cargarArchivo = require("./cargador_datos.js");
const crearEvento = require("./eventos.js");
const crearMemoria = require("./memorias.js");

const {
    actualizarEtapa
} = require("./etapas.js");



// =================================
// AVANZAR EDAD DE HABITANTES
// =================================

function actualizarCrecimiento(){


    const almas =
    cargarArchivo("../datos/almas.json");


    const tiempo =
    cargarArchivo("../datos/tiempo.json");



    if(!almas || !tiempo){

        console.log(
            "No se pudieron cargar datos de crecimiento."
        );

        return null;

    }



    // Si el crecimiento está desactivado

    if(
        !tiempo.tiempo.ciclo_vida.crecimiento_habitantes
    ){

        return null;

    }




    almas.almas.forEach(habitante => {



        if(
            habitante.estado !== "viviendo"
        ){

            return;

        }




        if(
            !habitante.contador_vida
        ){

            habitante.contador_vida = 0;

        }




        habitante.contador_vida++;




        // 30 días Minecraft = 1 año Village Soul

        if(
            habitante.contador_vida >= 30
        ){


            habitante.edad++;

            habitante.contador_vida = 0;




            crearEvento(

                "cumpleaños",

                [
                    habitante.id
                ],

                {

                    nombre:
                    habitante.nombre,

                    edad:
                    habitante.edad

                }

            );





            crearMemoria(

                habitante.id,

                "cumpleaños",

                "Cumplió " +
                habitante.edad +
                " años.",

                "alta"

            );





            actualizarEtapa(
                habitante
            );



            console.log(

                habitante.nombre +
                " ahora tiene " +
                habitante.edad +
                " años."

            );


        }



    });



    return almas.almas;


}





module.exports = {


    actualizarCrecimiento


};
