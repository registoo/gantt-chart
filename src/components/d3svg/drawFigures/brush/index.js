import * as d3 from "d3";
import { brushed, brushEnd } from "./events.js";
import React, { useCallback, useEffect } from "react";
import { keyGenerator, rowHasError } from "../../../../auxFunctions/index.js";
import { connect } from "react-redux";
import { lvl4ConfirmEnter } from "../../../../redux/mainReducer/action.js";

const DrawBrush = (props) => {
  useEffect(() => {
    const listener = (e) => {
      if (e && e.keyCode === 13 && props.lvl4scheduleEdit && props.accordionExpanded) {
        props.lvl4ConfirmEnter();
      }
    };
    document.body.addEventListener("keydown", listener);
    return () => document.body.removeEventListener("keydown", listener);
  });

  const id = (d) => `Rabota ${d.id} brush`;

  const arr = [...props.hierarchyDisplayedData].map(function (d0, index) {
    const d = d0.data;
    if (props.accordionExpanded && index === 0) return null;
    if (rowHasError(d.data)) return <g key={keyGenerator(d.id)}></g>;

    const brushHeight = props.accordionExpanded
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
      const addBrush = useCallback((node) => {
        if (node !== null) {
          const brush = d3
            .brushX()
            .extent(brushCoordinate)
            .on("brush", function () {
              return brushed({
                node,
                xScale: props.xScale,
                currentChildren: d,
                accordionExpanded: props.accordionExpanded ? true : false,
              });
            })
            .on("end", function () {
              brushEnd({
                currentChildren: d,
                accordionExpanded: props.accordionExpanded ? true : false,
              });
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
