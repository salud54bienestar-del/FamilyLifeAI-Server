// ==========================================
// Sistema avanzado de memorias
// Village Soul v2.2 (Minecraft Bedrock Script API)
// ==========================================

import { cargarArchivo } from "./cargador_datos.js";
import { guardarArchivo } from "./guardador_datos.js";
import reloj from "./reloj_mundo.js";

// ==========================================
// CONTROL GLOBAL DE ID
// ==========================================

let ultimoIdMemoria = 0;

function generarId(datos) {
    if (ultimoIdMemoria > 0) {
        ultimoIdMemoria++;
        return ultimoIdMemoria;
    }

    if (!datos || !Array.isArray(datos.memorias) || datos.memorias.length === 0) {
        ultimoIdMemoria = 1;
        return 1;
    }

    ultimoIdMemoria = Math.max(
        ...datos.memorias.map(memoria => Number(memoria.id) || 0)
    );

    ultimoIdMemoria++;
    return ultimoIdMemoria;
}

// ==========================================
// FECHA DEL MUNDO
// ==========================================

function obtenerFechaMundo() {
    if (reloj && typeof reloj.obtenerFecha === "function") {
        return reloj.obtenerFecha();
    }

    return {
        año: 1,
        estacion: "primavera",
        dia: 1,
        hora: 8
    };
}

// ==========================================
// CATEGORÍA EMOCIONAL
// ==========================================

function obtenerCategoria(emocion) {
    const positivas = [
        "felicidad", "amor", "orgullo", 
        "esperanza", "motivacion", "calma"
    ];

    const negativas = [
        "tristeza", "miedo", "ira", 
        "estres", "soledad"
    ];

    if (positivas.includes(emocion)) return "positiva";
    if (negativas.includes(emocion)) return "negativa";

    return "neutral";
}

// ==========================================
// INFLUENCIA
// ==========================================

function calcularInfluencia(importancia) {
    const valores = {
        muy_alta: 100,
        alta: 90,
        media: 60,
        baja: 30
    };

    return valores[importancia] || 20;
}

// ==========================================
// CREAR MEMORIA
// ==========================================

function crearMemoria(
    habitante_id,
    tipo,
    descripcion,
    importancia = "baja",
    personas = [],
    emocion = "neutral",
    lugar = null,
    efecto = {},
    aprendizaje = null,
    origen = "evento",
    grupo_memoria = null,
    ubicacion = null
) {
    const datos = cargarArchivo("memorias_data") || { memorias: [] };

    if (!Array.isArray(datos.memorias)) {
        datos.memorias = [];
    }

    const memoria = {
        id: generarId(datos),
        habitante_id: String(habitante_id),
        tipo: tipo || "general",
        descripcion: descripcion || "Sin descripción",
        importancia,
        influencia: calcularInfluencia(importancia),
        categoria: obtenerCategoria(emocion),
        emocion,
        personas_relacionadas: Array.isArray(personas) ? personas.map(p => String(p)) : [],
        lugar_relacionado: lugar,
        ubicacion,
        origen,
        grupo_memoria,
        efecto_personalidad: {
            confianza: efecto?.confianza || 0,
            miedo: efecto?.miedo || 0,
            felicidad: efecto?.felicidad || 0,
            tristeza: efecto?.tristeza || 0,
            respeto: efecto?.respeto || 0,
            valentia: efecto?.valentia || 0
        },
        aprendizaje: aprendizaje || "ninguno",
        impacto_comportamiento:
            importancia === "muy_alta" ? "permanente" :
            importancia === "alta" ? "fuerte" :
            importancia === "media" ? "moderado" : "leve",
        fuerza_recuerdo: 100,
        recordada: true,
        estado: "activa",
        favorita: false,
        veces_recordada: 0,
        fecha_real: new Date().toISOString(),
        fecha_mundo: obtenerFechaMundo()
    };

    datos.memorias.push(memoria);
    guardarArchivo("memorias_data", datos);

    console.warn("MEMORIA GUARDADA ID: " + memoria.id);
    return memoria;
}

// ==========================================
// OBTENER MEMORIAS
// ==========================================

function obtenerMemorias(habitante_id) {
    const datos = cargarArchivo("memorias_data");

    if (!datos || !Array.isArray(datos.memorias)) {
        return [];
    }

    return datos.memorias.filter(
        memoria => String(memoria.habitante_id) === String(habitante_id)
    );
}

// ==========================================
// BÚSQUEDAS
// ==========================================

function buscarMemoriasTipo(habitante_id, tipo) {
    return obtenerMemorias(habitante_id).filter(
        memoria => memoria.tipo === tipo
    );
}

function buscarMemoriasPersona(habitante_id, persona_id) {
    return obtenerMemorias(habitante_id).filter(
        memoria => memoria.personas_relacionadas.includes(String(persona_id))
    );
}

function buscarMemoriasEmocion(habitante_id, emocion) {
    return obtenerMemorias(habitante_id).filter(
        memoria => memoria.emocion === emocion
    );
}

// ==========================================
// RECUERDOS IMPORTANTES
// ==========================================

function obtenerRecuerdosImportantes(habitante_id) {
    return obtenerMemorias(habitante_id).filter(
        memoria => memoria.influencia >= 80
    );
}

// ==========================================
// RECORDAR MEMORIA
// ==========================================

function recordarMemoria(habitante_id, id) {
    const datos = cargarArchivo("memorias_data");
    if (!datos || !Array.isArray(datos.memorias)) return null;

    const memoria = datos.memorias.find(
        memoria => Number(memoria.id) === Number(id) && String(memoria.habitante_id) === String(habitante_id)
    );

    if (!memoria) return null;

    memoria.veces_recordada++;
    memoria.fuerza_recuerdo = Math.min(100, memoria.fuerza_recuerdo + 5);
    memoria.recordada = true;

    guardarArchivo("memorias_data", datos);
    return memoria;
}

// ==========================================
// EVOLUCIONAR MEMORIAS
// ==========================================

function evolucionarMemorias() {
    const datos = cargarArchivo("memorias_data");
    if (!datos || !Array.isArray(datos.memorias)) return false;

    datos.memorias.forEach(memoria => {
        if (memoria.favorita) return;

        memoria.fuerza_recuerdo -= 1;

        if (memoria.fuerza_recuerdo <= 20 && memoria.fuerza_recuerdo > 0) {
            memoria.estado = "debil";
        } else if (memoria.fuerza_recuerdo <= 0) {
            memoria.estado = "olvidada";
            memoria.fuerza_recuerdo = 0;
        }
    });

    guardarArchivo("memorias_data", datos);
    return true;
}

// ==========================================
// ELIMINAR
// ==========================================

function eliminarMemoria(id) {
    const datos = cargarArchivo("memorias_data");
    if (!datos || !Array.isArray(datos.memorias)) return false;

    datos.memorias = datos.memorias.filter(
        memoria => Number(memoria.id) !== Number(id)
    );

    guardarArchivo("memorias_data", datos);
    return true;
}

// ==========================================
// EXPORTAR
// ==========================================

export {
    crearMemoria,
    obtenerMemorias,
    buscarMemoriasTipo,
    buscarMemoriasPersona,
    buscarMemoriasEmocion,
    obtenerRecuerdosImportantes,
    recordarMemoria,
    evolucionarMemorias,
    eliminarMemoria,
    generarId
};
