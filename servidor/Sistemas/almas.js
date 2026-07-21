// Sistema de almas de Village Soul

const cargarArchivo = require("./cargador_datos.js");
const crearMemoria = require("./memorias.js");


function obtenerAlma(id){

    const datos = cargarArchivo("../datos/almas.json");

    if(!datos){
        console.log("No se pudieron cargar las almas.");
        return null;
    }


    return datos.almas.find(
        alma => alma.id === id
    );

}




function crearAlma(nuevaAlma){

    const datos = cargarArchivo("../datos/almas.json");

    if(!datos){
        return null;
    }


    const nueva = {

        id: datos.almas.length + 1,

        nombre: nuevaAlma.nombre || "Sin nombre",

        edad: nuevaAlma.edad || 0,

        personalidad_id:
        nuevaAlma.personalidad_id || null,

        tipo:
        nuevaAlma.tipo || "habitante",

        emociones:
        nuevaAlma.emociones ||
        {
            felicidad:50,
            confianza:0,
            miedo:0,
            tristeza:0,
            ira:0,
            calma:50
        },


        memorias: [],


        relaciones: [],


        objetivos:
        nuevaAlma.objetivos || [],


        profesion:
        nuevaAlma.profesion ||
        {
            nombre:"niño",
            nivel:1,
            experiencia:0,
            estado:"activa"
        },


        familia: [],


        estado:"viviendo"

    };



    datos.almas.push(nueva);



    crearMemoria(

        nueva.id,

        "nacimiento",

        "Una nueva alma llegó al mundo.",

        "alta"

    );



    console.log("Nueva alma creada:");

    console.log(nueva);



    return nueva;

}





function actualizarAlma(id,cambios){

    const alma = obtenerAlma(id);


    if(!alma){

        return null;

    }


    Object.assign(
        alma,
        cambios
    );


    return alma;

}





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
