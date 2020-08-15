import React from "react";
import { connect } from "react-redux";
import App from "./App";
import { initializeState } from "./redux/mainReducer/action.js";

const Init = (props) => {
  if (!props.scales) {
    props.initializeState(props.fullData, props.fullIds);
    return <div />;
  }
  return <App />;
};

const getState = (state) => {
  return {
    writeData: true,
    fullData: state.fullDataReducer.fullData,
    fullIds: state.fullDataReducer.fullIds,
    scales: state.mainReducer.scales ? state.mainReducer.scales : undefined,
  };
};
export default connect(getState, { initializeState })(Init);
