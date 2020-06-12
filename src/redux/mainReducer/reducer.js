import data from "../../data";
import defaultState from "./defaultState.js";

export default function testReducer(state = defaultState(data), action) {
  switch (action.type) {
    case "SET_WIDTH":
      const setXScaleWidth = state.scales.aux.setWidthOfHorizontalScale(action.width, state);
      return {
        ...state,
        sizesSVG: { ...state.sizesSVG, width: action.width },
        scales: { ...state.scales, ...setXScaleWidth },
      };
    case "CHANGE_RANGE":
      const setXScaleRange = state.scales.aux.setXRange(action.start, action.finish, state);
      return {
        ...state,
        scales: { ...state.scales, ...setXScaleRange },
      };
    default:
      return state;
  }
}
