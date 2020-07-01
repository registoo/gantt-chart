import fullData from "../../data";
import defaultState from "./defaultState.js";
import { handJob } from "../../auxFunctions/resizedTypes";

export default function testReducer(state = defaultState(fullData), action) {
  switch (action.type) {
    case "SET_SVG_WIDTH": {
      const setXScaleWidth = state.scales.aux.setWidthOfHorizontalScale({
        widthSVG: action.svgWidth,
        marginSVG: state.sizesSVG.margin,
        domainXStartMS: state.scales.domainXStartMS,
        domainXFinishMS: state.scales.domainXFinishMS,
        xScaleMinCoordinate: state.scales.xScaleMinCoordinate,
      });
      const result = {
        ...state,
        sizesSVG: {
          ...state.sizesSVG,
          width: action.svgWidth,
          resizedType: action.resizedType,
        },
        scales: { ...state.scales, ...setXScaleWidth },
      };
      return result;
    }
    case "SET_RESIZER_TYPE": {
      return {
        ...state,
        sizesSVG: { ...state.sizesSVG, resizedType: action.position },
      };
    }
    case "CHANGE_SVG_RANGE": {
      const setXScaleRange = state.scales.aux.setXRange(action.start, action.finish, state);
      return {
        ...state,
        scales: { ...state.scales, ...setXScaleRange },
      };
    }

    case "WHEEL_DATA": {
      const newScales = state.changeScales({
        displayedIds: action.displayedIds,
        dataDisplayed: action.dataDisplayed,
        sizesSVG: state.sizesSVG,
      });
      return {
        ...state,
        scales: newScales,
        slicedData: {
          ...state.slicedData,
          dataDisplayed: action.dataDisplayed,
        },
        ids: { ...state.ids, displayedIds: action.displayedIds },
        dataSpec: {
          ...state.dataSpec,
          dataRange: action.dataRange,
        },
      };
    }

    case "SELECT_DISPLAYED_DATA": {
      if (action.selectedIds.length === 0) {
        const defState = defaultState(fullData);
        const sizesSVG = {
          ...defState.sizesSVG,
          width: state.sizesSVG.width,
          resizedType: handJob,
        };
        const newScales = state.changeScales({
          displayedIds: defState.ids.displayedIds,
          dataDisplayed: defState.slicedData.dataDisplayed,
          sizesSVG,
        });
        return {
          ...defState,
          scales: newScales,
          sizesSVG,
        };
      }
      const currentElementsOnPage =
        action.selectedIds.length >= state.dataSpec.maxElementsOnPage
          ? state.dataSpec.maxElementsOnPage
          : action.selectedIds.length;
      const dataRange =
        currentElementsOnPage >= state.dataSpec.maxElementsOnPage
          ? { start: 0, finish: 12 }
          : { start: 0, finish: 0 };
      const displayedIds = action.selectedIds.slice(0, currentElementsOnPage);
      const dataDisplayed = action.selectedData.slice(0, currentElementsOnPage);
      const wheeled = !(action.selectedIds.length <= state.dataSpec.maxElementsOnPage);
      const heightSVG =
        currentElementsOnPage >= state.dataSpec.maxElementsOnPage
          ? state.dataSpec.maxElementsOnPage * (state.sizesSVG.stringHeight * 1.25)
          : currentElementsOnPage * (state.sizesSVG.stringHeight * 1.25);

      const sizesSVG = { ...state.sizesSVG, height: heightSVG, resizedType: handJob };

      const newScales = state.changeScales({
        displayedIds,
        dataDisplayed,
        sizesSVG,
      });

      const result = {
        ...state,
        sizesSVG,
        slicedData: {
          ...state.slicedData,
          dataDisplayed: dataDisplayed,
          selectedData: action.selectedData,
        },
        ids: { ...state.ids, displayedIds, selectedIds: action.selectedIds },
        scales: newScales,
        dataSpec: {
          ...state.dataSpec,
          dataRange,
          currentElementsOnPage,
          wheeled,
          filtered: action.filtered,
        },
      };

      return result;
    }
    default:
      return state;
  }
}
