// =============================================
// Sincronización de Memoria - Village Soul
// =============================================

import { http, HttpRequest, HttpRequestMethod, HttpHeader } from "@minecraft/server-net";
import { ConfigRed } from "./config.js";

/**
 * Envía un evento o recuerdo nuevo al servidor para que el NPC lo almacene en su memoria.
 * @param {string} habitanteId - ID único del NPC.
 * @param {string} tipoRecuerdo - Categoría del evento (ej: "interaccion", "trabajo", "peligro").
 * @param {string} descripcion - Detalle de lo sucedido en el mundo.
 */
export async function sincronizarMemoria(habitanteId, tipoRecuerdo, descripcion) {
    try {
        const request = new HttpRequest();
        request.url = `${ConfigRed.BASE_URL}${ConfigRed.ENDPOINTS.MEMORIA}`;
        request.method = HttpRequestMethod.Post;
        
        request.headers = [
            new HttpHeader("Content-Type", "application/json")
        ];

        request.body = JSON.stringify({
            habitante_id: habitanteId,
            tipo: tipoRecuerdo,
            contenido: descripcion,
            timestamp: Date.now()
        });

        const response = await http.request(request);

        if (response.status !== 200) {
            console.warn(`[Village Soul] Advertencia al sincronizar memoria (Código: ${response.status})`);
        }
    } catch (error) {
        console.warn(`[Village Soul Error] Fallo al conectar con el servidor para guardar memoria: ${error}`);
    }
}
