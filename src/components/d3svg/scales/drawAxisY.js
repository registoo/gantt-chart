import React, { useCallback } from "react";
import * as d3 from "d3";
import { connect } from "react-redux";

const DrawAxisY = (props) => {
  const addSomething = useCallback(
    (node) => {
      if (node !== null) {
        const currentNode = d3.select(node);
        currentNode.call(props.yAxis.ticks(props.hierarchyDisplayedIds.length));
        currentNode.call(props.yAxis.ticks((d) => null));
        currentNode.call(props.yAxis.tickSizeOuter(0));
        // currentNode.call((g) =>
        //   g
        //     .selectAll(".tick:not(:first-of-type) line")
        //     .attr("stroke-opacity", 0.5)
        //     .attr("stroke-dasharray", "2,2")
        // );
        currentNode.call((g) => g.selectAll(".tick").attr("display", "none"));
      }
    },
    [props]
  );

  return (
    <g
      ref={addSomething}
      transform={`translate(${props.marginSVG.left},${props.marginSVG.top})`}
    ></g>
  );
};

const getState = (state) => {
  return {
    yAxis: state.mainReducer.scales.yAxis,
    marginSVG: state.mainReducer.sizes.sizesSVG.margin,
    hierarchyDisplayedIds: state.mainReducer.ids.hierarchyDisplayedIds,
  };
};

export default connect(getState)(DrawAxisY);
