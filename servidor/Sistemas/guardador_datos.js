// Guardador avanzado de datos - Village Soul


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



        if(!nombre){

            console.log(
                "Nombre inválido."
            );

            return false;

        }





        if(datos === undefined){

            console.log(
                "Datos inválidos:",
                nombre
            );

            return false;

        }







        nombre =
        nombre.replace(

            /^(\.\.\/|\.\/)+/,

            ""

        );







        const rutaCompleta =
        path.join(

            __dirname,

            "..",

            nombre

        );








        const carpeta =
        path.dirname(
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







        const contenido =

        JSON.stringify(

            datos,

            null,

            2

        );









        // Guardado seguro temporal


        const temporal =

        rutaCompleta +
        ".temp";





        fs.writeFileSync(

            temporal,

            contenido,

            "utf8"

        );





        fs.renameSync(

            temporal,

            rutaCompleta

        );









        return true;



    }

    catch(error){



        console.log(
            "==============================="
        );


        console.log(
            " ERROR GUARDANDO DATOS "
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



        return false;


    }


}








// =================================
// CREAR COPIA DE SEGURIDAD
// =================================


function crearBackup(nombre){



    try{



        nombre =
        nombre.replace(

            /^(\.\.\/|\.\/)+/,

            ""

        );



        const origen =
        path.join(

            __dirname,

            "..",

            nombre

        );



        if(
            !fs.existsSync(origen)
        ){

            return false;

        }



        const copia =

        origen +

        ".backup";




        fs.copyFileSync(

            origen,

            copia

        );




        return true;



    }

    catch(error){


        return false;


    }


}








module.exports={


    guardarArchivo,


    crearBackup


};
