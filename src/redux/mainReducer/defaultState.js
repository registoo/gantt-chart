import rowHasError from "../../auxFunctions/rowHasError";
import changeScaleX from "./auxDefaultState/scaleX.js";
import changeScaleY from "./auxDefaultState/scaleY.js";
import columnsData from "../../data/columns.js";
import typesOfFilters from "./dataFilters/typesOfFilters.js";
import { deleteDuplicates } from "../../auxFunctions/hierarchy";
import getHerarchyDisplayedIds from "./auxDefaultState/getHerarchyIds.js";

export default (hierarchyFullData) => {
  const maxElementsOnPage = 12;
  const startDataForDataRange = 0;
  const hierarchyDisplayedData = hierarchyFullData.children.slice(
    startDataForDataRange,
    startDataForDataRange + maxElementsOnPage
  );
  const stringHeight = 35;
  const heightSVG = hierarchyDisplayedData.length * (stringHeight * 1);
  const marginSVG = {
    top: 0,
    right: 1,
    bottom: 1,
    left: 0,
  };
  const sizes = {
    mainResizer: { width: 0 },
    polzynok: { width: 10, margin: { left: 5 } },
    sizesSVG: {
      ganttTopScale: { height: 17 },
      separatorWidth: 6,
      minWidth: 100,
      width: 400,
      height: heightSVG,
      margin: marginSVG,
      stringHeight,
      slider: { height: 20 },
    },
    sizesWL: { width: 0, height: heightSVG },
    sizesLeftMenu: { width: 400, margin: { right: 10, top: 10 } },
  };

  const hierarchyDisplayedIds = getHerarchyDisplayedIds(hierarchyDisplayedData);

  const hierarchyFullIds = hierarchyFullData.children.map((d) =>
    rowHasError(d.data.data) ? d.data.data.isError.formattedText : d.data.id
  );

  const hierarchySelectedData = hierarchyFullData.children;
  const hierarchySelectedIds = hierarchyFullIds;

  const namesOfColumns = columnsData.outer;

  const listOfSPO = deleteDuplicates(hierarchyFullData, "SPO");

  const dataSpec = {
    dataRange: { start: startDataForDataRange, finish: startDataForDataRange + maxElementsOnPage },
    currentElementsOnPage: maxElementsOnPage,
    startDataForDataRange,
    maxElementsOnPage,
    wheeled: true,
    accordionExpanded: false,
    filters: {
      filtersIds: Object.keys(typesOfFilters).reduce((acc, el) => {
        acc[el] = false;
        return acc;
      }, {}),
      worksFilter: { listOfWorksForSearcherInput: hierarchyFullIds, pickedWorksIds: [] },
      SPOFilter: { listOfSPOForSearcherInput: listOfSPO, pickedSPO: [] },
      serializedFilters: [],
      percentageFilter: { range: { from: 0, to: 100 }, selectedPercentageFilter: undefined },
      filteredColumns: [],
    },
  };
  const result = {
    hierarchyFullData,
    slicedData: { hierarchyDisplayedData, hierarchySelectedData },
    sizes,
    ids: {
      hierarchyDisplayedIds,
      hierarchyFullIds,
      hierarchySelectedIds,
    },
    dataSpec,
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
    someData: { listOfSPO, namesOfColumns: namesOfColumns, freezedData: {} },
  };

  return result;
};
