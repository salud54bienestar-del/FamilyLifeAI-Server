// =================================
// Guardador avanzado de datos - Village Soul
// (Minecraft Bedrock Script API)
// =================================

import { world } from "@minecraft/server";

// =================================
// NORMALIZAR CLAVE DE ALMACENAMIENTO
// =================================

function normalizarClave(nombre) {
    if (!nombre) return "";

    // Convierte "../datos/memorias.json" en una clave limpia: "datos_memorias"
    return nombre
        .replace(/^(\.\.\/|\.\/)+/, "")
        .replace(/\//g, "_")
        .replace(/\.json$/, "");
}

// =================================
// GUARDAR ARCHIVO JSON / DATOS
// =================================

function guardarArchivo(nombre, datos) {
    try {
        if (!nombre) {
            console.warn("Nombre inválido.");
            return false;
        }

        if (datos === undefined) {
            console.warn("Datos inválidos para:", nombre);
            return false;
        }

        const clave = normalizarClave(nombre);
        const contenido = JSON.stringify(datos);

        // Guardado directo en el almacenamiento persistente del mundo
        world.setDynamicProperty(clave, contenido);
        return true;

    } catch (error) {
        console.warn("===============================");
        console.warn(" ERROR GUARDANDO DATOS ");
        console.warn("===============================");
        console.warn("Archivo/Clave:", nombre);
        console.warn("Mensaje:", error.message);

        return false;
    }
}

// =================================
// CREAR BACKUP DE SEGURIDAD
// =================================

function crearBackup(nombre) {
    try {
        const clave = normalizarClave(nombre);
        const contenidoOriginal = world.getDynamicProperty(clave);

        if (!contenidoOriginal) {
            return false;
        }

        const fecha = new Date()
            .toISOString()
            .replace(/:/g, "-")
            .split(".")[0];

        const claveBackup = `${clave}_backup_${fecha}`;

        // Guardar la copia de respaldo con la fecha en la clave
        world.setDynamicProperty(claveBackup, contenidoOriginal);
        return true;

    } catch (error) {
        console.warn("Error creando backup:", error.message);
        return false;
    }
}

// =================================
// GUARDADO SEGURO IMPORTANTE
// =================================

function guardarConBackup(nombre, datos) {
    crearBackup(nombre);
    return guardarArchivo(nombre, datos);
}

// =================================
// EXPORTAR (ES6)
// =================================

export {
    guardarArchivo,
    crearBackup,
    guardarConBackup
};
