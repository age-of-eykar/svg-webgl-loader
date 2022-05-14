import svgLoader from './index';

import svgUrl from '../public/static/svg/medium.svg';

async function loadSvg() {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const gl = canvas.getContext('webgl2');
  gl.clearColor(1, 1, 1, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  const loader = await svgLoader(svgUrl);
  loader.load({
    canvas,
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
