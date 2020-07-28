import * as d3 from "d3";
import { connect } from "react-redux";
import React, { useCallback } from "react";
import convertLength from "to-px";
import moment from "moment";
import d3TimeFormatLocale from "../../../auxFunctions/d3TimeFormatLocale.js";
import getPixelsInOneDay from "../../../auxFunctions/getPixelsInOneDay.js";
import getMultiDraw from "./auxData/ganttTopScale/multiDraw.js";

const GanttTopScale = (props) => {
  const pixelsInOneDay = getPixelsInOneDay(props.widthSVG, props.xScale);
  const xAxis = d3.axisTop().scale(props.xScale);
  // const multiDraw = getMultiDraw(pixelsInOneDay);
  const addSomething = useCallback(
    (node) => {
      if (node !== null) {
        const currentNode = d3.select(node);
        const textOfDayVlezaet = pixelsInOneDay > convertLength("1ch") * 2.5;
        const period = textOfDayVlezaet ? "day" : "week";
        const ticks = textOfDayVlezaet ? d3.utcDay : d3.utcWeek;
        const multiDraw = (() => {
          let positionX;
          let timeFormat;
          // если ширина дня больше двух ширин "0"
          if (pixelsInOneDay > convertLength("1ch") * 2.5) {
            positionX = pixelsInOneDay / 2;
            timeFormat = (d) => d3TimeFormatLocale.format("%d")(d);
          } else {
            positionX = (pixelsInOneDay * 7) / 2;
            timeFormat = (d) => {
              const endOfWeek = moment.utc(d).add(6, "d");
              return `${d3TimeFormatLocale.format("%e.%m")(d)}-${d3TimeFormatLocale.format("%e.%m")(
                endOfWeek
              )}`;
            };
          }
          return { positionX, timeFormat };
        })();

        currentNode
          .call(
            xAxis
              .ticks(ticks)
              .tickFormat((d) => multiDraw.timeFormat(d))
              .tickSize(16)
          )
          .call((g) => {
            g.selectAll(".tick text")
              .attr("font-size", "0.6rem")
              .attr("x", multiDraw.positionX)
              .attr("y", -4);
          });
        // .call((g) => {
        //   g.selectAll(".tick:nth-child(2)").attr("display", "none");
        // });
      }
    },
    [props]
  );

  return (
    <svg width="100%" height={props.ganttTopScaleHeight} id="ganttTopScale">
      <g width={props.widthSVG} ref={addSomething} transform={`translate(0,16)`}></g>
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
