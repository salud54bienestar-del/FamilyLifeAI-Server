# Minecraft Village Soul - Estructura General

Este directorio contiene los componentes principales necesarios para desplegar el complemento de *Village Soul* en un mundo de Minecraft Bedrock.

## Estructura de Directorios

* **`behavior_pack/`**: Contiene la lógica interna de los NPCs, el manifiesto de comportamiento (`manifest.json`) y los scripts de integración del Script API (`scripts/main.js`).
* **`resource_pack/`**: Almacena los elementos visuales, texturas personalizadas, modelos y definiciones de animación para los habitantes del pueblo.
* **`scripts/`**: Módulos JavaScript encargados de la comunicación en red (`http` / fetch) y el procesamiento de los diálogos conectados con el servidor central de IA.

---
*Nota: Asegúrate de habilitar los "Experimentos" de Scripting y las API de desarrollo en la configuración de tu mundo de Minecraft Bedrock para que los scripts funcionen correctamente.*
