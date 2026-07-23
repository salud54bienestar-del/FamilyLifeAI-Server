// =============================================
// Configuración de Red - Village Soul
// =============================================

export const ConfigRed = {
    // URL del servidor backend de IA (Ajustar IP/Puerto según despliegue local o remoto)
    BASE_URL: "http://localhost:3000",
    
    // Endpoints específicos
    ENDPOINTS: {
        DIALOGO: "/api/dialogo",
        MEMORIA: "/api/memoria",
        ESTADOS: "/api/estado"
    },

    // Tiempos de espera máximos (milisegundos)
    TIMEOUT_MS: 5000
};
