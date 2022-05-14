import { getWebGLContext } from '@/utils/getContext';
import vertexShader from '@/shaders/vertex.glsl';
import fragmentShader from '@/shaders/fragment.glsl';
import { createProgramInfo } from 'twgl.js';

export const DEFAULT_GL_Attributes = {
  alpha: false,
  depth: true,
  stencil: true,
  antialias: true,
  premultipliedAlpha: true,
  preserveDrawingBuffer: false,
  powerPreference: 'default',
  failIfMajorPerformanceCaveat: false,
};

export function createProgram(canvas: HTMLCanvasElement) {
  const gl = getWebGLContext(canvas, DEFAULT_GL_Attributes);
  gl.viewport(0, 0, canvas.width, canvas.height);
  const programInfo = createProgramInfo(gl, [vertexShader, fragmentShader]);
  gl.useProgram(programInfo.program);
  return { programInfo, gl };
}
