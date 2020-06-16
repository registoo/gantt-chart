import { connect } from "react-redux";
import DrawFigures from "./drawFigures";
import React from "react";
import DrawScales from "./scales";
import Slider from "./slider";
import { motion } from "framer-motion";

function Gantt(props) {
  return (
    <motion.div style={{ width: props.widthSVG }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Slider />
        <svg width="100%" height={props.heightSVG} id="chart">
          <DrawScales />
          <DrawFigures />
        </svg>
      </div>
    </motion.div>
  );
}
const getState = (state) => {
  return {
    heightSVG: state.mainReducer.sizesSVG.height,
    widthSVG: state.mainReducer.sizesSVG.width,
  };
};

export default connect(getState)(Gantt);
