// =============================================
// Generador de Formatos de Mensajes - Village Soul
// =============================================

/**
 * Fábrica para construir las estructuras de paquetes de datos (payloads)
 * enviados desde Minecraft hacia el servidor backend de Village Soul.
 */
export const FormatosMensajes = {
    
    crearPersonaje(habitanteId, nombreBase, personalidad) {
        return {
            accion: "CREAR_PERSONAJE",
            habitante_id: habitanteId,
            nombre: nombreBase,
            personalidad: personalidad,
            timestamp: Date.now()
        };
    },

    enviarConversacion(habitanteId, jugadorNombre, mensaje) {
        return {
            accion: "ENVIAR_CONVERSACION",
            habitante_id: habitanteId,
            jugador: jugadorNombre,
            mensaje: mensaje,
            timestamp: Date.now()
        };
    },

    guardarRecuerdo(habitanteId, tipoRecuerdo, descripcion) {
        return {
            accion: "GUARDAR_RECUERDO",
            habitante_id: habitanteId,
            tipo: tipoRecuerdo,
            contenido: descripcion,
            timestamp: Date.now()
        };
    },

    actualizarEmocion(habitanteId, emociones) {
        return {
            accion: "ACTUALIZAR_EMOCION",
            habitante_id: habitanteId,
            emociones: emociones,
            timestamp: Date.now()
        };
    },

    solicitarRespuestaIA(habitanteId, contextoActual) {
        return {
            accion: "SOLICITAR_IA",
            habitante_id: habitanteId,
            contexto: contextoActual,
            timestamp: Date.now()
        };
    }
};
          
