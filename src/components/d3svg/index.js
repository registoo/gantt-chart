import { connect } from "react-redux";
import { useEffect, Fragment } from "react";
import DrawFigures from "./drawFigures";
import React, { useCallback } from "react";
import DrawScales from "./scales";
import Slider from "./slider";

function Gantt(props) {
  const measuredRef = useCallback(
    (node) => {
      if (node !== null) {
        console.log("width:", node.getBoundingClientRect().width);
      }
    },
    [props.sizesSVG.width]
  );

  useEffect(() => {
    console.log("d3 PROPS: ", props);
  });

  return (
    <Fragment>
      <Slider {...props}></Slider>
      <svg width={props.sizesSVG.width} height={props.sizesSVG.height} id="chart" ref={measuredRef}>
        <DrawScales scales={props.scales} sizesSVG={props.sizesSVG} listID={props.listID} />
        <DrawFigures
          data={props.data}
          xScale={props.scales.xScale}
          yScale={props.scales.yScale}
          sizesSVG={props.sizesSVG}
        />
      </svg>
    </Fragment>
  );
}
const getState = (state) => {
  return state.mainReducer;
};

export default connect(getState)(Gantt);
