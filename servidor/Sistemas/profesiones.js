// =================================
// SUBIR NIVEL (Corregido)
// =================================

function subirNivel(habitante_id) {
    const almas = cargarArchivo("../datos/almas.json");

    if (!almas) return null;

    const habitante = almas.almas.find(a => a.id === habitante_id);

    if (!habitante || !habitante.profesion) return null;

    habitante.profesion.nivel++;
    habitante.profesion.experiencia = 0;

    // Guardar los cambios en el archivo .json
    guardarArchivo("../datos/almas.json", almas);

    crearEvento(
        "subida_nivel_profesion",
        [habitante_id],
        { nivel: habitante.profesion.nivel }
    );

    crearMemoria(
        habitante_id,
        "profesion",
        "Subió al nivel " + habitante.profesion.nivel + " en su trabajo de " + habitante.profesion.nombre,
        "media"
    );

    return habitante.profesion;
}
