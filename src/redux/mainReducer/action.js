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
export const setWheeledData = (data) => {
  return {
    type: "WHEEL_DATA",
    displayedIds: data.displayedIds,
    displayedData: data.displayedData,
    dataRange: data.dataRange,
  };
};
export const filterByDates = (data) => {
  return {
    type: "FILTER_DATA_BY_DATE",
    start: data.start,
    finish: data.finish,
    filteredByDate: data.filteredByDate,
  };
};

export const setFilter = (data) => {
  return {
    type: "SERIALIZE_FILTERS",
    attr: data.attr,
    filterType: data.filterType,
  };
};
