// Sistema de vida de habitantes - Village Soul


const cargarArchivo =
require("./cargador_datos.js");


const crearMemoria =
require("./memorias.js");


const crearEvento =
require("./eventos.js");


const {
    actualizarEmbarazos
}
=
require("./embarazo.js");



const {
    obtenerLugarTrabajo
}
=
require("./lugares_trabajo.js");




// =================================
// ACTUALIZAR VIDA HABITANTES
// =================================


function actualizarVidaHabitantes(){


console.log("=================================");
console.log(" ACTUALIZANDO VIDA HABITANTES ");
console.log("=================================");



const almas =
cargarArchivo("../datos/almas.json");



const tiempoDatos =
cargarArchivo("../datos/tiempo.json");



if(
!almas ||
!tiempoDatos
){

console.log(
"No se pudieron cargar datos de vida."
);

return null;

}



const tiempo =
tiempoDatos.tiempo;




// ================================
// CICLO MINECRAFT
// ================================


let periodo;



if(tiempo.minuto < 5){

periodo="amanecer";

}

else if(tiempo.minuto < 15){

periodo="dia";

}

else if(tiempo.minuto < 18){

periodo="atardecer";

}

else{

periodo="noche";

}




console.log(
"Periodo:",
periodo
);







almas.almas.forEach(

habitante=>{


if(
habitante.estado !== "viviendo"
){

return;

}




const profesion =
habitante.profesion;



if(!profesion){

return;

}




const trabajo =
obtenerLugarTrabajo(
habitante.id
);






// ================================
// TRABAJO
// ================================


if(
periodo==="dia"
&&
trabajo
){


console.log(

habitante.nombre+
" trabaja en "+
trabajo.nombre

);



if(
!profesion.ultimo_trabajo
||
profesion.ultimo_trabajo !== tiempo.hora
){



profesion.experiencia += 1;


profesion.ultimo_trabajo =
tiempo.hora;



crearMemoria(

habitante.id,

"trabajo",

"Trabajó como "+
profesion.nombre,

"media"

);



}




if(
profesion.experiencia >= 100
){


profesion.nivel++;


profesion.experiencia=0;



crearEvento(

"subida_nivel_profesion",

[habitante.id],

{

profesion:
profesion.nombre,

nivel:
profesion.nivel

}

);



}



}







// ================================
// DESCANSO
// ================================


if(
periodo==="noche"
){


console.log(

habitante.nombre+
" está descansando."

);



if(
habitante.emociones
){


habitante.emociones.calma++;



if(
habitante.emociones.calma > 100
){

habitante.emociones.calma=100;

}


}


}




}

);





// ================================
// ACTUALIZAR EMBARAZOS
// ================================


if(
periodo==="amanecer"
){

actualizarEmbarazos();

}






console.log(
"Vida actualizada correctamente."
);



return almas;



}






module.exports={

actualizarVidaHabitantes

};
