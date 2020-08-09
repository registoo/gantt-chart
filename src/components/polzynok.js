import React from "react";
import { connect } from "react-redux";

const Polzynok = (props) => {
  const scrollBarHeight = (props.maxElementsOnPage / props.dataLength) * 100;
  const moveWheel =
    props.start === 0
      ? 0
      : ((100 - scrollBarHeight) / (props.dataLength - props.maxElementsOnPage)) * props.start;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        order: 1,
        marginLeft: props.polzynok.margin.left,
      }}
    >
      {/* скрывает ползунок, если длина данных меньше maxElementsOnPage */}

      <div
        style={{
          backgroundColor: "#eff0f1",
          borderRadius: "3px",
          minWidth: props.polzynok.width,
          height: "100%",
        }}
      >
        {props.dataLength > props.maxElementsOnPage && (
          <div
            style={{
              backgroundColor: "#c0c6cc",
              borderRadius: "3px",
              position: "relative",
              top: `${moveWheel <= 0 ? 0 : moveWheel > 100 ? 100 : moveWheel}%`,
              height: `${scrollBarHeight}%`,
            }}
          ></div>
        )}
      </div>
    </div>
  );
};

const getState = (state) => {
  return {
    dataLength: state.mainReducer.ids.hierarchySelectedIds.length,
    start: state.mainReducer.dataSpec.dataRange.start,
    currentElementsOnPage: state.mainReducer.dataSpec.currentElementsOnPage,
    maxElementsOnPage: state.mainReducer.dataSpec.maxElementsOnPage,
    polzynok: state.mainReducer.sizes.polzynok,
  };
};

export default connect(getState)(Polzynok);
