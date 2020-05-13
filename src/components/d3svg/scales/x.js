import * as d3 from "d3";

export default function (state) {
  const xScale = d3
    .scaleTime()
    .domain([state.scales.domainXStartMS, state.scales.domainXFinishMS])
    .range([state.scales.xScaleMinCoordinate, state.scales.xScaleMaxCoordinate]);

  const xAxis = d3.axisBottom().scale(xScale);

  return { xScale, xAxis };
}
