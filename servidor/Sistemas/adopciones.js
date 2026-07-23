// Sistema de adopciones - Village Soul 2.0

const cargarArchivo = require("./cargador_datos.js");
const guardarArchivo = require("./guardador_datos.js");
const crearEvento = require("./eventos.js");
const crearMemoria = require("./memorias.js");

const { agregarMiembro, agregarHijo, obtenerFechaMundo } = require("./familias.js");
const { crearAlma } = require("./almas.js");

// =================================
// EVALUAR FAMILIA PARA ADOPCIÓN
// =================================

function evaluarFamiliaAdopcion(familia_id) {
    const familias = cargarArchivo("../datos/familias.json");
    const relaciones = cargarArchivo("../datos/relaciones.json");

    if (!familias || !relaciones || !familias.familias || !relaciones.relaciones) {
        console.log("No se pudieron cargar datos familiares o de relaciones.");
        return null;
    }

    const familia = familias.familias.find(f => f.id === familia_id);

    if (!familia) {
        console.log("Familia no encontrada.");
        return null;
    }

    let confianzaPareja = 0;
    let casados = false;

    // Verificar si los padres están en una relación / casados
    relaciones.relaciones.forEach(r => {
        const esPadreA = familia.padres.some(p => p.habitante_id === r.habitante_a);
        const esPadreB = familia.padres.some(p => p.habitante_id === r.habitante_b);

        if (esPadreA && esPadreB) {
            confianzaPareja = Math.max(confianzaPareja, r.confianza || 0);

            if (r.estado_pareja === "casados" || r.tipo === "matrimonio") {
                casados = true;
            }
        }
    });

    const familiaMonoparental = familia.padres.length === 1;

    const requisitos = {
        confianza: confianzaPareja >= 80 || familiaMonoparental,
        vivienda: familia.hogar && familia.hogar.id !== null,
        alimentos: (familia.recursos_compartidos?.alimentos || 0) > 0,
        estabilidad: (familia.estabilidad?.felicidad || 0) >= 40,
        matrimonio: casados || familiaMonoparental
    };

    return {
        familia_id,
        requisitos,
        aprobado: Object.values(requisitos).every(r => r === true)
    };
}

// =================================
// CREAR SOLICITUD DE ADOPCIÓN
// =================================

function crearSolicitudAdopcion(familia_id, niño_id) {
    const datos = cargarArchivo("../datos/orfanato.json") || { orfanato: { solicitudes_adopcion: [] } };

    if (!datos.orfanato) {
        datos.orfanato = { solicitudes_adopcion: [] };
    }

    if (!datos.orfanato.solicitudes_adopcion) {
        datos.orfanato.solicitudes_adopcion = [];
    }

    const solicitud = {
        id: datos.orfanato.solicitudes_adopcion.length + 1,
        familia: familia_id,
        niño: niño_id,
        estado: "pendiente",
        fecha: obtenerFechaMundo()
    };

    datos.orfanato.solicitudes_adopcion.push(solicitud);
    guardarArchivo("../datos/orfanato.json", datos);

    return solicitud;
}

// =================================
// ADOPTAR NIÑO/A
// =================================

function adoptarNiño(familia_id, niño_id) {
    const datos = cargarArchivo("../datos/orfanato.json");

    if (!datos || !datos.orfanato) {
        console.log("No se pudo acceder a los datos del orfanato.");
        return null;
    }

    const orfanato = datos.orfanato;

    const listaInfantes = [
        ...(orfanato.bebes || []),
        ...(orfanato.niños || []),
        ...(orfanato.adolescentes || [])
    ];

    const niño = listaInfantes.find(n => n.id === niño_id);

    if (!niño) {
        console.log("Niño o niña no encontrado en el orfanato.");
        return null;
    }

    const evaluacion = evaluarFamiliaAdopcion(familia_id);

    if (!evaluacion || !evaluacion.aprobado) {
        console.log("La familia no cumple los requisitos de adopción.");
        return null;
    }

    // 1. Crear alma real del niño
    const nuevaAlma = crearAlma({
        nombre: niño.nombre,
        edad: niño.edad,
        personalidad_id: niño.personalidad_id || null,
        tipo: "habitante",
        objetivos: [
            "conocer su nueva familia",
            "crecer",
            "desarrollar habilidades"
        ]
    });

    if (!nuevaAlma) {
        console.log("No se pudo crear el alma del niño adoptado.");
        return null;
    }

    // 2. Registrar en la familia como hijo adoptivo
    agregarHijo(familia_id, nuevaAlma.id, "adoptivo");

    // 3. Actualizar registro en el orfanato
    niño.estado = "adoptado";
    niño.familia_nueva = familia_id;
    niño.alma_id = nuevaAlma.id;

    if (!orfanato.adopciones_realizadas) {
        orfanato.adopciones_realizadas = [];
    }

    orfanato.adopciones_realizadas.push({
        niño: nuevaAlma.id,
        familia: familia_id,
        fecha: obtenerFechaMundo()
    });

    guardarArchivo("../datos/orfanato.json", datos);

    // 4. Registrar recuerdos y eventos
    crearMemoria(
        nuevaAlma.id,
        "adopcion",
        "Encontró una nueva familia mediante adopción.",
        "alta",
        [familia_id],
        "amor"
    );

    crearEvento("adopcion_exitosa", [nuevaAlma.id], {
        tipo: "adopcion_exitosa",
        familia: familia_id
    });

    console.log("✓ Adopción completada con éxito para:", nuevaAlma.nombre);

    return nuevaAlma;
}

// =================================
// EXPORTACIÓN DE MÓDULOS
// =================================

module.exports = {
    evaluarFamiliaAdopcion,
    crearSolicitudAdopcion,
    adoptarNiño
};
            
