import * as d3 from "d3";

export default function (state) {
  const a = state.hierarchyDisplayedIds;
  // console.log(">>>>>>", state.hierarchyDisplayedIds, a);
  const yScale = d3
    .scaleBand()
    .domain(a)
    .range([0, state.sizesSVG.height - state.sizesSVG.margin.top - state.sizesSVG.margin.bottom])
    .padding(0.2);
  // console.log(">>>>>>", state.hierarchyDisplayedIds, a, yScale.domain());

  const yAxis = d3.axisRight().scale(yScale);

  return { yScale, yAxis };
}
