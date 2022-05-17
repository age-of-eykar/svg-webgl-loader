import { load } from '@/utils/load';
import { parse } from '@/core/parse';
import { getViewBox, parsePathToData } from '@/core/parsePathToData';
import { preprocess } from '@/core/preprocessData';
import { paint } from '@/core/paint';
import { SvgLoader, LoadParams, RenderConfig } from './types/types';
import { createProgramInfo } from 'twgl.js';
import vertexShader from '@/shaders/vertex.glsl';
import fragmentShader from '@/shaders/fragment.glsl';

export default async function init(svgUrl: string): Promise<SvgLoader> {
  // 加载svg
  const text = await load(svgUrl);
  // 解析svg路径
  const { paths, viewBox } = parse(text);
  // 路径解析为数据
  const { data, boundary } = parsePathToData(paths);

  const svgLoader: SvgLoader = {
    load: null,
    draw: null,
  };

  svgLoader.load = (params: LoadParams): void => {
    let { loc, gl, needTrim = false } = params;
    const realViewBox = getViewBox(viewBox, boundary, needTrim);
    const defaultLoc = {
      x: 0,
      y: 0,
      width: realViewBox.width,
      height: realViewBox.height,
    };
    loc = loc || defaultLoc;
    loc.width = loc.width || realViewBox.width;
    loc.height = loc.height || realViewBox.height;

    let programInfo;
    if (params.shaders) {
      programInfo = createProgramInfo(gl, [
        params.shaders.vertex,
        params.shaders.fragment,
      ]);
    } else {
      programInfo = createProgramInfo(gl, [vertexShader, fragmentShader]);
    }
    svgLoader.gl = gl;
    svgLoader.programInfo = programInfo;
    svgLoader.preprocessed = preprocess(gl, realViewBox, loc, data);
  };

  svgLoader.draw = (config: RenderConfig): void => {
    svgLoader.gl.useProgram(svgLoader.programInfo.program);
    const defaultConfig = {
      uniforms: {
        scale: 1,
        location: [0.0, 0.0],
        ratio: 2.0,
      },
      needFill: true,
      needStroke: true,
    };
    paint(
      svgLoader.gl,
      svgLoader.programInfo,
      svgLoader.preprocessed,
      config || defaultConfig
    );
  };
  return svgLoader;
}
