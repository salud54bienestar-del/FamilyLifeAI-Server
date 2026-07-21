// Sistema de memorias de Village Soul


const cargarArchivo =
require("./cargador_datos.js");






// =================================
// CREAR MEMORIA
// =================================

function crearMemoria(
    habitante_id,
    tipo,
    descripcion,
    importancia="baja",
    personas=[],
    emocion="neutral"
){



    const datos =
    cargarArchivo("../datos/memorias.json");



    if(!datos){

        console.log(
            "No se pudieron cargar las memorias."
        );

        return null;

    }



    if(!datos.memorias){

        datos.memorias = [];

    }






    const nuevoId =


    datos.memorias.length > 0


    ?


    Math.max(
        ...datos.memorias.map(
            m=>m.id
        )
    ) + 1


    :


    1;








    let impacto =
    "ninguno";



    switch(importancia){


        case "alta":

            impacto="fuerte";

        break;



        case "media":

            impacto="moderado";

        break;



        case "baja":

            impacto="leve";

        break;


    }








    const memoria = {



        id:
        nuevoId,



        habitante_id,



        tipo,



        descripcion,



        importancia,



        emocion,



        personas_relacionadas:
        personas,



        impacto_comportamiento:
        impacto,



        fecha:
        new Date().toISOString()



    };








    datos.memorias.push(
        memoria
    );





    console.log(
        "Nueva memoria creada:",
        memoria
    );





    return memoria;


}








// =================================
// OBTENER MEMORIAS DE HABITANTE
// =================================

function obtenerMemorias(
    habitante_id
){



    const datos =
    cargarArchivo("../datos/memorias.json");



    if(!datos){

        return [];

    }





    return datos.memorias.filter(

        memoria =>
        memoria.habitante_id === habitante_id

    );


}








// =================================
// BUSCAR MEMORIAS POR TIPO
// =================================

function buscarMemoriasTipo(
    habitante_id,
    tipo
){



    return obtenerMemorias(
        habitante_id
    )
    .filter(

        memoria =>
        memoria.tipo === tipo

    );


}








// =================================
// OBTENER ÚLTIMA MEMORIA
// =================================

function ultimaMemoria(
    habitante_id
){



    const memorias =
    obtenerMemorias(
        habitante_id
    );



    if(
        memorias.length === 0
    ){

        return null;

    }



    return memorias[
        memorias.length - 1
    ];



}







module.exports={


    crearMemoria,

    obtenerMemorias,

    buscarMemoriasTipo,

    ultimaMemoria


};
