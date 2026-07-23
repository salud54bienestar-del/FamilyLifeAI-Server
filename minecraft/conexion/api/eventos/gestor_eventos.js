// =============================================
// Gestor Central de Eventos - Village Soul
// =============================================

/**
 * Sistema centralizado para registrar y despachar eventos ocurridos
 * en el mundo de Minecraft hacia los módulos de lógica e IA.
 */
class GestorEventos {
    constructor() {
        this.oyentes = {};
    }

    /**
     * Registra una función para escuchar un tipo de evento específico.
     * @param {string} tipoEvento - Nombre del evento (ej: "CONVERSACION", "CAMBIO_ESTADO").
     * @param {Function} callback - Función que se ejecutará al dispararse el evento.
     */
    suscribir(tipoEvento, callback) {
        if (!this.oyentes[tipoEvento]) {
            this.oyentes[tipoEvento] = [];
        }
        this.oyentes[tipoEvento].push(callback);
    }

    /**
     * Dispara un evento notificando a todos sus suscriptores.
     * @param {string} tipoEvento - Nombre del evento.
     * @param {Object} datos - Datos asociados al evento.
     */
    disparar(tipoEvento, datos) {
        if (this.oyentes[tipoEvento]) {
            for (const callback of this.oyentes[tipoEvento]) {
                try {
                    callback(datos);
                } catch (error) {
                    console.warn(`[Village Soul Event Error] Error al procesar evento '${tipoEvento}': ${error}`);
                }
            }
        }
    }
}

export const eventosGlobales = new GestorEventos();
