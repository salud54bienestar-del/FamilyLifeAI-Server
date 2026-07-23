{
  "format_version": "1.12.0",
  "minecraft:geometry": [
    {
      "description": {
        "identifier": "geometry.habitante.anciano",
        "texture_width": 64,
        "texture_height": 64,
        "visible_bounds_width": 2,
        "visible_bounds_height": 3,
        "visible_bounds_offset": [0, 1.4, 0]
      },
      "bones": [
        {
          "name": "body",
          "pivot": [0, 22, 0],
          "cuboids": [
            {"origin": [-4.5, 11, -2.5], "size": [9, 11, 5], "uv": [16, 16]}
          ]
        },
        {
          "name": "head",
          "parent": "body",
          "pivot": [0, 22, 0],
          "cuboids": [
            {"origin": [-4, 22, -4], "size": [8, 8, 8], "uv": [0, 0]}
          ]
        }
      ]
    }
  ]
}
