// Sistema de eventos de Village Soul

function crearEvento(nombre, descripcion) {
    const evento = {
        nombre: nombre,
        descripcion: descripcion,
        fecha: new Date().toISOString()
    };

    console.log("Nuevo evento creado:");
    console.log(evento);

    return evento;
}

crearEvento(
    "Primer encuentro",
    "Un habitante descubre el mundo por primera vez."
);

module.exports = crearEvento;
