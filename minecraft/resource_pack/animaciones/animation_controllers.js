{
  "format_version": "1.10.0",
  "animation_controllers": {
    "controller.animation.habitante.movimiento": {
      "states": {
        "default": {
          "animations": [
            "idle"
          ],
          "transitions": [
            {
              "walk": "query.is_moving"
            }
          ]
        },
        "walk": {
          "animations": [
            "walk"
          ],
          "transitions": [
            {
              "default": "!query.is_moving"
            }
          ]
        }
      }
    }
  }
}
