import columnsData from "../../data/columns.js";
import getSizes from "./auxDefaultState/sizes.js";
import clearData from "./auxDefaultState/clearData.js";

export default (hierarchyFullData, hierarchyFullIds) => {
  const maxElementsOnPage = 12;
  const startDataForDataRange = 0;
  const stringHeight = 35;
  const dataSpec = {
    lvl4scheduleEdit: false,
    dataRange: {
      start: startDataForDataRange,
      finish: startDataForDataRange + maxElementsOnPage,
    },
    currentElementsOnPage: maxElementsOnPage,
    startDataForDataRange,
    maxElementsOnPage,
    wheeled: true,
    accordionExpanded: false,
    stringHeight,
  };
  const namesOfColumns = columnsData.outer;
  const someData = { namesOfColumns: namesOfColumns };

  let result;

  if (hierarchyFullData) {
    result = clearData({ dataSpec, someData }, hierarchyFullData, hierarchyFullIds, true);
  } else {
    const heightSVG = 0;
    const sizes = getSizes(heightSVG, stringHeight, false);
    result = { sizes, someData };
  }
  return result;
};
