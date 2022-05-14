import { createBufferInfoFromArrays } from 'twgl.js';

export function preprocess(gl, viewBox, loc, data) {
  return data.map((item) => {
    const vao = getVertices(item.vertices, viewBox, loc);
    const bufferInfo = createBufferInfoFromArrays(gl, {
      position: { numComponents: 2, data: vao },
      indices: item.indices,
    });
    return {
      type: item.type,
      color: item.color,
      fillOpacity: item.fillOpacity,
      bufferInfo,
    };
  });
}

function getVertices(vertices: number[], viewBox, loc): number[] {
  const { width, height } = loc;
  const halfWidth = loc.width / 2;
  const halfHeight = loc.height / 2;
  return vertices.map((v, i) =>
    i % 2 === 0
      ? ((width / viewBox.width) * (v - viewBox.x) - halfWidth) / halfWidth
      : (halfHeight - (height / viewBox.height) * (v - viewBox.y)) / halfHeight
  );
}
