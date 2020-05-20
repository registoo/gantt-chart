import data from "../../data";
import defaultState from "./defaultState.js";

export default function testReducer(state = defaultState(data), action) {
  switch (action.type) {
    case "SET_WIDTH":
      const res = { ...state, sizesSVG: { ...state.sizesSVG, width: action.width } };
      return res;
    default:
      return state;
  }
}
