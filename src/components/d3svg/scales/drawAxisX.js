import * as d3 from "d3";
import React, { useCallback } from "react";
import { connect } from "react-redux";
import convertLength from "to-px";

const DrawAxisX = (props) => {
  const addSomething = useCallback(
    (node) => {
      if (node !== null) {
        const pixelsInOneDay = props.getPixelsInOneDay(props.widthSVG, props.xScale);
        const currentNode = d3.select(node);
        currentNode
          .call(
            props.xAxis
              .ticks(pixelsInOneDay < convertLength("1ch") * 2.5 ? d3.utcWeek : d3.utcDay)
              .tickSize(-props.heightSVG + props.marginSVG.top + props.marginSVG.bottom)
          )
          .call((g) => {
            g.selectAll(".tick text").attr("display", "none");
          });
        // .call((g) => {
        //   g.selectAll(".tick text").attr("display", "block");
        // });
        // .call((g) => {
        //   g.selectAll(".tick:last-of-type text").attr("display", "none");
        // });
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
    xScale: state.mainReducer.scales.xScale,
    widthSVG: state.mainReducer.sizes.sizesSVG.width,
    heightSVG: state.mainReducer.sizes.sizesSVG.height,
    marginSVG: state.mainReducer.sizes.sizesSVG.margin,
    displayedStartMS: state.mainReducer.scales.displayedStartMS,
    displayedFinishMS: state.mainReducer.scales.displayedFinishMS,
    getPixelsInOneDay: state.mainReducer.scales.aux.getPixelsInOneDay,
  };
};

export default connect(getState)(DrawAxisX);
