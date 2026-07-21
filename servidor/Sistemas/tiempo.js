function actualizarVidaHabitantes() {

    console.log("Actualizando vida de habitantes...");


    const almas = cargarArchivo("../datos/almas.json");


    if (!almas) {

        console.log("No se pudieron cargar los habitantes.");

        return;

    }



    const tiempo =
        cargarArchivo("../datos/tiempo.json").tiempo;



    almas.almas.forEach((habitante) => {


        if (!habitante.profesion) {

            return;

        }



        const trabajo =
            obtenerLugarTrabajo(habitante.id);



        if (trabajo) {

            console.log(
                habitante.nombre +
                " trabaja en " +
                trabajo.nombre
            );

        }



        // Aquí después conectaremos:
        // entrada al trabajo
        // salida del trabajo
        // tareas
        // experiencia
        // salario

    });


}
