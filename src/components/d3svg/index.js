import { connect } from "react-redux";
import DrawFigures from "./drawFigures";
import React, { useRef, useEffect, useState } from "react";
import DrawScales from "./scales";
import Slider from "./slider";
import { motion } from "framer-motion";
import { setDisplayedData } from "../../redux/mainReducer/action";
import { rowHasError } from "../../auxFunctions";

function Gantt(props) {
  const ref1 = useRef(null);
  // добавление прокрутки колёсиком
  const [state, setState] = useState({ start: 0, finish: props.dataSpec.elementsOnPage });
  function onWheel(e) {
    const wDelta = e.wheelDelta < 0 ? "down" : "up";
    switch (wDelta) {
      case "down": {
        const finish = state.finish + 1 >= props.ids.length ? props.ids.length : state.finish + 1;
        const start = finish - props.dataSpec.elementsOnPage;
        const dataDisplayed1 = props.data.slice(start, finish);
        const listIdDisplayed1 = dataDisplayed1.map((d) =>
          rowHasError(d.data) ? d.data.isError.formattedText : d.data.jobName.formattedText
        );
        setState({ start, finish });
        props.setDisplayedData({
          listIdDisplayed: listIdDisplayed1,
          dataDisplayed: dataDisplayed1,
          dataRange: { start, finish },
        });
        break;
      }
      case "up": {
        const start = state.start - 1 <= 0 ? 0 : state.start - 1;
        const finish = start + props.dataSpec.elementsOnPage;
        const dataDisplayed2 = props.data.slice(start, finish);
        const listIdDisplayed2 = dataDisplayed2.map((d) =>
          rowHasError(d.data) ? d.data.isError.formattedText : d.data.jobName.formattedText
        );
        setState({ start, finish });
        props.setDisplayedData({
          listIdDisplayed: listIdDisplayed2,
          dataDisplayed: dataDisplayed2,
          dataRange: { start, finish },
        });
        break;
      }
      default:
        break;
    }
  }
  useEffect(() => {
    if (props.dataSpec.wheeled) {
      const ref = ref1;
      ref.current.addEventListener("wheel", onWheel);
      return () => {
        ref.current.removeEventListener("wheel", onWheel);
      };
    }
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
    data: state.mainReducer.data,
  };
};

export default connect(getState, { setDisplayedData })(Gantt);
