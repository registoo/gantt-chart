import { connect } from "react-redux";
import DrawFigures from "./drawFigures";
import React, { useRef, useEffect, useState } from "react";
import DrawScales from "./scales";
import Slider from "./slider";
import { setWheeledData } from "../../redux/mainReducer/action";
import { rowHasError } from "../../auxFunctions";

function Gantt(props) {
  const ref1 = useRef(null);
  // добавление прокрутки колёсиком
  const [state, setState] = useState({ start: 0, finish: props.dataSpec.maxElementsOnPage });
  function onWheel(e) {
    const wDelta = e.wheelDelta < 0 ? "down" : "up";
    switch (wDelta) {
      case "down": {
        if (state.finish + 1 > props.selectedIds.length) {
          return;
        }
        const finish = state.finish + 1;
        const start = finish - props.dataSpec.currentElementsOnPage;
        const dataDisplayed = props.selectedData.slice(start, finish);
        const displayedIds = dataDisplayed.map((d) =>
          rowHasError(d.data) ? d.data.isError.formattedText : d.data.jobName.formattedText
        );
        setState({ start: start, finish: finish });
        props.setWheeledData({
          displayedIds: displayedIds,
          dataDisplayed: dataDisplayed,
          dataRange: { start: start, finish: finish },
        });
        break;
      }
      case "up": {
        if (state.start - 1 < 0) {
          return;
        }
        const start = state.start - 1;
        const finish = start + props.dataSpec.currentElementsOnPage;
        const dataDisplayed = props.selectedData.slice(start, finish);
        const displayedIds = dataDisplayed.map((d) =>
          rowHasError(d.data) ? d.data.isError.formattedText : d.data.jobName.formattedText
        );
        setState({ start: start, finish: finish });
        props.setWheeledData({
          displayedIds: displayedIds,
          dataDisplayed: dataDisplayed,
          dataRange: { start: start, finish: finish },
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
    <div style={{ display: "flex", flexDirection: "column", width: props.widthSVG }} ref={ref1}>
      <Slider />
      <svg width="100%" height={props.heightSVG} id="chart">
        <DrawScales />
        <DrawFigures />
      </svg>
    </div>
  );
}
const getState = (state) => {
  return {
    heightSVG: state.mainReducer.sizesSVG.height,
    widthSVG: state.mainReducer.sizesSVG.width,
    dataSpec: state.mainReducer.dataSpec,
    selectedIds: state.mainReducer.ids.selectedIds,
    selectedData: state.mainReducer.slicedData.selectedData,
  };
};

export default connect(getState, { setWheeledData })(Gantt);
