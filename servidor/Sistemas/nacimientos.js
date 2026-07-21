// Sistema de nacimientos de Village Soul

const cargarArchivo = require("./cargador_datos.js");

const crearEvento = require("./eventos.js");

const crearMemoria = require("./memorias.js");

const {
    crearAlma
} = require("./almas.js");

const {
    agregarHijo
} = require("./familias.js");




// =================================
// REGISTRAR NACIMIENTO
// =================================


function registrarNacimiento(
    embarazo_id,
    familia_id,
    datosBebe = {}
){


    const embarazos =
    cargarArchivo("../datos/embarazos.json");



    const tiempo =
    cargarArchivo("../datos/tiempo.json");



    if(!embarazos || !tiempo){

        console.log(
            "No se pudieron cargar datos."
        );

        return null;

    }





    const embarazo =
    embarazos.embarazos.find(

        e=>e.id===embarazo_id

    );





    if(!embarazo){

        console.log(
            "Embarazo no encontrado."
        );

        return null;

    }






    if(
        embarazo.estado === "finalizado"
    ){

        console.log(
            "El nacimiento ya fue registrado."
        );

        return null;

    }







    // =============================
    // CREAR BEBÉ
    // =============================



    const bebe =
    crearAlma({

        nombre:

        datosBebe.nombre
        ||
        "Bebé Village Soul",



        edad:0,



        etapa:

        "bebe",



        personalidad_id:null,



        tipo:"habitante",



        objetivos:[

            "crecer",

            "aprender",

            "formar personalidad"

        ],



        profesion:{

            nombre:"bebé",

            categoria:"infancia",

            nivel:0,

            experiencia:0,

            estado:"inactivo"

        },



        padres:[

            embarazo.madre,

            embarazo.padre

        ]



    });






    if(!bebe){

        return null;

    }







    // =============================
    // FAMILIA
    // =============================



    if(familia_id){


        agregarHijo(

            familia_id,

            bebe.id,

            "biologico"

        );


    }







    // =============================
    // ACTUALIZAR EMBARAZO
    // =============================


    embarazo.estado =
    "finalizado";



    embarazo.estado_final =
    "nacimiento";



    embarazo.bebe_id =
    bebe.id;



    embarazo.fecha_nacimiento =
    {

        dia:
        tiempo.tiempo.dia,

        hora:
        tiempo.tiempo.hora

    };








    // =============================
    // EVENTO MUNDO
    // =============================



    crearEvento(

        10,

        [

            embarazo.madre,

            embarazo.padre,

            bebe.id

        ],

        {

            tipo:
            "nacimiento",

            bebe:
            bebe.nombre

        }

    );








    // =============================
    // MEMORIAS
    // =============================



    crearMemoria(

        embarazo.madre,

        "nacimiento",

        "Nació su bebé: "
        + bebe.nombre,

        "alta",

        [

            bebe.id

        ],

        "amor"

    );





    crearMemoria(

        embarazo.padre,

        "nacimiento",

        "Su hijo nació: "
        + bebe.nombre,

        "alta",

        [

            bebe.id

        ],

        "amor"

    );







    crearMemoria(

        bebe.id,

        "nacimiento",

        "Llegó al mundo de Village Soul.",

        "alta"

    );








    console.log(
        "Nuevo nacimiento:"
    );


    console.log(bebe);




    return bebe;


}





module.exports={

    registrarNacimiento

};
