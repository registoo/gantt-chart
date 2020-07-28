import { useCallback } from "react";
import * as d3 from "d3";

export default (props, d3TimeInterval) =>
  useCallback(
    (node) => {
      const xAxis = d3.axisTop().scale(props.xScale);
      const currentNode = d3.select(node);
      currentNode.call(
        xAxis
          .ticks(d3TimeInterval)
          .tickFormat((d) => null)
          .tickSize(props.ganttTopScaleHeight)
      );
    },
    [props, d3TimeInterval]
  );
