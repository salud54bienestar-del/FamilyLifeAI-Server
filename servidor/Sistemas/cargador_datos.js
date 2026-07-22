// Cargador avanzado de datos - Village Soul


const fs = require("fs");

const path = require("path");







// =================================
// CREAR RUTA COMPLETA
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






        const rutaCompleta =

        obtenerRuta(nombre);







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
            " ERROR JSON "
        );


        console.log(
            "==============================="
        );



        console.log(
            "Archivo:",
            nombre
        );



        console.log(
            "Mensaje:",
            error.message
        );



        return null;


    }



}









// =================================
// GUARDAR ARCHIVO BASE
// =================================


function crearArchivoSiNoExiste(
nombre,
contenido={}
){



    try{


        const ruta =

        obtenerRuta(nombre);





        const carpeta =

        path.dirname(ruta);





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







        if(
            !fs.existsSync(ruta)
        ){



            fs.writeFileSync(

                ruta,

                JSON.stringify(

                    contenido,

                    null,

                    4

                ),

                "utf8"

            );



        }




        return true;



    }


    catch(error){


        console.log(

            "Error creando archivo:",

            error.message

        );


        return false;


    }



}









// =================================
// VERIFICAR ARCHIVO
// =================================


function existeArchivo(nombre){



    const ruta =

    obtenerRuta(nombre);




    return fs.existsSync(ruta);



}








module.exports={



    cargarArchivo,


    existeArchivo,


    crearArchivoSiNoExiste



};
