// Cargador de datos de Village Soul

const fs = require("fs");

function cargarArchivo(nombre) {
    try {
        const datos = fs.readFileSync("../datos/" + nombre, "utf8");
        return JSON.parse(datos);
    } catch (error) {
        console.log("Error cargando: " + nombre);
        return null;
    }
}

module.exports = cargarArchivo;
