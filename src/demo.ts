import svgLoader from './index';

import svgUrl from '../public/static/svg/medium.svg';

async function loadSvg() {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
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
    scale: 0.8,
    loc: { x: 0.5, y: 0 },
    needFill: true,
    needStroke: true,
  });
}

loadSvg();
