import * as d3 from "d3";
import { brushed } from "./events.js";
import React, { Fragment, useCallback } from "react";
import { keyGenerator, rowHasError } from "../../../../auxFunctions/index.js";

export default function (props) {
  const id = (d) => `Rabota ${d.id} brush`;
  const x0 = 0;
  const x1 = props.sizesSVG.width - props.sizesSVG.margin.right - props.sizesSVG.margin.left;

  const arr = [...props.data].map((d) => {
    if (rowHasError(d.data)) return <g key={keyGenerator(d.id)}></g>;

    const y0 = props.yScale(d.id);
    const y1 = y0 + props.yScale.bandwidth();
    const brushCoordinate = [
      [x0, y0],
      [x1, y1],
    ];

    const addBrush = useCallback(
      (node) => {
        if (node !== null) {
          const brush = d3
            .brushX()
            .extent(brushCoordinate)
            .on("brush", function () {
              brushed(node, props.xScale);
            });

          d3.select(node).call(brush);
        }
      },
      [brushCoordinate]
    );

    return <g id={id(d)} ref={addBrush} key={keyGenerator(d.id)}></g>;
  });

  return <Fragment>{arr}</Fragment>;
}
