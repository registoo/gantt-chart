import { connect } from "react-redux";
import DrawFigures from "./drawFigures";
import React from "react";
import DrawScales from "./scales";
import Slider from "./slider";
import { motion } from "framer-motion";

function Gantt(props) {
  return (
    <motion.div style={{ width: props.sizesSVG.width }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Slider />
        <svg width="100%" height={props.sizesSVG.height} id="chart">
          <DrawScales />
          <DrawFigures />
        </svg>
      </div>
    </motion.div>
  );
}
const getState = (state) => {
  return {
    sizesSVG: state.mainReducer.sizesSVG,
  };
};

export default connect(getState)(Gantt);
