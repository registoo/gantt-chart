import React from "react";
import { connect } from "react-redux";
import Table from "./table";
import Polzynok from "./polzynok.js";

const WorksList = (props) => {
  return (
    <div
      style={{
        marginBottom: props.sizesSVG.margin.bottom,
        overflowX: "scroll",
        width: props.sizesWL.width,
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Polzynok />
      <Table />
    </div>
  );
};

const getState = (state) => {
  return {
    sizesSVG: state.mainReducer.sizesSVG,
    sizesWL: state.mainReducer.workList.sizesWL,
  };
};

export default connect(getState)(WorksList);
