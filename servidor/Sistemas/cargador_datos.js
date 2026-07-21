// Cargador de datos de Village Soul

const fs = require("fs");
const path = require("path");

function cargarArchivo(nombre) {

    try {

        // Eliminar ./ o ../ del inicio
        nombre = nombre.replace(/^(\.\.\/|\.\/)+/, "");

        // Siempre buscar dentro de la carpeta datos
        const rutaCompleta = path.join(
            __dirname,
            "..",
            nombre
        );

        const datos = fs.readFileSync(rutaCompleta, "utf8");

        return JSON.parse(datos);

    } catch (error) {

        console.log("===============================");
        console.log("ERROR CARGANDO ARCHIVO");
        console.log("===============================");
        console.log("Archivo:", nombre);
        console.log("Ruta buscada:", path.join(__dirname, "..", nombre));
        console.log("Motivo:", error.message);

        return null;
    }

}

module.exports = cargarArchivo;
