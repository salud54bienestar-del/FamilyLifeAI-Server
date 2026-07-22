// Cargador de datos de Village Soul

const fs = require("fs");
const path = require("path");




// =================================
// CARGAR ARCHIVO JSON
// =================================

function cargarArchivo(
    nombre
){

    try{


        // Eliminar ./ o ../ del inicio

        nombre = nombre.replace(

            /^(\.\.\/|\.\/)+/,

            ""

        );




        const rutaCompleta = path.join(

            __dirname,

            "..",

            nombre

        );





        if(
            !fs.existsSync(rutaCompleta)
        ){

            console.log(
                "Archivo no encontrado:",
                rutaCompleta
            );

            return null;

        }






        const contenido =

        fs.readFileSync(

            rutaCompleta,

            "utf8"

        );





        return JSON.parse(
            contenido
        );



    }

    catch(error){


        console.log(
            "==============================="
        );


        console.log(
            "ERROR CARGANDO ARCHIVO"
        );


        console.log(
            "==============================="
        );


        console.log(
            "Archivo:",
            nombre
        );


        console.log(
            "Motivo:",
            error.message
        );



        return null;


    }


}





module.exports = cargarArchivo;
