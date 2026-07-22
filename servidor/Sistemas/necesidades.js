// Sistema avanzado de necesidades - Village Soul 2.0
// Control de necesidades físicas, sociales y emocionales


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


const {
obtenerEtapaHabitante
}
=
require("./etapas.js");




// =================================
// OBTENER NECESIDADES
// =================================


function obtenerNecesidades(
habitante_id
){


const datos =
cargarArchivo(
"../datos/necesidades.json"
);



if(
!datos ||
!datos.necesidades
){

return null;

}



return datos.necesidades.find(

n=>
n.habitante_id===habitante_id

)||null;


}









// =================================
// CREAR NECESIDADES
// =================================


function crearNecesidades(
habitante_id,
etapa="adulto"
){


const datos =
cargarArchivo(
"../datos/necesidades.json"
);



if(!datos){

return null;

}



if(!datos.necesidades){

datos.necesidades=[];

}





const existente =
obtenerNecesidades(
habitante_id
);



if(existente){

return existente;

}






const nueva={


habitante_id,


etapa,



hambre:100,


energia:100,


higiene:100,


diversion:80,


social:70,


carino:80,


seguridad:100,


descanso:100,



estres:0,



estado:"estable",



ultima_actualizacion:
new Date().toISOString()



};







datos.necesidades.push(
nueva
);





guardarArchivo(

"../datos/necesidades.json",

datos

);






return nueva;


}









// =================================
// ACTUALIZAR NECESIDADES
// =================================


function actualizarNecesidades(
habitante_id,
ciclo=1
){



const necesidad =
obtenerNecesidades(
habitante_id
);



if(!necesidad){

return null;

}






const datosAlmas =
cargarArchivo(
"../datos/almas.json"
);




const alma =
datosAlmas?.almas?.find(

a=>
a.id===habitante_id

);





if(!alma){

return null;

}





const etapa =
obtenerEtapaHabitante(
alma
);




let consumo=1;








// =================================
// EFECTO DE EDAD
// =================================


switch(
etapa?.nombre
){


case "bebe":

consumo=0.5;

necesidad.carino-=1*ciclo;

break;




case "niño":

consumo=0.8;

necesidad.diversion-=0.5*ciclo;

break;




case "adolescente":

consumo=1;

necesidad.social-=1*ciclo;

break;




case "adulto":

consumo=1.2;

break;




case "adulto_mayor":

consumo=0.9;

necesidad.descanso-=1*ciclo;

break;


}








// =================================
// EFECTO PROFESIÓN
// =================================


if(
alma.profesion &&
alma.profesion.nombre!=="ninguna"
){


consumo+=0.3;


necesidad.energia-=1*ciclo;


necesidad.estres+=1*ciclo;


}








// =================================
// RASGOS DE PERSONALIDAD
// =================================


if(
alma.rasgos?.includes("activo")
){


necesidad.diversion-=0.5*ciclo;


}



if(
alma.rasgos?.includes("social")
){


necesidad.social-=0.5*ciclo;


}



if(
alma.rasgos?.includes("tranquilo")
){


necesidad.estres-=0.5*ciclo;


}









// =================================
// CONSUMO NORMAL
// =================================


necesidad.hambre -=
2*ciclo*consumo;



necesidad.energia -=
1*ciclo*consumo;



necesidad.higiene -=
1*ciclo;



necesidad.diversion -=
0.5*ciclo;



necesidad.social -=
0.5*ciclo;



necesidad.descanso -=
1*ciclo;





necesidad.estres -=
0.5*ciclo;








limitarValores(
necesidad
);





analizarNecesidades(

habitante_id,

necesidad

);





actualizarEstado(
necesidad
);





necesidad.ultima_actualizacion =
new Date().toISOString();






guardarNecesidades(
necesidad
);






return necesidad;


}









// =================================
// ANALIZAR NECESIDADES
// =================================

function analizarNecesidades(
habitante_id,
n
){



if(n.hambre < 20){


crearEvento(

"hambre_critica",

[habitante_id],

{

nivel:n.hambre

}

);



cambiarEmocion(

habitante_id,

"tristeza",

5,

"hambre"

);


}





if(n.energia < 20){


crearEvento(

"energia_baja",

[habitante_id],

{

nivel:n.energia

}

);



cambiarEmocion(

habitante_id,

"estres",

5,

"cansancio"

);


}





if(n.social < 20){


crearEvento(

"soledad",

[habitante_id]

);



cambiarEmocion(

habitante_id,

"soledad",

5,

"falta de interacción social"

);


}





if(n.carino < 20){


cambiarEmocion(

habitante_id,

"soledad",

3,

"falta de cariño"

);


}





if(n.diversion < 20){


cambiarEmocion(

habitante_id,

"aburrimiento",

4,

"falta de diversión"

);


}





if(n.seguridad < 20){


cambiarEmocion(

habitante_id,

"miedo",

5,

"falta de seguridad"

);


}





}





// =================================
// SATISFACER NECESIDAD
// =================================


function satisfacerNecesidad(
habitante_id,
tipo
){



const necesidad =
obtenerNecesidades(
habitante_id
);



if(!necesidad){

return null;

}





let mensaje="";





switch(tipo){



case "comida":


necesidad.hambre=100;


mensaje="Comió y recuperó energía.";

break;





case "dormir":


necesidad.energia=100;


necesidad.descanso=100;


mensaje="Descansó correctamente.";

break;





case "baño":


necesidad.higiene=100;


mensaje="Mejoró su higiene.";

break;





case "familia":


necesidad.social=100;


necesidad.carino=100;


mensaje="Pasó tiempo con sus seres queridos.";

break;





case "jugar":


necesidad.diversion=100;


mensaje="Disfrutó una actividad divertida.";

break;





case "seguridad":


necesidad.seguridad=100;


mensaje="Se siente protegido.";

break;





default:


return necesidad;


}







crearMemoria(

habitante_id,

"necesidad",

mensaje,

"baja"

);






crearEvento(

"necesidad_satisfecha",

[habitante_id],

{

tipo

}

);








guardarNecesidades(
necesidad
);







return
