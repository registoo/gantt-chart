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
      style={{ marginLeft: props.leftMenuSizes.width + props.leftMenuSizes.margin.right }}
    >
      <g id={"gForSlider"}></g>
    </svg>
  );
};

const getState = (state) => {
  return {
    marginSVG: state.mainReducer.sizes.sizesSVG.margin,
    widthSVG: state.mainReducer.sizes.sizesSVG.width,
    height: state.mainReducer.sizes.sizesSVG.slider.height,
    xScale: state.mainReducer.scales.xScale,
    selectedStartMS: state.mainReducer.scales.selectedStartMS,
    selectedFinishMS: state.mainReducer.scales.selectedFinishMS,
    getPixelsInOneDay: state.mainReducer.scales.aux.getPixelsInOneDay,
    selectedIds: state.mainReducer.ids.selectedIds,
    leftMenuSizes: state.mainReducer.sizes.sizesLeftMenu,
  };
};

export default connect(getState, { changeXRange })(Slider);
