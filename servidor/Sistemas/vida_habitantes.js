// Sistema avanzado de vida diaria de habitantes - Village Soul


const cargarArchivo =
require("./cargador_datos.js");


const guardarArchivo =
require("./guardador_datos.js");


const crearEvento =
require("./eventos.js");


const crearMemoria =
require("./memorias.js");


const {
    actualizarNecesidades
}
=
require("./necesidades.js");


const {
    actualizarEtapa
}
=
require("./etapas.js");


const rutinas =
require("./rutinas.js");


const reloj =
require("./reloj_mundo.js");


const decisiones =
require("./decisiones.js");






// =================================
// ACTUALIZAR VIDA HABITANTES
// =================================


function actualizarVidaHabitantes(){



const almas =
cargarArchivo("../datos/almas.json");



if(!almas){

console.log(
"No se pudieron cargar las almas."
);

return null;

}





const tiempo =
reloj.obtenerTiempo();



if(!tiempo){

return null;

}





const hora =
tiempo.hora;



console.log(
"Hora del mundo:",
hora
);






almas.almas.forEach(

habitante=>{





if(
habitante.estado !== "viviendo"
){

return;

}







// =====================
// ETAPA DE VIDA
// =====================


actualizarEtapa(
habitante
);








// =====================
// NECESIDADES
// =====================


actualizarNecesidades(

habitante.id

);








// =====================
// RUTINA
// =====================


rutinas.actualizarRutina(

habitante.id,

hora,

{

etapa:
habitante.etapa

}

);








// =====================
// DECISIONES
// =====================


if(
habitante.necesidades
&&
habitante.necesidades.energia < 20
){



decisiones.procesarDecision(

habitante.id,

{

necesidades:
habitante.necesidades,

emocion:
habitante.emocion

}

);



}








// =====================
// DESCANSO
// =====================


if(
hora >=22 ||
hora <6
){



if(
habitante.ultimo_descanso !== tiempo.dia
){



crearMemoria(

habitante.id,

"descanso",

habitante.nombre+
" descansó durante la noche.",

"baja"

);



habitante.ultimo_descanso =
tiempo.dia;



}


}








// =====================
// EVENTO DIARIO
// =====================


if(
habitante.ultima_actividad !== tiempo.dia
){



crearEvento(

"actividad_diaria",

[habitante.id],

{

dia:
tiempo.dia,

actividad:
habitante.actividad_actual ||
"vida diaria"

}

);



habitante.ultima_actividad =
tiempo.dia;



}






}

);







guardarArchivo(

"../datos/almas.json",

almas

);






console.log(
"Vida de habitantes actualizada."
);





return almas.almas;


}








module.exports={


actualizarVidaHabitantes


};
