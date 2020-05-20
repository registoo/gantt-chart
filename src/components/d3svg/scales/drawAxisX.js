import * as d3 from "d3";
import React, { useCallback } from "react";
import moment from "moment";

export default function (props) {
  const addSomething = useCallback((node) => {
    const pixelsInOneDay =
      props.sizesSVG.width /
      moment
        .duration(
          moment.utc(props.scales.domainXFinishMS).diff(moment.utc(props.scales.domainXStartMS))
        )
        .as("d");

    if (node !== null) {
      const currentNode = d3.select(node);
      currentNode.call(
        props.scales.xAxis
          .ticks(d3.utcDay)
          .tickFormat((d) => d3.timeFormat("%d/%m")(d))
          .tickSize(
            -props.sizesSVG.height + props.sizesSVG.margin.top + props.sizesSVG.margin.bottom
          )
      );
      currentNode.call((g) => {
        g.selectAll(".tick text")
          .attr("font-size", "0.4rem")
          .style("opacity", 0.5)
          .attr("x", pixelsInOneDay / 2);
      });
      currentNode.call((g) => {
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
