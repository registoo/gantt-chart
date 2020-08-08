import React from "react";
import keyGenerator from "../../auxFunctions/keyGenerator";
import rowHasError from "../../auxFunctions/rowHasError";

export default (d, ind, yScale, columns) => {
  const data = d.data.data;
  const columnsDataAtRow = columns.map((el, i) => {
    const key = Object.keys(el)[0];
    return rowHasError(data)
      ? i === 0
        ? data.isError.formattedText
        : null
      : data[key]
      ? data[key].formattedText
        ? data[key].formattedText
        : data[key]
      : data[key];
  });

  const rowCol = columnsDataAtRow.map((col, i) => {
    return (
      <g key={keyGenerator()}>
        <rect
          key={keyGenerator()}
          x={i * 125}
          y={Math.round(yScale.paddingOuter() * yScale.step() + yScale.step() * ind)}
          height={yScale.bandwidth()}
          width={100}
          stroke={"red"}
          fillOpacity={"0"}
        ></rect>
        <foreignObject
          x={i * 125}
          y={Math.round(yScale.paddingOuter() * yScale.step() + yScale.step() * ind)}
          height={yScale.bandwidth()}
          width={100}
          stroke={"red"}
          fillOpacity={"0"}
        >
          <div>{col}</div>
        </foreignObject>
      </g>
    );
  });

  return <g key={keyGenerator()}>{rowCol}</g>;
};
