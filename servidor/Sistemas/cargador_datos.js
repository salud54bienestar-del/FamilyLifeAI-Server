// Cargador de datos de Village Soul

const fs = require("fs");
const path = require("path");


function cargarArchivo(nombre) {

    try {

        // Carpeta servidor
        const rutaBase = path.resolve(__dirname, "..");


        // Convertir ../datos/archivo.json a datos/archivo.json
        const archivo = nombre.replace("../", "");


        const rutaCompleta = path.join(
            rutaBase,
            archivo
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

        console.log("Ruta buscada:", path.join(
            path.resolve(__dirname, ".."),
            nombre.replace("../", "")
        ));

        console.log("Motivo:", error.message);


        return null;

    }

}


module.exports = cargarArchivo;
