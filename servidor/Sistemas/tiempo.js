// Actualización de vida de habitantes con tiempo Minecraft

function actualizarVidaHabitantes() {


    console.log("=================================");
    console.log(" ACTUALIZANDO VIDA HABITANTES ");
    console.log("=================================");



    const almas =
    cargarArchivo("../datos/almas.json");



    const tiempoDatos =
    cargarArchivo("../datos/tiempo.json");



    if(!almas || !tiempoDatos){


        console.log(
            "No se pudieron cargar datos de vida."
        );


        return;

    }



    const tiempo =
    tiempoDatos.tiempo;



    /*
    Minecraft:
    
    1 día completo = 20 minutos
    
    0-5  amanecer
    5-15 día
    15-18 atardecer
    18-20 noche

    */



    let periodo;



    if(tiempo.minuto < 5){

        periodo = "amanecer";

    }

    else if(tiempo.minuto < 15){

        periodo = "dia";

    }

    else if(tiempo.minuto < 18){

        periodo = "atardecer";

    }

    else{

        periodo = "noche";

    }





    console.log(
        "Periodo Minecraft:",
        periodo
    );





    almas.almas.forEach((habitante)=>{



        if(
            habitante.estado !== "viviendo"
        ){

            return;

        }





        const profesion =
        habitante.profesion;



        if(!profesion){

            return;

        }





        const lugarTrabajo =
        obtenerLugarTrabajo(
            habitante.id
        );






        // =========================
        // HORARIO DE TRABAJO
        // =========================


        if(
            periodo === "dia"
            &&
            lugarTrabajo
        ){



            console.log(

                habitante.nombre +
                " está trabajando en " +
                lugarTrabajo.nombre

            );




            profesion.experiencia += 1;




            crearMemoria(

                habitante.id,

                "trabajo",

                "Trabajó como " +
                profesion.nombre,

                "media"

            );





            if(
                profesion.experiencia >= 100
            ){


                profesion.nivel++;


                profesion.experiencia = 0;



                crearEvento(

                    "subida_nivel_profesion",

                    [
                        habitante.id
                    ],

                    {

                        profesion:
                        profesion.nombre,

                        nivel:
                        profesion.nivel

                    }

                );


            }



        }





        // =========================
        // DESCANSO
        // =========================


        if(
            periodo === "noche"
        ){



            console.log(

                habitante.nombre +
                " está descansando."

            );



            if(
                habitante.emociones
            ){


                habitante.emociones.calma += 1;


                if(
                    habitante.emociones.calma > 100
                ){

                    habitante.emociones.calma = 100;

                }

            }



        }






        // =========================
        // NECESIDADES FUTURAS
        // =========================


        /*
        
        Próximas conexiones:

        - hambre
        - energía
        - embarazo
        - cumpleaños
        - relaciones
        - hijos
        - envejecimiento opcional
        - eventos
        
        */



    });




    console.log(
        "Vida actualizada correctamente."
    );


}
