export const count = (data) => {
  return {
    type: "TEST",
    data,
  };
};
export const setWidth = (width) => {
  return {
    type: "SET_WIDTH",
    width,
  };
};
export const changeXRange = (selection) => {
  return {
    type: "CHANGE_RANGE",
    start: selection[0],
    finish: selection[1],
  };
};
