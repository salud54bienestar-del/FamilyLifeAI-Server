// Registro avanzado de sistemas - Village Soul


const sistemas = {



    // =========================
    // SISTEMAS ACTIVOS
    // =========================


    activos:[


        // Núcleo del mundo

        "nucleo_mundo",

        "mundo",

        "tiempo",

        "reloj_mundo",



        // Vida e identidad

        "almas",

        "vida_habitantes",

        "etapas",

        "crecimiento",



        // Inteligencia

        "ia_almas",

        "cerebro",

        "decisiones",



        // Estado interno

        "personalidades",

        "memorias",

        "emociones",

        "necesidades",



        // Relaciones sociales

        "relaciones",

        "familias",



        // Actividades

        "objetivos",

        "rutinas",

        "movimiento",

        "ubicaciones",



        // Economía y mundo

        "profesiones",

        "lugares_trabajo",

        "recursos",

        "eventos",



        // Historia

        "historia"


    ],







    // =========================
    // SISTEMAS EN DESARROLLO
    // =========================


    desarrollo:[


        "ciclo_mundo",

        "comportamiento",

        "habilidades",


        "embarazos",

        "nacimientos",

        "adopciones",


        "matrimonios",

        "divorcios",

        "custodia",


        "comunicacion",

        "cultura"


    ],







    // =========================
    // DEPENDENCIAS
    // =========================


    dependencias:{



        cerebro:[

            "ia_almas",

            "memorias",

            "emociones",

            "necesidades",

            "relaciones"

        ],





        decisiones:[

            "cerebro"

        ],






        movimiento:[

            "ubicaciones"

        ],





        rutinas:[

            "movimiento",

            "necesidades",

            "reloj_mundo"

        ],






        crecimiento:[

            "almas",

            "etapas",

            "tiempo",

            "eventos",

            "memorias"

        ],






        vida_habitantes:[

            "almas",

            "necesidades",

            "emociones",

            "etapas"

        ]



    }




};









// =========================
// MOSTRAR SISTEMAS
// =========================


console.log(
"==============================="
);


console.log(
" Sistemas Village Soul "
);


console.log(
"==============================="
);





console.log(
"\nACTIVOS:"
);



sistemas.activos.forEach(

sistema=>{


console.log(
"✓ "+sistema
);


}

);







console.log(
"\nEN DESARROLLO:"
);



sistemas.desarrollo.forEach(

sistema=>{


console.log(
"○ "+sistema
);


}

);








module.exports=sistemas;
