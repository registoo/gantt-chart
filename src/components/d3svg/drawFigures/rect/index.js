import rowHasError from "../../../../auxFunctions/rowHasError";

export default function (g, state) {
  g.selectAll()
    .data(state.data)
    .enter()
    .append("rect")
    .attr("x", (d) => {
      return !rowHasError(d.data) ? state.scales.xScale(d.data.start.dateInMillisecons) : null;
    })
    .attr("y", (d) => {
      return rowHasError(d.data)
        ? state.scales.yScale(d.data.isError.formattedText)
        : state.scales.yScale(d.data.jobName.formattedText);
    })
    .attr("height", state.scales.yScale.bandwidth())
    .attr("width", (d) => {
      return !rowHasError(d.data)
        ? state.scales.xScale(d.data.start.dateInMillisecons + (d.data.duration * 86400000 - 1)) -
            state.scales.xScale(d.data.start.dateInMillisecons)
        : null;
    })
    .style("fill", "steelblue")
    .style("opacity", 0.5)
    .attr("id", (d) => {
      return rowHasError(d.data) ? null : `Rabota ${d.id} rect`;
    });
}
