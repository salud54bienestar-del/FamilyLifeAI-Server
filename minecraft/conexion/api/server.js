// =============================================
// Servidor Backend Principal - Village Soul
// =============================================

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Importar rutas
const dialogoRouter = require('./routes/dialogo');
app.use('/api', dialogoRouter);

app.listen(PORT, () => {
    console.log(`[Village Soul Backend] Servidor corriendo en http://localhost:${PORT}`);
});
