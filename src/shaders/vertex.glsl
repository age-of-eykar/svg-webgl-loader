#version 300 es

uniform vec4 u_FragColor;
in vec4 a_Position;
out vec4 color;

void main() {
  gl_Position = a_Position;
  color = u_FragColor;
}