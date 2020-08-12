export const setWidth = ({ svgWidth, parentWidth }) => {
  return {
    type: "SET_SVG_WIDTH",
    svgWidth: svgWidth,
    parentWidth,
  };
};
export const changeXRange = (selection) => {
  return {
    type: "CHANGE_SVG_RANGE",
    start: selection[0],
    finish: selection[1],
  };
};
export const setWheeledData = (data) => {
  return {
    type: "WHEEL_DATA",
    displayedIds: data.displayedIds,
    displayedData: data.displayedData,
    dataRange: data.dataRange,
  };
};
export const setFilter = (data) => {
  return {
    type: "SERIALIZE_FILTERS",
    attr: data.attr,
    filterType: data.filterType,
  };
};

export const setRolledUp = (rolledUp, d, freezedData) => {
  return {
    type: "ROLL_UP",
    rolledUp: rolledUp,
    d,
    freezedData,
  };
};
export const lvl4BrushSelected = (data) => {
  return {
    type: "LVL_4_BRUSH_SELECTED",
    date: data.date,
    element: data.currentParentElement,
  };
};
export const selectColumns = (data) => {
  return {
    type: "SELECT_COLUMNS",
    columns: data,
  };
};
