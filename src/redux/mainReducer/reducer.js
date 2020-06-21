import data from "../../data";
import defaultState from "./defaultState.js";
import { rowHasError } from "../../auxFunctions";

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
        workList: { ...state.workList, sizesWL: { ...state.workList.sizesWL, width: action.wl } },
      };
    case "CHANGE_SVG_RANGE":
      const setXScaleRange = state.scales.aux.setXRange(action.start, action.finish, state);
      return {
        ...state,
        scales: { ...state.scales, ...setXScaleRange },
      };
    case "CHANGE_DATA_RANGE":
      const dataDisplayed = state.data.slice(action.range.start, action.range.finish);
      const listIdDisplayed = dataDisplayed.map((d) =>
        rowHasError(d.data) ? d.data.isError.formattedText : d.data.jobName.formattedText
      );
      const newScales = state.changeScales({
        listIdDisplayed,
        sizesSVG: state.sizesSVG,
        dataDisplayed,
      });
      return {
        ...state,
        dataSpec: { ...state.dataSpec, dataRange: action.range },
        dataDisplayed: dataDisplayed,
        ids: { ...state.ids, listIdDisplayed },
        scales: newScales,
      };
    default:
      return state;
  }
}
