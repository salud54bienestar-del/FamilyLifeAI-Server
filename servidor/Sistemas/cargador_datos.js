// Cargador de datos de Village Soul

const fs = require("fs");
const path = require("path");


function cargarArchivo(nombre) {

    try {

        let rutaCompleta;


        // Si ya viene con ../datos/
        if (nombre.startsWith("../")) {

            rutaCompleta = path.resolve(
                __dirname,
                "..",
                nombre.substring(3)
            );

        } 
        else {

            rutaCompleta = path.resolve(
                __dirname,
                "..",
                nombre
            );

        }



        const datos = fs.readFileSync(
            rutaCompleta,
            "utf8"
        );


        return JSON.parse(datos);


    } catch(error) {


        console.log("===============================");
        console.log("ERROR CARGANDO ARCHIVO");
        console.log("===============================");

        console.log("Archivo:", nombre);

        console.log("Ruta buscada:", error.path);

        console.log("Motivo:", error.message);


        return null;

    }

}


module.exports = cargarArchivo;
