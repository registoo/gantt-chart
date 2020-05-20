import x from "./x.js";
import y from "./y.js";

export default function (state) {
  const xScale = x(state);
  const yScale = y(state);

  return { ...xScale, ...yScale };
}
