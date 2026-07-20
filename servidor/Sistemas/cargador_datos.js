// Cargador de datos de Village Soul

const fs = require("fs");
const path = require("path");


function cargarArchivo(nombre) {

    try {

        // Carpeta raíz del proyecto: FamilyLifeAI-Server
        const rutaBase = path.resolve(__dirname, "..");


        // Elimina ../ porque la carpeta datos está dentro de la raíz
        const archivoLimpio = nombre.replace("../", "");


        const rutaCompleta = path.resolve(
            rutaBase,
            archivoLimpio
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


        console.log(
            "Ruta buscada:",
            path.resolve(
                __dirname,
                "..",
                nombre.replace("../", "")
            )
        );


        console.log("Motivo:", error.message);


        return null;

    }

}


module.exports = cargarArchivo;
