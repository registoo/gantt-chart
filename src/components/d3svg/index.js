import { connect } from "react-redux";
import DrawFigures from "./drawFigures";
import React, { useRef, useEffect } from "react";
import DrawScales from "./scales";
import Slider from "./slider";
import { motion } from "framer-motion";
import { setSelectedData } from "../../redux/mainReducer/action";

function Gantt(props) {
  // добавление прокрутки колёсиком
  const stateStart = props.dataSpec.dataRange.start;
  const stateFinish = props.dataSpec.dataRange.finish;
  function ee(e) {
    const wDelta = e.wheelDelta < 0 ? "down" : "up";
    switch (wDelta) {
      case "down": {
        const finish = stateFinish + 1 >= props.ids.length ? props.ids.length : stateFinish + 1;
        const start = finish - props.dataSpec.elementsOnPage;
        props.setSelectedData({ start: start, finish: finish });
        break;
      }
      case "up": {
        const start = stateStart - 1 <= 0 ? 0 : stateStart - 1;
        const finish = start + props.dataSpec.elementsOnPage;
        props.setSelectedData({ start: start, finish: finish });
        break;
      }
      default:
        break;
    }
  }
  const ref1 = useRef(null);
  useEffect(() => {
    const ref = ref1;
    ref.current.addEventListener("wheel", ee);
    return () => {
      ref.current.removeEventListener("wheel", ee);
    };
  });
  // окончание прокрутки колёсиким

  return (
    <motion.div animate={{ width: props.widthSVG }} transition={{ duration: 0.1 }}>
      <div style={{ display: "flex", flexDirection: "column" }} ref={ref1}>
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
    dataSpec: state.mainReducer.dataSpec,
    ids: state.mainReducer.ids.totalListOfID,
  };
};

export default connect(getState, { setSelectedData })(Gantt);
