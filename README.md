# svg-webgl-loader-opti

## Introduction

svg-webgl-loader-opti, a fork of [svg-webgl-loader
](https://github.com/MoeYc/svg-webgl-loader) optimized for multiple renderings.
All credits go to the original author, MoeYc.

## Installation

### npm/yarn

```shell
npm i svg-webgl-loader-opti
```

```shell
yarn add svg-webgl-loader-opti
```

## Usage

```js
import svgLoader from "svg-webgl-loader-opti";
import svgUrl from "./img/test.svg";

// load and parse svg data
const svgData = await svgLoader(svgUrl);

// load the canvas and create the buffers
loader.load({
  gl,
  shaders: {
    vertex: vertexShader,
    fragment: fragmentShader
  },
  loc: {
    width: 400,
    height: 400,
  },
  needTrim: false,
});

// draw on the buffer (can be called at every frame)
loader.draw({
  scale: 0.8,
  loc: { x: 0.5, y: 0 },
  needFill: true,
  needStroke: true,
});
```

## Remark

svg-webgl-loader mainly refers to the scheme of rendering svg in [three.js](https://github.com/mrdoob/three.js/blob/dev/examples/webgl_loader_svg.html): parse the paths, discrete paths to points and triangulate, then the svg would be analyzed to many triangles, so that it can be rendered by the webgl shader.








