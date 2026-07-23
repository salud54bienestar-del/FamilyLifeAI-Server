{
  "format_version": "1.16.0",
  "minecraft:client_entity": {
    "description": {
      "identifier": "villagesoul:habitante",
      "materials": {
        "default": "entity_alphatest"
      },
      "textures": {
        "default": "textures/entity/habitante/habitante_default"
      },
      "geometry": {
        "default": "geometry.habitante"
      },
      "animations": {
        "idle": "animation.habitante.idle",
        "walk": "animation.habitante.walk"
      },
      "scripts": {
        "animate": [
          "idle",
          "walk"
        ]
      },
      "render_controllers": [
        "controller.render.default"
      ]
    }
  }
}
