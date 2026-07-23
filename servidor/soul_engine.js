// Motor principal avanzado de Village Soul


console.log("=================================");
console.log("          SOUL ENGINE");
console.log("=================================");





const cargarArchivo =
require("./sistemas/cargador_datos.js");


const sistemas =
require("./sistemas.js");


const crearEvento =
require("./sistemas/eventos.js");





// Sistemas principales

const tiempo =
require("./sistemas/tiempo.js");


const reloj =
require("./sistemas/reloj_mundo.js");









// =================================
// ESTADO DEL MOTOR
// =================================


let estadoMotor = {


    activo:false,


    fecha_inicio:null,


    sistemas_cargados:0,


    habitantes:0,


    ciclos:0


};









// =================================
// CARGAR SISTEMA
// =================================


function cargarSistema(
nombre
){


    try{


        require(
            "./sistemas/"+nombre+".js"
        );


        return true;


    }


    catch(error){


        console.log(

            "⚠ Error sistema:",
            nombre,
            "-",
            error.message

        );


        return false;


    }


}









// =================================
// INICIAR SOUL ENGINE
// =================================


function iniciarSoulEngine(){



console.log(
"Cargando sistemas activos..."
);





let correctos=0;





sistemas.activos.forEach(

sistema=>{


    const cargado =
    cargarSistema(
        sistema
    );



    if(cargado){


        console.log(
            "✓",
            sistema
        );


        correctos++;


    }



}

);






estadoMotor.sistemas_cargados =
correctos;







console.log("");

console.log(
"Sistemas en desarrollo:"
);



sistemas.desarrollo.forEach(

sistema=>{


console.log(
"○",
sistema
);


}

);









// =================================
// CARGAR MUNDO
// =================================


const mundo =
cargarArchivo(
"../datos/mundo.json"
);




if(mundo){


console.log(
"Mundo:",
mundo.nombre
);


console.log(
"Estado:",
mundo.estado
);


}

else{


console.log(
"⚠ No se pudo cargar mundo"
);


}









// =================================
// CARGAR ALMAS
// =================================


const almas =
cargarArchivo(
"../datos/almas.json"
);




if(
almas &&
almas.almas
){


estadoMotor.habitantes =
almas.almas.length;



console.log(

"Habitantes:",
estadoMotor.habitantes

);



almas.almas.forEach(

alma=>{


console.log(

"Alma:",
alma.nombre,

"ID:",
alma.id

);


}

);



}

else{


console.log(
"No existen almas todavía."
);


}









// =================================
// CARGAR TIEMPO
// =================================


const mundoTiempo =
tiempo.obtenerTiempo();



if(mundoTiempo){


console.log(

"Fecha:",
reloj.obtenerFechaTexto()

);


console.log(

"Momento:",
reloj.obtenerMomentoDia()

);


}









// =================================
// ACTIVAR MOTOR
// =================================


estadoMotor.activo=true;


estadoMotor.fecha_inicio =
new Date().toISOString();







crearEvento(

"soul_engine_inicio",

[],


{


mensaje:
"Village Soul Engine iniciado",


habitantes:
estadoMotor.habitantes


}


);






console.log("");

console.log(
"Motor preparado:"
);


console.log(
estadoMotor
);



console.log("=================================");
console.log("Soul Engine activo.");
console.log("=================================");





return estadoMotor;


}









// =================================
// CICLO DEL MOTOR
// =================================


function ejecutarCiclo(){



if(
!estadoMotor.activo
){

return null;

}




try{



const nuevoTiempo =
tiempo.avanzarTiempo(1);



estadoMotor.ciclos++;





return nuevoTiempo;



}

catch(error){



console.log(

"Error ciclo:",
error.message

);



return null;


}



}









// =================================
// PROCESAR ALMA
// =================================


function procesarAlma(
id
){



try{


const {
pensarAlma
}

=
require("./IA/ia_almas.js");




const pensamiento =
pensarAlma(id);





if(!pensamiento){

return null;

}





console.log(

"Pensamiento:",

pensamiento.decision

);





return pensamiento;



}



catch(error){



console.log(

"Error IA:",

error.message

);



return null;


}



}









// =================================
// ESTADO
// =================================


function obtenerEstadoMotor(){


return estadoMotor;


}









module.exports={



iniciarSoulEngine,


ejecutarCiclo,


procesarAlma,


obtenerEstadoMotor



};
    
