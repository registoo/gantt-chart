import * as d3 from "d3";

export default function (state) {
  const xScale = d3
    .scaleTime()
    .domain([state.scales.domainXStartMS, state.scales.domainXFinishMS])
    .range([state.scales.xScaleMinCoordinate, state.scales.xScaleMaxCoordinate]);

  const xAxis = d3.axisBottom().scale(xScale);

  const yScale = d3
    .scaleBand()
    .domain(state.listID)
    .range([0, state.sizesSVG.height - state.sizesSVG.margin.top - state.sizesSVG.margin.bottom])
    .padding(0.2);

  const yAxis = d3.axisRight().scale(yScale);

  function drawScales(svg) {
    svg
      .append("g")
      .call(
        xAxis
          .ticks(d3.utcDay)
          .tickFormat((d) => d3.timeFormat("%d/%m")(d))
          .tickSize(
            -state.sizesSVG.height + state.sizesSVG.margin.top + state.sizesSVG.margin.bottom
          )
          .tickSizeOuter(0)
      )
      .call((g) => {
        g.selectAll(".tick text")
          .attr("font-size", "0.453rem")
          .attr("x", state.aux.pixelsInOneDay / 2);
      })
      .attr(
        "transform",
        `translate(${state.sizesSVG.margin.left},${
          state.sizesSVG.height - state.sizesSVG.margin.bottom
        })`
      );
  }
  return { xScale, xAxis, yScale, yAxis, drawScales };
}
