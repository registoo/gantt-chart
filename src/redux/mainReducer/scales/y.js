import * as d3 from "d3";

export default function (state) {
  const yScale = d3
    .scaleBand()
    .domain(state.displayedIds)
    .range([0, state.sizesSVG.height - state.sizesSVG.margin.top - state.sizesSVG.margin.bottom])
    .padding(0.2);

  const yAxis = d3.axisRight().scale(yScale);

  return { yScale, yAxis };
}
