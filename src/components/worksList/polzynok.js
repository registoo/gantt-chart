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
          height: `${(props.start / (props.dataLength - props.elementsOnPage)) * 100}%`,
        }}
      ></div>
    </div>
  );
};

const getState = (state) => {
  return {
    dataLength: state.mainReducer.ids.totalListOfID.length,
    start: state.mainReducer.dataSpec.dataRange.start,
    elementsOnPage: state.mainReducer.dataSpec.elementsOnPage,
  };
};

export default connect(getState)(Polzynok);
