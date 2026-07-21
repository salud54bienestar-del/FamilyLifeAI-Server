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



console.log("Inicializando habitantes...");


const almas = cargarArchivo("./datos/almas.json");


if (almas) {


    almas.almas.forEach((alma) => {


        console.log("---------------------------------");

        console.log(
            "Alma encontrada:",
            alma.nombre,
            "ID:",
            alma.id
        );


        const pensamiento = pensarAlma(alma.id);


        if (pensamiento) {


            console.log(
                "Decisión:",
                pensamiento.decision
            );


        }


    });


}



console.log("Creando evento inicial...");


crearEvento(

    "primer_encuentro",

    [1,2],

    {
        inicio: "primera historia del mundo"
    }

);



console.log("Activando sistemas sociales...");


console.log("Relaciones activas:");
console.log("✓ Luna ↔ Maya");



console.log("Iniciando ciclo de tiempo...");


avanzarTiempo();



console.log("Sistema listo.");
