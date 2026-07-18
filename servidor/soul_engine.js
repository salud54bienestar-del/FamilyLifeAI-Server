console.log("=================================");
console.log("        SOUL ENGINE");
console.log("=================================");

const sistemas = require("./sistemas.js");

console.log("Iniciando Núcleo del Mundo...");
console.log("Cargando sistemas...");

sistemas.forEach((sistema) => {
  console.log("Activando: " + sistema);
});

console.log("Sistema listo.");
