// =============================================
// Punto de entrada principal - Village Soul
// (Minecraft Bedrock Script API)
// =============================================

import { world, system } from "@minecraft/server";
import { consultarIA } from "./conexion_ia.js";

// Escuchar cuando un jugador envía un mensaje en el chat
world.beforeEvents.chatSend.subscribe((eventData) => {
    const jugador = eventData.sender;
    const mensaje = eventData.message;

    // Si el mensaje empieza con un comando o prefijo, por ejemplo: "!hablar "
    if (mensaje.startsWith("!hablar ")) {
        // Cancelar el mensaje en el chat público para que sea una charla privada/NPC
        eventData.cancel = true;

        // Extraer la pregunta (quitando el prefijo "!hablar ")
        const textoPregunta = mensaje.replace("!hablar ", "").trim();

        // ID temporal del NPC o habitante cercano (por ejemplo, "habitante_1")
        const habitante_id = "habitante_1";

        // Ejecutar en el siguiente tick del juego la consulta HTTP
        system.run(() => {
            consultarIA(habitante_id, jugador, textoPregunta);
        });
    }
});

console.warn("[Village Soul] Módulo principal cargado correctamente.");
