import fullData from "../../data";
import * as d3 from "d3";

export default function fullDataReducer(
  state = d3.hierarchy({ name: "root", children: fullData }),
  action
) {
  let result;
  switch (action.type) {
    default:
      return state;
  }
}
