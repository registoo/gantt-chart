import * as d3 from "d3";
import { connect } from "react-redux";
import React, { useCallback } from "react";

const GanttTopScale = (props) => {
  const addSomething = useCallback(
    (node) => {
      if (node !== null) {
        const xAxis = d3.axisTop().scale(props.xScale);
        const pixelsInOneDay = props.getPixelsInOneDay(
          props.displayedStartMS,
          props.displayedFinishMS
        );
        const currentNode = d3.select(node);
        currentNode
          .call(xAxis.ticks(d3.utcDay).tickFormat((d) => d3.timeFormat("%d/%m")(d)))
          .call((g) => {
            g.selectAll(".tick text")
              .attr("font-size", "0.4rem")
              .attr("x", pixelsInOneDay / 2);
          });
      }
    },
    [props]
  );

  return (
    <svg width="100%" height={props.ganttTopScaleHeight} id="ganttTopScale">
      <g width={props.widthSVG} ref={addSomething} transform={`translate(0,19)`}></g>
    </svg>
  );
};

const getState = (state) => {
  return {
    widthSVG: state.mainReducer.sizes.sizesSVG.width,
    ganttTopScaleHeight: state.mainReducer.sizes.sizesSVG.ganttTopScale.width,
    xScale: state.mainReducer.scales.xScale,
    displayedStartMS: state.mainReducer.scales.displayedStartMS,
    getPixelsInOneDay: state.mainReducer.scales.aux.getPixelsInOneDay,
    displayedFinishMS: state.mainReducer.scales.displayedFinishMS,
  };
};

export default connect(getState)(GanttTopScale);
