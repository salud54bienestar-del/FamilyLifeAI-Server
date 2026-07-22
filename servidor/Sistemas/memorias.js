// Sistema avanzado de memorias - Village Soul v2.0

const cargarArchivo =
require("./cargador_datos.js");

const guardarArchivo =
require("./guardador_datos.js");

const reloj =
require("./reloj_mundo.js");


// =================================
// GENERAR ID
// =================================

function generarId(datos){

    if(
        !datos ||
        !datos.memorias ||
        datos.memorias.length===0
    ){
        return 1;
    }

    return Math.max(
        ...datos.memorias.map(
            memoria=>memoria.id
        )
    )+1;

}



// =================================
// FECHA DEL MUNDO
// =================================

function obtenerFechaMundo(){

    if(
        reloj &&
        typeof reloj.obtenerFecha==="function"
    ){
        return reloj.obtenerFecha();
    }

    return {
        año:1,
        estacion:"primavera",
        dia:1,
        hora:8
    };

}



// =================================
// CLASIFICAR CATEGORÍA
// =================================

function obtenerCategoria(emocion){

    if([
        "felicidad",
        "amor",
        "orgullo",
        "esperanza",
        "motivacion",
        "calma"
    ].includes(emocion)){

        return "positiva";

    }

    if([
        "tristeza",
        "miedo",
        "ira",
        "estres",
        "soledad"
    ].includes(emocion)){

        return "negativa";

    }

    return "neutral";

}



// =================================
// CALCULAR INFLUENCIA
// =================================

function calcularInfluencia(importancia){

    switch(importancia){

        case "muy_alta":
            return 100;

        case "alta":
            return 90;

        case "media":
            return 60;

        case "baja":
            return 30;

        default:
            return 20;

    }

}



// =================================
// CREAR MEMORIA
// =================================

function crearMemoria(

habitante_id,

tipo,

descripcion,

importancia="baja",

personas=[],

emocion="neutral",

lugar=null,

efecto={},

aprendizaje=null,

origen="evento",

grupo_memoria=null,

ubicacion=null

){

    const datos =
    cargarArchivo("../datos/memorias.json");

    if(!datos){
        return null;
    }

    if(!datos.memorias){
        datos.memorias=[];
    }

    const memoria={

        id:
        generarId(datos),

        habitante_id,

        tipo,

        descripcion,

        importancia,

        influencia:
        calcularInfluencia(
            importancia
        ),

        categoria:
        obtenerCategoria(
            emocion
        ),

        emocion,

        personas_relacionadas:
        personas,

        lugar_relacionado:
        lugar,

        ubicacion:
        ubicacion,

        origen,

        grupo_memoria,

        efecto_personalidad:{

            confianza:
            efecto.confianza || 0,

            miedo:
            efecto.miedo || 0,

            felicidad:
            efecto.felicidad || 0,

            tristeza:
            efecto.tristeza || 0,

            respeto:
            efecto.respeto || 0,

            valentia:
            efecto.valentia || 0

        },

        aprendizaje:
        aprendizaje || "ninguno",

        impacto_comportamiento:

        importancia==="muy_alta"

        ?

        "permanente"

        :

        importancia==="alta"

        ?

        "fuerte"

        :

        importancia==="media"

        ?

        "moderado"

        :

        "leve",

        fuerza_recuerdo:100,

        recordada:true,

        estado:"activa",

        favorita:false,

        veces_recordada:0,

        fecha_real:
        new Date().toISOString(),

        fecha_mundo:
        obtenerFechaMundo()

    };

    datos.memorias.push(
        memoria
    );



// Limitar memorias por habitante

    const memoriasHabitante =
    datos.memorias.filter(
        memoria =>
        memoria.habitante_id === habitante_id
    );

    if(memoriasHabitante.length > 500){

        const eliminar = memoriasHabitante

        .filter(
            memoria =>
            !memoria.favorita &&
            memoria.estado !== "permanente"
        )

        .sort(
            (a,b)=>
            new Date(a.fecha_real) -
            new Date(b.fecha_real)
        )

        .slice(
            0,
            memoriasHabitante.length-500
        );

        datos.memorias =
        datos.memorias.filter(
            memoria =>
            !eliminar.includes(memoria)
        );

    }

    guardarArchivo(
        "../datos/memorias.json",
        datos
    );

return memoria;

}



// =================================
// OBTENER MEMORIAS
// =================================

function obtenerMemorias(
habitante_id
){

    const datos =
    cargarArchivo("../datos/memorias.json");

    if(
        !datos ||
        !datos.memorias
    ){
        return [];
    }

    return datos.memorias

    .filter(
        memoria =>
        memoria.habitante_id===habitante_id
    )

    .sort(
        (a,b)=>
        new Date(a.fecha_real)-
        new Date(b.fecha_real)
    );

}
// =================================
// BUSCAR MEMORIAS
// =================================

function buscarMemoriasTipo(
habitante_id,
tipo
){

    return obtenerMemorias(habitante_id)

    .filter(
        memoria =>
        memoria.tipo===tipo
    );

}

function buscarMemoriasPersona(
habitante_id,
persona_id
){

    return obtenerMemorias(habitante_id)

    .filter(
        memoria =>

        memoria.personas_relacionadas.includes(
            persona_id
        )

    );

}

function buscarMemoriasEmocion(
habitante_id,
emocion
){

    return obtenerMemorias(habitante_id)

    .filter(
        memoria =>
        memoria.emocion===emocion
    );

}


// =================================
// RECUERDOS IMPORTANTES
// =================================

function obtenerRecuerdosImportantes(
habitante_id
){

    return obtenerMemorias(habitante_id)

    .filter(
        memoria =>
        memoria.influencia>=80
    );

}



// =================================
// RECORDAR MEMORIA
// =================================

function recordarMemoria(
habitante_id,
id
){

    const datos =
    cargarArchivo("../datos/memorias.json");

    if(!datos){
        return null;
    }

    const memoria =
    datos.memorias.find(

        memoria=>

        memoria.id===id &&

        memoria.habitante_id===habitante_id

    );

    if(!memoria){
        return null;
    }

    memoria.recordada=true;

    memoria.veces_recordada++;

    memoria.fuerza_recuerdo =

    Math.min(
        100,
        memoria.fuerza_recuerdo+5
    );

    guardarArchivo(
        "../datos/memorias.json",
        datos
    );

    return memoria;

}


// =================================
// EVOLUCIONAR MEMORIAS
// =================================

function evolucionarMemorias(){

    const datos =
    cargarArchivo("../datos/memorias.json");

    if(!datos){
        return false;
    }

    datos.memorias.forEach(

        memoria=>{

            if(
                memoria.favorita ||
                memoria.estado==="permanente"
            ){
                return;
            }

            let perdida=1;

            switch(memoria.importancia){

                case "muy_alta":
                    perdida=0.1;
                break;

                case "alta":
                    perdida=0.2;
                break;

                case "media":
                    perdida=0.5;
                break;

                default:
                    perdida=1;
                break;

            }

            memoria.fuerza_recuerdo-=perdida;

            if(
                memoria.fuerza_recuerdo<=50
            ){
                memoria.recordada=false;
            }

            if(
                memoria.fuerza_recuerdo<=20 &&
                memoria.estado==="activa"
            ){
                memoria.estado="debil";
            }

            if(
                memoria.fuerza_recuerdo<=0
            ){

                memoria.fuerza_recuerdo=0;

                memoria.estado="olvidada";

            }

        }

    );

    guardarArchivo(
        "../datos/memorias.json",
        datos
    );

    return true;

}



// =================================
// ELIMINAR MEMORIA
// =================================

function eliminarMemoria(id){

    const datos =
    cargarArchivo("../datos/memorias.json");

    if(!datos){
        return false;
    }

    datos.memorias =

    datos.memorias.filter(
        memoria =>
        memoria.id!==id
    );

    guardarArchivo(
        "../datos/memorias.json",
        datos
    );

    return true;

}



// =================================
// EXPORTAR
// =================================

module.exports={

    crearMemoria,

    obtenerMemorias,

    buscarMemoriasTipo,

    buscarMemoriasPersona,

    buscarMemoriasEmocion,

    obtenerRecuerdosImportantes,

    recordarMemoria,

    evolucionarMemorias,

    eliminarMemoria

};
