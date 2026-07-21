// Sistema de eventos de Village Soul


const cargarArchivo =
require("./cargador_datos.js");


const crearMemoria =
require("./memorias.js");


const emociones =
require("./emociones.js");







// =================================
// CREAR EVENTO
// =================================

function crearEvento(
    id,
    participantes=[],
    datosExtra={}
){



    const sistemaEventos =
    cargarArchivo(
        "../datos/sistema_eventos.json"
    );



    if(!sistemaEventos){

        console.log(
            "No se pudo cargar el sistema de eventos."
        );

        return null;

    }





    const eventoBase =
    sistemaEventos.eventos_disponibles.find(

        evento =>
        evento.id === id

    );





    if(!eventoBase){

        console.log(
            "Evento no encontrado:",
            id
        );

        return null;

    }








    const evento = {



        id,



        nombre:
        eventoBase.nombre,



        descripcion:
        eventoBase.descripcion,



        tipo:
        eventoBase.tipo,



        fecha:
        new Date().toISOString(),



        participantes,



        datos:
        datosExtra,



        importancia:
        eventoBase.importancia ||
        "media"



    };






    console.log(
        "Nuevo evento creado:",
        evento.nombre
    );








    participantes.forEach(

        habitante_id => {



            // =========================
            // MEMORIA
            // =========================


            crearMemoria(

                habitante_id,

                "evento",

                evento.descripcion,

                evento.importancia,

                participantes,

                eventoBase.emocion ||
                "neutral"

            );








            // =========================
            // EMOCIONES
            // =========================


            if(
                eventoBase.efectos
            ){



                Object.keys(
                    eventoBase.efectos
                )
                .forEach(

                    emocion => {



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
// EVENTOS PERSONALIZADOS
// =================================

function crearEventoPersonalizado(
    nombre,
    participantes=[],
    descripcion="",
    importancia="media"
){



    const evento = {



        nombre,



        descripcion,



        participantes,



        fecha:
        new Date().toISOString(),



        importancia



    };





    participantes.forEach(

        habitante_id => {



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








module.exports={


    crearEvento,

    crearEventoPersonalizado


};
