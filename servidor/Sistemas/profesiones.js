// =================================
// OBTENER LUGAR DE TRABAJO
// =================================

function obtenerLugarTrabajo(profesion){


    const lugares =
    cargarArchivo("../datos/lugares_trabajo.json");



    if(!lugares){

        console.log(
            "No se pudieron cargar los lugares de trabajo."
        );

        return null;

    }





    const lugar =

    lugares.lugares_trabajo.find(

        l =>

        l.profesiones.includes(
            profesion
        )

    );





    return lugar || null;


}
