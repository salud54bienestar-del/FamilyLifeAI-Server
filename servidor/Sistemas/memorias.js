// Sistema avanzado de memorias de Village Soul


const cargarArchivo =
require("./cargador_datos.js");


const guardarArchivo =
require("./guardador_datos.js");





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
            "No se pudieron cargar memorias."
        );

        return null;

    }




    if(!datos.memorias){

        datos.memorias=[];

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







    let impacto;



    switch(importancia){


        case "alta":

            impacto="fuerte";

        break;



        case "media":

            impacto="moderado";

        break;



        default:

            impacto="leve";

        break;


    }







    let categoria;



    if(
        emocion==="felicidad" ||
        emocion==="amor" ||
        emocion==="orgullo"
    ){

        categoria="positiva";

    }

    else if(

        emocion==="tristeza" ||
        emocion==="miedo" ||
        emocion==="ira" ||
        emocion==="estres"

    ){

        categoria="negativa";

    }

    else{

        categoria="neutral";

    }







    const memoria={


        id:nuevoId,


        habitante_id,


        tipo,


        descripcion,


        importancia,


        categoria,


        emocion,



        personas_relacionadas:
        personas,



        impacto_comportamiento:
        impacto,



        recordada:true,



        fecha:
        new Date().toISOString()



    };








    datos.memorias.push(
        memoria
    );







    // Limitar recuerdos para evitar exceso

    if(datos.memorias.length > 5000){

        datos.memorias.shift();

    }







    guardarArchivo(

        "../datos/memorias.json",

        datos

    );







    return memoria;


}









// =================================
// OBTENER MEMORIAS
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
// BUSCAR POR TIPO
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
        memoria.tipo===tipo

    );


}









// =================================
// OBTENER RECUERDOS IMPORTANTES
// =================================

function obtenerRecuerdosImportantes(
    habitante_id
){


    return obtenerMemorias(
        habitante_id
    )
    .filter(

        memoria =>

        memoria.importancia==="alta"

    );


}









// =================================
// ÚLTIMA MEMORIA
// =================================

function ultimaMemoria(
    habitante_id
){


    const memorias =
    obtenerMemorias(
        habitante_id
    );



    if(
        memorias.length===0
    ){

        return null;

    }



    return memorias[
        memorias.length-1
    ];


}









// =================================
// LIMPIAR MEMORIAS
// =================================

function eliminarMemoria(
    id
){


    const datos =
    cargarArchivo("../datos/memorias.json");


    if(!datos){

        return false;

    }



    datos.memorias =
    datos.memorias.filter(

        m=>m.id!==id

    );



    guardarArchivo(

        "../datos/memorias.json",

        datos

    );



    return true;


}







module.exports={


    crearMemoria,

    obtenerMemorias,

    buscarMemoriasTipo,

    obtenerRecuerdosImportantes,

    ultimaMemoria,

    eliminarMemoria


};
