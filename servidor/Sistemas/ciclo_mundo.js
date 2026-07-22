// Sistema avanzado de ciclo del mundo - Village Soul


const avanzarTiempo =
require("./tiempo.js")
.avanzarTiempo;


const crearEvento =
require("./eventos.js");


const obtenerMundo =
require("./mundo.js")
.obtenerMundo;



let cicloActual = 0;



// ================================
// SISTEMAS OPCIONALES
// ================================


function cargarSistema(
archivo,
funcion
){

    try{

        return require(archivo)[funcion];

    }

    catch(error){

        console.log(
            "Sistema no disponible:",
            archivo
        );

        return null;

    }

}





const actualizarCrecimiento =
cargarSistema(
"./crecimiento.js",
"actualizarCrecimiento"
);



const actualizarEmbarazos =
cargarSistema(
"./embarazos.js",
"actualizarEmbarazos"
);



const actualizarEconomia =
cargarSistema(
"./recursos.js",
"actualizarEconomia"
);



const actualizarNecesidades =
cargarSistema(
"./necesidades.js",
"actualizarNecesidades"
);



const ejecutarRutinas =
cargarSistema(
"./rutinas.js",
"ejecutarRutinas"
);



const pensarHabitantes =
cargarSistema(
"./ia_almas.js",
"pensarHabitantes"
);








// =================================
// EJECUTAR CICLO
// =================================


function ejecutarCiclo(){



    cicloActual++;



    console.log(
        "=============================="
    );


    console.log(
        "Ciclo Village Soul:",
        cicloActual
    );


    console.log(
        "=============================="
    );





    try{


        const tiempo =
        avanzarTiempo(1);



        if(!tiempo){

            return null;

        }





        // Rutinas

        if(ejecutarRutinas){

            ejecutarRutinas();

        }







        // IA

        if(
            pensarHabitantes &&
            tiempo.hora % 6 === 0
        ){

            pensarHabitantes();

        }








        // NUEVO DÍA

        if(
            tiempo.nuevo_dia_minecraft === true
        ){



            console.log(
                "Nuevo día."
            );




            if(actualizarCrecimiento){

                actualizarCrecimiento();

            }




            if(actualizarEmbarazos){

                actualizarEmbarazos();

            }




            if(actualizarEconomia){

                actualizarEconomia();

            }




            if(actualizarNecesidades){

                actualizarNecesidades();

            }





            crearEvento(

                "ciclo_diario",

                [],

                {

                    ciclo:
                    cicloActual,


                    dia:
                    tiempo.dia,


                    mes:
                    tiempo.mes,


                    año:
                    tiempo.año


                }

            );


        }






        return {


            ciclo:
            cicloActual,


            tiempo,


            mundo:
            obtenerMundo()


        };





    }



    catch(error){


        console.log(

            "Error en ciclo:",
            error.message

        );


        return null;


    }


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
