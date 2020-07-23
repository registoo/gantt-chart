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
export const setFilter = (data) => {
  return {
    type: "SERIALIZE_FILTERS",
    attr: data.attr,
    filterType: data.filterType,
  };
};

export const setAccordionData = (data) => {
  return {
    type: "ACCORDION_DATA",
    displayedIds: data.displayedIds,
    displayedData: data.displayedData,
    dataRange: data.dataRange,
    accordionExpanded: data.accordionExpanded,
  };
};
export const lvl4BrushSelected = (data) => {
  return {
    type: "LVL_4_BRUSH_SELECTED",
    date: data.date,
    element: data.currentParentElement,
  };
};
