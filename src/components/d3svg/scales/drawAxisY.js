import React, { useCallback } from "react";
import * as d3 from "d3";
import { connect } from "react-redux";

const DrawAxisY = (props) => {
  const addSomething = useCallback(
    (node) => {
      if (node !== null) {
        const currentNode = d3.select(node);
        currentNode.call(props.yAxis.ticks(props.listID.length));
        currentNode.call((g) =>
          g
            .selectAll(".tick:not(:first-of-type) line")
            .attr("stroke-opacity", 0.5)
            .attr("stroke-dasharray", "2,2")
        );
      }
    },
    [props]
  );

  return (
    <g
      ref={addSomething}
      transform={`translate(${props.sizesSVG.margin.left},${props.sizesSVG.margin.top})`}
    ></g>
  );
};

const getState = (state) => {
  return {
    yAxis: state.mainReducer.scales.yAxis,
    sizesSVG: state.mainReducer.sizesSVG,
    listID: state.mainReducer.listID,
  };
};

export default connect(getState)(DrawAxisY);
