// Sistema principal de Village Soul

function iniciarServidor() {
    console.log("=================================");
    console.log("      VILLAGE SOUL");
    console.log("=================================");

    console.log("Servidor principal iniciado.");
    console.log("Cargando módulos...");

    cargarMundo();
    cargarMemorias();
    cargarRelaciones();
    cargarEstados();

    console.log("Todos los módulos fueron cargados correctamente.");
}

function cargarMundo() {
    console.log("✓ Núcleo del mundo cargado");
}

function cargarMemorias() {
    console.log("✓ Memorias cargadas");
}

function cargarRelaciones() {
    console.log("✓ Relaciones cargadas");
}

function cargarEstados() {
    console.log("✓ Estados cargados");
}

iniciarServidor();
