import { connect } from "react-redux";
import setBrush from "./setBrush";
import React, { useEffect } from "react";
import { changeXRange } from "../../../redux/mainReducer/action";

const Slider = (props) => {
  useEffect(() => {
    setBrush(props);
  });
  return (
    <svg
      id="slider"
      width="100%"
      height={`${props.height}px`}
      transform={`translate(${props.marginSVG.left},${props.marginSVG.top})`}
    >
      <g id={"gForSlider"}></g>
    </svg>
  );
};

const getState = (state) => {
  return {
    marginSVG: state.mainReducer.sizesSVG.margin,
    widthSVG: state.mainReducer.sizesSVG.width,
    xScale: state.mainReducer.scales.xScale,
    projectStartMS: state.mainReducer.scales.projectStartMS,
    projectFinishMS: state.mainReducer.scales.projectFinishMS,
    getPixelsInOneDay: state.mainReducer.scales.aux.getPixelsInOneDay,
    height: state.mainReducer.sizesSVG.slider.height,
  };
};

export default connect(getState, { changeXRange })(Slider);
