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
// CREAR NACIMIENTO
// =================================

function registrarNacimiento(
    embarazo_id,
    familia_id,
    datosBebe = {}
){


    const embarazos =
    cargarArchivo("../datos/embarazos.json");



    if(!embarazos){

        console.log(
            "No se pudieron cargar embarazos."
        );

        return null;

    }




    const embarazo =

    embarazos.embarazos.find(

        e => e.id === embarazo_id

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
            "Este embarazo ya terminó."
        );

        return null;

    }






    // ==============================
    // CREAR NUEVA ALMA
    // ==============================


    const bebe = crearAlma({

        nombre:
        datosBebe.nombre ||
        "Bebé Village Soul",



        edad:0,



        personalidad_id:
        null,



        tipo:
        "habitante",



        objetivos:[

            "crecer",

            "aprender",

            "conocer el mundo"

        ],



        profesion:{

            nombre:"bebé",

            nivel:0,

            experiencia:0,

            estado:"inactivo"

        }


    });






    if(!bebe){

        return null;

    }







    // ==============================
    // AGREGAR A FAMILIA
    // ==============================


    if(familia_id){


        agregarHijo(

            familia_id,

            bebe.id,

            "biologico"

        );


    }






    // ==============================
    // FINALIZAR EMBARAZO
    // ==============================


    embarazo.estado =
    "finalizado";


    embarazo.estado_final =
    "nacimiento";


    embarazo.bebe_id =
    bebe.id;








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







    crearMemoria(

        embarazo.madre,

        "nacimiento",

        "Tuvo un bebé llamado " + bebe.nombre,

        "alta",

        [

            bebe.id

        ],

        "amor"

    );





    crearMemoria(

        embarazo.padre,

        "nacimiento",

        "Su hijo nació: " + bebe.nombre,

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
        "Nacimiento registrado:"
    );


    console.log(bebe);




    return bebe;


}







module.exports={


    registrarNacimiento


};
