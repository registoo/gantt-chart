import data from "../../data";
import defaultState from "./defaultState.js";

export default function testReducer(state = defaultState(data), action) {
  switch (action.type) {
    case "SET_WIDTH":
      const setXScale = state.scales.aux.setHorizontalScale(action.width, state);
      const res = {
        ...state,
        sizesSVG: { ...state.sizesSVG, width: action.width },
        scales: { ...state.scales, ...setXScale },
      };
      return res;
    default:
      return state;
  }
}
