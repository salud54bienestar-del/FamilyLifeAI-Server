// Sistema de embarazo de Village Soul

const cargarArchivo = require("./cargador_datos.js");

const crearEvento = require("./eventos.js");

const crearMemoria = require("./memorias.js");

const {
    registrarNacimiento
} = require("./nacimientos.js");




// =================================
// EVALUAR EMBARAZO
// =================================

function evaluarEmbarazo(
    madre_id,
    padre_id
){


    const relaciones =
    cargarArchivo("../datos/relaciones.json");


    if(!relaciones){

        return null;

    }



    const pareja =
    relaciones.relaciones.find(

        r =>

        (
            r.habitante_a === madre_id &&
            r.habitante_b === padre_id
        )

        ||

        (
            r.habitante_a === padre_id &&
            r.habitante_b === madre_id
        )

    );



    if(!pareja){

        return null;

    }



    const requisitos = {


        matrimonio:

        pareja.estado_pareja === "casados",


        romance:

        pareja.romance >= 80,


        confianza:

        pareja.confianza >= 80


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
    padre_id
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
            "No cumple requisitos."
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





    const embarazoActivo =
    datos.embarazos.find(

        e =>

        e.madre === madre_id &&
        e.estado === "embarazada"

    );



    if(embarazoActivo){

        return null;

    }





    const embarazo = {


        id:

        datos.embarazos.length + 1,


        madre:

        madre_id,


        padre:

        padre_id,



        dia_inicio:

        tiempo.tiempo.dia,



        dias_transcurridos:

        0,



        duracion:

        90,



        etapa:

        "primer_trimestre",



        estado:

        "embarazada",



        salud_madre:

        100,


        salud_bebe:

        100,


        complicaciones:[],


        bebe_id:null


    };





    datos.embarazos.push(
        embarazo
    );





    crearEvento(

        9,

        [
            madre_id,
            padre_id
        ],

        {
            tipo:
            "embarazo_iniciado"
        }

    );





    crearMemoria(

        madre_id,

        "embarazo",

        "Comenzó un embarazo.",

        "alta"

    );



    return embarazo;


}







// =================================
// ACTUALIZAR CON DÍA MINECRAFT
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





    datos.embarazos.forEach(

        embarazo => {



            if(
                embarazo.estado !== "embarazada"
            ){

                return;

            }



            embarazo.dias_transcurridos++;





            if(
                embarazo.dias_transcurridos <=30
            ){

                embarazo.etapa =
                "primer_trimestre";

            }

            else if(
                embarazo.dias_transcurridos <=60
            ){

                embarazo.etapa =
                "segundo_trimestre";

            }

            else{

                embarazo.etapa =
                "tercer_trimestre";

            }





            if(
                embarazo.dias_transcurridos >=
                embarazo.duracion
            ){


                registrarNacimiento(

                    embarazo.id,

                    null,

                    {
                        nombre:
                        "Nuevo habitante"

                    }

                );


            }


        }

    );



    return datos.embarazos;

}





module.exports={


    evaluarEmbarazo,

    iniciarEmbarazo,

    actualizarEmbarazos


};
