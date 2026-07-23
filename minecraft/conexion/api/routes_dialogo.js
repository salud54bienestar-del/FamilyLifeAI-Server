// =============================================
// Rutas de Diálogo y Procesamiento - Village Soul
// =============================================

const express = require('express');
const router = express.Router();

// Endpoint para procesar el diálogo de la IA
router.post('/dialogo', (req, res) => {
    const { habitante_id, jugador, mensaje } = req.body;

    console.log(`[Mensaje recibido] De: ${jugador} Para: ${habitante_id} -> "${mensaje}"`);

    // Respuesta simulada de la IA (aquí integrarías tu modelo o API de LLM)
    const respuestaIA = `Saludos, ${jugador}. He recibido tus palabras: "${mensaje}". Mi memoria registra este momento.`;

    res.status(200).json({
        respuesta: respuestaIA,
        estado_actualizado: true
    });
});

// Endpoint para sincronizar memorias
router.post('/memoria', (req, res) => {
    const { habitante_id, tipo, contenido } = req.body;
    console.log(`[Memoria Guardada] Habitante: ${habitante_id} | Tipo: ${tipo} | Detalle: ${contenido}`);
    res.status(200).json({ status: "Memoria registrada con éxito" });
});

// Endpoint para actualizar estados
router.post('/estado', (req, res) => {
    const { habitante_id, estados } = req.body;
    console.log(`[Estado Actualizado] Habitante: ${habitante_id}`, estados);
    res.status(200).json({ status: "Estado sincronizado" });
});

module.exports = router;
