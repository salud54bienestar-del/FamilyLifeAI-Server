// =============================================
// Punto de entrada principal - Village Soul Behavior Pack
// (Minecraft Bedrock Script API)
// =============================================

import { world, system } from "@minecraft/server";
import { consultarIA } from "./conexion_ia.js";

// Escuchar cuando un jugador envía un mensaje en el chat
world.beforeEvents.chatSend.subscribe((eventData) => {
    const jugador = eventData.sender;
    const mensaje = eventData.message;

    // Si el mensaje empieza con el comando para hablar con un NPC
    if (mensaje.startsWith("!hablar ")) {
        // Cancelar el mensaje en el chat público para que sea una interacción privada
        eventData.cancel = true;

        // Extraer la pregunta del jugador
        const textoPregunta = mensaje.replace("!hablar ", "").trim();

        // ID temporal del habitante cercano
        const habitante_id = "habitante_1";

        // Ejecutar la consulta HTTP hacia el servidor en el siguiente tick
        system.run(() => {
            consultarIA(habitante_id, jugador, textoPregunta);
        });
    }
});

console.warn("[Village Soul] Behavior Pack scripts cargados correctamente.");
