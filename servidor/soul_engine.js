// Motor principal de Village Soul

console.log("=================================");
console.log("        SOUL ENGINE");
console.log("=================================");


const cargarArchivo = require("./Sistemas/cargador_datos.js");
const sistemas = require("./sistemas.js");

const crearEvento = require("./Sistemas/eventos.js");
const { pensarAlma } = require("./IA/ia_almas.js");
const avanzarTiempo = require("./Sistemas/tiempo.js");

const relaciones = require("./Sistemas/relaciones.js");
const memorias = require("./Sistemas/memorias.js");


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

    "primer_encuentro",

    [1],

    {
        inicio: "primera historia del mundo"
    }

);



console.log("Inicializando habitantes...");



const almaInicial = pensarAlma(1);



if (almaInicial) {

    console.log("Alma cargada correctamente.");

    console.log("Decisión del alma:");

    console.log(almaInicial.decision);

}



console.log("Activando sistemas sociales...");


// Aquí después conectaremos habitantes reales

// relaciones();


// memorias();



console.log("Iniciando ciclo de tiempo...");


avanzarTiempo();



console.log("Sistema listo.");
