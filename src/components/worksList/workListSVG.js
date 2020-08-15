import React from "react";
import { connect } from "react-redux";
import drawLine from "./drawLine.js";
import { setRolledUp } from "../../redux/mainReducer/action.js";

const F = (props) => {
  const columns = props.filteredColumns.length === 0 ? props.namesOfColumns : props.filteredColumns;
  const boxWidth = columns.length * 125;
  const freezedData = {
    dataRange: props.dataRange,
    hierarchyDisplayedData: props.hierarchyDisplayedData,
    hierarchyDisplayedIds: props.hierarchyDisplayedIds,
  };
  const addData = (boxWidth) => {
    const nodes = props.hierarchyDisplayedData;
    const n = nodes.map((d, i) => {
      return drawLine(d, i, props.yScale, columns, boxWidth, props.setRolledUp, freezedData);
    });
    return n;
  };
  return (
    <div
      style={{
        marginTop: props.ganttTopScaleHeight * 2,
        overflowX: "scroll",
        overflowY: "hidden",
        flexGrow: 1,
        flexShrink: 1,
        minWidth: 0,
        width: 0,
      }}
    >
      <svg
        style={{
          width: boxWidth,
          height: props.SVGHeight,
        }}
      >
        <g>{addData(boxWidth)}</g>
      </svg>
    </div>
  );
};

const getState = (state) => {
  return {
    hierarchyDisplayedData: state.mainReducer.slicedData.hierarchyDisplayedData,
    hierarchyDisplayedIds: state.mainReducer.ids.hierarchyDisplayedIds,
    ganttTopScaleHeight: state.mainReducer.sizes.sizesSVG.ganttTopScale.height,
    yScale: state.mainReducer.scales.yScale,
    SVGHeight: state.mainReducer.sizes.sizesSVG.height,
    filteredColumns: state.mainReducer.filters.filteredColumns,
    namesOfColumns: state.mainReducer.someData.namesOfColumns,
    dataRange: state.mainReducer.dataSpec.dataRange,
  };
};

export default connect(getState, { setRolledUp })(F);
