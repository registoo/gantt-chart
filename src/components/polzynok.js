import React from "react";
import { connect } from "react-redux";

const Polzynok = (props) => {
  return (
    <div
      style={{
        backgroundColor: "lightgreen",
        display: "flex",
        flexDirection: "column",
        minWidth: 10,
      }}
    >
      <div
        style={{
          backgroundColor: "green",
          height: `${(props.start / (props.dataLength - props.currentElementsOnPage)) * 100}%`,
        }}
      ></div>
    </div>
  );
};

const getState = (state) => {
  return {
    dataLength: state.mainReducer.ids.selectedIds.length,
    start: state.mainReducer.dataSpec.dataRange.start,
    currentElementsOnPage: state.mainReducer.dataSpec.currentElementsOnPage,
  };
};

export default connect(getState)(Polzynok);
