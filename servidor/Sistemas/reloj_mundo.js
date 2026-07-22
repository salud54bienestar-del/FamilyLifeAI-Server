// ==========================================
// Reloj del mundo - Village Soul
// Controla el paso del tiempo
// ==========================================


const mundo =
require("./mundo.js");


const cargarArchivo =
require("./cargador_datos.js");


const crearEvento =
require("./eventos.js");


const {
    ejecutarPensamiento
}
=
require("./cerebro.js");


const {
    actualizarNecesidades
}
=
require("./necesidades.js");


const {
    actualizarRutina
}
=
require("./rutinas.js");







// ==========================================
// CICLO DEL MUNDO
// ==========================================


function cicloMundo(){


    console.log(
        "⏰ Nuevo ciclo del mundo"
    );



    const estado =
    mundo.avanzarHora();



    if(!estado){

        return null;

    }




    procesarHabitantes();





    crearEvento(

        "ciclo_mundo",

        [],

        {

            hora:
            estado.hora_actual,

            dia:
            estado.dia_actual

        }

    );





    return estado;


}









// ==========================================
// PROCESAR HABITANTES
// ==========================================


function procesarHabitantes(){


    const almas =
    cargarArchivo(
        "../datos/almas.json"
    );



    if(
        !almas ||
        !almas.almas
    ){

        return [];

    }






    almas.almas.forEach(

        habitante=>{



            // necesidades


            actualizarNecesidades(

                habitante.id,

                1

            );






            // rutina


            actualizarRutina(

                habitante.id,

                obtenerHora(),

                {

                    etapa:
                    habitante.etapa

                }

            );






            // pensamiento


            ejecutarPensamiento(

                habitante.id

            );




        }

    );



    return true;


}









// ==========================================
// OBTENER HORA ACTUAL
// ==========================================


function obtenerHora(){


    const estado =
    mundo.obtenerMundo();



    return estado?.hora_actual || 0;


}









// ==========================================
// INICIAR RELOJ AUTOMÁTICO
// ==========================================


function iniciarReloj(
tiempo=60000
){



    console.log(
        "Reloj del mundo iniciado."
    );



    return setInterval(

        ()=>{

            cicloMundo();

        },

        tiempo

    );


}









module.exports={


    cicloMundo,

    iniciarReloj,

    procesarHabitantes


};
