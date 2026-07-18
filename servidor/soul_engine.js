console.log("=================================");
console.log("        SOUL ENGINE");
console.log("=================================");

const cargarArchivo = require("./cargador_datos.js");

console.log("Cargando mundo...");

const mundo = cargarArchivo("./mundo.json");

if (mundo) {
  console.log("Mundo cargado:");
  console.log(mundo.nombre);
}

console.log("Sistema listo.");
