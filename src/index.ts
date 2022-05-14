import { load } from '@/utils/load';
import { parse } from '@/core/parse';
import { createProgram } from '@/core/createProgram';
import { getViewBox, parsePathToData } from '@/core/parsePathToData';
import { preprocess } from '@/core/preprocessData';
import { paint } from '@/core/paint';
import { SvgLoader, LoadParams, RenderConfig } from './types/types';

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
    let { loc, canvas, needTrim = false } = params;
    // 获取真正绘制区域
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
    const { programInfo, gl } = createProgram(canvas);
    // gl.clearColor(1, 1, 1, 1);
    // gl.clear(gl.COLOR_BUFFER_BIT);
    svgLoader.gl = gl;
    svgLoader.programInfo = programInfo;
    svgLoader.preprocessed = preprocess(gl, realViewBox, loc, canvas, data);
  };

  svgLoader.draw = (config: RenderConfig): void => {
    const defaultConfig = {
      scale: 1,
      loc: { x: 0, y: 0 },
      needFill: true,
      needStroke: true,
    };
    paint(
      svgLoader.gl,
      svgLoader.programInfo,
      svgLoader.preprocessed,
      (config ? config : defaultConfig)
    );
  };
  return svgLoader;
}
