import * as d3 from "d3";

export default function (state, svg, xAxis) {
  svg
    .append("g")
    .call(
      xAxis
        .ticks(d3.utcDay)
        .tickFormat((d) => d3.timeFormat("%d/%m")(d))
        .tickSize(-state.sizesSVG.height + state.sizesSVG.margin.top + state.sizesSVG.margin.bottom)
    )
    .call((g) => {
      g.selectAll(".tick text")
        .attr("font-size", "0.453rem")
        .attr("x", state.aux.pixelsInOneDay / 2);
    })
    // .call((g) => {
    //   g.selectAll(".tick:not(:last-of-type) line, :not(:first-of-type) line").attr(
    //     "stroke-width",
    //     "5"
    //   );
    // })
    .call((g) => {
      g.selectAll(".tick:last-of-type text").attr("display", "none");
    })
    .attr(
      "transform",
      `translate(${state.sizesSVG.margin.left},${
        state.sizesSVG.height - state.sizesSVG.margin.bottom
      })`
    );
  return svg;
}
