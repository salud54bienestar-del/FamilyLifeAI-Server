// ==========================================
// Sistema avanzado de memorias
// Village Soul v2.1
// ==========================================


const cargarArchivo =
require("./cargador_datos.js");

const guardarArchivo =
require("./guardador_datos.js");

const reloj =
require("./reloj_mundo.js");



// ==========================================
// GENERAR ID SEGURO
// ==========================================


function generarId(datos){


    if(
        !datos ||
        !Array.isArray(datos.memorias) ||
        datos.memorias.length === 0
    ){

        return 1;

    }


    const ids = datos.memorias

    .map(
        memoria => Number(memoria.id) || 0
    );


    return Math.max(...ids) + 1;


}






// ==========================================
// FECHA DEL MUNDO
// ==========================================


function obtenerFechaMundo(){


    if(
        reloj &&
        typeof reloj.obtenerFecha === "function"
    ){

        return reloj.obtenerFecha();

    }


    return {

        año:1,

        estacion:"primavera",

        dia:1,

        hora:8

    };


}






// ==========================================
// CATEGORÍA EMOCIONAL
// ==========================================


function obtenerCategoria(emocion){


    const positivas = [

        "felicidad",
        "amor",
        "orgullo",
        "esperanza",
        "motivacion",
        "calma"

    ];


    const negativas = [

        "tristeza",
        "miedo",
        "ira",
        "estres",
        "soledad"

    ];



    if(
        positivas.includes(emocion)
    ){

        return "positiva";

    }



    if(
        negativas.includes(emocion)
    ){

        return "negativa";

    }



    return "neutral";


}






// ==========================================
// INFLUENCIA
// ==========================================


function calcularInfluencia(importancia){


    const valores = {


        muy_alta:100,

        alta:90,

        media:60,

        baja:30


    };


    return valores[importancia] || 20;


}






// ==========================================
// CREAR MEMORIA
// ==========================================


function crearMemoria(

habitante_id,

tipo,

descripcion,

importancia="baja",

personas=[],

emocion="neutral",

lugar=null,

efecto={},

aprendizaje=null,

origen="evento",

grupo_memoria=null,

ubicacion=null

){



    const datos =

    cargarArchivo(
        "../datos/memorias.json"
    );



    if(!datos){

        console.log(
            "No existe archivo de memorias."
        );

        return null;

    }




    if(
        !Array.isArray(datos.memorias)
    ){

        datos.memorias=[];

    }




    const memoria = {


        id:
        generarId(datos),



        habitante_id,



        tipo:
        tipo || "general",



        descripcion:
        descripcion || "Sin descripción",



        importancia,



        influencia:
        calcularInfluencia(
            importancia
        ),



        categoria:
        obtenerCategoria(
            emocion
        ),



        emocion,



        personas_relacionadas:
        Array.isArray(personas)
        ?
        personas
        :
        [],



        lugar_relacionado:lugar,



        ubicacion,



        origen,



        grupo_memoria,



        efecto_personalidad:{


            confianza:
            efecto.confianza || 0,


            miedo:
            efecto.miedo || 0,


            felicidad:
            efecto.felicidad || 0,


            tristeza:
            efecto.tristeza || 0,


            respeto:
            efecto.respeto || 0,


            valentia:
            efecto.valentia || 0


        },



        aprendizaje:
        aprendizaje || "ninguno",




        impacto_comportamiento:

        importancia==="muy_alta"
        ?
        "permanente"

        :

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


        estado:"activa",


        favorita:false,


        veces_recordada:0,



        fecha_real:
        new Date().toISOString(),



        fecha_mundo:
        obtenerFechaMundo()


    };





    datos.memorias.push(
        memoria
    );





    console.log(
        "MEMORIA GUARDADA"
    );


    console.log(
        "ID:",
        memoria.id
    );


    console.log(
        "TOTAL:",
        datos.memorias.length
    );






    guardarArchivo(

        "../datos/memorias.json",

        datos

    );




    return memoria;


}







// ==========================================
// OBTENER MEMORIAS
// ==========================================


function obtenerMemorias(habitante_id){



    const datos =

    cargarArchivo(
        "../datos/memorias.json"
    );



    if(
        !datos ||
        !Array.isArray(datos.memorias)
    ){

        return [];

    }




    return datos.memorias

    .filter(

        memoria =>

        memoria.habitante_id === habitante_id

    )

    .sort(

        (a,b)=>

        new Date(a.fecha_real)

        -

        new Date(b.fecha_real)

    );


}






// ==========================================
// BUSCADORES
// ==========================================


function buscarMemoriasTipo(
habitante_id,
tipo
){

    return obtenerMemorias(habitante_id)

    .filter(

        memoria =>

        memoria.tipo === tipo

    );


}



function buscarMemoriasPersona(
habitante_id,
persona_id
){


    return obtenerMemorias(habitante_id)

    .filter(

        memoria =>

        memoria.personas_relacionadas

        .includes(persona_id)

    );


}




function buscarMemoriasEmocion(
habitante_id,
emocion
){


    return obtenerMemorias(habitante_id)

    .filter(

        memoria =>

        memoria.emocion === emocion

    );


}







// ==========================================
// EXPORTAR
// ==========================================


module.exports={


crearMemoria,


obtenerMemorias,


buscarMemoriasTipo,


buscarMemoriasPersona,


buscarMemoriasEmocion,


generarId


};
