// Servidor principal - Village Soul Engine

const { iniciarSoulEngine } = require("./soul_engine.js");

const { iniciarMundo } = require("./Sistemas/nucleo_mundo.js");
const { ejecutarCiclo } = require("./Sistemas/ciclo_mundo.js");
const { obtenerResumenMundo } = require("./Sistemas/mundo.js");
const cargarArchivo = require("./Sistemas/cargador_datos.js");

// =================================
// CONFIGURACIÓN
// =================================

const INTERVALO_CICLO = 1000; // 1 segundo por pulso de simulación

// =================================
// INICIAR SERVIDOR
// =================================

function iniciarServidor() {
    console.log("");
    console.log("==============================");
    console.log("      VILLAGE SOUL ENGINE     ");
    console.log("==============================");

    try {
        console.log("Iniciando Soul Engine...");
        if (typeof iniciarSoulEngine === "function") {
            iniciarSoulEngine();
        }

        console.log("Iniciando mundo...");
        let mundo = null;
        if (typeof iniciarMundo === "function") {
            mundo = iniciarMundo();
        }

        if (!mundo) {
            console.log("Error iniciando mundo o retorno nulo.");
            // Continuamos de forma segura si el mundo fue inicializado mediante persistencia
        }

        console.log("Motor iniciado correctamente.");

        iniciarCicloAutomatico();

        return mundo || { estado: "iniciado" };
    } catch (error) {
        console.error("Fallo crítico al iniciar el servidor:", error.message);
        return null;
    }
}

// =================================
// CICLO AUTOMÁTICO
// =================================

function iniciarCicloAutomatico() {
    console.log("Ciclo automático activado.");

    setInterval(() => {
        try {
            if (typeof ejecutarCiclo === "function") {
                const resultado = ejecutarCiclo();

                if (resultado) {
                    // Log limpio de cada ciclo ejecutado
                    const info = typeof resultado === "object" ? JSON.stringify(resultado) : resultado;
                    console.log("Ciclo:", info);
                }
            }
        } catch (error) {
            console.error("Error en ciclo:", error.message);
        }
    }, INTERVALO_CICLO);
}

// =================================
// ESTADO SERVIDOR
// =================================

function estadoServidor() {
    const resumenMundo = typeof obtenerResumenMundo === "function" 
        ? obtenerResumenMundo() 
        : null;

    const datosNucleo = typeof cargarArchivo === "function"
        ? cargarArchivo("../datos/nucleo_mundo.json")
        : null;

    return {
        activo: true,
        mundo: resumenMundo,
        nucleo: datosNucleo
    };
}

// =================================
// EJECUCIÓN DIRECTA
// =================================

if (require.main === module) {
    iniciarServidor();
}

// =================================
// EXPORTACIÓN DE MÓDULOS
// =================================

module.exports = {
    iniciarServidor,
    estadoServidor
};
