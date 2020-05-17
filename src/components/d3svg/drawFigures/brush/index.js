import rowHasError from "../../../../auxFunctions/rowHasError";
import * as d3 from "d3";

export default function (g, state) {
  const { margin, width } = state.sizesSVG;
  const scales = state.scales;

  g.selectAll()
    .data(state.data)
    .enter()
    .append("g")
    .attr("id", (d) => {
      return rowHasError(d.data) ? null : `Rabota ${d.id} brush`;
    })
    .each(function (d) {
      if (rowHasError(d.data)) return;

      const x0 = margin.left;
      const y0 = scales.yScale(d.id) + margin.top;
      const x1 = width - margin.right;
      const y1 = y0 + scales.yScale.bandwidth();
      const brushCoordinate = [
        [x0, y0],
        [x1, y1],
      ];
      d3.select(this).call(d3.brushX().extent(brushCoordinate));
    });
}
