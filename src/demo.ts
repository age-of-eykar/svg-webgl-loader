import svgLoader from './index';

import svgUrl from '../public/static/svg/medium.svg';

async function loadSvg() {
  // 加载&解析svg
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const gl = canvas.getContext('webgl2');
  gl.clearColor(1, 1, 1, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  const loader = await svgLoader(svgUrl);
  // 绘制svg
  loader.draw({
    canvas,
    loc: {
      x: 0,
      y: 0,
      width: 400,
      height: 400,
    },
    config: {
      needTrim: false,
      needFill: true,
      needStroke: true,
    },
  });
}

loadSvg();
