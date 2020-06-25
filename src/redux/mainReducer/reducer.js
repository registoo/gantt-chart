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
    case "CHANGE_DATA_RANGE_WHEEL":
      const dataDisplayed1 = state.data.slice(action.range.start, action.range.finish);
      const listIdDisplayed1 = dataDisplayed1.map((d) =>
        rowHasError(d.data) ? d.data.isError.formattedText : d.data.jobName.formattedText
      );
      const newScales1 = state.changeScales({
        listIdDisplayed: listIdDisplayed1,
        sizesSVG: state.sizesSVG,
        dataDisplayed: dataDisplayed1,
      });
      return {
        ...state,
        dataSpec: { ...state.dataSpec, dataRange: action.range },
        dataDisplayed: dataDisplayed1,
        ids: { ...state.ids, listIdDisplayed: listIdDisplayed1 },
        scales: newScales1,
      };
    case "SELECT_KKS":
      //   // if (!action.works) {
      //   //   return defaultState(data);
      //   // }
      //   const listIdDisplayed2 = [];
      //   const dataDisplayed2 = [
      //     action.works.reduce((acc, el) => {
      //       state.data.find((e, n) => {
      //         if (e.id === el) {
      //           listIdDisplayed2.push(e.data.jobName.formattedText);
      //           return true;
      //         } else if (rowHasError(e.data)) {
      //           listIdDisplayed2 = [e.data.isError.formattedText];
      //           return true;
      //         } else {
      //           return false;
      //         }
      //       });
      //     }, []),
      //   ];

      //   const newScales2 = rowHasError(dataDisplayed2[0].data)
      //     ? undefined
      //     : state.changeScales({
      //         listIdDisplayed: listIdDisplayed2,
      //         sizesSVG: state.sizesSVG,
      //         dataDisplayed: dataDisplayed2,
      //       });
      //   return {
      //     ...state,
      //     dataSpec: { elementsOnPage: 1, dataRange: { start: i, finish: i } },
      //     dataDisplayed: dataDisplayed2,
      //     ids: { ...state.ids, listIdDisplayed: listIdDisplayed2 },
      //     scales: newScales2 ? newScales2 : { ...state.scales },
      //   };
      return state;
    default:
      return state;
  }
}
