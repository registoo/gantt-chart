import * as d3 from "d3";
import { connect } from "react-redux";
import React, { useCallback, Fragment } from "react";
import convertLength from "to-px";
import moment from "moment";
import months from "./auxData/ganttTopScaleMonthes.js";
import addTicksCallback from "./auxData/ganttTopScaleAddTicks.js";
import getMultiDraw from "./auxData/ganntTopScaleMultiDraw.js";
import getPixelsInOneDay from "../../../auxFunctions/getPixelsInOneDay.js";

const GanttTopScale = (props) => {
  const addTicksText = useCallback(
    (node) => {
      if (node !== null) {
        const xAxis = d3.axisTop().scale(props.xScale);
        const currentNode = d3.select(node);
        const pixelsInOneDay = getPixelsInOneDay(props.widthSVG, props.xScale);
        const multiDraw = getMultiDraw(pixelsInOneDay);

        const counts = {};
        currentNode
          .call(
            xAxis
              .ticks(d3.utcDay)
              .tickFormat((d, i, arr) => {
                // читаем весь массив тиков и считаем их
                if (i === 0) {
                  [...arr]
                    .map((el) => moment.utc(el.__data__).startOf("month").valueOf())
                    .forEach((x, i) => {
                      // startPosition - первый найденный день в отображаемом массиве; count - количество найденных
                      counts[x] = counts[x]
                        ? { ...counts[x], count: counts[x].count + 1 }
                        : { startPosition: i, count: 1 };
                    });
                }
                const dateInMS = moment.utc(d).startOf("month").valueOf();

                // проверка на влезание слова
                const wordBreaks = (d, d3TimeFormat) =>
                  pixelsInOneDay * counts[dateInMS].count >
                  convertLength(`${multiDraw.timeFormat(d, d3TimeFormat).length}ch`);

                if (counts[dateInMS].startPosition === i) {
                  // проверка, влезает ли полное наименование месяца
                  if (wordBreaks(d, "%B")) return multiDraw.timeFormat(d, "%B");
                  // проверка, влезает ли краткое наименование месяца
                  else if (wordBreaks(d, "%b")) return multiDraw.timeFormat(d, "%b");
                  else return null;
                } else {
                  return null;
                }
              })
              .tickSize(0)
          )
          .call((g) => {
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
    [props]
  );

  const addTicks = addTicksCallback(props, d3.utcMonth);

  return (
    <Fragment>
      <svg width="100%" height={props.ganttTopScaleHeight} id="ganttTopScale">
        <line x1="0" y1="0" x2={props.widthSVG} y2="0" stroke="black" stroke-width="2" />
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
