// Sistema avanzado de almas - Village Soul


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
crearEmocion
}
=
require("./emociones.js");


const {
crearUbicaciones
}
=
require("./ubicaciones.js");


const {
crearMovimiento
}
=
require("./movimiento.js");


const {
crearRutina
}
=
require("./rutinas.js");


const {
obtenerEtapaPorEdad,
cumplirAño
}
=
require("./etapas.js");




// =================================
// OBTENER ALMA
// =================================

function obtenerAlma(id){


const datos =
cargarArchivo("../datos/almas.json");


if(!datos || !datos.almas){

return null;

}


return datos.almas.find(

a=>a.id===id

)||null;


}








// =================================
// CREAR ALMA
// =================================

function crearAlma(
datosNueva={}
){


const datos =
cargarArchivo("../datos/almas.json");


if(!datos){

return null;

}



if(!datos.almas){

datos.almas=[];

}





const id =

datos.almas.length>0

?

Math.max(
...datos.almas.map(
a=>a.id
)
)+1

:

1;





const edad =
datosNueva.edad || 0;




const etapa =
obtenerEtapaPorEdad(
edad
);





const alma={


id,


nombre:
datosNueva.nombre || "Sin nombre",



sexo:
datosNueva.sexo || "desconocido",



edad,



etapa_vida:
etapa.nombre || etapa,



personalidad:
datosNueva.personalidad || null,



rasgos:
datosNueva.rasgos || [],



gustos:


datosNueva.gustos || {


comida:[],

animales:[],

colores:[],

actividades:[]

},




habilidades:{


social:0,

trabajo:0,

creatividad:0

},





profesion:{


nombre:"ninguna",

nivel:0,

experiencia:0,

estado:"inactivo"

},





familia:null,


padres:
datosNueva.padres || [],




objetivos:

obtenerObjetivosIniciales(
edad
),





origen:

datosNueva.origen ||

"nacido_en_el_mundo",




historia:[


{

evento:"nacimiento",

fecha:new Date().toISOString()

}


],




estado:"viviendo"


};







datos.almas.push(
alma
);



guardarArchivo(

"../datos/almas.json",

datos

);







// Crear sistemas internos


crearNecesidades(

id,

alma.etapa_vida

);



crearEmocion(
id
);



crearUbicaciones(
id
);



crearMovimiento(
id
);



crearRutina(

id,

alma.etapa_vida

);






crearMemoria(

id,

"origen",

"Una nueva alma apareció en Village Soul.",

"alta"

);






return alma;


}









// =================================
// OBJETIVOS
// =================================

function obtenerObjetivosIniciales(
edad
){


const etapa =
obtenerEtapaPorEdad(
edad
);



switch(etapa.nombre){



case "bebe":

return [

"recibir cuidados",

"crear vínculos"

];



case "niño":

return [

"aprender",

"jugar",

"explorar"

];



case "adolescente":

return [

"desarrollar habilidades",

"crear identidad",

"formar amistades"

];



case "adulto":

return [

"trabajar",

"crear vínculos",

"formar familia"

];



case "adulto_mayor":

return [

"enseñar",

"aconsejar",

"transmitir conocimiento"

];


default:

return [];


}


}









// =================================
// AUMENTAR EDAD
// =================================

function aumentarEdad(id){


const alma =
obtenerAlma(id);



if(!alma){

return null;

}





cumplirAño(
alma
);





alma.historia.push({

evento:"cumpleaños",

edad:alma.edad,

fecha:new Date().toISOString()

});





actualizarAlma(

id,

alma

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


const datos =
cargarArchivo("../datos/almas.json");



if(!datos || !datos.almas){

return null;

}




const index =

datos.almas.findIndex(

a=>a.id===id

);





if(index===-1){

return null;

}





datos.almas[index]={

...datos.almas[index],

...cambios

};





guardarArchivo(

"../datos/almas.json",

datos

);





return datos.almas[index];


}









// =================================
// LISTAR ALMAS
// =================================

function listarAlmas(){


const datos =
cargarArchivo("../datos/almas.json");


return datos?.almas || [];


}









module.exports={


obtenerAlma,

crearAlma,

actualizarAlma,

aumentarEdad,

listarAlmas


};
