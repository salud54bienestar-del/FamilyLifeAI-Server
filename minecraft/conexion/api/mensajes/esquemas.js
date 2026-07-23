{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "VillageSoulPayloads",
  "description": "Esquemas de validación estructural para las tramas de comunicación de Village Soul",
  "type": "object",
  "properties": {
    "accion": {
      "type": "string",
      "enum": ["CREAR_PERSONAJE", "ENVIAR_CONVERSACION", "GUARDAR_RECUERDO", "ACTUALIZAR_EMOCION", "SOLICITAR_IA"]
    },
    "habitante_id": {
      "type": "string"
    },
    "timestamp": {
      "type": "integer"
    }
  },
  "required": ["accion", "habitante_id", "timestamp"]
}
