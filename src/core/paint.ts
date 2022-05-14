import { setUniforms, setBuffersAndAttributes, drawBufferInfo } from 'twgl.js';

export function paint(gl, programInfo, data, config) {
  const { needFill, needStroke } = config || {};
  data.forEach((item) => {
    if (
      (item.type === 'fill' && !needFill) ||
      (item.type === 'stroke' && !needStroke)
    )
      return;

    toggleBlend(gl, item?.fillOpacity);
    setUniforms(programInfo, {
      shapeColor: [item.color.r, item.color.g, item.color.b, item.fillOpacity],
    });

    // bind and enable buffering

    setBuffersAndAttributes(gl, programInfo, item.bufferInfo);
    drawBufferInfo(gl, item.bufferInfo);
  });
}

function toggleBlend(gl, opacity) {
  if (!opacity) return;
  if (opacity < 1) {
    gl.enable(gl.BLEND);
    gl.blendFuncSeparate(
      gl.SRC_ALPHA,
      gl.ONE_MINUS_SRC_ALPHA,
      gl.ONE,
      gl.ONE_MINUS_SRC_ALPHA
    );
  } else {
    gl.disable(gl.BLEND);
  }
}
