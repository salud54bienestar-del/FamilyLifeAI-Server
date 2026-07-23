// =============================================
// Modelo de Datos del Habitante - Village Soul
// =============================================

class HabitanteModel {
    constructor(id, nombre) {
        this.id = id;
        this.nombre = nombre;
        this.memorias = [];
        this.estados = {
            salud: 20,
            felicidad: 100,
            cansancio: 0
        };
    }

    agregarMemoria(tipo, contenido) {
        this.memorias.push({
            tipo,
            contenido,
            timestamp: Date.now()
        });
    }

    actualizarEstados(nuevosEstados) {
        this.estados = { ...this.estados, ...nuevosEstados };
    }
}

module.exports = HabitanteModel;
