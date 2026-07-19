// Motor principal de Village Soul

console.log("=================================");
console.log("        SOUL ENGINE");
console.log("=================================");

const cargarArchivo = require("./cargador_datos.js");
const sistemas = require("./sistemas.js");
const crearEvento = require("./eventos.js");
const pensarAlma = require("./ia_almas.js");
const avanzarTiempo = require("./tiempo.js");

console.log("Sistemas activos:");

sistemas.forEach((sistema) => {
  console.log("✓ " + sistema);
});

console.log("Cargando mundo...");

const mundo = cargarArchivo("../datos/mundo.json");

if (mundo) {
  console.log("Mundo cargado:");
  console.log(mundo.nombre);
}

crearEvento(
  "Inicio del mundo",
  "El mundo de Village Soul comienza su primera historia."
);

console.log("Iniciando inteligencia artificial...");

pensarAlma(1);

console.log("Iniciando ciclo de tiempo...");

avanzarTiempo();

console.log("Sistema listo.");
