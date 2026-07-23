// =============================================
// Servidor Principal y API HTTP - Village Soul
// (Conecta Minecraft Bedrock con la IA)
// =============================================

const http = require("http");
const { iniciarServidor: iniciarSistemas } = require("./Sistemas/servidor.js");
const { generarPromptServidorIA } = require("./IA/ia_almas.js");
const { crearMemoria } = require("./Sistemas/memorias.js");

const PUERTO = process.env.PORT || 3000;

// =============================================
// INICIALIZACIÓN
// =============================================

function iniciar() {
    console.log("=================================");
    console.log("    VILLAGE SOUL - BACKEND API   ");
    console.log("=================================");

    // 1. Iniciar el motor interno de simulación
    try {
        if (typeof iniciarSistemas === "function") {
            iniciarSistemas();
        }
    } catch (e) {
        console.log("⚠️ Advertencia al iniciar sistemas internos:", e.message);
    }

    // 2. Crear Servidor HTTP para recibir mensajes de Minecraft / Clientes
    const servidorHTTP = http.createServer(async (req, res) => {
        
        // Manejar la ruta de chat desde Minecraft: /api/chat-npc
        if (req.method === "POST" && req.url === "/api/chat-npc") {
            let body = "";

            req.on("data", chunk => { 
                body += chunk.toString(); 
            });

            req.on("end", async () => {
                try {
                    const datosEntrada = body ? JSON.parse(body) : {};
                    const { habitante_id, mensaje_jugador, jugador } = datosEntrada;

                    if (!habitante_id) {
                        res.writeHead(400, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({ error: "Falta el parámetro habitante_id" }));
                        return;
                    }

                    console.log(`\n[Chat Minecraft] ${jugador?.nombre || 'Jugador'}: "${mensaje_jugador || ''}" -> NPC #${habitante_id}`);

                    // Generar contexto del alma (emociones, memorias, etc.)
                    let promptContexto = null;
                    try {
                        if (typeof generarPromptServidorIA === "function") {
                            promptContexto = generarPromptServidorIA(habitante_id, mensaje_jugador);
                        }
                    } catch (err) {
                        console.log("⚠️ Error generando prompt de IA:", err.message);
                    }

                    let pensamientoActual = promptContexto?.npc_info?.pensamiento_actual || 'mis asuntos';
                    let intencionActual = promptContexto?.npc_info?.intencion_actual || 'general';
                    let nombreJugador = jugador?.nombre || 'viajero';

                    let respuestaTexto = `Hola ${nombreJugador}. En este momento estoy pensando en ${pensamientoActual}.`;
                    
                    // Si el NPC está hambriento o tiene una intención específica
                    if (intencionActual === "buscar_comida") {
                        respuestaTexto = `Hola ${nombreJugador}... disculpa, pero tengo bastante hambre ahora mismo.`;
                    }

                    // Guardar conversación en sus recuerdos de forma defensiva
                    try {
                        if (typeof crearMemoria === "function") {
                            crearMemoria(
                                habitante_id,
                                "conversacion",
                                `El jugador ${nombreJugador} me dijo: "${mensaje_jugador || ''}". Le respondí: "${respuestaTexto}"`,
                                "media",
                                [nombreJugador],
                                "neutral"
                            );
                        }
                    } catch (memErr) {
                        console.log("⚠️ Error guardando memoria de chat:", memErr.message);
                    }

                    // Devolver JSON a Minecraft
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({
                        exito: true,
                        respuesta_npc: respuestaTexto,
                        emocion_provocada: "neutral"
                    }));

                } catch (error) {
                    console.error("❌ Error procesando solicitud de Minecraft:", error.message);
                    res.writeHead(500, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ error: "Error interno del servidor" }));
                }
            });

        } else if (req.method === "GET" && req.url === "/estado") {
            // Ruta para comprobar que el servidor está vivo
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({
                estado: "activo",
                motor: "Soul Engine",
                tiempo: new Date().toISOString()
            }));
        } else {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Ruta no encontrada en Village Soul");
        }
    });

    servidorHTTP.listen(PUERTO, () => {
        console.log(`\n✓ Servidor HTTP escuchando en el puerto :${PUERTO}`);
        console.log(`✓ Listo para recibir peticiones desde Minecraft Bedrock en /api/chat-npc\n`);
    });
}

iniciar();
