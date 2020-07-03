import { handJob } from "../../../../auxFunctions/resizedTypes";

export default (state, attr) => {
  const currentElementsOnPage =
    attr.selectedIds.length >= state.dataSpec.maxElementsOnPage
      ? state.dataSpec.maxElementsOnPage
      : attr.selectedIds.length;
  const dataRange =
    currentElementsOnPage >= state.dataSpec.maxElementsOnPage
      ? { start: 0, finish: state.dataSpec.maxElementsOnPage }
      : { start: 0, finish: 0 };
  const displayedIds = attr.selectedIds.slice(0, currentElementsOnPage);
  const displayedData = attr.selectedData.slice(0, currentElementsOnPage);
  const wheeled = attr.selectedIds.length > state.dataSpec.maxElementsOnPage;
  const heightSVG = currentElementsOnPage * (state.sizesSVG.stringHeight * 1.25);

  const sizesSVG = { ...state.sizesSVG, height: heightSVG, resizedType: handJob };

  const newScales = {
    ...state.scales.changeScales.changeScaleY({
      displayedIds,
      sizesSVG,
    }),
    ...state.scales.changeScales.changeScaleX({
      sizesSVG,
      selectedData: attr.selectedData,
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
      selectedData: attr.selectedData,
    },
    ids: { ...state.ids, displayedIds, selectedIds: attr.selectedIds },
    scales: { ...state.scales, ...newScales },
    dataSpec: {
      ...state.dataSpec,
      dataRange,
      currentElementsOnPage,
      wheeled,
      filters: {
        ...state.dataSpec.filters,
        filtersIds: { ...state.dataSpec.filters.filtersIds },
      },
    },
  };
};
