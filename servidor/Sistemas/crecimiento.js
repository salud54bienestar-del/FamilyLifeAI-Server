// Sistema avanzado de crecimiento de habitantes - Village Soul


const cargarArchivo =
require("./cargador_datos.js");


const guardarArchivo =
require("./guardador_datos.js");


const crearEvento =
require("./eventos.js");


const crearMemoria =
require("./memorias.js");


const {
    actualizarEtapa
}
=
require("./etapas_vida.js");





// =================================
// CONFIGURACIÓN
// =================================


// 20 días Minecraft = 1 año Village Soul

const DIAS_MINECRAFT_POR_AÑO = 20;



const CRECIMIENTO_ACTIVO = true;








// =================================
// ACTUALIZAR CRECIMIENTO
// =================================

function actualizarCrecimiento(){



    if(!CRECIMIENTO_ACTIVO){

        return null;

    }



    const almas =
    cargarArchivo("../datos/almas.json");



    const tiempoDatos =
    cargarArchivo("../datos/tiempo.json");



    if(
        !almas ||
        !tiempoDatos
    ){

        return null;

    }





    const tiempo =
    tiempoDatos.tiempo;





    if(
        tiempo.nuevo_dia_minecraft !== true
    ){

        return almas.almas;

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

                habitante.contador_vida=0;

            }






            habitante.contador_vida++;







            if(
                habitante.contador_vida >=
                DIAS_MINECRAFT_POR_AÑO
            ){



                habitante.contador_vida=0;



                habitante.edad++;






                actualizarEtapa(
                    habitante
                );







                crearEvento(

                    "cumpleaños",

                    [
                        habitante.id
                    ],

                    {

                        edad:
                        habitante.edad

                    }

                );








                crearMemoria(

                    habitante.id,

                    "crecimiento",

                    "Cumplió "+
                    habitante.edad+
                    " años.",

                    "media"

                );






                console.log(

                    habitante.nombre+
                    " cumplió "+
                    habitante.edad+
                    " años."

                );



            }



        }

    );







    guardarArchivo(

        "../datos/almas.json",

        almas

    );






    return almas.almas;


}









module.exports={


    actualizarCrecimiento


};
