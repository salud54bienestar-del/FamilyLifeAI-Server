// Sistema avanzado de embarazo de Village Soul


const cargarArchivo =
require("./cargador_datos.js");


const guardarArchivo =
require("./guardador_datos.js");


const crearEvento =
require("./eventos.js");


const crearMemoria =
require("./memorias.js");


const cambiarEmocion =
require("./emociones.js").cambiarEmocion;


const obtenerEtapaHabitante =
require("./etapas_vida.js").obtenerEtapaHabitante;



const {
    registrarNacimiento
}
=
require("./nacimientos.js");





// =================================
// CONFIGURACIÓN
// =================================


const DURACION_EMBARAZO = 90;









// =================================
// OBTENER HABITANTE
// =================================

function obtenerHabitante(id){


    const datos =
    cargarArchivo("../datos/almas.json");


    if(!datos){

        return null;

    }


    return datos.almas.find(

        a=>a.id===id

    ) || null;


}








// =================================
// EVALUAR EMBARAZO
// =================================

function evaluarEmbarazo(
    madre_id,
    padre_id
){


    const relaciones =
    cargarArchivo("../datos/relaciones.json");


    const madre =
    obtenerHabitante(madre_id);


    const padre =
    obtenerHabitante(padre_id);



    if(
        !relaciones ||
        !madre ||
        !padre
    ){

        return null;

    }





    const pareja =
    relaciones.relaciones.find(

        r=>

        (
            r.habitante_a===madre_id &&
            r.habitante_b===padre_id
        )

        ||

        (
            r.habitante_a===padre_id &&
            r.habitante_b===madre_id
        )

    );



    if(!pareja){

        return null;

    }





    const etapaMadre =
    obtenerEtapaHabitante(
        madre
    );


    const etapaPadre =
    obtenerEtapaHabitante(
        padre
    );





    const requisitos = {


        matrimonio:
        pareja.estado_pareja==="casados",


        romance:
        pareja.romance>=80,


        confianza:
        pareja.confianza>=80,


        madre_adulta:
        etapaMadre?.nombre==="adulto"
        ||
        etapaMadre?.nombre==="adulto_mayor",



        padre_adulto:
        etapaPadre?.nombre==="adulto"
        ||
        etapaPadre?.nombre==="adulto_mayor"


    };





    return {


        madre_id,

        padre_id,

        requisitos,


        aprobado:

        Object.values(requisitos)
        .every(Boolean)


    };


}









// =================================
// INICIAR EMBARAZO
// =================================

function iniciarEmbarazo(
    madre_id,
    padre_id,
    familia_id=null
){



    const evaluacion =
    evaluarEmbarazo(
        madre_id,
        padre_id
    );



    if(
        !evaluacion ||
        !evaluacion.aprobado
    ){

        console.log(
            "No cumple requisitos para embarazo."
        );

        return null;

    }







    const datos =
    cargarArchivo("../datos/embarazos.json");


    const tiempo =
    cargarArchivo("../datos/tiempo.json");



    if(
        !datos ||
        !tiempo
    ){

        return null;

    }







    const existe =
    datos.embarazos.find(

        e=>

        e.madre===madre_id
        &&
        e.estado==="embarazada"

    );



    if(existe){

        return null;

    }






    const nuevoId =


    datos.embarazos.length>0


    ?


    Math.max(

        ...datos.embarazos.map(

            e=>e.id

        )

    )+1


    :


    1;








    const embarazo = {


        id:nuevoId,


        madre:madre_id,


        padre:padre_id,


        familia_id,



        dia_inicio:
        tiempo.tiempo.dia,



        dias_transcurridos:0,


        duracion:
        DURACION_EMBARAZO,



        etapa:
        "primer_trimestre",



        estado:
        "embarazada",



        salud_madre:100,


        salud_bebe:100,



        complicaciones:[],



        bebe_id:null


    };








    datos.embarazos.push(
        embarazo
    );





    guardarArchivo(

        "../datos/embarazos.json",

        datos

    );







    crearEvento(

        "embarazo_iniciado",

        [
            madre_id,
            padre_id
        ],

        {

            embarazo_id:
            nuevoId

        }

    );







    crearMemoria(

        madre_id,

        "embarazo",

        "Comenzó un embarazo.",

        "alta"

    );



    crearMemoria(

        padre_id,

        "embarazo",

        "Será padre de un nuevo habitante.",

        "alta"

    );







    cambiarEmocion(

        madre_id,

        "felicidad",

        10,

        "embarazo"

    );



    cambiarEmocion(

        padre_id,

        "felicidad",

        10,

        "futura familia"

    );







    return embarazo;


}









// =================================
// ACTUALIZAR EMBARAZOS
// =================================

function actualizarEmbarazos(){


    const datos =
    cargarArchivo("../datos/embarazos.json");


    const tiempo =
    cargarArchivo("../datos/tiempo.json");



    if(
        !datos ||
        !tiempo
    ){

        return null;

    }







    if(
        tiempo.tiempo.nuevo_dia_minecraft !== true
    ){

        return datos.embarazos;

    }







    datos.embarazos.forEach(

        embarazo=>{


            if(
                embarazo.estado!=="embarazada"
            ){

                return;

            }





            embarazo.dias_transcurridos++;






            if(
                embarazo.dias_transcurridos<=30
            ){

                embarazo.etapa=
                "primer_trimestre";

            }

            else if(
                embarazo.dias_transcurridos<=60
            ){

                embarazo.etapa=
                "segundo_trimestre";

            }

            else{

                embarazo.etapa=
                "tercer_trimestre";

            }







            if(
                embarazo.dias_transcurridos>=
                embarazo.duracion
            ){



                registrarNacimiento(

                    embarazo.id,

                    embarazo.familia_id,

                    {

                        padre:
                        embarazo.padre,


                        madre:
                        embarazo.madre,


                        nombre:
                        "Nuevo habitante"


                    }

                );



                embarazo.estado=
                "finalizado";


            }



        }

    );






    guardarArchivo(

        "../datos/embarazos.json",

        datos

    );





    return datos.embarazos;


}









module.exports={


    evaluarEmbarazo,

    iniciarEmbarazo,

    actualizarEmbarazos


};
