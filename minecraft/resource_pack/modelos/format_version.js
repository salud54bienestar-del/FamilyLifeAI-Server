{
  "format_version": "1.12.0",
  "minecraft:geometry": [
    {
      "description": {
        "identifier": "geometry.habitante.joven",
        "texture_width": 64,
        "texture_height": 64,
        "visible_bounds_width": 2,
        "visible_bounds_height": 3,
        "visible_bounds_offset": [0, 1.3, 0]
      },
      "bones": [
        {
          "name": "body",
          "pivot": [0, 20, 0],
          "cuboids": [
            {"origin": [-3.5, 10, -2], "size": [7, 10, 4], "uv": [16, 16]}
          ]
        },
        {
          "name": "head",
          "parent": "body",
          "pivot": [0, 20, 0],
          "cuboids": [
            {"origin": [-4, 20, -4], "size": [8, 8, 8], "uv": [0, 0]}
          ]
        }
      ]
    }
  ]
}
