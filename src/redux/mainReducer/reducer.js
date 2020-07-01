import fullData from "../../data";
import defaultState from "./defaultState.js";
import { handJob } from "../../auxFunctions/resizedTypes";

export default function testReducer(state = defaultState(fullData), action) {
  let result;
  switch (action.type) {
    case "SET_SVG_WIDTH": {
      const setXScaleWidth = state.scales.aux.setWidthOfHorizontalScale({
        widthSVG: action.svgWidth,
        marginSVG: state.sizesSVG.margin,
        displayedStartMS: state.scales.displayedStartMS,
        displayedFinishMS: state.scales.displayedFinishMS,
        xScaleMinCoordinate: state.scales.xScaleMinCoordinate,
      });
      result = {
        ...state,
        sizesSVG: {
          ...state.sizesSVG,
          width: action.svgWidth,
          resizedType: action.resizedType,
        },
        scales: { ...state.scales, ...setXScaleWidth },
      };
      console.log(result);
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
      result = {
        ...state,
        scales: { ...state.scales, ...setXScaleRange },
      };
      console.log(result);
      return result;
    }

    case "WHEEL_DATA": {
      const newScales = {
        ...state.scales.changeScales.changeScaleY({
          displayedIds: action.displayedIds,
          sizesSVG: state.sizesSVG,
        }),
      };
      result = {
        ...state,
        scales: { ...state.scales, ...newScales },
        slicedData: {
          ...state.slicedData,
          displayedData: action.displayedData,
        },
        ids: { ...state.ids, displayedIds: action.displayedIds },
        dataSpec: {
          ...state.dataSpec,
          dataRange: action.dataRange,
        },
      };
      console.log(result);
      return result;
    }

    case "SELECT_DISPLAYED_DATA": {
      if (action.selectedIds.length === 0) {
        const defState = defaultState(state.fullData);
        const sizesSVG = {
          ...defState.sizesSVG,
          width: state.sizesSVG.width,
          resizedType: handJob,
        };
        const newScales = {
          ...state.scales.changeScales.changeScaleY({
            displayedIds: defState.ids.displayedIds,
            sizesSVG,
          }),
          ...state.scales.changeScales.changeScaleX({
            sizesSVG,
            displayedData: defState.slicedData.displayedData,
            selectedData: defState.slicedData.selectedData,
            fullData: defState.fullData,
          }),
        };
        result = {
          ...defState,
          scales: { ...defState.scales, ...newScales },
          sizesSVG,
        };
        console.log(result);
        return result;
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
      const displayedData = action.selectedData.slice(0, currentElementsOnPage);
      const wheeled = !(action.selectedIds.length <= state.dataSpec.maxElementsOnPage);
      const heightSVG =
        currentElementsOnPage >= state.dataSpec.maxElementsOnPage
          ? state.dataSpec.maxElementsOnPage * (state.sizesSVG.stringHeight * 1.25)
          : currentElementsOnPage * (state.sizesSVG.stringHeight * 1.25);

      const sizesSVG = { ...state.sizesSVG, height: heightSVG, resizedType: handJob };
      const newScales = {
        ...state.scales.changeScales.changeScaleY({
          displayedIds,
          sizesSVG,
        }),
        ...state.scales.changeScales.changeScaleX({
          sizesSVG,
          selectedData: action.selectedData,
          fullData: state.fullData,
          displayedData,
        }),
      };

      result = {
        ...state,
        sizesSVG,
        slicedData: {
          ...state.slicedData,
          displayedData: displayedData,
          selectedData: action.selectedData,
        },
        ids: { ...state.ids, displayedIds, selectedIds: action.selectedIds },
        scales: { ...state.scales, ...newScales },
        dataSpec: {
          ...state.dataSpec,
          dataRange,
          currentElementsOnPage,
          wheeled,
          filtered: action.filtered,
        },
      };
      console.log(result);
      return result;
    }
    default:
      return state;
  }
}
