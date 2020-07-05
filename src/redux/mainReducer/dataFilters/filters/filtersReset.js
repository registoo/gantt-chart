import { defaultResizer } from "../../../../auxFunctions/resizedTypes";
import typesOfFilters from "../typesOfFilters.js";
import { rowHasError } from "../../../../auxFunctions";

export default (state) => {
  const currentElementsOnPage = state.dataSpec.maxElementsOnPage;
  const dataSpec = {
    ...state.dataSpec,
    dataRange: {
      start: state.dataSpec.startDataForDataRange,
      finish: state.dataSpec.startDataForDataRange + currentElementsOnPage,
    },
    currentElementsOnPage,
    wheeled: true,
    filters: {
      filtersIds: Object.keys(typesOfFilters).reduce((acc, el) => {
        acc[el] = false;
        return acc;
      }, {}),
      serializedFilters: [],
      pickedWorksIds: [],
      filteredData: [],
      filteredIds: [],
    },
  };
  const selectedData = state.fullData;
  const selectedIds = state.ids.fullIds;
  const displayedData = selectedData.slice(dataSpec.dataRange.start, dataSpec.dataRange.finish);
  const displayedIds = displayedData.map((d) =>
    rowHasError(d.data) ? d.data.isError.formattedText : d.data.jobName.formattedText
  );
  const heightSVG = currentElementsOnPage * (state.sizesSVG.stringHeight * 1.25);
  const sizesSVG = { ...state.sizesSVG, height: heightSVG, resizedType: defaultResizer };
  const newScales = {
    ...state.scales.changeScales.changeScaleY({
      displayedIds,
      sizesSVG,
    }),
    ...state.scales.changeScales.changeScaleX({
      sizesSVG,
      selectedData: selectedData,
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
    ids: { ...state.ids, displayedIds, selectedIds, filteredIds: [] },
    scales: { ...state.scales, ...newScales },
    dataSpec,
  };
};
