// Sistema de nacimientos de Village Soul


const cargarArchivo =
require("./cargador_datos.js");


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
// TEMPERAMENTOS INICIALES
// =================================


function generarTemperamento(){


    const lista = [

        "tranquilo",

        "curioso",

        "activo",

        "sensible",

        "cariñoso",

        "reservado"

    ];



    return lista[
        Math.floor(
            Math.random() * lista.length
        )
    ];

}





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
            "Embarazo no encontrado."
        );

        return null;

    }





    if(
        embarazo.estado === "finalizado"
    ){

        console.log(
            "Nacimiento ya registrado."
        );

        return null;

    }







    const temperamento =
    generarTemperamento();







    // =============================
    // CREAR ALMA DEL BEBÉ
    // =============================



    const bebe =
    crearAlma({

        nombre:

        datosBebe.nombre ||
        "Bebé Village Soul",



        edad:0,



        etapa:

        "bebe",



        tipo:

        "habitante",




        temperamento,



        personalidad_id:

        null,



        rasgos_iniciales:[

            temperamento

        ],




        objetivos:[

            "crecer",

            "aprender",

            "crear vínculos"

        ],




        profesion:{

            nombre:
            "bebé",

            categoria:
            "infancia",

            nivel:0,

            experiencia:0,

            estado:
            "inactivo"

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
    // CREAR FAMILIA
    // =============================



    if(familia_id){


        agregarHijo(

            familia_id,

            bebe.id,

            "biologico"

        );


    }









    // =============================
    // NECESIDADES INICIALES
    // =============================



    crearNecesidades(

        bebe.id

    );







    // =============================
    // EMOCIONES INICIALES
    // =============================



    crearEmocion(

        bebe.id

    );









    // =============================
    // FINALIZAR EMBARAZO
    // =============================



    embarazo.estado =
    "finalizado";


    embarazo.estado_final =
    "nacimiento";


    embarazo.bebe_id =
    bebe.id;



    embarazo.fecha_nacimiento = {


        dia:
        tiempo.tiempo.dia,


        hora:
        tiempo.tiempo.hora,


        año:
        tiempo.tiempo.año


    };








    // =============================
    // EVENTO MUNDO
    // =============================



    crearEvento(

        "nacimiento",

        [

            embarazo.madre,

            embarazo.padre,

            bebe.id

        ],

        {

            bebe:
            bebe.nombre,

            temperamento

        }

    );









    // =============================
    // MEMORIAS
    // =============================



    crearMemoria(

        embarazo.madre,

        "nacimiento",

        "Nació su bebé: " +
        bebe.nombre,

        "alta",

        [

            bebe.id

        ],

        "amor"

    );





    crearMemoria(

        embarazo.padre,

        "nacimiento",

        "Nació su hijo: " +
        bebe.nombre,

        "alta",

        [

            bebe.id

        ],

        "amor"

    );







    crearMemoria(

        bebe.id,

        "nacimiento",

        "Llegó al mundo con un temperamento " +
        temperamento,

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
