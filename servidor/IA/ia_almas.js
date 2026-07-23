// =============================================
// Inteligencia artificial avanzada de almas
// Village Soul Engine v3.0 (Minecraft Bedrock Script API)
// =============================================

// =============================================
// IMPORTACIONES
// =============================================

import { cargarArchivo } from "../sistemas/cargador_datos.js";
import { procesarDecision } from "../sistemas/decisiones.js";
import { obtenerMemorias, obtenerRecuerdosImportantes } from "../sistemas/memorias.js";

// =============================================
// CONFIGURACIÓN IA
// =============================================

const CONFIG_IA = {
    memoria_maxima_contexto: 20,
    prioridad_hambre: 100,
    prioridad_emergencia: 100,
    prioridad_social: 50,
    prioridad_normal: 20
};

// Función aux para cargar colecciones desde el nuevo cargador de datos
function cargarSistema(nombre) {
    return cargarArchivo(`datos_${nombre}`) || cargarArchivo(`../datos/${nombre}.json`);
}

// =============================================
// CARGAR ALMA
// =============================================

function obtenerAlma(habitante_id) {
    const datos = cargarSistema("almas");
    if (!datos || !datos.almas) return null;

    return datos.almas.find(alma => String(alma.id) === String(habitante_id)) || null;
}

// =============================================
// BUSCAR HABITANTE EN SISTEMA
// =============================================

function buscarHabitante(lista, habitante_id, campo = "habitante_id") {
    if (!lista) return null;
    return lista.find(elemento => String(elemento[campo]) === String(habitante_id)) || null;
}

// =============================================
// OBTENER ESTADOS Y ATRIBUTOS
// =============================================

function obtenerEstadoEmocional(habitante_id) {
    const datos = cargarSistema("emociones");
    if (!datos || !datos.emociones) return null;
    return buscarHabitante(datos.emociones, habitante_id);
}

function obtenerNecesidades(habitante_id) {
    const datos = cargarSistema("necesidades");
    if (!datos || !datos.necesidades) return null;
    return buscarHabitante(datos.necesidades, habitante_id);
}

function obtenerPersonalidad(alma) {
    const datos = cargarSistema("personalidades");
    if (!datos || !datos.personalidades || !alma) return null;
    return datos.personalidades.find(p => p.id === alma.personalidad_id) || null;
}

function obtenerFamilia(habitante_id) {
    const datos = cargarSistema("familias");
    if (!datos || !datos.familias) return null;
    return datos.familias.find(f => f.miembros.includes(habitante_id)) || null;
}

function obtenerRelaciones(habitante_id) {
    const datos = cargarSistema("relaciones");
    if (!datos || !datos.relaciones) return [];
    return datos.relaciones.filter(r => 
        String(r.habitante_a) === String(habitante_id) || 
        String(r.habitante_b) === String(habitante_id)
    );
}

function obtenerHabilidades(habitante_id) {
    const datos = cargarSistema("habilidades");
    if (!datos || !datos.habilidades) return null;
    return datos.habilidades.find(h => String(h.habitante_id) === String(habitante_id)) || null;
}

function obtenerUbicacion(habitante_id) {
    const datos = cargarSistema("ubicaciones");
    if (!datos || !datos.ubicaciones) return null;
    return datos.ubicaciones.find(u => String(u.habitante_id) === String(habitante_id)) || null;
}

function obtenerProfesion(alma) {
    if (!alma) return "ninguna";
    return alma.profesion && alma.profesion.nombre ? alma.profesion.nombre : "ninguna";
}

function obtenerObjetivos(habitante_id) {
    const datos = cargarSistema("objetivos");
    if (!datos || !datos.objetivos) return [];
    return datos.objetivos.filter(o => String(o.habitante_id) === String(habitante_id));
}

function obtenerEstadoMemoria(habitante_id) {
    const memorias = obtenerMemorias(habitante_id);
    const importantes = obtenerRecuerdosImportantes(habitante_id);

    return {
        recientes: memorias.slice(-CONFIG_IA.memoria_maxima_contexto),
        importantes
    };
}

// =============================================
// ANALIZADORES
// =============================================

function analizarNecesidades(necesidades) {
    const estado = { hambre: false, energia: false, social: false, descanso: false, urgencia: 0 };
    if (!necesidades) return estado;

    if (necesidades.hambre !== undefined && necesidades.hambre < 30) {
        estado.hambre = true;
        estado.urgencia += 40;
    }
    if (necesidades.energia !== undefined && necesidades.energia < 30) {
        estado.energia = true;
        estado.descanso = true;
        estado.urgencia += 40;
    }
    if (necesidades.social !== undefined && necesidades.social < 30) {
        estado.social = true;
        estado.urgencia += 20;
    }
    return estado;
}

function analizarEmociones(emocion) {
    const estado = { dominante: "neutral", intensidad: 0, efecto: "normal" };
    if (!emocion) return estado;

    estado.dominante = emocion.emocion_actual || "neutral";
    estado.intensidad = emocion.intensidad || 0;

    switch (estado.dominante) {
        case "tristeza": estado.efecto = "buscar_apoyo"; break;
        case "miedo": estado.efecto = "buscar_seguridad"; break;
        case "ira": estado.efecto = "evitar_conflicto"; break;
        case "amor": estado.efecto = "acercarse_persona"; break;
        case "felicidad": estado.efecto = "compartir"; break;
        case "curiosidad": estado.efecto = "explorar"; break;
    }
    return estado;
}

function analizarPersonalidad(personalidad) {
    if (!personalidad) return { estilo: "neutral", tendencias: [] };
    return {
        estilo: personalidad.nombre || "neutral",
        tendencias: personalidad.rasgos || []
    };
}

function analizarRelaciones(relaciones) {
    const estado = { amigos: 0, enemigos: 0, pareja: false, cercanos: [] };
    if (!relaciones || relaciones.length === 0) return estado;

    relaciones.forEach(relacion => {
        if (relacion.tipo === "amistad") estado.amigos++;
        if (relacion.tipo === "enemigo") estado.enemigos++;
        if (relacion.tipo === "pareja") estado.pareja = true;
        estado.cercanos.push(relacion);
    });
    return estado;
}

function analizarHabilidades(habilidades) {
    const resultado = { disponibles: [], mejores: [] };
    if (!habilidades || !habilidades.habilidades) return resultado;

    Object.keys(habilidades.habilidades).forEach(nombre => {
        const habilidad = habilidades.habilidades[nombre];
        if (habilidad.nivel > 0) {
            resultado.disponibles.push({ nombre, nivel: habilidad.nivel, experiencia: habilidad.experiencia });
        }
    });

    resultado.mejores = resultado.disponibles.sort((a, b) => b.nivel - a.nivel).slice(0, 3);
    return resultado;
}

function analizarUbicacion(ubicacion) {
    if (!ubicacion) return { hogar: null, trabajo: null, posicion: null };
    return {
        hogar: ubicacion.hogar || null,
        trabajo: ubicacion.trabajo || null,
        escuela: ubicacion.escuela || null,
        posicion: ubicacion.ultima_posicion || null
    };
}

function analizarObjetivos(objetivos) {
    if (!objetivos || objetivos.length === 0) return { tieneObjetivos: false, actuales: [] };
    return { tieneObjetivos: true, actuales: objetivos.slice(0, 5) };
}

function analizarMemorias(memoria) {
    const estado = { recuerdos_importantes: [], influencia: 0 };
    if (!memoria) return estado;

    estado.recuerdos_importantes = memoria.importantes || [];
    estado.influencia = estado.recuerdos_importantes.reduce((total, recuerdo) => total + (recuerdo.influencia || 0), 0);
    return estado;
}

function crearIntencionInicial(necesidades, emociones, familia, objetivos) {
    let intencion = { accion: "vida_normal", motivo: "No hay problemas importantes", urgencia: 20 };

    if (necesidades.hambre) {
        intencion = { accion: "buscar_comida", motivo: "Necesita alimentarse", urgencia: 90 };
    } else if (necesidades.descanso) {
        intencion = { accion: "descansar", motivo: "Necesita recuperar energía", urgencia: 80 };
    } else if (familia) {
        intencion = { accion: "cuidar_familia", motivo: "Tiene responsabilidades familiares", urgencia: 60 };
    } else if (objetivos.tieneObjetivos) {
        intencion = { accion: "cumplir_objetivo", motivo: "Tiene metas pendientes", urgencia: 50 };
    }
    return intencion;
}

// =============================================
// CONTEXTO Y DECISIONES
// =============================================

function crearContextoAlma(datos) {
    const { alma, emocion, necesidades, personalidad, familia, relaciones, habilidades, ubicacion, objetivos, memoria, intencion } = datos;

    return {
        identidad: { id: alma.id, nombre: alma.nombre, genero: alma.genero || null },
        emocion: emocion?.dominante || "neutral",
        intensidad_emocional: emocion?.intensidad || 0,
        personalidad: personalidad.estilo,
        rasgos: personalidad.tendencias,
        necesidades: { hambre: necesidades.hambre || false, energia: necesidades.energia || false, social: necesidades.social || false },
        familia: { existe: !!familia, miembros: familia?.miembros || [], hijos: familia?.hijos?.length || 0 },
        relaciones: { amigos: relaciones.amigos, enemigos: relaciones.enemigos, pareja: relaciones.pareja },
        habilidades: habilidades.disponibles,
        habilidades_destacadas: habilidades.mejores,
        ubicacion: { hogar: ubicacion.hogar, trabajo: ubicacion.trabajo, posicion: ubicacion.posicion },
        recuerdos: memoria.recuerdos_importantes,
        influencia_memoria: memoria.influencia,
        objetivos: objetivos.actuales,
        intencion
    };
}

function generarPensamiento(contexto) {
    let pensamiento = "Estoy tranquilo.";
    if (contexto.necesidades.hambre) pensamiento = "Necesito encontrar comida porque tengo hambre.";
    else if (contexto.necesidades.energia) pensamiento = "Estoy cansado y necesito descansar.";
    else if (contexto.emocion === "tristeza") pensamiento = "Me siento triste y necesito apoyo.";
    else if (contexto.emocion === "felicidad") pensamiento = "Estoy feliz y quiero compartir este momento.";
    else if (contexto.intencion) pensamiento = "Creo que debo hacer: " + contexto.intencion.accion;

    return pensamiento;
}

function tomarDecisionAlma(habitante_id, contexto) {
    const decision = procesarDecision(habitante_id, contexto);
    if (!decision) {
        return { accion: "vida_normal", motivo: "No se pudo generar decisión", prioridad: 10 };
    }
    return decision;
}

function crearRespuestaAlma(contexto, decision) {
    return {
        pensamiento: generarPensamiento(contexto),
        accion: decision.accion,
        motivo: decision.motivo,
        prioridad: decision.prioridad || 0,
        destino: decision.destino || null
    };
}

// =============================================
// OBTENER DATOS COMPLETOS
// =============================================

function obtenerDatosAlma(habitante_id) {
    const alma = obtenerAlma(habitante_id);
    if (!alma) return null;

    const necesidadesRaw = obtenerNecesidades(habitante_id);
    const emocionesRaw = obtenerEstadoEmocional(habitante_id);
    const personalidadRaw = obtenerPersonalidad(alma);
    const familiaRaw = obtenerFamilia(habitante_id);
    const relacionesRaw = obtenerRelaciones(habitante_id);
    const habilidadesRaw = obtenerHabilidades(habitante_id);
    const ubicacionRaw = obtenerUbicacion(habitante_id);
    const objetivosRaw = obtenerObjetivos(habitante_id);
    const memoriaRaw = obtenerEstadoMemoria(habitante_id);

    const necesidades = analizarNecesidades(necesidadesRaw);
    const emocion = analizarEmociones(emocionesRaw);
    const personalidad = analizarPersonalidad(personalidadRaw);
    const relaciones = analizarRelaciones(relacionesRaw);
    const habilidades = analizarHabilidades(habilidadesRaw);
    const ubicacion = analizarUbicacion(ubicacionRaw);
    const objetivos = analizarObjetivos(objetivosRaw);
    const memoria = analizarMemorias(memoriaRaw);

    const intencion = crearIntencionInicial(necesidades, emocion, familiaRaw, objetivos);

    return {
        alma,
        emocion,
        necesidades,
        personalidad,
        familia: familiaRaw,
        relaciones,
        habilidades,
        ubicacion,
        objetivos,
        memoria,
        intencion
    };
}

function ejecutarPensamiento(habitante_id) {
    const datos = obtenerDatosAlma(habitante_id);
    if (!datos) return null;

    const contexto = crearContextoAlma(datos);
    const decision = tomarDecisionAlma(habitante_id, contexto);
    const respuesta = crearRespuestaAlma(contexto, decision);

    return {
        habitante_id,
        nombre: datos.alma.nombre,
        contexto,
        decision,
        respuesta
    };
}

// =============================================
// PREPARAR PROMPT PARA SERVIDOR DE IA EXTERNA
// =============================================

function generarPromptServidorIA(habitante_id, mensajeJugador) {
    const pensamientoCompleto = ejecutarPensamiento(habitante_id);
    if (!pensamientoCompleto) return null;

    const { contexto, respuesta } = pensamientoCompleto;

    return {
        npc_info: {
            nombre: pensamientoCompleto.nombre,
            personalidad: contexto.personalidad,
            rasgos: contexto.rasgos,
            estado_emocional: contexto.emocion,
            pensamiento_actual: respuesta.pensamiento,
            intencion_actual: respuesta.accion
        },
        recuerdos_clave: contexto.recuerdos.map(r => r.descripcion || r),
        mensaje_jugador: mensajeJugador
    };
}

// =============================================
// EXPORTACIÓN (ES6)
// =============================================

export {
    obtenerAlma,
    obtenerDatosAlma,
    ejecutarPensamiento,
    generarPromptServidorIA,
    CONFIG_IA
};
        
