import fullData from "../../data";
import * as d3 from "d3";
import defaultState from "./defaultState.js";

export default function fullDataReducer(
  state = defaultState(d3.hierarchy({ name: "root", children: fullData })),
  action
) {
  let result;
  switch (action.type) {
    case "DATA_INITIALIZED": {
      break;
    }
    default:
      result = state;
      return result;
  }
}
