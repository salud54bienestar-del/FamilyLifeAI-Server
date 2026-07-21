// Sistema de crecimiento de habitantes - Village Soul

const cargarArchivo = require("./cargador_datos.js");
const crearEvento = require("./eventos.js");
const crearMemoria = require("./memorias.js");

const {
    actualizarEtapa
} = require("./etapas.js");



// =================================
// CONFIGURACIÓN DE TIEMPO
// =================================

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



    const ciclo =
    tiempoDatos.tiempo.ciclo_vida;




    if(
        !ciclo.crecimiento_habitantes
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







            habitante.contador_vida++;








            if(
                habitante.contador_vida >=
                DIAS_MINECRAFT_POR_AÑO
            ){



                habitante.edad++;

                habitante.contador_vida=0;






                crearEvento(

                    "cumpleaños",

                    [
                        habitante.id
                    ],

                    {

                        edad:
                        habitante.edad,

                        nombre:
                        habitante.nombre

                    }

                );








                crearMemoria(

                    habitante.id,

                    "crecimiento",

                    "Ahora tiene " +
                    habitante.edad +
                    " años.",

                    "media"

                );







                actualizarEtapa(
                    habitante
                );







                console.log(

                    habitante.nombre +
                    " cumplió " +
                    habitante.edad +
                    " años."

                );



            }





        }

    );





    return almas.almas;


}





module.exports={

    actualizarCrecimiento

};
