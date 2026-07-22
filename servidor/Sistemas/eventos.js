// Sistema avanzado de eventos de Village Soul


const cargarArchivo =
require("./cargador_datos.js");


const guardarArchivo =
require("./guardador_datos.js");


const crearMemoria =
require("./memorias.js");


const emociones =
require("./emociones.js");







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



    const eventoBase =
    obtenerEventoBase(id);



    if(!eventoBase){

        console.log(
            "Evento no encontrado:",
            id
        );

        return null;

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


    :


    1;









    const evento = {


        id:nuevoId,


        tipo:eventoBase.tipo,


        nombre:eventoBase.nombre,


        descripcion:eventoBase.descripcion,


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





    guardarArchivo(

        "../datos/eventos.json",

        datosEventos

    );









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



    const datos =
    cargarArchivo(
        "../datos/eventos.json"
    );



    if(!datos){

        return null;

    }





    const evento={


        id:

        Date.now(),



        tipo:"personalizado",



        nombre,


        descripcion,


        participantes,



        importancia,



        fecha:

        new Date().toISOString()



    };






    datos.eventos.push(
        evento
    );




    guardarArchivo(

        "../datos/eventos.json",

        datos

    );






    participantes.forEach(

        habitante_id=>{


            crearMemoria(

                habitante_id,

                "evento",

                descripcion,

                importancia,

                participantes

            );


        }

    );





    return evento;


}








// =================================
// OBTENER HISTORIA DE EVENTOS
// =================================

function obtenerEventos(){


    const datos =
    cargarArchivo(
        "../datos/eventos.json"
    );


    if(!datos){

        return [];

    }



    return datos.eventos;


}







module.exports={


    crearEvento,

    crearEventoPersonalizado,

    obtenerEventos


};
