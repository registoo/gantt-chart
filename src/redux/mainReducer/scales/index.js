import x from "./x.js";
import y from "./y.js";
import drawAxisX from "./drawAxisX.js";
import drawAxisY from "./drawAxisY.js";

export default function (state) {
  const { xScale, xAxis } = x(state);
  const { yScale, yAxis } = y(state);

  function drawScales(svg) {
    drawAxisX(state, svg, xAxis);
    drawAxisY(state, svg, yAxis);
    return svg;
  }
  return { xScale, xAxis, yScale, yAxis, drawScales };
}
