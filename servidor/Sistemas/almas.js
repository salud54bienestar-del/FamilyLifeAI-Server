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

) || null;

}

// =================================
// CREAR ALMA
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







const edad =  
nuevaAlma.edad || 0;  





const nueva = {  


    id:nuevoId,  



    nombre:  

    nuevaAlma.nombre ||  
    "Sin nombre",  




    edad,  



    etapa_vida:  

    determinarEtapaVida(  
        edad  
    ),  




    personalidad:  

    nuevaAlma.personalidad || null,  



    personalidad_id:  

    nuevaAlma.personalidad_id || null,  





    tipo:  

    nuevaAlma.tipo ||  
    "habitante",  






    emociones:  


    nuevaAlma.emociones || {  


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


    nuevaAlma.profesion || {  


        nombre:"ninguna",  

        nivel:0,  

        experiencia:0,  

        estado:"inactivo"  


    },  






    familia:  

    nuevaAlma.familia || [],  






    origen:  


    nuevaAlma.origen ||  

    "nacido_en_el_mundo",  






    estado:  

    "viviendo"  



};  






datos.almas.push(  
    nueva  
);  






crearMemoria(  

    nueva.id,  

    "origen",  

    obtenerMensajeOrigen(nueva),  

    "alta"  

);  






return nueva;

}

// =================================
// OBJETIVOS SEGÚN EDAD
// =================================

function obtenerObjetivosIniciales(
edad
){

if(edad < 1){  

    return [  

        "crecer",  

        "descubrir_el_mundo"  

    ];  

}  



if(edad < 12){  

    return [  

        "aprender",  

        "jugar",  

        "crear_amigos"  

    ];  

}  



if(edad < 18){  

    return [  

        "desarrollar_habilidades",  

        "encontrar_identidad"  

    ];  

}  



return [  

    "trabajar",  

    "crear_vínculos",  

    "alcanzar_metass"  

];

}

// =================================
// ETAPA DE VIDA
// =================================

function determinarEtapaVida(
edad
){

if(edad < 1){  

    return "bebe";  

}  



if(edad < 12){  

    return "niño";  

}  



if(edad < 18){  

    return "adolescente";  

}  



if(edad < 60){  

    return "adulto";  

}  



return "anciano";

}

// =================================
// MENSAJE DE ORIGEN
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



return alma;

}

// =================================
// CAMBIAR ETAPA
// =================================

function actualizarEtapaAlma(
alma
){

if(!alma){  

    return null;  

}  



alma.etapa_vida =  
determinarEtapaVida(  
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

module.exports={

obtenerAlma,  

crearAlma,  

actualizarAlma,  

actualizarEtapaAlma,  

listarAlmas

};
