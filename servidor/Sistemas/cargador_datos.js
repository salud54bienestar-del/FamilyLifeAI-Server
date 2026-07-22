// Cargador avanzado de datos - Village Soul


const fs = require("fs");

const path = require("path");





// =================================
// CARGAR ARCHIVO JSON
// =================================


function cargarArchivo(nombre){


    try{



        if(!nombre){

            console.log(
                "Nombre de archivo inválido."
            );

            return null;

        }






        // Limpiar rutas iniciales


        nombre =
        nombre.replace(

            /^(\.\.\/|\.\/)+/,

            ""

        );







        const rutaCompleta = path.join(

            __dirname,

            "..",

            nombre

        );








        // Verificar existencia


        if(
            !fs.existsSync(rutaCompleta)
        ){


            console.log(

                "Archivo no encontrado:",

                nombre

            );


            return null;


        }








        const contenido =

        fs.readFileSync(

            rutaCompleta,

            "utf8"

        );







        // Archivo vacío


        if(
            !contenido.trim()
        ){


            console.log(

                "Archivo vacío:",

                nombre

            );


            return null;


        }







        return JSON.parse(
            contenido
        );





    }

    catch(error){



        console.log(
            "==============================="
        );


        console.log(
            " ERROR CARGANDO DATOS "
        );


        console.log(
            "==============================="
        );



        console.log(

            "Archivo:",

            nombre

        );



        console.log(

            "Error:",

            error.message

        );



        return null;


    }


}








// =================================
// VERIFICAR ARCHIVO
// =================================


function existeArchivo(nombre){


    nombre =
    nombre.replace(

        /^(\.\.\/|\.\/)+/,

        ""

    );



    const ruta = path.join(

        __dirname,

        "..",

        nombre

    );



    return fs.existsSync(ruta);


}








module.exports = {


    cargarArchivo,


    existeArchivo


};
