import { connect } from "react-redux";
import setBrush from "./setBrush";
import React, { useEffect } from "react";
import { changeXRange } from "../../../redux/mainReducer/action";

const Slider = (props) => {
  useEffect(() => {
    setBrush({ changeXRange: props.changeXRange, scales: props.scales, sizesSVG: props.sizesSVG });
  });
  return (
    <svg
      id="slider"
      width="100%"
      height="50px"
      transform={`translate(${props.sizesSVG.margin.left},${props.sizesSVG.margin.top})`}
    >
      <g id={"gForSlider"}></g>
    </svg>
  );
};

const getState = (state) => {
  return { sizesSVG: state.mainReducer.sizesSVG, scales: state.mainReducer.scales };
};

export default connect(getState, { changeXRange })(Slider);
