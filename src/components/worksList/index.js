import React from "react";
import { connect } from "react-redux";
import DataList from "./dataList.js";

const WorksList = (props) => {
  return (
    <div
      style={{
        paddingTop: props.yScale.paddingOuter() * props.yScale.step(),
        marginBottom: props.sizesSVG.margin.bottom,
        overflow: "hidden",
        width: "100%",
      }}
    >
      <DataList />
    </div>
  );
};

const getState = (state) => {
  return {
    yScale: state.mainReducer.scales.yScale,
    sizesWL: state.mainReducer.workList.sizesWL,
    sizesSVG: state.mainReducer.sizesSVG,
  };
};

export default connect(getState)(WorksList);
