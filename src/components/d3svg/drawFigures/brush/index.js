import * as d3 from "d3";
import { brushed, brushEnd } from "./events.js";
import React, { useCallback } from "react";
import { keyGenerator, rowHasError } from "../../../../auxFunctions/index.js";
import { connect } from "react-redux";

const DrawBrush = (props) => {
  const id = (d) => `Rabota ${d.id} brush`;

  const arr = [...props.displayedData].map((d, index) => {
    if (props.accordionExpanded && index === 0) return;
    if (rowHasError(d.data)) return <g key={keyGenerator(d.id)}></g>;

    const brushHeight = props.accordionExpanded
      ? { y0: 0, y1: props.yScale.bandwidth() }
      : {
          y0: props.yScale.bandwidth() * (1 - props.brushHeight),
          y1: props.yScale.bandwidth() * props.brushHeight,
        };

    const x0 = 0;
    const x1 = props.widthSVG - props.marginSVG.right - props.marginSVG.left;
    const y0 = props.yScale(d.id) + brushHeight.y0;
    const y1 = y0 + brushHeight.y1;
    const brushCoordinate = [
      [x0, y0],
      [x1, y1],
    ];
    const G = () => {
      const addBrush = useCallback((node) => {
        if (node !== null) {
          const brush = d3
            .brushX()
            .extent(brushCoordinate)
            .on("brush", function () {
              brushed({
                node,
                xScale: props.xScale,
                currentChildren: d,
                lvl4BrushSelected: props.accordionExpanded ? true : false,
              });
            })
            .on("end", function () {
              brushEnd({
                currentChildren: d,
                lvl4BrushSelected: props.accordionExpanded ? true : false,
              });
            });

          d3.select(node).call(brush);
        }
      }, []);
      return <g id={id(d)} ref={addBrush}></g>;
    };

    return <G key={keyGenerator(d.id)}></G>;
  });

  return (
    <g id="gForBrushing" transform={`translate(${props.marginSVG.left},${props.marginSVG.top})`}>
      {arr}
    </g>
  );
};

const getState = (state) => {
  return {
    widthSVG: state.mainReducer.sizes.sizesSVG.width,
    marginSVG: state.mainReducer.sizes.sizesSVG.margin,
    displayedData: state.mainReducer.slicedData.displayedData,
    yScale: state.mainReducer.scales.yScale,
    xScale: state.mainReducer.scales.xScale,
    accordionExpanded: state.mainReducer.dataSpec.accordionExpanded,
  };
};

export default connect(getState)(DrawBrush);
