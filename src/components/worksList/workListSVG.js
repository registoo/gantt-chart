import React from "react";
import { connect } from "react-redux";
import drawLine from "./drawLine.js";

const F = (props) => {
  const columns = props.filteredColumns.length === 0 ? props.namesOfColumns : props.filteredColumns;
  const addData = () => {
    const nodes = props.hierarchyFullData.children;
    const totalSPO = [];
    props.hierarchyFullData.each((e) => {
      if (e.data.name === "root") return;
      const spo = e.data.data.SPO ? e.data.data.SPO.formattedText : null;
      totalSPO.length === 0 && totalSPO.push(spo);
      const a = totalSPO.findIndex(
        (e) => e === spo
        // if (e === spo) totalSPO.push(spo);
        // e !== spo && totalSPO.push(spo);
      );
      a < 0 && totalSPO.push(spo);
    });
    console.log(totalSPO);
    const n = nodes.map((d, i) => {
      return drawLine(d, i, props.yScale, columns);
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
          width: columns.length * 125,
          height: props.SVGHeight,
        }}
      >
        <g>{addData()}</g>
      </svg>
    </div>
  );
};

const getState = (state) => {
  return {
    hierarchyFullData: state.mainReducer.hierarchyFullData,
    displayedData: state.mainReducer.slicedData.displayedData,
    ganttTopScaleHeight: state.mainReducer.sizes.sizesSVG.ganttTopScale.height,
    yScale: state.mainReducer.scales.yScale,
    SVGHeight: state.mainReducer.sizes.sizesSVG.height,
    filteredColumns: state.mainReducer.dataSpec.filters.filteredColumns,
    namesOfColumns: state.mainReducer.someData.namesOfColumns,
  };
};

export default connect(getState)(F);
