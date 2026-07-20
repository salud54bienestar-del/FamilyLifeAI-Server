// Cargador de datos de Village Soul

const fs = require("fs");
const path = require("path");


function cargarArchivo(nombre) {

    try {

        const rutaCompleta = path.resolve(
            __dirname,
            "..",
            nombre.replace("../datos/", "")
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

        console.log("Ruta buscada:", path.resolve(
            __dirname,
            "..",
            nombre.replace("../datos/", "")
        ));

        console.log("Motivo:", error.message);


        return null;

    }

}


module.exports = cargarArchivo;
