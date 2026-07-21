// Actualización diaria de vida de habitantes

const cargarArchivo = require("./cargador_datos.js");
const obtenerLugarTrabajo = require("./profesiones.js").obtenerLugarTrabajo;

const {
    avanzarEmbarazos
} = require("./embarazo.js");



function actualizarVidaHabitantes() {


    console.log(
        "================================="
    );

    console.log(
        " ACTUALIZANDO VIDA HABITANTES "
    );

    console.log(
        "================================="
    );





    const almas =
    cargarArchivo("../datos/almas.json");



    const tiempo =
    cargarArchivo("../datos/tiempo.json");



    if(
        !almas ||
        !tiempo
    ){

        console.log(
            "No se pudieron cargar los datos."
        );

        return null;

    }






    almas.almas.forEach(

        habitante => {



            if(
                habitante.estado !== "viviendo"
            ){

                return;

            }






            // ==========================
            // PROFESIONES
            // ==========================


            if(
                habitante.profesion
            ){


                const trabajo =
                obtenerLugarTrabajo(
                    habitante.profesion.nombre
                );



                if(trabajo){


                    console.log(

                        habitante.nombre +

                        " trabaja en " +

                        trabajo.nombre

                    );



                    // Futuro:
                    // ganar experiencia
                    // realizar tareas
                    // recibir salario
                    // relacionarse con compañeros


                }


            }






            // ==========================
            // NECESIDADES
            // ==========================


            // Futuro:
            // hambre
            // energía
            // diversión
            // relaciones
            // emociones





        }

    );





    // ==========================
    // EMBARAZOS
    // ==========================


    avanzarEmbarazos();






    console.log(

        "Día Village Soul:",

        tiempo.tiempo.dia_mundo

    );



}






module.exports = actualizarVidaHabitantes;
