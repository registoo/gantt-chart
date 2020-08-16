import * as d3 from "d3";
import { connect } from "react-redux";
import React, { useCallback, Fragment } from "react";
import drawTicksCallback from "./auxData/ganttTopScale/drawTicks.js";
import drawTicksValues from "./auxData/ganttTopScale/drawTicksValues.js";
import getPixelsInOneDay from "../../../auxFunctions/getPixelsInOneDay.js";
import tickOffset from "./auxData/ganttTopScale/tickOffset.js";

const GanttTopScale = (props) => {
  const pixelsInOneDay = getPixelsInOneDay(props.widthSVG, props.xScale);
  const xAxis = d3.axisTop().scale(props.xScale);
  const addTicksText = useCallback(
    (node) => {
      if (node !== null) {
        const currentNode = d3.select(node);
        const period = "month";
        const counts = {};

        currentNode.call(drawTicksValues(period, xAxis, counts, pixelsInOneDay)).call((g) => {
          tickOffset(g, counts, pixelsInOneDay, period);
        });
      }
    },
    [xAxis, pixelsInOneDay]
  );

  const drawTicks = drawTicksCallback(props, d3.utcMonth, xAxis);

  return (
    <Fragment>
      <svg width="100%" height={props.ganttTopScaleHeight} id="ganttTopScaleMonth">
        <line x1="0" y1="0" x2={props.widthSVG} y2="0" stroke="black" strokeWidth="2" />
        <g
          width={props.widthSVG}
          ref={addTicksText}
          transform={`translate(0,${props.ganttTopScaleHeight - 1})`}
        ></g>
        <g
          width={props.widthSVG}
          ref={drawTicks}
          transform={`translate(0,${props.ganttTopScaleHeight - 1})`}
        ></g>
      </svg>
    </Fragment>
  );
};

const getState = (state) => {
  return {
    xScale: state.mainReducer.scales.xScale,
    widthSVG: state.mainReducer.sizes.sizesSVG.width,
    ganttTopScaleHeight: state.mainReducer.sizes.sizesSVG.ganttTopScale.height,
  };
};

export default connect(getState)(GanttTopScale);
