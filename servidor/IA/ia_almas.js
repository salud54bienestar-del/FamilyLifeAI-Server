// =============================================
// Inteligencia artificial avanzada de almas
// Village Soul Engine v3.0
// =============================================


// =============================================
// IMPORTACIONES
// =============================================


const cargarArchivo =
require("../sistemas/cargador_datos.js");



const {
    procesarDecision
}
=
require("../sistemas/decisiones.js");



const {
    obtenerMemorias,
    obtenerRecuerdosImportantes
}
=
require("../sistemas/memorias.js");



// =============================================
// CONFIGURACIÓN IA
// =============================================

const CONFIG_IA = {


    memoria_maxima_contexto:20,


    prioridad_hambre:100,


    prioridad_emergencia:100,


    prioridad_social:50,


    prioridad_normal:20



};








// =============================================
// CARGAR ALMA
// =============================================


function obtenerAlma(
    habitante_id
){


    const datos =
    cargarArchivo(
        "../datos/almas.json"
    );



    if(
        !datos ||
        !datos.almas
    ){

        return null;

    }




    return datos.almas.find(

        alma =>

        alma.id === habitante_id

    )
    ||
    null;


}








// =============================================
// BUSCAR HABITANTE EN SISTEMA
// =============================================


function buscarHabitante(
    lista,
    habitante_id,
    campo="habitante_id"
){


    if(
        !lista
    ){

        return null;

    }




    return lista.find(

        elemento =>

        elemento[campo] === habitante_id

    )
    ||
    null;


}








// =============================================
// OBTENER EMOCIONES
// =============================================


function obtenerEstadoEmocional(
    habitante_id
){


    const datos =
    cargarSistema(
        "emociones"
    );



    if(
        !datos ||
        !datos.emociones
    ){

        return null;

    }




    return buscarHabitante(

        datos.emociones,

        habitante_id

    );


}








// =============================================
// OBTENER NECESIDADES
// =============================================


function obtenerNecesidades(
    habitante_id
){


    const datos =
    cargarSistema(
        "necesidades"
    );



    if(
        !datos ||
        !datos.necesidades
    ){

        return null;

    }




    return buscarHabitante(

        datos.necesidades,

        habitante_id

    );


}








// =============================================
// OBTENER PERSONALIDAD
// =============================================


function obtenerPersonalidad(
    alma
){


    const datos =
    cargarSistema(
        "personalidades"
    );



    if(
        !datos ||
        !datos.personalidades ||
        !alma
    ){

        return null;

    }




    return datos.personalidades.find(

        personalidad =>

        personalidad.id === alma.personalidad_id

    )
    ||
    null;


}








// =============================================
// OBTENER FAMILIA
// =============================================


function obtenerFamilia(
    habitante_id
){


    const datos =
    cargarSistema(
        "familias"
    );



    if(
        !datos ||
        !datos.familias
    ){

        return null;

    }




    return datos.familias.find(

        familia =>

        familia.miembros.includes(
            habitante_id
        )

    )
    ||
    null;


}








// =============================================
// OBTENER RELACIONES
// =============================================


function obtenerRelaciones(
    habitante_id
){


    const datos =
    cargarSistema(
        "relaciones"
    );



    if(
        !datos ||
        !datos.relaciones
    ){

        return [];

    }





    return datos.relaciones.filter(

        relacion =>


        relacion.habitante_a === habitante_id

        ||

        relacion.habitante_b === habitante_id


    );


}








// =============================================
// OBTENER HABILIDADES
// =============================================


function obtenerHabilidades(
    habitante_id
){


    const datos =
    cargarSistema(
        "habilidades"
    );



    if(
        !datos ||
        !datos.habilidades
    ){

        return null;

    }




    return datos.habilidades.find(

        habilidad =>

        habilidad.habitante_id === habitante_id


    )
    ||
    null;


}








// =============================================
// OBTENER UBICACIÓN
// =============================================


function obtenerUbicacion(
    habitante_id
){


    const datos =
    cargarSistema(
        "ubicaciones"
    );



    if(
        !datos ||
        !datos.ubicaciones
    ){

        return null;

    }




    return datos.ubicaciones.find(

        ubicacion =>

        ubicacion.habitante_id === habitante_id


    )
    ||
    null;


}







// =============================================
// OBTENER PROFESIÓN
// =============================================


function obtenerProfesion(
    alma
){


    if(
        !alma
    ){

        return "ninguna";

    }




    if(
        alma.profesion &&
        alma.profesion.nombre
    ){

        return alma.profesion.nombre;

    }




    return "ninguna";


}








// =============================================
// OBTENER OBJETIVOS
// =============================================


function obtenerObjetivos(
    habitante_id
){


    const datos =
    cargarSistema(
        "objetivos"
    );



    if(
        !datos ||
        !datos.objetivos
    ){

        return [];

    }




    return datos.objetivos.filter(

        objetivo =>

        objetivo.habitante_id === habitante_id


    );


}









// =============================================
// OBTENER MEMORIA DEL ALMA
// =============================================


function obtenerEstadoMemoria(
    habitante_id
){



    const memorias =

    obtenerMemorias(
        habitante_id
    );




    const importantes =

    obtenerRecuerdosImportantes(
        habitante_id
    );




    return {


        recientes:

        memorias.slice(
            -CONFIG_IA.memoria_maxima_contexto
        ),



        importantes


    };


}








// =============================================
// ANALIZAR NECESIDADES
// =============================================


function analizarNecesidades(
    necesidades
){


    const estado = {


        hambre:false,

        energia:false,

        social:false,

        descanso:false,


        urgencia:0


    };





    if(!necesidades){

        return estado;

    }







    if(
        necesidades.hambre !== undefined &&
        necesidades.hambre < 30
    ){

        estado.hambre=true;


        estado.urgencia +=40;


    }







    if(
        necesidades.energia !== undefined &&
        necesidades.energia < 30
    ){

        estado.energia=true;


        estado.descanso=true;


        estado.urgencia +=40;


    }






if(
        necesidades.social !== undefined &&
        necesidades.social < 30
    ){

        estado.social=true;


        estado.urgencia +=20;


    }







    return estado;


}








// =============================================
// ANALIZAR EMOCIONES
// =============================================


function analizarEmociones(
    emocion
){



    const estado={



        dominante:"neutral",


        intensidad:0,



        efecto:"normal"



    };





    if(!emocion){

        return estado;

    }






    estado.dominante =

    emocion.emocion_actual ||

    "neutral";





    estado.intensidad =

    emocion.intensidad ||

    0;







    switch(
        estado.dominante
    ){



        case "tristeza":


            estado.efecto =
            "buscar_apoyo";


        break;






        case "miedo":


            estado.efecto =
            "buscar_seguridad";


        break;






        case "ira":


            estado.efecto =
            "evitar_conflicto";


        break;






        case "amor":


            estado.efecto =
            "acercarse_persona";


        break;






        case "felicidad":


            estado.efecto =
            "compartir";


        break;






        case "curiosidad":


            estado.efecto =
            "explorar";


        break;



    }





    return estado;


}








// =============================================
// ANALIZAR PERSONALIDAD
// =============================================


function analizarPersonalidad(
    personalidad
){



    if(!personalidad){


        return {


            estilo:
            "neutral",


            tendencias:[]


        };


    }








    return {



        estilo:

        personalidad.nombre

        ||

        "neutral",





        tendencias:

        personalidad.rasgos

        ||

        []



    };


}








// =============================================
// ANALIZAR RELACIONES
// =============================================


function analizarRelaciones(
    relaciones
){



    const estado={



        amigos:0,


        enemigos:0,


        pareja:false,


        cercanos:[]


    };






    if(
        !relaciones ||
        relaciones.length===0
    ){

        return estado;

    }








    relaciones.forEach(

        relacion=>{



            if(
                relacion.tipo==="amistad"
            ){

                estado.amigos++;

            }





            if(
                relacion.tipo==="enemigo"
            ){

                estado.enemigos++;

            }






            if(
                relacion.tipo==="pareja"
            ){

                estado.pareja=true;

            }




            
            estado.cercanos.push(
                relacion
            );



        }

    );







    return estado;


}








// =============================================
// ANALIZAR HABILIDADES
// =============================================


function analizarHabilidades(
    habilidades
){


    const resultado={



        disponibles:[],


        mejores:[]


    };




    if(
        !habilidades ||
        !habilidades.habilidades
    ){

        return resultado;

    }





Object.keys(
        habilidades.habilidades
    )
    .forEach(

        nombre=>{


            const habilidad =

            habilidades.habilidades[nombre];





            if(
                habilidad.nivel > 0
            ){


                resultado.disponibles.push({

                    nombre,

                    nivel:
                    habilidad.nivel,


                    experiencia:
                    habilidad.experiencia


                });


            }



        }

    );






resultado.mejores =

    resultado.disponibles.sort(

        (a,b)=>

        b.nivel-a.nivel

    )
    .slice(
        0,
        3
    );







    return resultado;


}








// =============================================
// ANALIZAR UBICACIÓN
// =============================================


function analizarUbicacion(
    ubicacion
){


    if(!ubicacion){


        return {


            hogar:null,


            trabajo:null,


            posicion:null



        };


    }






return {



        hogar:

        ubicacion.hogar || null,




        trabajo:

        ubicacion.trabajo || null,




        escuela:

        ubicacion.escuela || null,




        posicion:

        ubicacion.ultima_posicion || null



    };


}








// =============================================
// ANALIZAR OBJETIVOS
// =============================================


function analizarObjetivos(
    objetivos
){



    if(
        !objetivos ||
        objetivos.length===0
    ){


        return {


            tieneObjetivos:false,


            actuales:[]


        };


    }







return {


        tieneObjetivos:true,


        actuales:

        objetivos.slice(
            0,
            5
        )


    };


}








// =============================================
// ANALIZAR MEMORIAS
// =============================================


function analizarMemorias(
    memoria
){



    const estado={



        recuerdos_importantes:[],


        influencia:0



    };







    if(!memoria){

        return estado;

    }








    estado.recuerdos_importantes =

    memoria.importantes || [];







    estado.influencia =

    estado.recuerdos_importantes.reduce(

        (total, recuerdo)=>

        total +

        (recuerdo.influencia || 0),

        0

    );






return estado;


}








// =============================================
// CREAR INTENCIÓN INICIAL
// =============================================


function crearIntencionInicial(
    necesidades,
    emociones,
    familia,
    objetivos
){



    let intencion={



        accion:"vida_normal",


        motivo:"No hay problemas importantes",


        urgencia:20



    };







if(
        necesidades.hambre
    ){


        intencion={


            accion:"buscar_comida",


            motivo:"Necesita alimentarse",


            urgencia:90



        };



    }







    else if(
        necesidades.descanso
    ){


        intencion={


            accion:"descansar",


            motivo:"Necesita recuperar energía",


            urgencia:80



        };


    }






else if(
        familia
    ){


        intencion={


            accion:"cuidar_familia",


            motivo:"Tiene responsabilidades familiares",


            urgencia:60



        };


    }






else if(
        objetivos.tieneObjetivos
    ){


        intencion={


            accion:"cumplir_objetivo",


            motivo:"Tiene metas pendientes",


            urgencia:50



        };


    }







    return intencion;


}








// =============================================
// CREAR CONTEXTO DEL ALMA
// =============================================


function crearContextoAlma(
    datos
){



    const {


        alma,

        emocion,

        necesidades,

        personalidad,

        familia,

        relaciones,

        habilidades,

        ubicacion,

        objetivos,

        memoria,

        intencion


    } = datos;






return {



        // Identidad


        identidad:{


            id:

            alma.id,


            nombre:

            alma.nombre,


            genero:

            alma.genero || null



        },








        // Estado emocional


        emocion:



        emocion?.dominante

        ||

        "neutral",





        intensidad_emocional:


        emocion?.intensidad

        ||

        0,








    // Personalidad


        personalidad:


        personalidad.estilo,




        rasgos:


        personalidad.tendencias,











        // Necesidades


        necesidades:{


            hambre:

            necesidades.hambre || false,



            energia:

            necesidades.energia || false,



            social:

            necesidades.social || false



        },










    // Familia


        familia:{


            existe:

            !!familia,



            miembros:

            familia?.miembros || [],



            hijos:

            familia?.hijos?.length || 0



        },









        // Relaciones


        relaciones:{


            amigos:

            relaciones.amigos,


            enemigos:

            relaciones.enemigos,


            pareja:

            relaciones.pareja



        },








    // Conocimiento


        habilidades:


        habilidades.disponibles,





        habilidades_destacadas:


        habilidades.mejores,











        // Espacio


        ubicacion:{


            hogar:

            ubicacion.hogar,



            trabajo:

            ubicacion.trabajo,



            posicion:

            ubicacion.posicion



        },








    // Historia


        recuerdos:


        memoria.recuerdos_importantes,



        influencia_memoria:


        memoria.influencia,











        // Metas


        objetivos:


        objetivos.actuales,









        // Primera intención


        intencion



    };


}








// =============================================
// GENERAR PENSAMIENTO INTERNO
// =============================================


function generarPensamiento(
    contexto
){



    let pensamiento =
    "Estoy tranquilo.";








    if(
        contexto.necesidades.hambre
    ){


        pensamiento =

        "Necesito encontrar comida porque tengo hambre.";



    }






 else if(
        contexto.necesidades.energia
    ){


        pensamiento =

        "Estoy cansado y necesito descansar.";



    }







    else if(
        contexto.emocion==="tristeza"
    ){


        pensamiento =

        "Me siento triste y necesito apoyo.";



    }







    else if(
        contexto.emocion==="felicidad"
    ){


        pensamiento =

        "Estoy feliz y quiero compartir este momento.";



    }






else if(
        contexto.intencion
    ){


        pensamiento =


        "Creo que debo hacer: "

        +

        contexto.intencion.accion;



    }








    return pensamiento;


}








// =============================================
// TOMAR DECISIÓN DEL ALMA
// =============================================


function tomarDecisionAlma(
    habitante_id,
    contexto
){



    const decision =

    procesarDecision(

        habitante_id,

        contexto

    );





    if(!decision){


        return {


            accion:"vida_normal",


            motivo:"No se pudo generar decisión",


            prioridad:10



        };


    }






return decision;


}









// =============================================
// CREAR RESPUESTA DEL ALMA
// =============================================


function crearRespuestaAlma(
    contexto,
    decision
){



    return {



        pensamiento:

        generarPensamiento(
            contexto
        ),






        accion:


        decision.accion,







        motivo:


        decision.motivo,






        prioridad:


        decision.prioridad || 0,







        destino:


        decision.destino || null



    };


}








// =============================================
// EJECUTAR PENSAMIENTO COMPLETO
// =============================================



function ejecutarPensamiento(
    habitante_id
){



    const datos =

    obtenerDatosAlma(
        habitante_id
    );





    if(!datos){


        return null;


    }








    const contexto =

    crearContextoAlma(
        datos
    );








    const decision =

    tomarDecisionAlma(

        habitante_id,

        contexto

    );








const respuesta =

    crearRespuestaAlma(

        contexto,

        decision

    );








    return {



        habitante_id,



        nombre:

        datos.alma.nombre,



        contexto,



        decision,



        respuesta



    };


}








// =============================================
// OBTENER DATOS COMPLETOS DEL ALMA
// =============================================


function obtenerDatosAlma(
    habitante_id
){




    const almas =

    cargarArchivo(
        "../datos/almas.json"
    );



    if(
        !almas ||
        !almas.almas
    ){

        return null;

    }






const alma =

    almas.almas.find(

        a=>

        a.id===habitante_id

    );







    if(!alma){

        return null;

    }








    const emociones =

    cargarArchivo(
        "../datos/emociones.json"
    );




    const necesidades =

    cargarArchivo(
        "../datos/necesidades.json"
    );




    const personalidades =

    cargarArchivo(
        "../datos/personalidades.json"
    );



const familias =

    cargarArchivo(
        "../datos/familias.json"
    );




    const relaciones =

    cargarArchivo(
        "../datos/relaciones.json"
    );




    const habilidades =

    cargarArchivo(
        "../datos/habilidades.json"
    );




    const ubicaciones =

    cargarArchivo(
        "../datos/ubicaciones.json"
    );




    const objetivos =

    cargarArchivo(
        "../datos/objetivos.json"
    );







const estadoEmocional =

    emociones?.emociones?.find(

        e=>

        e.habitante_id===habitante_id

    );








    const estadoNecesidad =

    necesidades?.necesidades?.find(

        n=>

        n.habitante_id===habitante_id

    );








    const personalidad =

    personalidades?.personalidades?.find(

        p=>

        p.id===alma.personalidad_id

    );







const familia =

    familias?.familias?.find(

        f=>

        f.miembros.includes(
            habitante_id
        )

    );








    const relacionesAlma =

    relaciones?.relaciones?.filter(

        r=>

        r.habitante_a===habitante_id

        ||

        r.habitante_b===habitante_id

    )

    ||

    [];







const habilidadesAlma =

    habilidades?.habilidades?.find(

        h=>

        h.habitante_id===habitante_id

    );








    const ubicacionAlma =

    ubicaciones?.ubicaciones?.find(

        u=>

        u.habitante_id===habitante_id

    );








    const objetivosAlma =

    objetivos?.objetivos?.filter(

        o=>

        o.habitante_id===habitante_id

    )

    ||

    [];







const memoriasAlma =

    obtenerMemorias(

        habitante_id

    );









    return {



        alma,



        emocion:

        analizarEmociones(
            estadoEmocional
        ),




        necesidades:

        analizarNecesidades(
            estadoNecesidad
        ),




        personalidad:

        analizarPersonalidad(
            personalidad
        ),




        familia,




        relaciones:

        analizarRelaciones(
            relacionesAlma
        ),




        habilidades:

        analizarHabilidades(
            habilidadesAlma
        ),




        ubicacion:

        analizarUbicacion(
            ubicacionAlma
        ),




        objetivos:

        analizarObjetivos(
            objetivosAlma
        ),



        memoria:

        analizarMemorias(
            memoriasAlma
        ),




        intencion:

        crearIntencionInicial(

            analizarNecesidades(
                estadoNecesidad
            ),

            analizarEmociones(
                estadoEmocional
            ),

            familia,

            analizarObjetivos(
                objetivosAlma
            )

        )


    };


}








// =============================================
// FUNCIONES DE ANÁLISIS
// =============================================


function analizarEmociones(
    emocion
){

    if(!emocion){

        return {

            dominante:"neutral",

            intensidad:0

        };

    }


return {

        dominante:

        emocion.emocion_actual ||

        "neutral",


        intensidad:

        emocion.intensidad || 0,


        estado:

        emocion

    };

}







function analizarNecesidades(
    necesidades
){

    if(!necesidades){

        return {};

    }



    return necesidades;

}








function analizarPersonalidad(
    personalidad
){

    if(!personalidad){

        return {

            estilo:"neutral",

            tendencias:[]

        };

    }



    return {


        estilo:

        personalidad.nombre || "neutral",


        tendencias:

        personalidad.rasgos || []

    };

}







function analizarRelaciones(
    relaciones
){

    return {


        lista:

        relaciones || [],


        amigos:

        relaciones || [],


        enemigos:[],


        pareja:null


    };

}







function analizarHabilidades(
    habilidades
){

    if(!habilidades){

        return {


            disponibles:{},


            mejores:[]

        };

    }



    return {


        disponibles:

        habilidades.habilidades || {},


        mejores:

        Object.keys(
            habilidades.habilidades || {}
        )

    };

}








function analizarUbicacion(
    ubicacion
){

    if(!ubicacion){

        return {


            hogar:null,

            trabajo:null,

            posicion:null


        };

    }


return {


        hogar:

        ubicacion.hogar,


        trabajo:

        ubicacion.trabajo,


        posicion:

        ubicacion.ultima_posicion


    };

}







function analizarObjetivos(
    objetivos
){

    return {


        actuales:

        objetivos || []

    };

}








function analizarMemorias(
    memorias
){

    return {


        recuerdos_importantes:

        memorias.filter(

            m=>

            m.influencia>=80

        ),


        influencia:

        memorias.length


    };

}







// =============================================
// CREAR INTENCIÓN INICIAL
// =============================================


function crearIntencionInicial(
    necesidades,
    emociones,
    familia,
    objetivos
){



    if(
        necesidades.hambre &&
        necesidades.hambre < 30
    ){

        return {


            accion:"buscar_comida",


            motivo:"Necesita alimentarse"


        };

    }






if(
        emociones.dominante==="tristeza"
    ){

        return {


            accion:"buscar_apoyo",


            motivo:"Necesita apoyo emocional"


        };

    }







    if(
        familia
    ){

        return {


            accion:"convivir_familia",


            motivo:"Desea estar con su familia"


        };

    }





if(
        objetivos &&
        objetivos.length>0
    ){

        return {


            accion:"cumplir_objetivo",


            motivo:"Tiene metas pendientes"


        };

    }








    return {


        accion:"vida_normal",


        motivo:"Todo está estable"


    };


}









// =============================================
// EXPORTAR SISTEMA IA ALMAS
// =============================================


module.exports={



    pensarAlma,


    ejecutarPensamiento,


    obtenerDatosAlma,


    crearContextoAlma,


    generarPensamiento,


    tomarDecisionAlma


};
