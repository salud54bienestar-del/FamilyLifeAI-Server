// =================================
// Cargador avanzado de datos - Village Soul
// (Minecraft Bedrock Script API)
// =================================

import { world } from "@minecraft/server";

// =================================
// LIMPIAR CLAVE DE ALMACENAMIENTO
// =================================

function normalizarClave(nombre) {
    if (!nombre) return "";
    
    // Limpia rutas como "../datos/memorias.json" a una clave simple "datos_memorias"
    return nombre
        .replace(/^(\.\.\/|\.\/)+/, "")
        .replace(/\//g, "_")
        .replace(/\.json$/, "");
}

// =================================
// CARGAR DATOS
// =================================

function cargarArchivo(nombre) {
    try {
        if (!nombre) {
            console.warn("Nombre de archivo o clave inválida.");
            return null;
        }

        const clave = normalizarClave(nombre);
        const contenidoRaw = world.getDynamicProperty(clave);

        if (!contenidoRaw) {
            console.warn("Datos no encontrados para la clave:", clave);
            return null;
        }

        if (typeof contenidoRaw !== "string" || !contenidoRaw.trim()) {
            console.warn("Datos vacíos para:", clave);
            return null;
        }

        return JSON.parse(contenidoRaw);

    } catch (error) {
        console.warn("===============================");
        console.warn(" ERROR AL CARGAR DATOS JSON ");
        console.warn("===============================");
        console.warn("Clave/Archivo:", nombre);
        console.warn("Mensaje:", error.message);

        return null;
    }
}

// =================================
// GUARDAR / CREAR DATOS BASE
// =================================

function crearArchivoSiNoExiste(nombre, contenido = {}) {
    try {
        const clave = normalizarClave(nombre);
        const existente = world.getDynamicProperty(clave);

        if (existente === undefined || existente === null) {
            const dataString = JSON.stringify(contenido);
            world.setDynamicProperty(clave, dataString);
        }

        return true;
    } catch (error) {
        console.warn("Error creando propiedad de datos:", error.message);
        return false;
    }
}

// =================================
// VERIFICAR SI EXISTEN DATOS
// =================================

function existeArchivo(nombre) {
    const clave = normalizarClave(nombre);
    const dato = world.getDynamicProperty(clave);
    return dato !== undefined && dato !== null;
}

// =================================
// EXPORTAR (ES6)
// =================================

export {
    cargarArchivo,
    existeArchivo,
    crearArchivoSiNoExiste
};
