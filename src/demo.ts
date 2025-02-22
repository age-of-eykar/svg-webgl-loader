import svgLoader from './index';

import svgUrl from '../public/static/svg/medium.svg';

async function loadSvg() {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const gl = canvas.getContext('webgl2', {
    alpha: false,
    depth: false,
    stencil: true,
    antialias: true,
    premultipliedAlpha: true,
    preserveDrawingBuffer: true,
    powerPreference: 'default',
    failIfMajorPerformanceCaveat: false,
  });
  gl.clearColor(1, 1, 1, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  const loader = await svgLoader(svgUrl);
  loader.load({
    gl,
    loc: {
      width: 400,
      height: 400,
    },
    needTrim: false,
  });

  loader.draw({
    uniforms: {
      scale: 0.8,
      location: [0.0, 0.0],
      ratio: canvas.width / canvas.height,
    },
    needFill: true,
    needStroke: true,
  });
}

loadSvg();
