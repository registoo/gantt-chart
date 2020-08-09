import { connect } from "react-redux";
import setBrush from "./setBrush";
import React, { useEffect } from "react";
import { changeXRange } from "../../../redux/mainReducer/action";

const Slider = (props) => {
  useEffect(() => {
    setBrush(props);
  });
  return (
    <svg id="slider" width="100%" height={`${props.height}px`}>
      <g id={"gForSlider"}></g>
    </svg>
  );
};

const getState = (state) => {
  return {
    widthSVG: state.mainReducer.sizes.mainResizer.width,
    height: state.mainReducer.sizes.sizesSVG.slider.height,
    xScale: state.mainReducer.scales.xScale,
    selectedStartMS: state.mainReducer.scales.selectedStartMS,
    selectedFinishMS: state.mainReducer.scales.selectedFinishMS,
    leftMenuSizes: state.mainReducer.sizes.sizesLeftMenu,
  };
};

export default connect(getState, { changeXRange })(Slider);
