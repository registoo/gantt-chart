export default function (state, svg, yAxis) {
  svg
    .append("g")
    .call(yAxis.ticks(state.listID.length))
    .call((g) =>
      g
        .selectAll(".tick:not(:first-of-type) line")
        .attr("stroke-opacity", 0.5)
        .attr("stroke-dasharray", "2,2")
    )
    .attr("transform", `translate(${state.sizesSVG.margin.left},${state.sizesSVG.margin.top})`);
  return svg;
}
