import { handJob } from "../../../auxFunctions/resizedTypes";
import defaultState from "../../../redux/mainReducer/defaultState.js";
import {
  getData,
  getListOfWorksForSearcherInput,
  getListOfSPOForSearcherInput,
} from "./auxFunctions.js";

export default function ({ serializedFilters, state }) {
  if (serializedFilters.length > 0) {
    const filteredData = getData({ serializedFilters, fullData: state.fullData });
    const listOfWorksForSearcherInput = getListOfWorksForSearcherInput({
      serializedFilters,
      fullData: state.fullData,
      filteredData,
    });
    const listOfSPOForSearcherInput = getListOfSPOForSearcherInput({
      serializedFilters,
      fullData: state.fullData,
      filteredData,
      listOfSPO: state.someData.listOfSPO,
    });
    const maxElementsOnPage = state.dataSpec.maxElementsOnPage;
    const selectedData = filteredData.selectedData;
    const selectedIds = filteredData.selectedIds;
    const currentElementsOnPage =
      selectedData.length >= maxElementsOnPage ? maxElementsOnPage : selectedData.length;
    const displayedIds = selectedIds.slice(0, currentElementsOnPage);
    const displayedData = selectedData.slice(0, currentElementsOnPage);
    const dataRange =
      currentElementsOnPage >= maxElementsOnPage
        ? { start: 0, finish: maxElementsOnPage }
        : { start: 0, finish: 0 };
    const wheeled = selectedIds.length > maxElementsOnPage;
    const heightSVG = currentElementsOnPage * (state.sizesSVG.stringHeight * 1.25);
    const sizesSVG = { ...state.sizesSVG, height: heightSVG, resizedType: handJob };
    const newScales = {
      ...state.scales.changeScales.changeScaleY({
        displayedIds,
        sizesSVG,
      }),
      ...state.scales.changeScales.changeScaleX({
        sizesSVG,
        selectedData,
        fullData: state.fullData,
        displayedData,
      }),
    };
    const dataSpec = {
      ...state.dataSpec,
      dataRange,
      currentElementsOnPage,
      wheeled,
      filters: {
        ...state.dataSpec.filters,
        worksFilter: {
          listOfWorksForSearcherInput,
          pickedWorksIds: filteredData.pickedWorksIds ? filteredData.pickedWorksIds : [],
        },
        SPOFilter: {
          listOfSPOForSearcherInput,
          pickedSPO: filteredData.pickedSPO ? filteredData.pickedSPO : [],
        },
        percentageFilter: filteredData.percentageSelected
          ? filteredData.percentageSelected
          : { from: 0, to: 100 },
      },
    };

    return {
      ...state,
      sizesSVG,
      slicedData: {
        ...state.slicedData,
        displayedData,
        selectedData,
      },
      ids: { ...state.ids, displayedIds, selectedIds },
      scales: { ...state.scales, ...newScales },
      dataSpec,
    };
  }
  // сброс state при отсутствии фильтров
  return defaultState(state.fullData);
}
