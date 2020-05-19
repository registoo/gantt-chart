import * as d3 from "d3";

export const brushStart = (scales, that) => {
  console.log(d3.event.sourceEvent.type);
};

export function brushed(scales, that) {
  if (d3.event.sourceEvent.type === "brush") return;

  const d0 = d3.event.selection.map(scales.xScale.invert),
    d1 = d0.map(d3.utcDay.round);

  // If empty when rounded, use floor instead.
  if (d1[0] >= d1[1]) {
    d1[0] = d3.utcDay.floor(d0[0]);
    d1[1] = d3.utcDay.offset(d1[0]);
  }

  d3.select(that).call(d3.event.target.move, d1.map(scales.xScale));
}
export const brushEnd = (scales, that) => {
  console.log(d3.event.sourceEvent.type);
};
