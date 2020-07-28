import React from "react";
import { connect } from "react-redux";
import Table from "./table";

const WorksList = (props) => {
  return (
    <div
      style={{
        marginBottom: props.sizesSVG.margin.bottom,
        overflowX: "scroll",
        display: "flex",
        flexDirection: "row",
        flexGrow: 1,
      }}
    >
      <Table />
    </div>
  );
};

const getState = (state) => {
  return {
    sizesSVG: state.mainReducer.sizes.sizesSVG,
  };
};

export default connect(getState)(WorksList);
