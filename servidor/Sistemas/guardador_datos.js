// Guardador avanzado de datos - Village Soul


const fs = require("fs");

const path = require("path");







// =================================
// OBTENER RUTA
// =================================


function obtenerRuta(nombre){


    nombre = nombre.replace(

        /^(\.\.\/|\.\/)+/,

        ""

    );



    return path.join(

        __dirname,

        "..",

        nombre

    );


}









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








        const rutaCompleta =

        obtenerRuta(nombre);








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

            4

        );







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

            "ERROR GUARDANDO:",

            nombre

        );



        console.log(

            error.message

        );



        return false;


    }


}









// =================================
// BACKUP
// =================================


function crearBackup(
nombre
){



    try{


        const origen =

        obtenerRuta(nombre);






        if(
            !fs.existsSync(origen)
        ){

            return false;

        }






        const fecha =

        new Date()

        .toISOString()

        .replace(

            /:/g,

            "-"

        )

        .split(".")[0];







        const copia =

        origen +

        ".backup_" +

        fecha;








        fs.copyFileSync(

            origen,

            copia

        );







        return true;



    }


    catch(error){



        console.log(

            "Error creando backup:",

            error.message

        );



        return false;


    }


}









// =================================
// GUARDADO SEGURO IMPORTANTE
// =================================


function guardarConBackup(
nombre,
datos
){



    crearBackup(nombre);



    return guardarArchivo(

        nombre,

        datos

    );


}








module.exports={


    guardarArchivo,


    crearBackup,


    guardarConBackup



};
