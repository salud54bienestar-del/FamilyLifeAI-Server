// Sistema avanzado de nacimientos - Village Soul 2.0

const cargarArchivo = require("./cargador_datos.js");
const guardarArchivo = require("./guardador_datos.js");
const crearEvento = require("./eventos.js");
const crearMemoria = require("./memorias.js");

const { crearAlma } = require("./almas.js");
const { agregarHijo } = require("./familias.js");
const { crearNecesidades } = require("./necesidades.js");
const { crearEmocion } = require("./emociones.js");

// =================================
// TEMPERAMENTO
// =================================

function generarTemperamento() {
    const lista = [
        "tranquilo",
        "curioso",
        "activo",
        "sensible",
        "cariñoso",
        "reservado"
    ];

    return lista[Math.floor(Math.random() * lista.length)];
}

// =================================
// REGISTRAR NACIMIENTO
// =================================

function registrarNacimiento(
    embarazo_id,
    familia_id,
    datosBebe = {}
) {
    const embarazos = cargarArchivo("../datos/embarazos.json");
    const tiempo = cargarArchivo("../datos/tiempo.json");

    if (!embarazos || !embarazos.embarazos || !tiempo) {
        return null;
    }

    const embarazo = embarazos.embarazos.find(e => e.id === embarazo_id);

    if (!embarazo) {
        console.log("No existe el registro de embarazo.");
        return null;
    }

    if (embarazo.estado === "finalizado") {
        console.log("Este nacimiento ya fue registrado anteriormente.");
        return null;
    }

    const temperamento = generarTemperamento();

    // =================================
    // CREAR ALMA DEL BEBÉ
    // =================================

    const bebe = crearAlma({
        nombre: datosBebe.nombre || "Nuevo habitante",
        edad: 0,
        tipo: "habitante",
        temperamento,
        rasgos_iniciales: [temperamento],
        padres: [embarazo.madre, embarazo.padre].filter(Boolean),
        objetivos: [
            "crecer",
            "aprender",
            "crear vínculos"
        ],
        profesion: {
            nombre: "ninguna",
            categoria: "infancia",
            nivel: 0,
            experiencia: 0,
            estado: "inactivo"
        }
    });

    if (!bebe) {
        console.log("No se pudo crear el alma del bebé.");
        return null;
    }

    // =================================
    // FAMILIA
    // =================================

    if (familia_id) {
        agregarHijo(
            familia_id,
            bebe.id,
            "biologico"
        );
    }

    // =================================
    // NECESIDADES Y EMOCIONES DEL BEBÉ
    // =================================

    if (typeof crearNecesidades === "function") {
        crearNecesidades(bebe.id, "bebe");
    }

    if (typeof crearEmocion === "function") {
        crearEmocion(bebe.id);
    }

    // =================================
    // ACTUALIZAR EMBARAZO
    // =================================

    embarazo.estado = "finalizado";
    embarazo.estado_final = "nacimiento";
    embarazo.bebe_id = bebe.id;

    const tInfo = tiempo.tiempo || tiempo;
    embarazo.fecha_nacimiento = {
        dia: tInfo.dia || 1,
        mes: tInfo.mes || 1,
        año: tInfo.año || 1
    };

    guardarArchivo("../datos/embarazos.json", embarazos);

    // =================================
    // EVENTOS Y MEMORIAS
    // =================================

    crearEvento(
        "nacimiento",
        [embarazo.madre, embarazo.padre, bebe.id].filter(Boolean),
        {
            nombre: bebe.nombre,
            temperamento,
            familia_id
        }
    );

    if (embarazo.madre) {
        crearMemoria(
            embarazo.madre,
            "nacimiento",
            `Nació su bebé: ${bebe.nombre}`,
            "alta",
            [bebe.id],
            "felicidad"
        );
    }

    if (embarazo.padre) {
        crearMemoria(
            embarazo.padre,
            "nacimiento",
            `Nació su hijo: ${bebe.nombre}`,
            "alta",
            [bebe.id],
            "felicidad"
        );
    }

    crearMemoria(
        bebe.id,
        "origen",
        `Nació dentro del mundo de Village Soul con temperamento ${temperamento}`,
        "alta",
        [embarazo.madre, embarazo.padre].filter(Boolean),
        "felicidad"
    );

    console.log("👶 Nacimiento registrado con éxito:", bebe.nombre);

    return bebe;
}

// =================================
// EXPORTACIÓN DE MÓDULOS
// =================================

module.exports = {
    registrarNacimiento
};
