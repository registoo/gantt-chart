import x from "./x.js";
import y from "./y.js";

export default function (state) {
  const { xScale, xAxis } = x(state);
  const { yScale, yAxis } = y(state);

  return { xScale, xAxis, yScale, yAxis };
}
