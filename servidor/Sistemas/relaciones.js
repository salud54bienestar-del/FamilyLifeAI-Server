// Sistema avanzado de relaciones - Village Soul


const cargarArchivo =
require("./cargador_datos.js");


const guardarArchivo =
require("./guardador_datos.js");


const crearMemoria =
require("./memorias.js");


const crearEvento =
require("./eventos.js");


const cambiarEmocion =
require("./emociones.js").cambiarEmocion;


const obtenerEtapaHabitante =
require("./etapas_vida.js").obtenerEtapaHabitante;





// =================================
// OBTENER RELACIÓN
// =================================

function obtenerRelacion(
habitante_a,
habitante_b
){


const datos =
cargarArchivo("../datos/relaciones.json");


if(!datos){

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

)

|| null;


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
cargarArchivo("../datos/relaciones.json");


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
)+1

:

1;






const relacion={


id,


habitante_a,


habitante_b,


tipo,


nivel:"nuevo",



confianza:0,

afinidad:50,

respeto:50,

amistad:0,


romance:0,


compromiso:0,



estado_pareja:"ninguno",



conviven:false,



familia:{


parentesco:false,

tipo:null


},



historial:[

{

evento:"Primer encuentro",

fecha:new Date().toISOString()

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

[habitante_b]

);



crearMemoria(

habitante_b,

"relacion",

"Conoció a un nuevo habitante.",

"media",

[habitante_a]

);




crearEvento(

"nueva_relacion",

[habitante_a,habitante_b],

{

tipo

}

);




return relacion;


}









// =================================
// COMPROBAR EDAD ROMANCE
// =================================

function puedeTenerRomance(
habitante_id
){


const almas =
cargarArchivo("../datos/almas.json");


if(!almas){

return false;

}



const habitante =
almas.almas.find(

a=>a.id===habitante_id

);



if(!habitante){

return false;

}



const etapa =
obtenerEtapaHabitante(
habitante
);



if(!etapa){

return false;

}



return (

etapa.nombre==="adulto"

||

etapa.nombre==="adulto_mayor"

);


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
obtenerRelacion(a,b);



if(!relacion){

return null;

}



relacion.confianza += cantidad;



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
obtenerRelacion(a,b);



if(!relacion){

return null;

}



relacion.amistad += cantidad;


relacion.confianza += cantidad/2;



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

[a,b],

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


if(

!puedeTenerRomance(a)

||

!puedeTenerRomance(b)

){

return null;

}



const relacion =
obtenerRelacion(a,b);



if(!relacion){

return null;

}



if(relacion.familia.parentesco){

return null;

}





relacion.romance += cantidad;


relacion.compromiso += cantidad/2;



if(relacion.romance>=70){

relacion.estado_pareja="pareja";

}



if(relacion.romance>=90){

relacion.estado_pareja="comprometidos";

}



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

[a,b],

{

estado:
relacion.estado_pareja

}

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
obtenerRelacion(a,b);



if(!relacion){

return null;

}




relacion.estado_pareja="terminada";


relacion.romance=0;


relacion.compromiso=0;



agregarHistorial(

relacion,

"Relación terminada"

);




crearEvento(

"ruptura",

[a,b],

{}

);



guardarRelaciones();



return relacion;


}









// =================================
// ACTUALIZAR NIVEL
// =================================

function actualizarNivelRelacion(
relacion
){



const valor =

(

relacion.confianza+

relacion.afinidad+

relacion.amistad+

relacion.romance

)/4;




if(valor>=85){

relacion.nivel="alma_cercana";

}

else if(valor>=65){

relacion.nivel="amigos";

}

else if(valor>=40){

relacion.nivel="conocidos";

}

else{

relacion.nivel="nuevo";

}



}









// =================================
// HISTORIAL
// =================================

function agregarHistorial(
relacion,
texto
){


relacion.historial.push({

evento:texto,

fecha:new Date().toISOString()

});



if(relacion.historial.length>100){

relacion.historial.shift();

}



}









// =================================
// GUARDAR
// =================================

function guardarRelaciones(){


const datos =
cargarArchivo("../datos/relaciones.json");


guardarArchivo(

"../datos/relaciones.json",

datos

);


}








module.exports={


obtenerRelacion,

crearRelacion,

aumentarConfianza,

aumentarAmistad,

aumentarRomance,

terminarRelacion,

puedeTenerRomance


};
