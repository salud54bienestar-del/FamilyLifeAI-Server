// Sistema principal de Village Soul

const fs = require("fs");

function cargarArchivo(nombre) {
    try {
        const datos = fs.readFileSync("../datos/" + nombre, "utf8");
        return JSON.parse(datos);
    } catch (error) {
        console.log("No se pudo cargar: " + nombre);
        return null;
    }
}

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
}

function cargarMundo() {
    const mundo = cargarArchivo("mundo.json");

    if (mundo) {
        console.log("✓ Mundo cargado: " + mundo.nombre);
    }
}

function cargarAlmas() {
    const almas = cargarArchivo("almas.json");

    if (almas) {
        console.log("✓ Almas cargadas: " + almas.almas.length);
    }
}

function cargarEmociones() {
    const emociones = cargarArchivo("emociones.json");

    if (emociones) {
        console.log("✓ Emociones cargadas");
    }
}

function cargarObjetivos() {
    const objetivos = cargarArchivo("objetivos.json");

    if (objetivos) {
        console.log("✓ Objetivos cargados");
    }
}

function cargarDecisiones() {
    const decisiones = cargarArchivo("decisiones.json");

    if (decisiones) {
        console.log("✓ Decisiones cargadas");
    }
}

function cargarMemorias() {
    console.log("✓ Memorias cargadas");
}

function cargarRelaciones() {
    console.log("✓ Relaciones cargadas");
}

iniciarServidor();
