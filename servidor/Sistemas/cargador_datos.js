// Guardador de datos de Village Soul

const fs = require("fs");
const path = require("path");



// =================================
// GUARDAR ARCHIVO JSON
// =================================

function guardarArchivo(
    nombre,
    datos
){

    try{

        // Eliminar ./ o ../ del inicio

        nombre = nombre.replace(

            /^(\.\.\/|\.\/)+/,

            ""

        );



        // Buscar siempre dentro de la carpeta datos

        const rutaCompleta = path.join(

            __dirname,

            "..",

            nombre

        );



        fs.writeFileSync(

            rutaCompleta,

            JSON.stringify(

                datos,

                null,

                2

            ),

            "utf8"

        );



        return true;

    }

    catch(error){


        console.log(

            "==============================="

        );

        console.log(

            "ERROR GUARDANDO ARCHIVO"

        );

        console.log(

            "==============================="

        );

        console.log(

            "Archivo:",

            nombre

        );

        console.log(

            "Ruta:",

            path.join(

                __dirname,

                "..",

                nombre

            )

        );

        console.log(

            "Motivo:",

            error.message

        );



        return false;

    }

}



module.exports = guardarArchivo;
