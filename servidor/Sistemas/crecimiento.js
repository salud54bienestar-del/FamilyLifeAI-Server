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
    cumplirAño
}
=
require("./etapas.js");





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
        !almas.almas ||
        !tiempoDatos
    ){

        return null;

    }






    const tiempo =
    tiempoDatos.tiempo;





    if(!tiempo){

        return null;

    }






    // Solo crecer una vez por día Minecraft

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

                habitante.contador_vida = 0;

            }






            habitante.contador_vida++;







            if(
                habitante.contador_vida >=
                DIAS_MINECRAFT_POR_AÑO
            ){



                habitante.contador_vida = 0;





                const edadAnterior =
                habitante.edad;






                // Usa el sistema de etapas

                cumplirAño(
                    habitante
                );







                crearEvento(

                    "cumpleaños",

                    [
                        habitante.id
                    ],

                    {

                        edad:
                        habitante.edad,


                        edad_anterior:
                        edadAnterior

                    }

                );







                crearMemoria(

                    habitante.id,

                    "crecimiento",

                    "Cumplió "+
                    habitante.edad+
                    " años y continúa creciendo.",

                    "media"

                );








                console.log(

                    habitante.nombre+
                    " cumplió "+
                    habitante.edad+
                    " años."

                );






                // Cambio importante de etapa

                if(
                    edadAnterior !== habitante.edad
                    &&
                    habitante.etapa_vida
                ){


                    crearMemoria(

                        habitante.id,

                        "etapa_vida",

                        "Ahora pertenece a la etapa "+
                        habitante.etapa_vida,

                        "alta"

                    );


                }






            }





        }

    );







    guardarArchivo(

        "../datos/almas.json",

        almas

    );






    return almas.almas;


}









// =================================
// OBTENER EDAD DE CRECIMIENTO
// =================================

function obtenerProgresoCrecimiento(
habitante
){


    if(!habitante){

        return null;

    }




    return {


        edad:

        habitante.edad || 0,


        dias_para_crecer:

        DIAS_MINECRAFT_POR_AÑO -
        (
            habitante.contador_vida || 0
        )


    };


}








module.exports={


    actualizarCrecimiento,

    obtenerProgresoCrecimiento


};
