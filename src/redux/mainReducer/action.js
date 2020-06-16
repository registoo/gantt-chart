export const setWidth = (width) => {
  return {
    type: "SET_SVG_&_WL_WIDTH",
    svg: width.svg,
    wl: width.wl,
  };
};
export const changeXRange = (selection) => {
  return {
    type: "CHANGE_RANGE",
    start: selection[0],
    finish: selection[1],
  };
};
