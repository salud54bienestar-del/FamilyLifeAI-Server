// Motor principal de Village Soul

console.log("=================================");
console.log("        SOUL ENGINE");
console.log("=================================");


const cargarArchivo = require("./sistemas/cargador_datos.js");
const sistemas = require("./sistemas.js");


const crearEvento = require("./sistemas/eventos.js");
const pensarAlma = require("./ia/ia_almas.js");
const avanzarTiempo = require("./sistemas/tiempo.js");


const relaciones = require("./sistemas/relaciones.js");
const memorias = require("./sistemas/memorias.js");
const decisiones = require("./sistemas/decisiones.js");



console.log("Sistemas activos:");


sistemas.forEach((sistema) => {

  console.log("✓ " + sistema);

});



console.log("Cargando mundo...");


const mundo = cargarArchivo("./datos/mundo.json");



if (mundo) {

  console.log("Mundo cargado:");

  console.log(mundo.nombre);

}



crearEvento(

  1,

  [1],

  {

    inicio: "primera historia del mundo"

  }

);



console.log("Inicializando habitantes...");



const almaInicial = pensarAlma(1);



if (almaInicial) {

  console.log("Alma cargada correctamente.");

}



console.log("Activando sistemas sociales...");



relaciones();

memorias();



console.log("Evaluando decisiones de habitantes...");



decisiones();



console.log("Iniciando ciclo de tiempo...");



avanzarTiempo();



console.log("Sistema listo.");
