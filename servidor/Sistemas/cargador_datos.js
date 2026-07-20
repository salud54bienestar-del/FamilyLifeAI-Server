// Cargador de datos de Village Soul

const fs = require("fs");
const path = require("path");


function cargarArchivo(nombre) {

    try {

        // Ruta base del proyecto (carpeta servidor)
        const rutaBase = path.resolve(__dirname, "..");

        const rutaCompleta = path.resolve(
            rutaBase,
            nombre
        );


        const datos = fs.readFileSync(
            rutaCompleta,
            "utf8"
        );


        return JSON.parse(datos);


    } catch (error) {


        console.log("===============================");
        console.log("ERROR CARGANDO ARCHIVO");
        console.log("===============================");


        console.log("Archivo:", nombre);

        console.log("Ruta buscada:", path.resolve(__dirname, "..", nombre));

        console.log("Motivo:", error.message);


        return null;

    }

}



module.exports = cargarArchivo;
