// Sistema avanzado de crecimiento de habitantes - Village Soul 2.0

const cargarArchivo = require("./cargador_datos.js");
const guardarArchivo = require("./guardador_datos.js");
const crearEvento = require("./eventos.js");
const crearMemoria = require("./memorias.js");

const { cumplirAño } = require("./etapas_vida.js");

// =================================
// CONFIGURACIÓN
// =================================

// 20 días Minecraft = 1 año Village Soul
const DIAS_MINECRAFT_POR_AÑO = 20;
const CRECIMIENTO_ACTIVO = true;

// =================================
// ACTUALIZAR CRECIMIENTO
// =================================

function actualizarCrecimiento() {
    if (!CRECIMIENTO_ACTIVO) {
        return null;
    }

    const almas = cargarArchivo("../datos/almas.json");
    const tiempoDatos = cargarArchivo("../datos/tiempo.json");

    if (!almas || !almas.almas || !tiempoDatos || !tiempoDatos.tiempo) {
        return null;
    }

    const tiempo = tiempoDatos.tiempo;

    // Solo crecer una vez por día Minecraft
    if (!tiempo.nuevo_dia_minecraft && !tiempo.cambio_dia) {
        return almas.almas;
    }

    almas.almas.forEach(habitante => {
        if (habitante.estado !== "viviendo" && habitante.estado !== "vivo") {
            return;
        }

        if (habitante.edad === undefined) {
            habitante.edad = 0;
        }

        if (habitante.contador_vida === undefined) {
            habitante.contador_vida = 0;
        }

        habitante.contador_vida++;

        if (habitante.contador_vida >= DIAS_MINECRAFT_POR_AÑO) {
            habitante.contador_vida = 0;

            const edadAnterior = habitante.edad;
            const etapaAnterior = habitante.etapa_vida || "desconocida";

            // Aumentar edad usando el sistema de etapas
            cumplirAño(habitante);

            crearEvento("cumpleaños", [habitante.id], {
                edad: habitante.edad,
                edad_anterior: edadAnterior
            });

            crearMemoria(
                habitante.id,
                "crecimiento",
                `Cumplió ${habitante.edad} años y continúa creciendo.`,
                "media"
            );

            console.log(`🎂 ${habitante.nombre} cumplió ${habitante.edad} años.`);

            // Detectar cambio real de etapa
            if (etapaAnterior !== habitante.etapa_vida) {
                crearMemoria(
                    habitante.id,
                    "etapa_vida",
                    `Cambió de etapa de vida: ${etapaAnterior} → ${habitante.etapa_vida}`,
                    "alta"
                );

                crearEvento("cambio_etapa_vida", [habitante.id], {
                    anterior: etapaAnterior,
                    nueva: habitante.etapa_vida
                });
            }
        }
    });

    guardarArchivo("../datos/almas.json", almas);

    return almas.almas;
}

// =================================
// OBTENER PROGRESO DE CRECIMIENTO
// =================================

function obtenerProgresoCrecimiento(habitante) {
    if (!habitante) {
        return null;
    }

    return {
        edad: habitante.edad || 0,
        etapa: habitante.etapa_vida || "bebe",
        dias_para_crecer: Math.max(
            0,
            DIAS_MINECRAFT_POR_AÑO - (habitante.contador_vida || 0)
        )
    };
}

// =================================
// EXPORTACIÓN DE MÓDULOS
// =================================

module.exports = {
    actualizarCrecimiento,
    obtenerProgresoCrecimiento
};
                    
