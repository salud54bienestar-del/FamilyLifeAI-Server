// Sistema principal de Village Soul

function iniciarServidor() {
    console.log("Servidor principal iniciado.");
    console.log("Cargando módulos...");

    cargarMemorias();
    cargarRelaciones();
    cargarEstados();

    console.log("Todos los módulos fueron cargados correctamente.");
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
