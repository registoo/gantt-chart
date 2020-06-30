import { keyGenerator, rowHasError } from "../../../../auxFunctions/index.js";
import React from "react";
import { connect } from "react-redux";

const DrawRect = (props) => {
  const x = (d) => props.xScale(d.start.dateInMillisecons);
  const y = (d) =>
    rowHasError(d) ? props.yScale(d.isError.formattedText) : props.yScale(d.jobName.formattedText);
  const height = (d) => props.yScale.bandwidth();
  const width = (d) =>
    props.xScale(d.start.dateInMillisecons + (d.duration * 86400000 - 1)) -
    props.xScale(d.start.dateInMillisecons);
  const id = (d) => `Rabota ${d.id} rect`;

  const arr = [...props.dataDisplayed].map((d) => {
    if (rowHasError(d.data)) return <rect y={y(d.data)} key={keyGenerator(d.id)}></rect>;
    return (
      <rect
        key={keyGenerator(d.id)}
        x={x(d.data)}
        y={y(d.data)}
        height={height(d.data)}
        width={width(d.data)}
        id={id(d.data)}
      ></rect>
    );
  });

  return (
    <g id="gForRects" transform={`translate(${props.marginSVG.left},${props.marginSVG.top})`}>
      {arr}
    </g>
  );
};

const getState = (state) => {
  return {
    xScale: state.mainReducer.scales.xScale,
    yScale: state.mainReducer.scales.yScale,
    dataDisplayed: state.mainReducer.slicedData.dataDisplayed,
    marginSVG: state.mainReducer.sizesSVG.margin,
  };
};

export default connect(getState)(DrawRect);
