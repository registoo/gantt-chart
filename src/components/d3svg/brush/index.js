import rowHasError from "../../../auxFunctions/rowHasError";

export default function (svg, props, scales) {
  const g = svg
    .append("g")
    .attr("id", "MAIN_KVADRAT")
    .attr("transform", `translate(${props.sizesSVG.margin.left},${props.sizesSVG.margin.top})`);
  g.selectAll()
    .data(props.data)
    .enter()
    .append("rect")
    .attr("x", (d, i) => {
      if (!rowHasError(d.data)) {
        return scales.xScale(d.data.start.dateInMillisecons);
      }
    })
    .attr("y", (d) => {
      return rowHasError(d.data)
        ? scales.yScale(d.data.isError.formattedText)
        : scales.yScale(d.data.jobName.formattedText);
    })
    .attr("height", scales.yScale.bandwidth())
    .attr("width", (d) => {
      if (!rowHasError(d.data)) {
        return (
          scales.xScale(d.data.start.dateInMillisecons + (d.data.duration * 86400000 - 1)) -
          scales.xScale(d.data.start.dateInMillisecons)
        );
      }
    })
    .style("fill", "steelblue")
    .style("opacity", 0.5)
    .attr("id", (d) => (rowHasError(d.data) ? null : d.data.jobName.formattedText))
    .attr("id", (d) => {
      return rowHasError(d.data) ? null : "Rabota " + d.id;
    });
}
