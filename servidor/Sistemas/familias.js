// Sistema avanzado de familias - Village Soul 2.0


const cargarArchivo =
require("./cargador_datos.js");

const guardarArchivo =
require("./guardador_datos.js");

const crearEvento =
require("./eventos.js");

const crearMemoria =
require("./memorias.js");

const {
obtenerRelacion
}
=
require("./relaciones.js");

const {
obtenerEtapaHabitante
}
=
require("./etapas_vida.js");




// =================================
// OBTENER FECHA DEL MUNDO
// =================================

function obtenerFechaMundo(){

const tiempo =
cargarArchivo("../datos/tiempo.json");

if(
!tiempo ||
!tiempo.tiempo
){

return new Date().toISOString();

}

return tiempo.tiempo;

}






// =================================
// CARGAR FAMILIAS
// =================================

function cargarFamilias(){

const datos =
cargarArchivo("../datos/familias.json");

if(!datos){

return null;

}

if(!datos.familias){

datos.familias=[];

}

return datos;

}






// =================================
// PUEDE FORMAR FAMILIA
// =================================

function puedeFormarFamilia(
habitante
){

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

return(

etapa.nombre==="adulto"

||

etapa.nombre==="adulto_mayor"

);

}






// =================================
// CREAR FAMILIA
// =================================

function crearFamilia(
apellido="",
tipo="nuclear"
){

const datos =
cargarFamilias();

if(!datos){

return null;

}

const id =

datos.familias.length>0

?

Math.max(
...datos.familias.map(
f=>f.id
)
)+1

:

1;

const familia={

id,

apellido,

tipo_familia:tipo,

estado:"activa",

generacion:1,

miembros:[],

padres:[],

hijos:[],

mascotas:[],

hogar:{

id:null,

nombre:null,

ubicacion:null

},

estabilidad:{

confianza:50,

amor:50,

felicidad:50,

comunicacion:50,

recursos:50

},

recursos_compartidos:{

alimentos:0,

esmeraldas:0,

madera:0,

piedra:0,

hierro:0,

herramientas:0,

cultivos:0,

animales:0

},

reputacion:0,

historial:[

{

evento:"familia_creada",

fecha:obtenerFechaMundo()

}

]

};

datos.familias.push(
familia
);

guardarArchivo(
"../datos/familias.json",
datos
);

crearEvento(

"familia_creada",

[],

{

familia:id

}

);

return familia;

}






// =================================
// CREAR MATRIMONIO
// =================================

function crearFamiliaMatrimonio(
a,
b,
apellido=""
){

const almas =
cargarArchivo("../datos/almas.json");

if(!almas){

return null;

}

const personaA =
almas.almas.find(
x=>x.id===a
);

const personaB =
almas.almas.find(
x=>x.id===b
);

if(

!personaA ||

!personaB

){

return null;

}

if(

!puedeFormarFamilia(personaA)

||

!puedeFormarFamilia(personaB)

){

return null;

}

const relacion =
obtenerRelacion(
a,
b
);

if(!relacion){

return null;

}

if(

relacion.estado_pareja!=="pareja"

&&

relacion.estado_pareja!=="comprometidos"

){

return null;

}

if(
relacion.romance<80
){

return null;

}

if(
relacion.compromiso<60
){

return null;

}

const familia =
crearFamilia(

apellido,

"matrimonio"

);

agregarMiembro(

familia.id,

a,

"padre"

);

agregarMiembro(

familia.id,

b,

"madre"

);

familia.historial.push({

evento:"matrimonio",

fecha:obtenerFechaMundo()

});

guardarFamilia(
familia
);

crearMemoria(

a,

"familia",

"Formó una nueva familia.",

"alta",

[b]

);

crearMemoria(

b,

"familia",

"Formó una nueva familia.",

"alta",

[a]

);

crearEvento(

"matrimonio",

[a,b],

{

familia:
familia.id

}

);

return familia;

  }







// =================================
// AGREGAR MIEMBRO
// =================================

function agregarMiembro(
idFamilia,
habitante_id,
rol="miembro"
){

const familia =
obtenerFamiliaPorId(idFamilia);

if(!familia){

return null;

}

// Evitar miembros duplicados
if(!familia.miembros.includes(habitante_id)){

familia.miembros.push(habitante_id);

}

// Registrar según el rol
if(
rol==="padre" ||
rol==="madre"
){

if(
!familia.padres.some(
p=>p.habitante_id===habitante_id
)
){

familia.padres.push({

habitante_id,
rol

});

}

}

// Actualizar el alma
const almas =
cargarArchivo("../datos/almas.json");

if(
almas &&
almas.almas
){

const alma =
almas.almas.find(
a=>a.id===habitante_id
);

if(alma){

alma.familia=idFamilia;

guardarArchivo(
"../datos/almas.json",
almas
);

}

}

crearMemoria(

habitante_id,

"familia",

"Ahora pertenece a una familia.",

"media"

);

guardarFamilia(familia);

return familia;

}




// =================================
// AGREGAR HIJO
// =================================

function agregarHijo(
idFamilia,
hijo_id,
tipo="biologico"
){

const familia =
obtenerFamiliaPorId(idFamilia);

if(!familia){

return null;

}

// Evitar hijos duplicados
if(
familia.hijos.some(
h=>h.habitante_id===hijo_id
)
){

return familia;

}

familia.hijos.push({

habitante_id:hijo_id,

tipo,

fecha:obtenerFechaMundo()

});

agregarMiembro(

idFamilia,

hijo_id,

"hijo"

);

familia.reputacion+=2;

familia.historial.push({

evento:"nuevo_hijo",

habitante:hijo_id,

fecha:obtenerFechaMundo()

});

crearEvento(

"nacimiento",

familia.miembros,

{

hijo:hijo_id,

familia:idFamilia
