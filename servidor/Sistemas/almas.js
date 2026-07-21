// Sistema de almas de Village Soul

const cargarArchivo = require("./cargador_datos.js");
const crearMemoria = require("./memorias.js");




// =================================
// OBTENER ALMA
// =================================

function obtenerAlma(id){


    const datos =
    cargarArchivo("../datos/almas.json");


    if(!datos){

        console.log(
            "No se pudieron cargar las almas."
        );

        return null;

    }



    return datos.almas.find(

        alma => alma.id === id

    );


}






// =================================
// CREAR NUEVA ALMA
// =================================

function crearAlma(nuevaAlma){


    const datos =
    cargarArchivo("../datos/almas.json");



    if(!datos){

        return null;

    }





    const nuevoId =

    datos.almas.length > 0

    ?

    Math.max(
        ...datos.almas.map(a=>a.id)
    ) + 1

    :

    1;







    const nueva = {


        id:
        nuevoId,



        nombre:

        nuevaAlma.nombre
        ||
        "Sin nombre",



        edad:

        nuevaAlma.edad
        ||
        0,



        etapa_vida:

        determinarEtapaVida(
            nuevaAlma.edad || 0
        ),




        personalidad_id:

        nuevaAlma.personalidad_id
        ||
        null,




        tipo:

        nuevaAlma.tipo
        ||
        "habitante",





        emociones:

        nuevaAlma.emociones
        ||
        {

            felicidad:50,

            confianza:0,

            miedo:0,

            tristeza:0,

            ira:0,

            calma:50

        },





        memorias:[],



        relaciones:[],




        objetivos:

        nuevaAlma.objetivos
        ||
        [


            "crecer",

            "aprender",

            "formar vínculos"


        ],





        profesion:

        nuevaAlma.profesion

        ||

        {


            nombre:"ninguna",

            nivel:1,

            experiencia:0,

            estado:"activa"


        },






        familia:[],




        origen:

        nuevaAlma.origen

        ||

        "nacido_en_el_mundo",





        estado:

        "viviendo"


    };





    datos.almas.push(nueva);







    crearMemoria(

        nueva.id,

        "origen",

        obtenerMensajeOrigen(nueva),

        "alta"

    );






    console.log(
        "Nueva alma creada:"
    );


    console.log(nueva);





    return nueva;


}








// =================================
// ETAPAS DE VIDA
// =================================


function determinarEtapaVida(edad){


    if(edad < 1){

        return "bebe";

    }


    if(edad < 12){

        return "niño";

    }


    if(edad < 18){

        return "adolescente";

    }


    return "adulto";


}







function obtenerMensajeOrigen(alma){


    switch(alma.origen){


        case "adopcion":

            return "Llegó a una nueva familia mediante adopción.";



        case "nacimiento":

            return "Nació dentro de una familia de Village Soul.";



        default:

            return "Una nueva alma apareció en el mundo.";

    }


}








// =================================
// ACTUALIZAR ALMA
// =================================

function actualizarAlma(id,cambios){


    const alma =
    obtenerAlma(id);



    if(!alma){

        return null;

    }




    Object.assign(

        alma,

        cambios

    );



    return alma;


}








// =================================
// LISTAR ALMAS
// =================================


function listarAlmas(){


    const datos =
    cargarArchivo("../datos/almas.json");



    if(!datos){

        return [];

    }



    return datos.almas;


}







module.exports={


    obtenerAlma,

    crearAlma,

    actualizarAlma,

    listarAlmas


};
