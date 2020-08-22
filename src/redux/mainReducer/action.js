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
    hierarchyFullData: data.hierarchyFullData,
    hierarchyFullIds: data.hierarchyFullIds,
  };
};

export const setRolledUp = (rolledUp, d, freezedData, hierarchyFullData) => {
  return {
    type: "ROLL_UP",
    rolledUp: rolledUp,
    d,
    freezedData,
    hierarchyFullData,
  };
};
// export const lvl4BrushSelected = (data) => {
//   return {
//     type: "LVL_4_BRUSH_SELECTED",
//     date: data.date,
//     element: data.currentParentElement,
//   };
// };

export const lvl4Editing = (checked) => {
  return {
    type: "LVL_4_EDITING",
    checked: checked,
  };
};
export const lvl4ConfirmEnter = () => {
  return {
    type: "LVL_4_CONFIRM_ENTER",
  };
};

export const selectColumns = (data) => {
  return {
    type: "SELECT_COLUMNS",
    columns: data,
  };
};
export const initializeState = (hierarchyFullData, hierarchyFullIds) => {
  return {
    type: "INITIALIZE_STATE",
    hierarchyFullData,
    hierarchyFullIds,
  };
};
