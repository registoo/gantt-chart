import * as d3 from "d3";
import { connect } from "react-redux";
import React, { useCallback, Fragment } from "react";
import convertLength from "to-px";
import moment from "moment";

const GanttTopScale = (props) => {
  const addSomething = useCallback(
    (node) => {
      if (node !== null) {
        const pixelsInOneDay = props.getPixelsInOneDay(props.widthSVG, props.xScale);
        const xAxis = d3.axisTop().scale(props.xScale);
        const currentNode = d3.select(node);

        const multiDraw = (() => {
          let positionX;
          let ticks;
          let timeFormat;
          // если ширина дня больше двух ширин "0"
          positionX = pixelsInOneDay / 2;
          ticks = d3.utcMonth;
          timeFormat = (d) => props.d3TimeFormatLocale.format("%B")(d);
          return { positionX, ticks, timeFormat };
        })();

        currentNode
          .call(
            xAxis
              .ticks(multiDraw.ticks)
              .tickFormat((d) => d3.timeFormat("%B")(d))
              .tickSize(16)
          )
          .call((g) => {
            g.selectAll(".tick text")
              .attr("font-size", "0.6rem")
              .attr("x", multiDraw.positionX)
              .attr("y", -4);
          })
          .call((g) => {
            g.selectAll(".tick text").attr("text-anchor", "middle");
          });
        // .call((g) => {
        //   g.selectAll(".tick:nth-child(2)").attr("display", "none");
        // });
      }
    },
    [props]
  );

  return (
    <Fragment>
      <svg width="100%" height="1px" id="ganttTopScale">
        <line x1="0" y1="0" x2={props.widthSVG} y2="0" stroke="black" stroke-width="2" />
      </svg>
      <svg width="100%" height={props.ganttTopScaleHeight} id="ganttTopScale">
        <g width={props.widthSVG} ref={addSomething} transform={`translate(0,16)`}></g>
      </svg>
    </Fragment>
  );
};

const getState = (state) => {
  return {
    xScale: state.mainReducer.scales.xScale,
    widthSVG: state.mainReducer.sizes.sizesSVG.width,
    displayedStartMS: state.mainReducer.scales.displayedStartMS,
    displayedFinishMS: state.mainReducer.scales.displayedFinishMS,
    getPixelsInOneDay: state.mainReducer.scales.aux.getPixelsInOneDay,
    ganttTopScaleHeight: state.mainReducer.sizes.sizesSVG.ganttTopScale.height,
    d3TimeFormatLocale: state.mainReducer.someData.d3TimeFormatLocale,
  };
};

export default connect(getState)(GanttTopScale);
