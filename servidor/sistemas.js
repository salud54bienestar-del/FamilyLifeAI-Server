// Registro avanzado de sistemas - Village Soul


const sistemas = {


    // =========================
    // SISTEMAS ACTIVOS
    // =========================


    activos:[


        "nucleo_mundo",

        "mundo",

        "tiempo",

        "almas",

        "ia_almas",

        "personalidades",

        "memorias",

        "emociones",

        "necesidades",

        "relaciones",

        "familias",

        "etapas_vida",

        "crecimiento",

        "objetivos",

        "decisiones",

        "profesiones",

        "lugares_trabajo",

        "eventos",

        "recursos"


    ],





    // =========================
    // SISTEMAS EN DESARROLLO
    // =========================


    desarrollo:[


        "ciclo_mundo",

        "comportamiento",

        "rutinas",

        "habilidades",

        "embarazos",

        "nacimientos",

        "adopciones",

        "matrimonios",

        "divorcios",

        "custodia",

        "comunicacion",

        "cultura",

        "historia"


    ]


};





console.log(
"==============================="
);


console.log(
"Sistemas Village Soul:"
);


console.log(
"==============================="
);





console.log(
"ACTIVOS:"
);


sistemas.activos.forEach(

sistema=>{

console.log(
"✓ " + sistema
);

}

);





console.log(
"EN DESARROLLO:"
);


sistemas.desarrollo.forEach(

sistema=>{

console.log(
"○ " + sistema
);

}

);






module.exports = sistemas;
