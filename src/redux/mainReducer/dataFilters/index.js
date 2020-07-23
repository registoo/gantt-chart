import { handJob } from "../../../auxFunctions/resizedTypes";
import defaultState from "../../../redux/mainReducer/defaultState.js";
import {
  getData,
  getListOfWorksForSearcherInput,
  getListOfSPOForSearcherInput,
} from "./auxFunctions.js";

export default function ({ serializedFilters, state }) {
  // если есть применённые фильтры
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

    const dataSpec = {
      ...state.dataSpec,
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
        percentageFilter: {
          range: filteredData.percentageSelected
            ? filteredData.percentageSelected
            : { from: 0, to: 100 },
          selectedPercentageFilter: filteredData.selectedPercentageFilter,
        },
      },
    };

    const result = {
      ...state,
      slicedData: {
        ...state.slicedData,
        selectedData,
      },
      ids: {
        ...state.ids,
        selectedIds,
      },
      dataSpec,
    };

    // если не открыт Г4У
    if (!state.dataSpec.accordionExpanded) {
      const currentElementsOnPage =
        selectedData.length >= maxElementsOnPage ? maxElementsOnPage : selectedData.length;
      const dataRange =
        currentElementsOnPage >= maxElementsOnPage
          ? { start: 0, finish: maxElementsOnPage }
          : { start: 0, finish: 0 };
      const wheeled = selectedIds.length > maxElementsOnPage;
      const heightSVG = currentElementsOnPage * (state.sizes.sizesSVG.stringHeight * 1.25);
      const sizesSVG = { ...state.sizes.sizesSVG, height: heightSVG, resizedType: handJob };
      const displayedIds = selectedIds.slice(0, currentElementsOnPage);
      const displayedData = selectedData.slice(0, currentElementsOnPage);
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
      result.slicedData = { ...result.slicedData, displayedData };
      result.ids = { ...result.ids, displayedIds };
      result.scales = { ...result.scales, ...newScales };
      result.sizes = { ...result.sizes, sizesSVG };
      result.dataSpec = { ...result.dataSpec, dataRange, currentElementsOnPage, wheeled };
    }

    return result;
  }
  // сброс state при отсутствии фильтров
  return defaultState(state.fullData);
}
