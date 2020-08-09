import defaultState from "../../../redux/mainReducer/defaultState.js";
import {
  getData,
  getListOfWorksForSearcherInput,
  getListOfSPOForSearcherInput,
} from "./auxFunctions.js";

export default function ({ serializedFilters, state }) {
  // если есть применённые фильтры
  if (serializedFilters.length > 0) {
    const filteredData = getData({ serializedFilters, hierarchyFullData: state.hierarchyFullData });
    const listOfWorksForSearcherInput = getListOfWorksForSearcherInput({
      serializedFilters,
      hierarchyFullData: state.hierarchyFullData,
      filteredData,
    });
    const listOfSPOForSearcherInput = getListOfSPOForSearcherInput({
      serializedFilters,
      hierarchyFullData: state.hierarchyFullData,
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
        hierarchySelectedData: selectedData,
      },
      ids: {
        ...state.ids,
        hierarchySelectedIds: selectedIds,
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
      const sizesSVG = { ...state.sizes.sizesSVG, height: heightSVG };
      const hierarchyDisplayedIds = selectedIds.slice(0, currentElementsOnPage);
      const hierarchyDisplayedData = selectedData.slice(0, currentElementsOnPage);
      const newScales = {
        ...state.scales.changeScales.changeScaleY({
          hierarchyDisplayedIds,
          sizesSVG,
        }),
        ...state.scales.changeScales.changeScaleX({
          sizesSVG,
          hierarchySelectedData: selectedData,
          hierarchyFullData: state.hierarchyFullData,
          hierarchyDisplayedData,
        }),
      };
      result.slicedData = { ...result.slicedData, hierarchyDisplayedData };
      result.ids = { ...result.ids, hierarchyDisplayedIds };
      result.scales = { ...result.scales, ...newScales };
      result.sizes = { ...result.sizes, sizesSVG };
      result.dataSpec = { ...result.dataSpec, dataRange, currentElementsOnPage, wheeled };
    }

    return result;
  }
  // сброс state при отсутствии фильтров
  return defaultState(state.hierarchyFullData);
}
