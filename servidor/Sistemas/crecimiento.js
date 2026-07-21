// Sistema de crecimiento de habitantes - Village Soul


const cargarArchivo =
require("./cargador_datos.js");


const crearEvento =
require("./eventos.js");


const crearMemoria =
require("./memorias.js");



const {
    actualizarEtapa
}
=
require("./etapas.js");




// =================================
// CONFIGURACIÓN DE VIDA
// =================================


// 20 días Minecraft = 1 año Village Soul

const DIAS_MINECRAFT_POR_AÑO = 20;






// =================================
// ACTUALIZAR CRECIMIENTO
// =================================

function actualizarCrecimiento(){



    const almas =
    cargarArchivo("../datos/almas.json");



    const tiempoDatos =
    cargarArchivo("../datos/tiempo.json");




    if(
        !almas ||
        !tiempoDatos
    ){

        console.log(
            "No se pudieron cargar datos de crecimiento."
        );

        return null;

    }




    const tiempo =
    tiempoDatos.tiempo;




    if(
        !tiempo.ciclo_vida.crecimiento_habitantes
    ){

        return null;

    }





    almas.almas.forEach(

        habitante=>{



            if(
                habitante.estado !== "viviendo"
            ){

                return;

            }





            if(
                habitante.contador_vida === undefined
            ){

                habitante.contador_vida = 0;

            }







            // Solo aumenta si comienza un nuevo día Minecraft


            if(
                tiempo.nuevo_dia_minecraft === true
            ){


                habitante.contador_vida++;

            }






            // Cumpleaños


            if(
                habitante.contador_vida >=
                DIAS_MINECRAFT_POR_AÑO
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

                    "crecimiento",

                    "Cumplió " +
                    habitante.edad +
                    " años.",

                    "media"

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



        }

    );






    return almas.almas;


}





module.exports = {


    actualizarCrecimiento


};
