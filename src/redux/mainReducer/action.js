export const setWidth = (data) => {
  return {
    type: "SET_SVG_WIDTH",
    svgWidth: data.svgWidth,
    resizedType: data.resizedType,
  };
};
export const changeXRange = (selection) => {
  return {
    type: "CHANGE_SVG_RANGE",
    start: selection[0],
    finish: selection[1],
  };
};
export const setDisplayedData = (data) => {
  return {
    type: "SELECT_DISPLAYED_DATA",
    selectedIds: data.selectedIds,
    selectedData: data.selectedData,
  };
};
export const setWheeledData = (data) => {
  return {
    type: "WHEEL_DATA",
    displayedIds: data.displayedIds,
    dataDisplayed: data.dataDisplayed,
    dataRange: data.dataRange,
  };
};
