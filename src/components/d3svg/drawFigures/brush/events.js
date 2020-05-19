import * as d3 from "d3";
import moment from "moment";

export const brushStart = (scales, brush, that) => {
  console.log(d3.event.sourceEvent.type);
};

export function brushed(scales, brush, that) {
  if (!d3.event.sourceEvent || !d3.event.selection) return;
  const arr = [...d3.event.selection]
    .map((d) => {
      return +moment.utc(scales.xScale.invert(d)).format("x");
    })
    .sort((a, b) => a - b);
  const d0 = moment.utc(arr[0]).startOf("day");
  const d1 = moment.utc(arr[1]).endOf("day").subtract(1, "ms");
  const result = [scales.xScale(+d0.format("x")), scales.xScale(+d1.format("x"))];
  if (d3.brushSelection(that)[1] === result[1] && d3.brushSelection(that)[0] === result[0]) return;
  d3.select(that).call(brush.move, result);
}
export const brushEnd = (scales, brush, that) => {
  console.log(d3.event.sourceEvent.type);
};
