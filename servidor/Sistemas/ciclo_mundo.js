// Sistema de ciclo del mundo - Village Soul


const avanzarTiempo =
require("./tiempo.js")
.avanzarTiempo;


const actualizarCrecimiento =
require("./crecimiento.js")
.actualizarCrecimiento;


const actualizarEmbarazos =
require("./embarazos.js")
.actualizarEmbarazos;


const actualizarEconomia =
require("./recursos.js")
.actualizarEconomia;


const actualizarNecesidades =
require("./necesidades.js")
.actualizarNecesidades;


const crearEvento =
require("./eventos.js");




const obtenerMundo =
require("./mundo.js")
.obtenerMundo;







// =================================
// EJECUTAR CICLO
// =================================

function ejecutarCiclo(){


    console.log(
        "=============================="
    );


    console.log(
        "Ejecutando ciclo Village Soul"
    );


    console.log(
        "=============================="
    );






    // =============================
    // TIEMPO
    // =============================


    const tiempo =
    avanzarTiempo(1);





    if(!tiempo){

        return null;

    }







    // =============================
    // NUEVO DÍA
    // =============================


    if(
        tiempo.nuevo_dia_minecraft
        === true
    ){


        actualizarCrecimiento();


        actualizarEmbarazos();


        actualizarEconomia();



        if(actualizarNecesidades){

            actualizarNecesidades();

        }




        crearEvento(

            "ciclo_diario",

            [],

            {

                dia:
                tiempo.dia,

                mes:
                tiempo.mes,

                año:
                tiempo.año

            }

        );


    }






    const mundo =
    obtenerMundo();







    return {


        tiempo,


        mundo


    };


}









// =================================
// EJECUTAR VARIOS CICLOS
// =================================

function ejecutarDias(
cantidad
){


    let resultado=null;



    for(
        let i=0;
        i<cantidad;
        i++
    ){


        resultado =
        ejecutarCiclo();


    }





    return resultado;


}









module.exports={


    ejecutarCiclo,

    ejecutarDias


};
