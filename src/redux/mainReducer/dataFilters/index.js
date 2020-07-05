import filters from "./filters";
import { handJob } from "../../../auxFunctions/resizedTypes";

const getData = (obj) => {
  const serializedFilters1 = [...obj.serializedFilters];
  const firstElem = serializedFilters1.shift();
  const attr = firstElem.attr;
  const filterId = firstElem.filterType;
  delete obj.serializedFilters;
  const filteredData = filters[filterId]({ ...obj, attr });
  if (serializedFilters1.length > 0) {
    return getData({ serializedFilters: serializedFilters1, ...filteredData });
  }
  return filteredData;
};
export default function ({ serializedFilters, state }) {
  if (serializedFilters.length > 0) {
    const filteredData = getData({ serializedFilters, fullData: state.fullData });
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
      dataSpec: {
        ...state.dataSpec,
        dataRange,
        currentElementsOnPage,
        wheeled,
        filters: {
          ...state.dataSpec.filters,
          pickedWorksIds: filteredData.pickedWorksIds ? filteredData.pickedWorksIds : [],
          filteredData: filteredData.filteredData ? filteredData.filteredData : [],
          filteredIds: filteredData.filteredIds ? filteredData.filteredIds : [],
        },
      },
    };
  }
  // сброс state при отсутствии фильтров
  return filters.filtersReset(state);
}
