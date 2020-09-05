import React from "react";
import { connect } from "react-redux";
import drawLine from "./drawLine.js";
import { setAccordionExpanded } from "../../redux/mainReducer/action.js";
import drawHead from "./drawHead.js";
import arithmeticColumnsSpacing from "./arithmeticColumnsSpacing.js";

const F = (props) => {
  const columns0 =
    props.filteredColumns.length === 0 ? props.namesOfColumns : props.filteredColumns;
  const { columns, boxWidth } = arithmeticColumnsSpacing(columns0);

  const addData = () => {
    const nodes = props.hierarchyDisplayedData;
    return nodes.map((d, i) => {
      return drawLine(
        d,
        i,
        props.yScale,
        columns,
        props.setAccordionExpanded,
        props.hierarchyFullData,
        props.accordionExpanded
      );
    });
  };
  return (
    <div
      style={{
        flexGrow: 1,
        flexShrink: 1,
        minWidth: 0,
        width: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          overflowX: "scroll",
          overflowY: "hidden",
        }}
      >
        <svg width={boxWidth} height={props.ganttTopScaleHeight * 2}>
          <g>{drawHead(columns, props.ganttTopScaleHeight * 2 * 0.9)}</g>
        </svg>
        <svg width={boxWidth} height={props.SVGHeight}>
          <g>{addData()}</g>
        </svg>
      </div>
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
    hierarchyFullData: state.fullDataReducer.fullData,
    accordionExpanded: state.mainReducer.dataSpec.accordionExpanded,
  };
};

export default connect(getState, { setAccordionExpanded })(F);
