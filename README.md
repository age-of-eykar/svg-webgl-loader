# svg-webgl-loader

## Introduction

svg-webgl-loader-opti, a fork of [svg-webgl-loader
](https://github.com/MoeYc/svg-webgl-loader) optimized for multiple renderings.
All credits go to the original author, MoeYc.

## Installation

### npm/yarn

```shell
npm i svg-webgl-loader
```

```shell
yarn add svg-webgl-loader
```

## Usage

```js
import svgLoader from "svg-webgl-loader";
import svgUrl from "./img/test.svg";

// load and parse svg data
const svgData = await svgLoader(svgUrl);

  // load (one time)
  loader.load({
    canvas,
    loc: { // working on a way to move the svg without calling it again
      x: 0,
      y: 0,
      width: 400,
      height: 400,
    },
    needTrim: false,
  });

  // draw (multiple times, eg at every frame)
  loader.draw(
    {
      needFill: true,
      needStroke: true,
    },
  );

```

## Remark

svg-webgl-loader mainly refers to the scheme of rendering svg in [three.js](https://github.com/mrdoob/three.js/blob/dev/examples/webgl_loader_svg.html): parse the paths, discrete paths to points and triangulate, then the svg would be analyzed to many triangles, so that it can be rendered by the webgl shader.








