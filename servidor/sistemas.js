// Registro de sistemas de Village Soul

const sistemas = [
  "nucleo_mundo",
  "mundo",
  "almas",
  "memorias",
  "emociones",
  "relaciones",
  "objetivos",
  "decisiones",
  "eventos",
  "comunicacion",
  "familias",
  "cultura",
  "recursos",
  "historia"
];

console.log("Sistemas registrados:");

sistemas.forEach((sistema) => {
  console.log("- " + sistema);
});

module.exports = sistemas;
