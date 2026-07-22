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
    emocion="neutral",
    lugar=null,
    efecto={}
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






    let influencia;



    switch(importancia){


        case "alta":

            influencia=90;

        break;



        case "media":

            influencia=60;

        break;



        default:

            influencia=30;

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



        influencia,



        categoria,



        emocion,



        personas_relacionadas:
        personas,



        lugar_relacionado:
        lugar,



        efecto_personalidad:{


            confianza:
            efecto.confianza || 0,


            miedo:
            efecto.miedo || 0,


            felicidad:
            efecto.felicidad || 0,


            tristeza:
            efecto.tristeza || 0


        },



        impacto_comportamiento:

        importancia==="alta"

        ?

        "fuerte"

        :

        importancia==="media"

        ?

        "moderado"

        :

        "leve",




        fuerza_recuerdo:100,



        recordada:true,



        fecha:
        new Date().toISOString()


    };







    datos.memorias.push(
        memoria
    );





    // Limitar cantidad de memoria

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



    if(!datos || !datos.memorias){

        return [];

    }





    return datos.memorias.filter(

        memoria =>

        memoria.habitante_id===habitante_id

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

        memoria=>

        memoria.tipo===tipo

    );


}









// =================================
// BUSCAR POR PERSONA
// =================================

function buscarMemoriasPersona(
    habitante_id,
    persona_id
){


    return obtenerMemorias(
        habitante_id
    )

    .filter(

        memoria =>

        memoria.personas_relacionadas.includes(
            persona_id
        )

    );


}









// =================================
// RECUERDOS IMPORTANTES
// =================================

function obtenerRecuerdosImportantes(
    habitante_id
){


    return obtenerMemorias(
        habitante_id
    )

    .filter(

        memoria =>

        memoria.influencia >= 80

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
// EVOLUCIÓN DE MEMORIA
// =================================

function evolucionarMemorias(){




    const datos =

    cargarArchivo(
        "../datos/memorias.json"
    );




    if(!datos){

        return null;

    }





    datos.memorias.forEach(

        memoria=>{


            let perdida=1;



            if(
                memoria.importancia==="alta"
            ){

                perdida=0.2;

            }


            if(
                memoria.importancia==="media"
            ){

                perdida=0.5;

            }



            memoria.fuerza_recuerdo -= perdida;



            if(
                memoria.fuerza_recuerdo <=0
            ){

                memoria.recordada=false;

            }


        }

    );





    guardarArchivo(

        "../datos/memorias.json",

        datos

    );




    return true;


}









// =================================
// ELIMINAR MEMORIA
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


    buscarMemoriasPersona,


    obtenerRecuerdosImportantes,


    ultimaMemoria,


    evolucionarMemorias,


    eliminarMemoria


};
