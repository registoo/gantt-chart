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
export const setDisplayedData = (data) => {
  return {
    type: "SELECT_DISPLAYED_DATA",
    listIdDisplayed: data.listIdDisplayed,
    dataDisplayed: data.dataDisplayed,
    dataRange: { ...data.dataRange },
  };
};
