// Sistema avanzado de nacimientos de Village Soul


const cargarArchivo =
require("./cargador_datos.js");


const guardarArchivo =
require("./guardador_datos.js");


const crearEvento =
require("./eventos.js");


const crearMemoria =
require("./memorias.js");



const {
    crearAlma
}
=
require("./almas.js");



const {
    agregarHijo
}
=
require("./familias.js");



const {
    crearNecesidades
}
=
require("./necesidades.js");



const {
    crearEmocion
}
=
require("./emociones.js");





// =================================
// TEMPERAMENTO
// =================================

function generarTemperamento(){


    const lista=[

        "tranquilo",

        "curioso",

        "activo",

        "sensible",

        "cariñoso",

        "reservado"

    ];


    return lista[
        Math.floor(
            Math.random()*lista.length
        )
    ];

}







// =================================
// REGISTRAR NACIMIENTO
// =================================

function registrarNacimiento(
    embarazo_id,
    familia_id,
    datosBebe={}
){



    const embarazos =
    cargarArchivo(
        "../datos/embarazos.json"
    );


    const tiempo =
    cargarArchivo(
        "../datos/tiempo.json"
    );



    if(
        !embarazos ||
        !tiempo
    ){

        return null;

    }






    const embarazo =
    embarazos.embarazos.find(

        e=>e.id===embarazo_id

    );




    if(!embarazo){

        console.log(
            "No existe embarazo."
        );

        return null;

    }






    if(
        embarazo.estado==="finalizado"
    ){

        console.log(
            "Este nacimiento ya fue registrado."
        );

        return null;

    }






    const temperamento =
    generarTemperamento();








    // =================================
    // CREAR ALMA DEL BEBÉ
    // =================================



    const bebe =
    crearAlma({


        nombre:

        datosBebe.nombre ||
        "Nuevo habitante",



        edad:0,



        tipo:
        "habitante",



        temperamento,



        rasgos_iniciales:[

            temperamento

        ],




        padres:[

            embarazo.madre,

            embarazo.padre

        ],



        objetivos:[

            "crecer",

            "aprender",

            "crear vínculos"

        ],




        profesion:{

            nombre:"ninguna",

            categoria:"infancia",

            nivel:0,

            experiencia:0,

            estado:"inactivo"

        }



    });







    if(!bebe){

        return null;

    }








    // =================================
    // FAMILIA
    // =================================



    if(familia_id){


        agregarHijo(

            familia_id,

            bebe.id,

            "biologico"

        );


    }









    // =================================
    // NECESIDADES DEL BEBÉ
    // =================================


    crearNecesidades(

        bebe.id,

        "bebe"

    );








    // =================================
    // EMOCIONES DEL BEBÉ
    // =================================


    crearEmocion(

        bebe.id

    );








    // =================================
    // ACTUALIZAR EMBARAZO
    // =================================



    embarazo.estado =
    "finalizado";


    embarazo.estado_final =
    "nacimiento";


    embarazo.bebe_id =
    bebe.id;



    embarazo.fecha_nacimiento={


        dia:
        tiempo.tiempo.dia,


        mes:
        tiempo.tiempo.mes,


        año:
        tiempo.tiempo.año


    };








    guardarArchivo(

        "../datos/embarazos.json",

        embarazos

    );








    // =================================
    // EVENTOS
    // =================================



    crearEvento(

        "nacimiento",

        [

            embarazo.madre,

            embarazo.padre,

            bebe.id

        ],

        {

            nombre:
            bebe.nombre,


            temperamento,


            familia_id

        }

    );








    // =================================
    // MEMORIAS
    // =================================



    crearMemoria(

        embarazo.madre,

        "nacimiento",

        "Nació su bebé: "+
        bebe.nombre,

        "alta"

    );





    crearMemoria(

        embarazo.padre,

        "nacimiento",

        "Nació su hijo: "+
        bebe.nombre,

        "alta"

    );






    crearMemoria(

        bebe.id,

        "origen",

        "Nació dentro del mundo de Village Soul con temperamento "+temperamento,

        "alta"

    );








    console.log(
        "Nacimiento creado:"
    );


    console.log(
        bebe
    );






    return bebe;


}








module.exports={


    registrarNacimiento


};
