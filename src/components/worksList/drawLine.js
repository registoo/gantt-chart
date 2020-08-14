import React from "react";
import keyGenerator from "../../auxFunctions/keyGenerator";
import rowHasError from "../../auxFunctions/rowHasError";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import IconButton from "@material-ui/core/IconButton";

export default (d, ind, yScale, columns, boxWidth, setRolledUp, freezedData) => {
  const data = d.data.data;
  const rolledUp = data.rolledUp;
  const columnsDataAtRow = columns.map((el, i) => {
    const key = Object.keys(el)[0];
    const result = rowHasError(data)
      ? i === 0
        ? data.isError.formattedText
        : null
      : data[key]
      ? data[key].cellType
        ? data[key].formattedText
        : data[key]
      : data[key];
    return result;
  });

  const div = () => {
    if (d.depth > 1 || rowHasError(data)) return null;
    return (
      <div
        onClick={() => {
          setRolledUp(!rolledUp, d, freezedData);
        }}
      >
        {rolledUp ? (
          <IconButton size="small">
            <ArrowRightIcon fontSize="inherit" />
          </IconButton>
        ) : (
          <IconButton size="small">
            <ArrowDropDownIcon fontSize="inherit" />
          </IconButton>
        )}
      </div>
    );
  };

  const rowCol = columnsDataAtRow.map((col, i) => {
    return (
      <g key={keyGenerator()}>
        <foreignObject
          x={0}
          y={Math.round(yScale.paddingOuter() * yScale.step() + yScale.step() * ind)}
          height={yScale.bandwidth()}
          width={30}
          stroke={"red"}
          fill={"yellow"}
        >
          {div()}
        </foreignObject>
        <rect
          key={keyGenerator()}
          x={30 + i * 125}
          y={Math.round(yScale.paddingOuter() * yScale.step() + yScale.step() * ind)}
          height={yScale.bandwidth()}
          width={100}
          stroke={"red"}
          fillOpacity={"0"}
        ></rect>
        <foreignObject
          x={30 + i * 125}
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
