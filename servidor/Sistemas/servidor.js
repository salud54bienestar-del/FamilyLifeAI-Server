// Servidor principal - Village Soul Engine


const {
    iniciarSoulEngine
}
=
require("./soul_engine.js");



const iniciarMundo =
require("./sistemas/nucleo_mundo.js")
.iniciarMundo;



const ejecutarCiclo =
require("./sistemas/ciclo_mundo.js")
.ejecutarCiclo;



const obtenerResumenMundo =
require("./sistemas/mundo.js")
.obtenerResumenMundo;



const cargarArchivo =
require("./sistemas/cargador_datos.js");






// =================================
// CONFIGURACIÓN
// =================================


const INTERVALO_CICLO = 1000;









// =================================
// INICIAR SERVIDOR
// =================================


function iniciarServidor(){



    console.log("");

    console.log("==============================");

    console.log(
        "      VILLAGE SOUL ENGINE"
    );

    console.log("==============================");





    console.log(
        "Iniciando Soul Engine..."
    );



    iniciarSoulEngine();







    console.log(
        "Iniciando mundo..."
    );



    const mundo =
    iniciarMundo();





    if(!mundo){


        console.log(
            "Error iniciando mundo."
        );


        return null;


    }







    console.log(
        "Motor iniciado correctamente."
    );






    iniciarCicloAutomatico();






    return mundo;



}









// =================================
// CICLO AUTOMÁTICO
// =================================


function iniciarCicloAutomatico(){



    console.log(
        "Ciclo automático activado."
    );






    setInterval(

        ()=>{


            try{


                const resultado =
                ejecutarCiclo();




                if(resultado){


                    console.log(

                        "Ciclo:",
                        resultado

                    );


                }



            }


            catch(error){


                console.log(

                    "Error en ciclo:",
                    error.message

                );


            }




        },


        INTERVALO_CICLO


    );


}









// =================================
// ESTADO SERVIDOR
// =================================


function estadoServidor(){



    return {


        activo:true,



        mundo:
        obtenerResumenMundo(),




        nucleo:

        cargarArchivo(
            "datos/nucleo_mundo.json"
        )



    };


}









if(
    require.main === module
){

    iniciarServidor();

}









module.exports={


    iniciarServidor,


    estadoServidor


};
