#version 300 es

uniform vec4 shapeColor;
in vec4 position;
out vec4 color;

void main() {
  gl_Position = position;
  color = shapeColor;
}