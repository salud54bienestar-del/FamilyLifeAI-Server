// Sistema avanzado de familias - Village Soul


const cargarArchivo = require("./cargador_datos.js");

const crearEvento = require("./eventos.js");

const crearMemoria = require("./memorias.js");

const {
    obtenerEtapaHabitante
} = require("./etapas_vida.js");




// =================================
// OBTENER TIEMPO DEL MUNDO
// =================================

function obtenerFechaMundo(){


    const tiempo =
    cargarArchivo("../datos/tiempo.json");


    if(!tiempo){

        return null;

    }


    return {

        dia:
        tiempo.tiempo.dia,


        mes:
        tiempo.tiempo.mes,


        año:
        tiempo.tiempo.año

    };

}




// =================================
// VERIFICAR SI PUEDE FORMAR FAMILIA
// =================================

function puedeFormarFamilia(habitante){


    if(!habitante){

        return false;

    }


    const etapa =
    obtenerEtapaHabitante(
        habitante
    );


    if(!etapa){

        return false;

    }


    return (

        etapa.nombre === "adulto"

        ||

        etapa.nombre === "adulto_mayor"

    );

}





// =================================
// CREAR FAMILIA
// =================================

function crearFamilia(
    apellido="",
    tipo="nuclear"
){


    const datos =
    cargarArchivo("../datos/familias.json");


    if(!datos){

        return null;

    }



    const nuevoId =

    datos.familias.length > 0

    ?

    Math.max(
        ...datos.familias.map(
            f=>f.id
        )
    ) + 1

    :

    1;




    const familia = {


        id:nuevoId,


        apellido,


        miembros:[],


        padres:[],


        hijos:[],



        generacion:1,


        tipo_familia:tipo,


        estado:"activa",



        hogar:null,



        estabilidad:{


            confianza:50,


            felicidad:50,


            recursos:0


        },



        recursos_compartidos:{


            alimentos:0,


            esmeraldas:0


        },



        reputacion:0,



        historial:[


            {

                evento:"familia_creada",

                fecha:
                obtenerFechaMundo()

            }


        ]


    };




    datos.familias.push(
        familia
    );




    crearEvento(

        "familia_creada",

        [],

        {

            familia_id:
            nuevoId

        }

    );



    return familia;

}






// =================================
// CREAR FAMILIA POR MATRIMONIO
// =================================

function crearFamiliaMatrimonio(
    habitante_a,
    habitante_b,
    apellido=""
){


    const almas =
    cargarArchivo("../datos/almas.json");


    if(!almas){

        return null;

    }



    const personaA =
    almas.almas.find(
        a=>a.id===habitante_a
    );


    const personaB =
    almas.almas.find(
        a=>a.id===habitante_b
    );



    if(
        !puedeFormarFamilia(personaA)
        ||
        !puedeFormarFamilia(personaB)
    ){


        console.log(
            "No pueden formar una familia todavía."
        );


        return null;

    }





    const datos =
    cargarArchivo("../datos/familias.json");


    if(!datos){

        return null;

    }





    const existente =
    datos.familias.find(

        familia =>

        familia.miembros.includes(habitante_a)
        &&
        familia.miembros.includes(habitante_b)

    );



    if(existente){

        return existente;

    }





    const familia =
    crearFamilia(
        apellido,
        "matrimonio"
    );




    agregarMiembro(

        familia.id,

        habitante_a,

        "padre"

    );



    agregarMiembro(

        familia.id,

        habitante_b,

        "madre"

    );





    familia.historial.push({

        evento:"matrimonio",

        fecha:
        obtenerFechaMundo()

    });



    return familia;

}






// =================================
// AGREGAR MIEMBRO
// =================================

function agregarMiembro(
    idFamilia,
    habitante_id,
    rol="miembro"
){


    const datos =
    cargarArchivo("../datos/familias.json");


    if(!datos){

        return null;

    }



    const familia =
    datos.familias.find(

        f=>f.id===idFamilia

    );



    if(!familia){

        return null;

    }




    if(
        !familia.miembros.includes(habitante_id)
    ){

        familia.miembros.push(
            habitante_id
        );

    }




    if(
        rol==="padre"
        ||
        rol==="madre"
    ){


        familia.padres.push({

            habitante_id,

            rol

        });


    }



    crearMemoria(

        habitante_id,

        "familia",

        "Forma parte de una familia.",

        "alta"

    );



    return familia;

}






// =================================
// AGREGAR HIJO
// =================================

function agregarHijo(
    idFamilia,
    hijo_id,
    tipo="biologico"
){


    const familia =
    obtenerFamiliaPorId(
        idFamilia
    );


    if(!familia){

        return null;

    }



    familia.hijos.push({

        habitante_id:hijo_id,

        tipo,

        fecha:
        obtenerFechaMundo()

    });



    agregarMiembro(

        idFamilia,

        hijo_id,

        "hijo"

    );



    crearEvento(

        "nuevo_hijo",

        familia.miembros,

        {

            familia_id:idFamilia,

            hijo:hijo_id

        }

    );



    return familia;

}







// =================================
// OBTENER FAMILIA
// =================================

function obtenerFamilia(
    habitante_id
){


    const datos =
    cargarArchivo("../datos/familias.json");


    if(!datos){

        return null;

    }



    return datos.familias.find(

        f=>f.miembros.includes(
            habitante_id
        )

    ) || null;


}






function obtenerFamiliaPorId(id){


    const datos =
    cargarArchivo("../datos/familias.json");


    if(!datos){

        return null;

    }



    return datos.familias.find(

        f=>f.id===id

    ) || null;


}






function listarFamilias(){


    const datos =
    cargarArchivo("../datos/familias.json");


    if(!datos){

        return [];

    }


    return datos.familias;


}







module.exports = {


    crearFamilia,

    crearFamiliaMatrimonio,

    agregarMiembro,

    agregarHijo,

    obtenerFamilia,

    obtenerFamiliaPorId,

    listarFamilias,

    puedeFormarFamilia


};
