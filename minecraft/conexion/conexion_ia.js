// =============================================
// Módulo de Conexión IA - Village Soul
// (Minecraft Bedrock Script API & Server-Net)
// =============================================

import { http, HttpRequest, HttpRequestMethod, HttpHeader } from "@minecraft/server-net";

// URL base del servidor de inteligencia artificial (configurar según tu entorno local o remoto)
const SERVIDOR_URL = "http://localhost:3000/api/dialogo";

/**
 * Envía una consulta al servidor de IA y procesa la respuesta para el habitante y el jugador.
 * @param {string} habitanteId - ID único del NPC que responde.
 * @param {import("@minecraft/server").Player} jugador - Objeto del jugador que interactúa.
 * @param {string} mensaje - Texto de la pregunta o comando enviado.
 */
export async function consultarIA(habitanteId, jugador, mensaje) {
    try {
        // Construir la solicitud HTTP
        const request = new HttpRequest();
        request.url = SERVIDOR_URL;
        request.method = HttpRequestMethod.Post;
        
        // Configurar cabeceras de la petición
        request.headers = [
            new HttpHeader("Content-Type", "application/json")
        ];

        // Cuerpo de la solicitud con el contexto de la entidad y la petición del usuario
        request.body = JSON.stringify({
            habitante_id: habitanteId,
            jugador: jugador.name,
            mensaje: mensaje,
            timestamp: Date.now()
        });

        // Enviar la petición al servidor externo
        const response = await http.request(request);

        if (response.status === 200) {
            const datosRespuesta = JSON.parse(response.body);
            const respuestaIA = datosRespuesta.respuesta || "El habitante se queda en silencio, pensativo...";

            // Enviar la respuesta de vuelta al chat como un diálogo directo al jugador
            jugador.sendMessage(`§e[Habitante]§r ${respuestaIA}`);
        } else {
            jugador.sendMessage("§c[Village Soul] El servidor de IA no respondió correctamente (Código: " + response.status + ").");
        }

    } catch (error) {
        console.warn(`[Village Soul Error] Fallo al conectar con el servidor de IA: ${error}`);
        jugador.sendMessage("§c[Village Soul] Error de conexión con el sistema de alma del NPC.");
    }
}
