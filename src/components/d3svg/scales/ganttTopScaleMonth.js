import * as d3 from "d3";
import { connect } from "react-redux";
import React, { useCallback, Fragment } from "react";
import moment from "moment";
import months from "./auxData/ganttTopScale/monthes.js";
import addTicksCallback from "./auxData/ganttTopScale/addTicks.js";
import drawTicks from "./auxData/ganttTopScale/drawTicksValues.js";
import getPixelsInOneDay from "../../../auxFunctions/getPixelsInOneDay.js";
import getMultiDraw from "./auxData/ganttTopScale/multiDraw.js";

const GanttTopScale = (props) => {
  const pixelsInOneDay = getPixelsInOneDay(props.widthSVG, props.xScale);
  const xAxis = d3.axisTop().scale(props.xScale);
  const multiDraw = getMultiDraw(pixelsInOneDay);
  const addTicksText = useCallback(
    (node) => {
      if (node !== null) {
        const currentNode = d3.select(node);

        const counts = {};
        currentNode.call(drawTicks("month", xAxis, counts, pixelsInOneDay, multiDraw)).call((g) => {
          g.selectAll(".tick text")
            .attr("font-size", "0.6rem")
            .attr("x", (a, i, arr) => {
              // проверям нарисован ли тик и берём его innerHTML (название месяца, например "Июль" или "июн")
              if (arr[i].innerHTML.length > 0) {
                let result;
                const currentMonthNumber = months[arr[i].innerHTML];
                // пробегаем по counts, берём длину показываемого месяца и расчитываем чтоб по центру рисовалось
                Object.keys(counts).map((dateInMS) => {
                  const monthNumberInCounts = +moment.utc(+dateInMS).format("M");
                  if (currentMonthNumber === monthNumberInCounts) {
                    result = multiDraw.positionX(counts[dateInMS].count);
                  }
                  return null;
                });
                return result;
              }
              return 0;
            })
            // отступ наименования тика от границы шкалы
            .attr("y", -4);
        });
      }
    },
    [xAxis, pixelsInOneDay, multiDraw]
  );

  const addTicks = addTicksCallback(props, d3.utcMonth, xAxis);

  return (
    <Fragment>
      <svg width="100%" height={props.ganttTopScaleHeight} id="ganttTopScale">
        <line x1="0" y1="0" x2={props.widthSVG} y2="0" stroke="black" strokeWidth="2" />
        <g
          width={props.widthSVG}
          ref={addTicksText}
          transform={`translate(0,${props.ganttTopScaleHeight - 1})`}
        ></g>
        <g
          width={props.widthSVG}
          ref={addTicks}
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
