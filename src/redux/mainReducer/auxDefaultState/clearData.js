import getHierarchyDisplayedIds from "./getHierarchyIds.js";
import typesOfFilters from "../dataFilters/typesOfFilters.js";
import changeScaleX from "./scaleX.js";
import changeScaleY from "./scaleY.js";
import getSizes from "./sizes.js";

const clearData = (state, hierarchyFullData, hierarchyFullIds, initial) => {
  state.dataSpec.dataRange = {
    start: state.dataSpec.startDataForDataRange,
    finish: state.dataSpec.startDataForDataRange + state.dataSpec.maxElementsOnPage,
  };
  const hierarchyDisplayedData = hierarchyFullData.children.slice(
    state.dataSpec.startDataForDataRange,
    state.dataSpec.startDataForDataRange + state.dataSpec.maxElementsOnPage
  );
  const heightSVG = hierarchyDisplayedData.length * (state.dataSpec.stringHeight * 1);
  const sizes = getSizes(heightSVG, state.dataSpec.stringHeight, initial, state);
  const hierarchyDisplayedIds = getHierarchyDisplayedIds(hierarchyDisplayedData);
  const hierarchySelectedData = hierarchyFullData.children;
  const hierarchySelectedIds = hierarchyFullIds;
  state.dataSpec.wheeled = hierarchySelectedIds.length > state.dataSpec.maxElementsOnPage;
  const filters = {
    clearFilters: clearData,
    filtersIds: Object.keys(typesOfFilters).reduce((acc, el) => {
      acc[el] = false;
      return acc;
    }, {}),
    worksFilter: { listOfWorksForSearcherInput: hierarchyFullIds, pickedWorksIds: [] },
    SPOFilter: { pickedSPO: [] },
    serializedFilters: [],
    percentageFilter: { range: { from: 0, to: 100 }, selectedPercentageFilter: undefined },
    filteredColumns: [],
  };
  return {
    slicedData: { hierarchyDisplayedData, hierarchySelectedData },
    sizes,
    ids: {
      hierarchyDisplayedIds,
      hierarchySelectedIds,
    },
    filters,
    dataSpec: state.dataSpec,
    scales: {
      ...changeScaleY({
        hierarchyDisplayedIds,
        sizesSVG: sizes.sizesSVG,
      }),
      ...changeScaleX({
        sizesSVG: sizes.sizesSVG,
        hierarchyFullData,
        hierarchyDisplayedData,
        hierarchySelectedData,
      }),
      changeScales: { changeScaleX, changeScaleY },
    },
    someData: state.someData,
  };
};

export default clearData;
