// =============================================
// Servidor Principal y API HTTP - Village Soul
// (Conecta Minecraft Bedrock con la IA)
// =============================================

const http = require("http");
const { iniciarServidor: iniciarSistemas, estadoServidor } = require("../Sistemas/servidor.js");
const { generarPromptServidorIA } = require("../IA/ia_almas.js");
const { crearMemoria } = require("../Sistemas/memorias.js");

const PUERTO = 3000;

// =============================================
// INICIALIZACIÓN
// =============================================

function iniciar() {
    console.log("=================================");
    console.log("    VILLAGE SOUL - BACKEND API   ");
    console.log("=================================");

    // 1. Iniciar el motor interno de simulación
    iniciarSistemas();

    // 2. Crear Servidor HTTP para recibir mensajes de Minecraft
    const servidorHTTP = http.createServer(async (req, res) => {
        
        // Manejar la ruta de chat desde Minecraft: /api/chat-npc
        if (req.method === "POST" && req.url === "/api/chat-npc") {
            let body = "";

            req.on("data", chunk => { body += chunk.toString(); });

            req.on("end", async () => {
                try {
                    const datosEntrada = JSON.parse(body);
                    const { habitante_id, mensaje_jugador, jugador } = datosEntrada;

                    console.log(`\n[Chat Minecraft] ${jugador?.nombre || 'Jugador'}: "${mensaje_jugador}" -> NPC #${habitante_id}`);

                    // Generar contexto del alma (emociones, memorias, etc.)
                    const promptContexto = generarPromptServidorIA(habitante_id, mensaje_jugador);

                    // =============================================
                    // RESPUESTA DE IA (Aquí puedes conectar OpenAI / Ollama / Tu IA local)
                    // Por ahora genera una respuesta basada en su estado emocional
                    // =============================================
                    let respuestaTexto = `Hola ${jugador?.nombre || 'viajero'}. En este momento estoy pensado en ${promptContexto?.npc_info?.pensamiento_actual || 'mis asuntos'}.`;
                    
                    // Si el NPC está hambriento o cansado, responde según sus necesidades
                    if (promptContexto?.npc_info?.intencion_actual === "buscar_comida") {
                        respuestaTexto = `Hola... disculpa, pero tengo bastante hambre ahora mismo.`;
                    }

                    // Guardar conversación en sus recuerdos
                    crearMemoria(
                        habitante_id,
                        "conversacion",
                        `El jugador ${jugador?.nombre} me dijo: "${mensaje_jugador}". Le respondí: "${respuestaTexto}"`,
                        "media",
                        [jugador?.nombre],
                        "neutral"
                    );

                    // Devolver JSON a Minecraft
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({
                        exito: true,
                        respuesta_npc: respuestaTexto,
                        emocion_provocada: "neutral"
                    }));

                } catch (error) {
                    console.error("Error procesando solicitud de Minecraft:", error.message);
                    res.writeHead(500, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ error: "Error interno del servidor" }));
                }
            });

        } else if (req.method === "GET" && req.url === "/estado") {
            // Ruta para comprobar que el servidor está vivo
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(estadoServidor()));
        } else {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Ruta no encontrada");
        }
    });

    servidorHTTP.listen(PUERTO, () => {
        console.log(`\n✓ Servidor HTTP escuchando en el puerto :${PUERTO}`);
        console.log(`✓ Listo para recibir peticiones desde Minecraft Bedrock en /api/chat-npc\n`);
    });
}

iniciar();
    
