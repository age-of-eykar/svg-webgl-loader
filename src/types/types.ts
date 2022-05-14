type UnitType = 'mm' | 'cm' | 'in' | 'pt' | 'pc' | 'px';

export type ContextAttributes = Partial<{
  alpha: boolean;
  depth: boolean;
  stencil: boolean;
  antialias: boolean;
  premultipliedAlpha: boolean;
  preserveDrawingBuffer: boolean;
  powerPreference: string;
  failIfMajorPerformanceCaveat: boolean;
}>;

export type GLType = WebGLRenderingContext | WebGL2RenderingContext;
export interface RenderConfig {
  scale?: number;
  loc?: { x: number; y: number };
  needFill?: boolean;
  needStroke?: boolean;
}

export interface LoadParams {
  canvas: HTMLCanvasElement;
  loc?: {
    width?: number;
    height?: number;
  };
  needTrim?: boolean;
}

export interface SvgLoader {
  load: (params: LoadParams) => void;
  draw: (params: RenderConfig) => void;
  gl?: GLType;
  programInfo?: WebGLProgram;
  preprocessed?: any;
}

export interface Scope {
  defaultUnit: UnitType;
  defaultDPI: number;
}

export interface Style {
  fill: string;
  fillOpacity: number;
  strokeOpacity: number;
  strokeWidth: number;
  strokeLineJoin: string;
  strokeLineCap: string;
  strokeMiterLimit: number;
}
export interface ViewBox {
  x: number;
  y: number;
  width: number;
  height: number;
}
