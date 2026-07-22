// Sistema avanzado de almas de Village Soul


const cargarArchivo =
require("./cargador_datos.js");


const guardarArchivo =
require("./guardador_datos.js");


const crearMemoria =
require("./memorias.js");


const {
    crearNecesidades
}
=
require("./necesidades.js");


const {
    obtenerEtapaHabitante
}
=
require("./etapas_vida.js");







// =================================
// OBTENER ALMA
// =================================

function obtenerAlma(id){


    const datos =
    cargarArchivo("../datos/almas.json");


    if(!datos){

        return null;

    }


    return datos.almas.find(

        alma=>alma.id===id

    ) || null;


}









// =================================
// CREAR ALMA
// =================================

function crearAlma(
    nuevaAlma
){


    const datos =
    cargarArchivo("../datos/almas.json");


    if(!datos){

        return null;

    }






    const nuevoId =


    datos.almas.length > 0


    ?


    Math.max(

        ...datos.almas.map(

            a=>a.id

        )

    ) + 1


    :


    1;







    const edad =
    nuevaAlma.edad || 0;






    const nueva = {


        id:nuevoId,



        nombre:

        nuevaAlma.nombre ||
        "Sin nombre",





        sexo:

        nuevaAlma.sexo ||
        "desconocido",





        edad,





        etapa_vida:

        obtenerEtapaPorEdad(
            edad
        ),






        temperamento:

        nuevaAlma.temperamento ||
        "neutral",





        rasgos_iniciales:

        nuevaAlma.rasgos_iniciales ||
        [],





        padres:

        nuevaAlma.padres ||
        [],





        fecha_nacimiento:

        nuevaAlma.fecha_nacimiento ||
        null,







        personalidad:

        nuevaAlma.personalidad ||
        null,



        personalidad_id:

        nuevaAlma.personalidad_id ||
        null,







        tipo:

        nuevaAlma.tipo ||
        "habitante",







        emociones:

        nuevaAlma.emociones ||

        {


            felicidad:50,

            confianza:0,

            miedo:0,

            tristeza:0,

            ira:0,

            calma:50,



            emociones_secundarias:{


                amor:0,

                soledad:0,

                orgullo:0,

                estres:0,

                aburrimiento:0


            }


        },







        memorias:[],



        relaciones:[],




        objetivos:


        nuevaAlma.objetivos ||

        obtenerObjetivosIniciales(
            edad
        ),







        profesion:


        nuevaAlma.profesion ||

        {


            nombre:"ninguna",

            nivel:0,

            experiencia:0,

            estado:"inactivo"


        },








        familia:

        nuevaAlma.familia ||

        null,







        origen:


        nuevaAlma.origen ||

        "nacido_en_el_mundo",







        historia:[

            {

                evento:
                "nacimiento",

                fecha:
                nuevaAlma.fecha_nacimiento

            }

        ],






        estado:

        "viviendo"


    };







    datos.almas.push(
        nueva
    );







    guardarArchivo(

        "../datos/almas.json",

        datos

    );







    crearMemoria(

        nueva.id,

        "origen",

        obtenerMensajeOrigen(nueva),

        "alta"

    );







    // Crear necesidades solamente si no existen

    crearNecesidades(

        nueva.id,

        nueva.etapa_vida

    );







    return nueva;


}









// =================================
// OBTENER ETAPA POR EDAD
// =================================

function obtenerEtapaPorEdad(
edad
){


    const datos = {

        edad

    };



    if(edad<=2){

        return "bebe";

    }


    if(edad<=12){

        return "niño";

    }


    if(edad<=17){

        return "adolescente";

    }


    if(edad<=59){

        return "adulto";

    }


    return "adulto_mayor";


}









// =================================
// OBJETIVOS INICIALES
// =================================

function obtenerObjetivosIniciales(
edad
){


    if(edad<=2){

        return [

            "crecer",

            "crear vínculos"

        ];

    }



    if(edad<=12){

        return [

            "aprender",

            "jugar",

            "explorar"

        ];

    }




    if(edad<=17){

        return [

            "desarrollar habilidades",

            "descubrir identidad"

        ];

    }





    return [

        "trabajar",

        "crear familia",

        "participar comunidad"

    ];


}









// =================================
// CRECER
// =================================

function aumentarEdad(
id
){


    const alma =
    obtenerAlma(id);



    if(!alma){

        return null;

    }



    alma.edad++;




    alma.etapa_vida =
    obtenerEtapaPorEdad(
        alma.edad
    );




    alma.historia.push({

        evento:
        "cumpleaños",

        edad:
        alma.edad

    });






    const datos =
    cargarArchivo("../datos/almas.json");



    guardarArchivo(

        "../datos/almas.json",

        datos

    );



    return alma;


}









// =================================
// ACTUALIZAR ALMA
// =================================

function actualizarAlma(
id,
cambios
){


    const alma =
    obtenerAlma(id);



    if(!alma){

        return null;

    }



    Object.assign(

        alma,

        cambios

    );





    const datos =
    cargarArchivo("../datos/almas.json");



    guardarArchivo(

        "../datos/almas.json",

        datos

    );



    return alma;


}









// =================================
// ACTUALIZAR ETAPA
// =================================

function actualizarEtapaAlma(
alma
){


    if(!alma){

        return null;

    }



    alma.etapa_vida =

    obtenerEtapaPorEdad(

        alma.edad

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









// =================================
// ORIGEN
// =================================

function obtenerMensajeOrigen(
alma
){


    switch(alma.origen){


        case "adopcion":

            return "Llegó a una familia mediante adopción.";


        case "nacimiento":

            return "Nació dentro del mundo de Village Soul.";


        default:

            return "Una nueva alma apareció en el mundo.";

    }

}








module.exports={


    obtenerAlma,

    crearAlma,

    actualizarAlma,

    actualizarEtapaAlma,

    aumentarEdad,

    listarAlmas


};
