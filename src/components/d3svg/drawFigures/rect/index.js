import { keyGenerator, rowHasError } from "../../../../auxFunctions/index.js";
import React, { Fragment } from "react";

export default function (props) {
  const x = (d) => props.xScale(d.start.dateInMillisecons);
  const y = (d) =>
    rowHasError(d) ? props.yScale(d.isError.formattedText) : props.yScale(d.jobName.formattedText);
  const height = (d) => props.yScale.bandwidth();
  const width = (d) =>
    props.xScale(d.start.dateInMillisecons + (d.duration * 86400000 - 1)) -
    props.xScale(d.start.dateInMillisecons);
  const id = (d) => `Rabota ${d.id} rect`;

  const arr = [...props.data].map((d) => {
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

  return <Fragment>{arr}</Fragment>;
}
