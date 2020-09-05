import * as d3 from "d3";
import { brushed, brushEnd } from "./events.js";
import React, { useCallback, useEffect, useRef } from "react";
import { keyGenerator, rowHasError } from "../../../../auxFunctions/index.js";
import { connect } from "react-redux";
import { lvl4ConfirmEnter } from "../../../../redux/mainReducer/action.js";

const DrawBrush = (props) => {
  const id = (d) => `Rabota ${d.id} brush`;

  const arr = [...props.hierarchyDisplayedData].map(function (d0, index) {
    const d = d0.data;
    if (props.accordionExpanded.expanded && index === 0) return null;
    if (rowHasError(d.data)) return <g key={keyGenerator(d.id)}></g>;

    const brushHeight = props.accordionExpanded.expanded
      ? { y0: 0, y1: props.yScale.bandwidth() }
      : {
          y0: props.yScale.bandwidth() * (1 - props.brushHeight),
          y1: props.yScale.bandwidth() * props.brushHeight,
        };

    const x0 = 0;
    const x1 = props.widthSVG - props.marginSVG.right - props.marginSVG.left;
    const y0 = props.yScale(d.id) + brushHeight.y0;
    const y1 = y0 + brushHeight.y1;
    const brushCoordinate = [
      [x0, y0],
      [x1, y1],
    ];
    const G = () => {
      // mainRefData[0] - массив координат
      // mainRefData[1] - d0 (иерархичный чилдрен)
      const mainRefData = useRef(null);
      // aux[0] - node, на которую сажается brush (для сброса brush)
      // aux[0] - d3.event.target (для сброса brush)
      const aux = useRef(null);

      // обработка нажатия enter и добавление данных
      useEffect(() => {
        const listener = (e) => {
          if (
            mainRefData.current &&
            mainRefData.current[0] &&
            props.lvl4scheduleEdit &&
            props.accordionExpanded.expanded
          )
            switch (e.keyCode) {
              // обработка нажатия Enter
              case 13: {
                const brushedArr = mainRefData.current[0];
                const currentChildren = mainRefData.current[1];
                // добавляем в данные новые данные
                if (currentChildren.data.data.brushedData.length === 0) {
                  currentChildren.data.data.brushedData = brushedArr;
                } else {
                  currentChildren.data.data.brushedData = brushedArr.reduce((acc, el) => {
                    const curEl = Object.keys(el)[0];
                    const i = currentChildren.data.data.brushedData.findIndex(
                      (el) => Object.keys(el)[0] === curEl
                    );
                    if (i === -1) {
                      acc.push(el);
                      return acc;
                    }
                    return acc;
                  }, currentChildren.data.data.brushedData);
                }
                const parent = currentChildren.ancestors()[1];
                props.lvl4ConfirmEnter(parent);
                if (aux && aux.current[0]) d3.select(aux.current[0]).call(aux.current[1].clear);
                break;
              }
              // обработка нажатия del и удаление данных
              case 46: {
                const brushedArr = mainRefData.current[0];
                const currentChildren = mainRefData.current[1];
                // удаляем выбранные брашем данные
                brushedArr.map((brushedEl) => {
                  currentChildren.data.data.brushedData = currentChildren.data.data.brushedData.reduce(
                    (acc, dataEl) => {
                      const brushedElKey = Object.keys(brushedEl)[0];
                      const dataElKey = Object.keys(dataEl)[0];
                      if (brushedElKey === dataElKey) {
                        return acc;
                      } else {
                        acc.push(dataEl);
                        return acc;
                      }
                    },
                    []
                  );
                  return brushedEl;
                });
                const parent = currentChildren.ancestors()[1];
                props.lvl4ConfirmEnter(parent);
                if (aux && aux.current[0]) d3.select(aux.current[0]).call(aux.current[1].clear);
                break;
              }
              // обработка нажатия Escape
              case 27: {
                console.log("Escape", mainRefData.current[0]);
                return;
              }
              // обработка нажатия Backspace
              case 8: {
                const brushedArr = mainRefData.current[0];
                const currentChildren = mainRefData.current[1];
                brushedArr.map((brushedEl) => {
                  currentChildren.data.data.brushedData = currentChildren.data.data.brushedData.reduce(
                    (acc, dataEl) => {
                      const brushedElKey = Object.keys(brushedEl)[0];
                      const dataElKey = Object.keys(dataEl)[0];
                      if (brushedElKey === dataElKey) {
                        // удаление крайнего правого символа
                        dataEl[dataElKey].data = dataEl[dataElKey].data.slice(0, -1);
                        acc.push(dataEl);
                        return acc;
                      } else {
                        acc.push(dataEl);
                        return acc;
                      }
                    },
                    []
                  );
                  return brushedEl;
                });
                const parent = currentChildren.ancestors()[1];
                props.lvl4ConfirmEnter(parent);
                break;
              }
              default:
                break;
            }
        };
        document.body.addEventListener("keydown", listener);
        return () => document.body.removeEventListener("keydown", listener);
      }, [mainRefData]);

      // обработка нажатия цифры
      useEffect(() => {
        const listener = (e) => {
          const key = Number(e.key);
          if (isNaN(key) || e.key === null || e.key === " ") {
            return;
          }
          if (
            mainRefData.current &&
            mainRefData.current[0] &&
            props.lvl4scheduleEdit &&
            props.accordionExpanded.expanded
          ) {
            const currentChildren = mainRefData.current[1];
            mainRefData.current[0].map((brushedEl) => {
              const brushedElKey = Object.keys(brushedEl)[0];
              currentChildren.data.data.brushedData = currentChildren.data.data.brushedData.map(
                (dataEl) => {
                  const dataElKey = Object.keys(dataEl)[0];
                  if (brushedElKey === dataElKey) {
                    // добавление цифры
                    const numbers = dataEl[Object.keys(dataEl)[0]].data;
                    dataEl[Object.keys(dataEl)[0]].data = numbers
                      ? numbers + key.toString()
                      : key.toString();
                  }
                  return dataEl;
                }
              );
              return brushedEl;
            });
            const parent = currentChildren.ancestors()[1];
            props.lvl4ConfirmEnter(parent);
          }
        };
        document.body.addEventListener("keydown", listener);
        return () => document.body.removeEventListener("keydown", listener);
      }, [mainRefData]);

      const addBrush = useCallback((node) => {
        if (node !== null) {
          const brush = d3
            .brushX()
            .extent(brushCoordinate)
            .on("brush", function () {
              const getBrushed = brushed({
                node,
                xScale: props.xScale,
                currentChildren: d,
                accordionExpanded: props.accordionExpanded.expanded ? true : false,
              });
              mainRefData.current = [getBrushed, d0];
              aux.current = [node, d3.event.target];
            })
            .on("end", function () {
              if (brushEnd()) {
                mainRefData.current = [null, d0];
              }
            });
          d3.select(node).call(brush);
        }
      }, []);
      return <g id={id(d)} ref={props.lvl4scheduleEdit ? addBrush : null}></g>;
    };

    return <G key={keyGenerator(d.id)}></G>;
  });

  return (
    <g id="gForBrushing" transform={`translate(${props.marginSVG.left},${props.marginSVG.top})`}>
      {arr}
    </g>
  );
};

const getState = (state) => {
  return {
    widthSVG: state.mainReducer.sizes.sizesSVG.width,
    marginSVG: state.mainReducer.sizes.sizesSVG.margin,
    hierarchyDisplayedData: state.mainReducer.slicedData.hierarchyDisplayedData,
    yScale: state.mainReducer.scales.yScale,
    xScale: state.mainReducer.scales.xScale,
    accordionExpanded: state.mainReducer.dataSpec.accordionExpanded,
    lvl4scheduleEdit: state.mainReducer.dataSpec.lvl4scheduleEdit,
  };
};

export default connect(getState, { lvl4ConfirmEnter })(DrawBrush);
