import data from "../../data";
import defaultState from "./defaultState.js";

export default function testReducer(state = defaultState(data), action) {
  switch (action.type) {
    case "SET_SVG_&_WL_WIDTH":
      const setXScaleWidth = state.scales.aux.setWidthOfHorizontalScale({
        widthSVG: action.svg,
        marginSVG: state.sizesSVG.margin,
        domainXStartMS: state.scales.domainXStartMS,
        domainXFinishMS: state.scales.domainXFinishMS,
        xScaleMinCoordinate: state.scales.xScaleMinCoordinate,
      });

      return {
        ...state,
        sizesSVG: { ...state.sizesSVG, width: action.svg },
        scales: { ...state.scales, ...setXScaleWidth },
        sizesWL: { ...state.sizesWL, width: action.wl },
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
