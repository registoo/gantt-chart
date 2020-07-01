import * as d3 from "d3";
import React, { useCallback } from "react";
import { connect } from "react-redux";

const DrawAxisX = (props) => {
  const addSomething = useCallback(
    (node) => {
      const pixelsInOneDay = props.getPixelsInOneDay(
        props.displayedStartMS,
        props.displayedFinishMS
      );

      if (node !== null) {
        const currentNode = d3.select(node);
        currentNode
          .call(
            props.xAxis
              .ticks(d3.utcDay)
              .tickFormat((d) => d3.timeFormat("%d/%m")(d))
              .tickSize(-props.heightSVG + props.marginSVG.top + props.marginSVG.bottom)
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
    },
    [props]
  );

  return (
    <g
      width={props.widthSVG}
      ref={addSomething}
      transform={`translate(${props.marginSVG.left},${props.heightSVG - props.marginSVG.bottom})`}
    ></g>
  );
};

const getState = (state) => {
  return {
    xAxis: state.mainReducer.scales.xAxis,
    widthSVG: state.mainReducer.sizesSVG.width,
    heightSVG: state.mainReducer.sizesSVG.height,
    marginSVG: state.mainReducer.sizesSVG.margin,
    displayedStartMS: state.mainReducer.scales.displayedStartMS,
    displayedFinishMS: state.mainReducer.scales.displayedFinishMS,
    getPixelsInOneDay: state.mainReducer.scales.aux.getPixelsInOneDay,
  };
};

export default connect(getState)(DrawAxisX);
