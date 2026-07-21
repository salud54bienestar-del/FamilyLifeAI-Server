// Sistema de familias de Village Soul

const cargarArchivo = require("./cargador_datos.js");
const crearEvento = require("./eventos.js");
const crearMemoria = require("./memorias.js");



// =================================
// CREAR FAMILIA
// =================================

function crearFamilia(
    apellido = "",
    tipo = "nuclear"
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
        ...datos.familias.map(f=>f.id)
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



        custodia:{},



        hogar:null,



        estabilidad:{

            confianza:0,

            felicidad:50,

            recursos:0

        },



        recursos_compartidos:{


            alimentos:0,

            esmeraldas:0


        },



        reputacion:0,



        historial:[

            "Familia creada"

        ],



        relaciones_familiares:[]


    };




    datos.familias.push(familia);



    crearEvento(

        2,

        [],

        {

            sistema:"familias",

            accion:"crear_familia",

            familia_id:familia.id

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



    const datos =
    cargarArchivo("../datos/familias.json");



    if(!datos){

        return null;

    }



    const existente =
    datos.familias.find(

        f=>

        f.miembros.includes(habitante_a)

        &&

        f.miembros.includes(habitante_b)

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



    familia.historial.push(
        "Familia creada por matrimonio"
    );



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
        !familia.miembros.includes(
            habitante_id
        )
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

        "Se integró a una familia.",

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
    tipo="adoptado"
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



    familia.hijos.push({

        habitante_id:hijo_id,

        tipo,

        fecha:
        new Date().toISOString()

    });



    if(
        !familia.miembros.includes(hijo_id)
    ){

        familia.miembros.push(hijo_id);

    }




    familia.historial.push(

        "Nuevo hijo agregado mediante "
        + tipo

    );



    crearEvento(

        8,

        familia.miembros,

        {

            accion:"nuevo_hijo",

            tipo

        }

    );



    return familia;

}






// =================================
// ASIGNAR HOGAR
// =================================

function asignarHogar(
    idFamilia,
    hogar
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



    familia.hogar = hogar;



    return familia;

}






function obtenerFamilia(habitante_id){


    const datos =
    cargarArchivo("../datos/familias.json");



    if(!datos){

        return null;

    }



    return datos.familias.find(

        f=>
        f.miembros.includes(habitante_id)

    );


}




module.exports={


    crearFamilia,

    crearFamiliaMatrimonio,

    agregarMiembro,

    agregarHijo,

    asignarHogar,

    obtenerFamilia


};
