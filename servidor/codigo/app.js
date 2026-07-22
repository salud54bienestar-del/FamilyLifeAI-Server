// Punto de entrada principal - Village Soul


console.log("=================================");
console.log("          VILLAGE SOUL");
console.log("=================================");



console.log(
    "Iniciando aplicación..."
);



console.log(
    "Activando Soul Engine..."
);






try{


    const servidor =
    require("./servidor.js");





    const resultado =
    servidor.iniciarServidor();





    if(resultado){


        console.log("");

        console.log(
            "================================="
        );

        console.log(
            " VILLAGE SOUL INICIADO CORRECTAMENTE"
        );

        console.log(
            "================================="
        );


        console.log(
            "Mundo:",
            resultado.mundo.nombre
        );



    }

    else{


        console.log(
            "No se pudo iniciar el mundo."
        );


    }




}

catch(error){



    console.log("");

    console.log(
        "ERROR AL INICIAR VILLAGE SOUL"
    );


    console.log(
        error.message
    );



}






console.log("");

console.log(
    "Aplicación cargada."
);
