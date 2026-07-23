// =============================================
// Actualización de Estado - Village Soul
// =============================================

import { http, HttpRequest, HttpRequestMethod, HttpHeader } from "@minecraft/server-net";
import { ConfigRed } from "./config.js";

/**
 * Sincroniza los parámetros vitales, emocionales y de tareas del NPC hacia el servidor.
 * @param {string} habitanteId - ID único del NPC.
 * @param {Object} estados - Objeto con los valores actuales (ej: { salud, felicidad, trabajo }).
 */
export async function actualizarEstado(habitanteId, estados) {
    try {
        const request = new HttpRequest();
        request.url = `${ConfigRed.BASE_URL}${ConfigRed.ENDPOINTS.ESTADOS}`;
        request.method = HttpRequestMethod.Post;
        
        request.headers = [
            new HttpHeader("Content-Type", "application/json")
        ];

        request.body = JSON.stringify({
            habitante_id: habitanteId,
            estados: estados,
            timestamp: Date.now()
        });

        const response = await http.request(request);

        if (response.status !== 200) {
            console.warn(`[Village Soul] Advertencia al actualizar estado (Código: ${response.status})`);
        }
    } catch (error) {
        console.warn(`[Village Soul Error] Fallo al conectar con el servidor para actualizar estado: ${error}`);
    }
}
