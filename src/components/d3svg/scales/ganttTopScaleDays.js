import * as d3 from "d3";
import { connect } from "react-redux";
import React, { useCallback } from "react";
import convertLength from "to-px";
import getPixelsInOneDay from "../../../auxFunctions/getPixelsInOneDay.js";
import drawTicksValues from "./auxData/ganttTopScale/drawTicksValues.js";
import tickOffset from "./auxData/ganttTopScale/tickOffset.js";
import drawTicksCallback from "./auxData/ganttTopScale/drawTicks.js";

const GanttTopScale = (props) => {
  const pixelsInOneDay = getPixelsInOneDay(props.widthSVG, props.xScale);
  const xAxis = d3.axisTop().scale(props.xScale);
  const period =
    pixelsInOneDay * 7 < convertLength("5ch")
      ? "month"
      : pixelsInOneDay > convertLength("1ch") * 2.5
      ? "day"
      : "week";
  const addSomething = useCallback(
    (node) => {
      if (node !== null) {
        const currentNode = d3.select(node);
        const counts = {};

        currentNode
          .call(drawTicksValues(period, xAxis, counts, pixelsInOneDay, "lowerScale"))
          .call((g) => {
            tickOffset(g, counts, pixelsInOneDay, period, "lowerScale");
          });
      }
    },
    [period, pixelsInOneDay, xAxis]
  );
  let drawTicks;
  switch (period) {
    case "month": {
      drawTicks = drawTicksCallback(props, d3.utcMonth, xAxis);
      break;
    }
    case "week": {
      drawTicks = drawTicksCallback(props, d3.utcWeek, xAxis);
      break;
    }
    case "day": {
      drawTicks = drawTicksCallback(props, d3.utcDay, xAxis);
      break;
    }
    default:
      break;
  }

  return (
    <svg width="100%" height={props.ganttTopScaleHeight} id="ganttTopScale">
      <g
        width={props.widthSVG}
        ref={addSomething}
        transform={`translate(0,${props.ganttTopScaleHeight - 1})`}
      ></g>
      <g
        width={props.widthSVG}
        ref={drawTicks}
        transform={`translate(0,${props.ganttTopScaleHeight - 1})`}
      ></g>
    </svg>
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
