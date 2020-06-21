export const setWidth = (width) => {
  return {
    type: "SET_SVG_&_WL_WIDTH",
    svg: width.svg,
    wl: width.wl,
  };
};
export const changeXRange = (selection) => {
  return {
    type: "CHANGE_SVG_RANGE",
    start: selection[0],
    finish: selection[1],
  };
};
export const setSelectedData = (range) => {
  return {
    type: "CHANGE_DATA_RANGE",
    range: { start: +range.start, finish: +range.finish },
  };
};
