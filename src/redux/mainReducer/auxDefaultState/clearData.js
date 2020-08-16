import getHierarchyDisplayedIds from "./getHierarchyIds.js";
import typesOfFilters from "../dataFilters/typesOfFilters.js";
import changeScaleX from "./scaleX.js";
import changeScaleY from "./scaleY.js";
import getSizes from "./sizes.js";

const clearData = (state, hierarchyFullData, hierarchyFullIds, initial) => {
  const newDataSpec = { ...state.dataSpec };
  newDataSpec.dataRange = {
    start: newDataSpec.startDataForDataRange,
    finish: newDataSpec.startDataForDataRange + newDataSpec.maxElementsOnPage,
  };
  newDataSpec.currentElementsOnPage = newDataSpec.maxElementsOnPage;
  const hierarchyDisplayedData = hierarchyFullData.children.slice(
    newDataSpec.startDataForDataRange,
    newDataSpec.startDataForDataRange + newDataSpec.maxElementsOnPage
  );
  const heightSVG = hierarchyDisplayedData.length * (newDataSpec.stringHeight * 1);
  const sizes = getSizes(heightSVG, newDataSpec.stringHeight, initial, state);
  const hierarchyDisplayedIds = getHierarchyDisplayedIds(hierarchyDisplayedData);
  const hierarchySelectedData = hierarchyFullData.children;
  const hierarchySelectedIds = hierarchyFullIds;
  newDataSpec.wheeled = hierarchySelectedIds.length > newDataSpec.maxElementsOnPage;
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
    dataSpec: newDataSpec,
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
