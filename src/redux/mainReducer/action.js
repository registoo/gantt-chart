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
export const setWheeledData = (range) => {
  return {
    type: "CHANGE_DATA_RANGE_WHEEL",
    range: { start: +range.start, finish: +range.finish },
  };
};
export const setOneKKS = (works) => {
  return {
    type: "SELECT_KKS",
    works: works,
  };
};
