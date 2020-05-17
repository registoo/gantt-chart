import * as d3 from "d3";

export default function (state) {
  const xScale = d3
    .scaleTime()
    .domain([state.aux.domainXStartMS, state.aux.domainXFinishMS])
    .range([state.aux.xScaleMinCoordinate, state.aux.xScaleMaxCoordinate]);

  const xAxis = d3.axisBottom().scale(xScale);

  return { xScale, xAxis };
}
