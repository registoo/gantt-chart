import { connect } from "react-redux";
import DrawFigures from "./drawFigures";
import React, { useRef, useEffect, useState, Fragment } from "react";
import DrawScales from "./scales";
import { setWheeledData } from "../../redux/mainReducer/action";
import { rowHasError } from "../../auxFunctions";

function Gantt(props) {
  const ref1 = useRef(null);
  // добавление прокрутки колёсиком
  const [state, setState] = useState({ start: 0, finish: props.dataSpec.maxElementsOnPage });
  function onWheel(e) {
    e.preventDefault();
    const wDelta = e.wheelDelta < 0 ? "down" : "up";
    switch (wDelta) {
      case "down": {
        if (state.finish + 1 > props.selectedIds.length) {
          return;
        }
        const finish = state.finish + 1;
        const start = finish - props.dataSpec.currentElementsOnPage;
        const displayedData = props.selectedData.slice(start, finish);
        const displayedIds = displayedData.map((d) =>
          rowHasError(d.data) ? d.data.isError.formattedText : d.id
        );
        setState({ start: start, finish: finish });
        props.setWheeledData({
          displayedIds: displayedIds,
          displayedData: displayedData,
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
        const displayedData = props.selectedData.slice(start, finish);
        const displayedIds = displayedData.map((d) =>
          rowHasError(d.data) ? d.data.isError.formattedText : d.id
        );
        setState({ start: start, finish: finish });
        props.setWheeledData({
          displayedIds: displayedIds,
          displayedData: displayedData,
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
  const data = () => {
    if (props.selectedIds.length === 0 || !props.displayedStartMS || !props.displayedFinishMS) {
      return (
        <svg width="100%" height="100%" id="chart">
          <text y="20" fontFamily="sans-serif" fontSize="20px" fill="red">
            Ничего не найдено
          </text>
        </svg>
      );
    } else {
      return (
        <Fragment>
          <div style={{ minHeight: props.sliderHeight, backgroundColor: "yellow" }}></div>
          <svg width="100%" height={props.heightSVG} id="chart">
            <DrawScales />
            <DrawFigures />
          </svg>
        </Fragment>
      );
    }
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", width: props.widthSVG }} ref={ref1}>
      {data()}
    </div>
  );
}
const getState = (state) => {
  return {
    heightSVG: state.mainReducer.sizes.sizesSVG.height,
    widthSVG: state.mainReducer.sizes.sizesSVG.width,
    dataSpec: state.mainReducer.dataSpec,
    selectedIds: state.mainReducer.ids.selectedIds,
    selectedData: state.mainReducer.slicedData.selectedData,
    displayedStartMS: state.mainReducer.scales.displayedStartMS,
    displayedFinishMS: state.mainReducer.scales.displayedFinishMS,
    sliderHeight: state.mainReducer.sizes.sizesSVG.slider.height,
  };
};

export default connect(getState, { setWheeledData })(Gantt);
