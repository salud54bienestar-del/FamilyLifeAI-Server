// =============================================
// Escuchas del Mundo de Minecraft - Village Soul
// =============================================

import { world, system } from "@minecraft/server";
import { eventosGlobales } from "./gestor_eventos.js";

/**
 * Inicializa los escuchas nativos del motor de Minecraft Bedrock
 * para capturar interacciones de chat, daño y cambios en el entorno.
 */
export function inicializarEscuchasMundo() {
    
    // Escuchar mensajes en el chat para las conversaciones con NPCs
    world.afterEvents.chatSend.subscribe((event) => {
        const { sender, message } = event;
        
        eventosGlobales.disparar("CONVERSACION", {
            jugador: sender,
            mensaje: message,
            timestamp: Date.now()
        });
    });

    // Escuchar cuando una entidad recibe daño (cambios de estado vital)
    world.afterEvents.entityHurt.subscribe((event) => {
        const { hurtEntity, damage } = event;
        
        if (hurtEntity.typeId.startsWith("villagesoul:")) {
            eventosGlobales.disparar("CAMBIO_ESTADO", {
                entidadId: hurtEntity.id,
                tipo: "DANIO_RECIBIDO",
                valor: damage,
                timestamp: Date.now()
            });
        }
    });

    console.log("[Village Soul] Escuchas del mundo inicializadas correctamente.");
}
