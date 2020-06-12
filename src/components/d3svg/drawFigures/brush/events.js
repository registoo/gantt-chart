import * as d3 from "d3";
import moment from "moment";

export const brushStart = (node, xScale) => {
  console.log(d3.event.sourceEvent.type);
};

export function brushed(node, xScale) {
  if (d3.event.sourceEvent.type === "brush") return;

  const d0 = d3.event.selection.map(xScale.invert),
    d1 = d0.map(d3.utcDay.round);
  // If empty when rounded, use floor instead.
  if (d1[0] >= d1[1]) {
    d1[0] = +moment.utc(d3.utcDay.floor(d0[0])).format("x");
    d1[1] = +moment.utc(d3.utcDay.offset(d1[0])).subtract(1, "ms").format("x");
  }

  d3.select(node).call(d3.event.target.move, d1.map(xScale));
}
export const brushEnd = (node, xScale) => {
  console.log(d3.event.sourceEvent.type);
};
