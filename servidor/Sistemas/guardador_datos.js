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


        // Quitar ./ o ../ del inicio

        nombre = nombre.replace(
            /^(\.\.\/|\.\/)+/,
            ""
        );





        const rutaCompleta = path.join(

            __dirname,

            "..",

            nombre

        );





        // Crear carpetas si no existen

        const carpeta = path.dirname(
            rutaCompleta
        );



        if(
            !fs.existsSync(carpeta)
        ){

            fs.mkdirSync(

                carpeta,

                {
                    recursive:true
                }

            );

        }







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
            "ERROR GUARDANDO DATOS"
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



        return false;


    }


}





module.exports = guardarArchivo;
