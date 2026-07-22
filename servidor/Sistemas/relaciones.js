// Sistema avanzado de relaciones - Village Soul 2.0
// Control de vínculos sociales, amistad, familia y romance


const cargarArchivo =
require("./cargador_datos.js");


const guardarArchivo =
require("./guardador_datos.js");


const crearMemoria =
require("./memorias.js");


const crearEvento =
require("./eventos.js");


const {
cambiarEmocion
}
=
require("./emociones.js");






// =================================
// OBTENER RELACIÓN
// =================================


function obtenerRelacion(
    habitante_a,
    habitante_b
){


    const datos =
    cargarArchivo(
        "../datos/relaciones.json"
    );



    if(
        !datos ||
        !datos.relaciones
    ){

        return null;

    }





    return datos.relaciones.find(

        r =>

        (

            r.habitante_a===habitante_a &&

            r.habitante_b===habitante_b

        )

        ||

        (

            r.habitante_a===habitante_b &&

            r.habitante_b===habitante_a

        )


    ) || null;


}









// =================================
// CREAR RELACIÓN
// =================================


function crearRelacion(
    habitante_a,
    habitante_b,
    tipo="desconocidos"
){



    const datos =
    cargarArchivo(
        "../datos/relaciones.json"
    );



    if(!datos){

        return null;

    }




    if(!datos.relaciones){

        datos.relaciones=[];

    }







    const existente =
    obtenerRelacion(
        habitante_a,
        habitante_b
    );



    if(existente){

        return existente;

    }








    const id =


    datos.relaciones.length > 0


    ?


    Math.max(

        ...datos.relaciones.map(

            r=>r.id

        )

    ) + 1



    :


    1;









    const relacion={



        id,



        habitante_a,


        habitante_b,



        tipo,






        nivel:

        "nuevo",







        confianza:0,


        afinidad:50,


        respeto:50,


        amistad:0,


        lealtad:0,



        romance:0,



        compromiso:0,







        estado_pareja:

        "ninguno",







        convivencia:false,







        familia:{


            parentesco:false,


            tipo:null


        },








        conflictos:[],







        historial:[


            {


                evento:

                "Primer encuentro",


                fecha:

                new Date().toISOString()


            }


        ]



    };









    datos.relaciones.push(
        relacion
    );







    guardarArchivo(

        "../datos/relaciones.json",

        datos

    );









    crearMemoria(

        habitante_a,

        "relacion",

        "Conoció a un nuevo habitante.",

        "media",

        [

            habitante_b

        ]

    );







    crearMemoria(

        habitante_b,

        "relacion",

        "Conoció a un nuevo habitante.",

        "media",

        [

            habitante_a

        ]

    );







    crearEvento(

        "nueva_relacion",

        [

            habitante_a,

            habitante_b

        ],

        {


            tipo,

            nivel:

            relacion.nivel


        }

    );







    return relacion;


}









// =================================
// AUMENTAR CONFIANZA
// =================================


function aumentarConfianza(
    a,
    b,
    cantidad
){



    const relacion =
    obtenerRelacion(
        a,
        b
    );



    if(!relacion){

        return null;

    }







    relacion.confianza += cantidad;


    relacion.lealtad += cantidad/2;







    limitarRelacion(
        relacion
    );






    actualizarNivelRelacion(
        relacion
    );







    agregarHistorial(

        relacion,

        "Aumentó la confianza"

    );







    guardarRelaciones();







    return relacion;


}









// =================================
// AUMENTAR AMISTAD
// =================================


function aumentarAmistad(
    a,
    b,
    cantidad
){



    const relacion =
    obtenerRelacion(
        a,
        b
    );



    if(!relacion){

        return null;

    }








    relacion.amistad += cantidad;


    relacion.confianza += cantidad/2;


    relacion.respeto += cantidad/3;








    limitarRelacion(
        relacion
    );







    actualizarNivelRelacion(
        relacion
    );








    cambiarEmocion(

        a,

        "felicidad",

        cantidad/2,

        "amistad"

    );




    cambiarEmocion(

        b,

        "felicidad",

        cantidad/2,

        "amistad"

    );








    agregarHistorial(

        relacion,

        "Fortalecieron su amistad"

    );








    crearEvento(

        "amistad_crecida",

        [

            a,

            b

        ],

        {


            nivel:

            relacion.nivel


        }

    );







    guardarRelaciones();







    return relacion;


          }









// =================================
// AUMENTAR ROMANCE
// =================================


function aumentarRomance(
    a,
    b,
    cantidad
){



    const relacion =
    obtenerRelacion(
        a,
        b
    );



    if(!relacion){

        return null;

    }






    if(
        relacion.familia.parentesco
    ){

        return null;

    }








    relacion.romance += cantidad;


    relacion.compromiso += cantidad/2;


    relacion.confianza += cantidad/3;







    if(
        relacion.romance >= 70
    ){

        relacion.estado_pareja =
        "pareja";

    }




    if(
        relacion.romance >= 90
    ){

        relacion.estado_pareja =
        "comprometidos";

    }








    limitarRelacion(
        relacion
    );




    actualizarNivelRelacion(
        relacion
    );








    cambiarEmocion(

        a,

        "amor",

        cantidad,

        "romance"

    );





    cambiarEmocion(

        b,

        "amor",

        cantidad,

        "romance"

    );








    agregarHistorial(

        relacion,

        "Momento romántico"

    );








    crearEvento(

        "romance",

        [

            a,

            b

        ],

        {


            estado:

            relacion.estado_pareja


        }

    );







    guardarRelaciones();





    return relacion;


}









// =================================
// CREAR CONFLICTO
// =================================


function crearConflicto(
    a,
    b,
    motivo="diferencia"
){



    const relacion =
    obtenerRelacion(
        a,
        b
    );



    if(!relacion){

        return null;

    }







    const conflicto={


        motivo,


        intensidad:50,


        resuelto:false,


        fecha:

        new Date().toISOString()


    };







    relacion.conflictos.push(
        conflicto
    );







    relacion.confianza -=10;


    relacion.respeto -=5;







    limitarRelacion(
        relacion
    );








    cambiarEmocion(

        a,

        "ira",

        5,

        motivo

    );





    cambiarEmocion(

        b,

        "tristeza",

        5,

        motivo

    );








    agregarHistorial(

        relacion,

        "Tuvieron un conflicto: "+motivo

    );








    crearEvento(

        "conflicto_relacion",

        [

            a,

            b

        ],

        {


            motivo


        }

    );







    guardarRelaciones();







    return relacion;


}









// =================================
// RESOLVER CONFLICTO
// =================================


function resolverConflicto(
    a,
    b
){



    const relacion =
    obtenerRelacion(
        a,
        b
    );



    if(!relacion){

        return null;

    }







    relacion.conflictos.forEach(

        conflicto=>{


            conflicto.resuelto=true;


        }

    );







    relacion.confianza +=10;


    relacion.respeto +=5;








    limitarRelacion(
        relacion
    );







    cambiarEmocion(

        a,

        "calma",

        5,

        "reconciliación"

    );







    cambiarEmocion(

        b,

        "calma",

        5,

        "reconciliación"

    );








    agregarHistorial(

        relacion,

        "Resolvierón sus diferencias"

    );








    crearEvento(

        "reconciliacion",

        [

            a,

            b

        ],

        {}

    );







    guardarRelaciones();







    return relacion;


}









// =================================
// TERMINAR RELACIÓN
// =================================


function terminarRelacion(
    a,
    b
){



    const relacion =
    obtenerRelacion(
        a,
        b
    );



    if(!relacion){

        return null;

    }







    relacion.estado_pareja =
    "terminada";



    relacion.romance=0;



    relacion.compromiso=0;



    relacion.confianza-=20;






    limitarRelacion(
        relacion
    );







    cambiarEmocion(

        a,

        "tristeza",

        15,

        "ruptura"

    );







    cambiarEmocion(

        b,

        "tristeza",

        15,

        "ruptura"

    );







    agregarHistorial(

        relacion,

        "Relación terminada"

    );







    crearEvento(

        "ruptura",

        [

            a,

            b

        ],

        {}

    );







    guardarRelaciones();







    return relacion;


}
