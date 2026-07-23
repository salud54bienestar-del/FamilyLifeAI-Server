// Punto de entrada principal - Village Soul

console.log("=================================");
console.log("          VILLAGE SOUL");
console.log("=================================");

console.log("Iniciando aplicación...");
console.log("Activando Soul Engine...");

try {
    const servidor = require("./servidor.js");

    const resultado = typeof servidor.iniciarServidor === "function" 
        ? servidor.iniciarServidor() 
        : null;

    if (resultado && resultado.mundo) {
        console.log("");
        console.log("=================================");
        console.log(" VILLAGE SOUL INICIADO CORRECTAMENTE");
        console.log("=================================");
        console.log("Mundo:", resultado.mundo.nombre || "Desconocido");
        console.log("Estado:", resultado.estado || "Activo");
    } else {
        console.log("");
        console.log("⚠️ Advertencia: El servidor inició pero no devolvió datos del mundo.");
    }
} catch (error) {
    console.log("");
    console.log("=================================");
    console.log(" ERROR AL INICIAR VILLAGE SOUL");
    console.log("=================================");
    console.log(error.message);
    if (error.stack) {
        console.log("");
        console.log(error.stack);
    }
}

console.log("");
console.log("Aplicación cargada.");
