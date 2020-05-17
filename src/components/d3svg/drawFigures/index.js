import drawBrush from "./brush";
import drawRect from "./rect";
import * as d3 from "d3";

export default function (state) {
  const svg = "svg#chart";

  // обёртка для всех rect
  const gForRects = d3
    .select(svg)
    .append("g")
    .attr("id", "gForRects")
    .attr("transform", `translate(${state.sizesSVG.margin.left},${state.sizesSVG.margin.top})`);

  // обёртка для всех brush
  const gForBrushing = d3
    .select(svg)
    .append("g")
    .attr("id", "gForBrushing")
    .attr("transform", `translate(${state.sizesSVG.margin.left},${state.sizesSVG.margin.top})`);

  drawRect(gForRects, state);
  drawBrush(gForBrushing, state);
}
