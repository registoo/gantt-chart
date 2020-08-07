import React from "react";
import * as d3 from "d3";
import { connect } from "react-redux";
import drawLine from "./drawLine.js";

const F = (props) => {
  const addText = (props) => {
    let i = 0;
    const root = d3.hierarchy(props.displayedDataRoot).eachBefore((d) => {
      return (d.index = i++);
    });
    const nodes = root.children;
    const n = nodes.map((d, i) => {
      return drawLine(d, i, props.yScale);
    });
    return n;
  };
  return (
    <div
      style={{
        marginTop: props.ganttTopScaleHeight * 2,
        overflowX: "scroll",
        overflowY: "hidden",
        flexGrow: 1,
        flexShrink: 1,
        minWidth: 0,
        width: 0,
      }}
    >
      <svg
        style={{
          width: "100%",
          height: props.SVGHeight,
          minWidth: 500,
        }}
      >
        <g>{addText(props)}</g>
      </svg>
    </div>
  );
};

const getState = (state) => {
  return {
    displayedDataRoot: {
      name: "displayedData",
      children: state.mainReducer.slicedData.displayedData,
    },
    displayedData: state.mainReducer.slicedData.displayedData,
    ganttTopScaleHeight: state.mainReducer.sizes.sizesSVG.ganttTopScale.height,
    yScale: state.mainReducer.scales.yScale,
    SVGHeight: state.mainReducer.sizes.sizesSVG.height,
  };
};

export default connect(getState)(F);
