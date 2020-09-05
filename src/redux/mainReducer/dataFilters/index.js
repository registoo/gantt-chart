import {
  getData,
  getListOfWorksForSearcherInput,
  getListOfSPOForSearcherInput,
} from "./auxFunctions.js";
import clearData from "../auxDefaultState/clearData.js";

export default function (serializedFilters, state, hierarchyFullData, hierarchyFullIds) {
  // если есть применённые фильтры
  if (serializedFilters.length > 0) {
    const filteredData = getData({ serializedFilters, hierarchyFullData });
    const listOfWorksForSearcherInput = getListOfWorksForSearcherInput({
      serializedFilters,
      hierarchyFullData,
      filteredData,
    });
    const listOfSPOForSearcherInput = getListOfSPOForSearcherInput({
      serializedFilters,
      hierarchyFullData,
      filteredData,
      listOfSPO: state.someData.listOfSPO,
    });
    const maxElementsOnPage = state.dataSpec.maxElementsOnPage;
    const selectedData = filteredData.selectedData;
    const selectedIds = filteredData.selectedIds;

    const filters = {
      ...state.filters,
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
      filters,
    };

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
    const accordionExpanded = { expanded: false };
    const newScales = {
      ...state.scales.changeScales.changeScaleY({
        hierarchyDisplayedIds,
        sizesSVG,
      }),
      ...state.scales.changeScales.changeScaleX({
        sizesSVG,
        hierarchySelectedData: selectedData,
        hierarchyFullData,
        hierarchyDisplayedData,
      }),
    };
    result.slicedData = { ...result.slicedData, hierarchyDisplayedData };
    result.ids = { ...result.ids, hierarchyDisplayedIds };
    result.scales = { ...result.scales, ...newScales };
    result.sizes = { ...result.sizes, sizesSVG };
    result.dataSpec = {
      ...result.dataSpec,
      wheeled,
      dataRange,
      accordionExpanded,
      currentElementsOnPage,
    };

    return result;
  }
  // сброс state при отсутствии фильтров
  return clearData(state, hierarchyFullData, hierarchyFullIds, false);
}
