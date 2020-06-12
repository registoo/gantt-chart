import * as d3 from "d3";
import React, { useCallback } from "react";

export default function (props) {
  const addSomething = useCallback((node) => {
    const pixelsInOneDay = props.scales.aux.getPixelsInOneDay(
      props.scales.domainXStartMS,
      props.scales.domainXFinishMS
    );

    if (node !== null) {
      const currentNode = d3.select(node);
      currentNode
        .call(
          props.scales.xAxis
            .ticks(d3.utcDay)
            .tickFormat((d) => d3.timeFormat("%d/%m")(d))
            .tickSize(
              -props.sizesSVG.height + props.sizesSVG.margin.top + props.sizesSVG.margin.bottom
            )
        )
        .call((g) => {
          g.selectAll(".tick text")
            .attr("font-size", "0.4rem")
            .attr("x", pixelsInOneDay / 2);
        })
        .call((g) => {
          g.selectAll(".tick text").attr("display", "block");
        })
        .call((g) => {
          g.selectAll(".tick:last-of-type text").attr("display", "none");
        });
      // .call((g) => {
      //   g.selectAll(".tick:not(:last-of-type) line, :not(:first-of-type) line").attr(
      //     "stroke-width",
      //     "5"
      //   );
      // })
    }
  });

  return (
    <g
      width={props.sizesSVG.width}
      ref={addSomething}
      transform={`translate(${props.sizesSVG.margin.left},${
        props.sizesSVG.height - props.sizesSVG.margin.bottom
      })`}
    ></g>
  );
}
