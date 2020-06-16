import * as d3 from "d3";
import { brushed } from "./events.js";
import React, { useCallback } from "react";
import { keyGenerator, rowHasError } from "../../../../auxFunctions/index.js";
import { connect } from "react-redux";

const DrawBrush = (props) => {
  const id = (d) => `Rabota ${d.id} brush`;
  const x0 = 0;
  const x1 = props.widthSVG - props.marginSVG.right - props.marginSVG.left;

  const arr = [...props.data].map((d) => {
    if (rowHasError(d.data)) return <g key={keyGenerator(d.id)}></g>;

    const y0 = props.yScale(d.id);
    const y1 = y0 + props.yScale.bandwidth();
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
              brushed(node, props.xScale);
            });

          d3.select(node).call(brush);
        }
      }, []);
      return <g id={id(d)} ref={addBrush}></g>;
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
    widthSVG: state.mainReducer.sizesSVG.width,
    marginSVG: state.mainReducer.sizesSVG.margin,
    data: state.mainReducer.data,
    yScale: state.mainReducer.scales.yScale,
    xScale: state.mainReducer.scales.xScale,
  };
};

export default connect(getState)(DrawBrush);
