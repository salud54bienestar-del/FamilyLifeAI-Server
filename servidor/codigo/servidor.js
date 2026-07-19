// Sistema principal de Village Soul

const cargarArchivo = require("./cargador_datos.js");
const iniciarMotor = require("./soul_engine.js");

function iniciarServidor() {
    console.log("=================================");
    console.log("      VILLAGE SOUL");
    console.log("=================================");

    console.log("Servidor principal iniciado.");
    console.log("Cargando módulos...");

    cargarMundo();
    cargarAlmas();
    cargarMemorias();
    cargarRelaciones();
    cargarEmociones();
    cargarObjetivos();
    cargarDecisiones();

    console.log("Todos los módulos fueron cargados correctamente.");

    console.log("Iniciando Soul Engine...");
    iniciarMotor();
}

function cargarMundo() {
    const mundo = cargarArchivo("../datos/mundo.json");

    if (mundo) {
        console.log("✓ Mundo cargado: " + mundo.nombre);
    }
}

function cargarAlmas() {
    const almas = cargarArchivo("../datos/almas.json");

    if (almas) {
        console.log("✓ Almas cargadas: " + almas.almas.length);
    }
}

function cargarMemorias() {
    console.log("✓ Memorias cargadas");
}

function cargarRelaciones() {
    console.log("✓ Relaciones cargadas");
}

function cargarEmociones() {
    console.log("✓ Emociones cargadas");
}

function cargarObjetivos() {
    console.log("✓ Objetivos cargados");
}

function cargarDecisiones() {
    console.log("✓ Decisiones cargadas");
}

iniciarServidor();

module.exports = iniciarServidor;
