// Sistema avanzado de vida diaria de habitantes - Village Soul 2.0

const cargarArchivo = require("./cargador_datos.js");
const guardarArchivo = require("./guardador_datos.js");
const crearEvento = require("./eventos.js");
const crearMemoria = require("./memorias.js");

const { actualizarNecesidades } = require("./necesidades.js");
const { actualizarEtapaHabitante } = require("./etapas_vida.js");
const rutinas = require("./rutinas.js");
const reloj = require("./reloj_mundo.js");
const decisiones = require("./decisiones.js");

// =================================
// ACTUALIZAR VIDA HABITANTES
// =================================

function actualizarVidaHabitantes() {
    const almas = cargarArchivo("../datos/almas.json");

    if (!almas || !almas.almas) {
        console.log("No se pudieron cargar las almas.");
        return null;
    }

    const tiempo = typeof reloj.obtenerTiempo === "function" 
        ? reloj.obtenerTiempo() 
        : cargarArchivo("../datos/tiempo.json")?.tiempo;

    if (!tiempo) {
        console.log("No se pudo obtener la información del tiempo.");
        return null;
    }

    const hora = tiempo.hora !== undefined ? tiempo.hora : 12;
    const diaActual = tiempo.dia || 1;

    console.log("⏰ Hora del mundo:", hora);

    almas.almas.forEach(habitante => {
        if (habitante.estado !== "viviendo" && habitante.estado !== "vivo") {
            return;
        }

        // =====================
        // ETAPA DE VIDA
        // =====================
        if (typeof actualizarEtapaHabitante === "function") {
            actualizarEtapaHabitante(habitante);
        }

        // =====================
        // NECESIDADES
        // =====================
        if (typeof actualizarNecesidades === "function") {
            actualizarNecesidades(habitante.id);
        }

        // =====================
        // RUTINA
        // =====================
        if (rutinas && typeof rutinas.actualizarRutina === "function") {
            rutinas.actualizarRutina(
                habitante.id,
                hora,
                {
                    etapa: habitante.etapa_vida || habitante.etapa || "adulto"
                }
            );
        }

        // =====================
        // DECISIONES
        // =====================
        if (
            habitante.necesidades &&
            habitante.necesidades.energia < 20 &&
            decisiones &&
            typeof decisiones.procesarDecision === "function"
        ) {
            decisiones.procesarDecision(habitante.id, {
                necesidades: habitante.necesidades,
                emocion: habitante.emocion
            });
        }

        // =====================
        // DESCANSO
        // =====================
        if (hora >= 22 || hora < 6) {
            if (habitante.ultimo_descanso !== diaActual) {
                crearMemoria(
                    habitante.id,
                    "descanso",
                    `${habitante.nombre} descansó durante la noche.`,
                    "baja"
                );

                habitante.ultimo_descanso = diaActual;
            }
        }

        // =====================
        // EVENTO DIARIO
        // =====================
        if (habitante.ultima_actividad !== diaActual) {
            crearEvento(
                "actividad_diaria",
                [habitante.id],
                {
                    dia: diaActual,
                    actividad: habitante.actividad_actual || "vida diaria"
                }
            );

            habitante.ultima_actividad = diaActual;
        }
    });

    guardarArchivo("../datos/almas.json", almas);

    console.log("⚙️ Vida diaria de los habitantes actualizada con éxito.");

    return almas.almas;
}

// =================================
// EXPORTACIÓN DE MÓDULOS
// =================================

module.exports = {
    actualizarVidaHabitantes
};
                
