// Sistema avanzado de eventos - Village Soul


const cargarArchivo =
require("./cargador_datos.js");


const guardarArchivo =
require("./guardador_datos.js");


const crearMemoria =
require("./memorias.js");


const emociones =
require("./emociones.js");





const MAX_EVENTOS = 10000;







// =================================
// BUSCAR EVENTO BASE
// =================================


function obtenerEventoBase(id){



    const sistema =
    cargarArchivo(
        "../datos/sistema_eventos.json"
    );



    if(!sistema){

        return null;

    }




    return sistema.eventos_disponibles.find(

        evento =>

        evento.id === id ||

        evento.nombre === id

    ) || null;


}









// =================================
// CREAR EVENTO
// =================================


function crearEvento(
    id,
    participantes=[],
    datosExtra={}
){



    let eventoBase =
    obtenerEventoBase(id);





    // Evento genérico si no existe


    if(!eventoBase){


        eventoBase={


            id,


            tipo:"sistema",


            nombre:id,


            descripcion:
            "Evento del mundo generado automáticamente.",


            importancia:"baja",


            emocion:"neutral"


        };


    }







    const datosEventos =
    cargarArchivo(
        "../datos/eventos.json"
    );



    if(!datosEventos){

        return null;

    }





    if(!datosEventos.eventos){

        datosEventos.eventos=[];

    }







    const nuevoId =


    datosEventos.eventos.length > 0


    ?


    Math.max(

        ...datosEventos.eventos.map(
            e=>e.id
        )

    ) + 1


    :1;









    const evento={


        id:nuevoId,


        tipo:

        eventoBase.tipo,



        nombre:

        eventoBase.nombre,



        descripcion:

        eventoBase.descripcion,



        categoria:

        eventoBase.categoria ||
        "general",



        importancia:

        eventoBase.importancia ||
        "media",



        participantes,



        datos:datosExtra,



        fecha:

        new Date().toISOString()


    };








    datosEventos.eventos.push(
        evento
    );







    // Limitar historia


    if(
        datosEventos.eventos.length >
        MAX_EVENTOS
    ){


        datosEventos.eventos.shift();


    }







    guardarArchivo(

        "../datos/eventos.json",

        datosEventos

    );








    // Efectos en habitantes


    participantes.forEach(

        habitante_id=>{


            crearMemoria(

                habitante_id,

                "evento",

                evento.descripcion,

                evento.importancia,

                participantes,

                eventoBase.emocion ||
                "neutral"

            );







            if(eventoBase.efectos){



                Object.keys(
                    eventoBase.efectos
                )
                .forEach(

                    emocion=>{


                        emociones.cambiarEmocion(

                            habitante_id,

                            emocion,

                            eventoBase.efectos[emocion],

                            evento.nombre

                        );


                    }

                );


            }



        }

    );







    return evento;


}









// =================================
// EVENTO PERSONALIZADO
// =================================


function crearEventoPersonalizado(
nombre,
participantes=[],
descripcion="",
importancia="media"
){



    return crearEvento(

        nombre,

        participantes,

        {


            descripcion,


            personalizado:true


        }

    );


}









// =================================
// OBTENER EVENTOS
// =================================


function obtenerEventos(){



    const datos =
    cargarArchivo(
        "../datos/eventos.json"
    );



    if(!datos){

        return [];

    }



    return datos.eventos || [];


}









module.exports={


    crearEvento,


    crearEventoPersonalizado,


    obtenerEventos,


    obtenerEventoBase


};
