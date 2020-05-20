import React, { useCallback } from "react";
import * as d3 from "d3";

export default function (props) {
  const addSomething = useCallback((node) => {
    const currentNode = d3.select(node);
    currentNode.call(props.yAxis.ticks(props.listID.length));
    currentNode.call((g) =>
      g
        .selectAll(".tick:not(:first-of-type) line")
        .attr("stroke-opacity", 0.5)
        .attr("stroke-dasharray", "2,2")
    );
  });

  return (
    <g
      ref={addSomething}
      transform={`translate(${props.sizesSVG.margin.left},${props.sizesSVG.margin.top})`}
    ></g>
  );
}
