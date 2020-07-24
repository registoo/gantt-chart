import rowHasError from "../../auxFunctions/rowHasError";
import changeScaleX from "./scales/x.js";
import changeScaleY from "./scales/y.js";
import columns from "../../data/columns.js";
import typesOfFilters from "./dataFilters/typesOfFilters.js";
import deleteDuplicates from "../../auxFunctions/deleteDuplicates.js";

export default (fullData) => {
  const maxElementsOnPage = 12;
  const startDataForDataRange = 0;
  const displayedData = fullData.slice(
    startDataForDataRange,
    startDataForDataRange + maxElementsOnPage
  );
  const stringHeight = 35;
  const heightSVG = displayedData.length * (stringHeight * 1.25);
  const marginSVG = {
    top: 0,
    right: 2,
    bottom: 0,
    left: 0,
  };
  const sizes = {
    mainResizer: { width: 0 },
    polzynok: { width: 10, margin: { left: 5 } },
    sizesSVG: {
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

  const displayedIds = displayedData.map((d) =>
    rowHasError(d.data) ? d.data.isError.formattedText : d.id
  );

  const fullIds = fullData.map((d) => (rowHasError(d.data) ? d.data.isError.formattedText : d.id));

  const selectedData = fullData;
  const selectedIds = fullIds;
  // колоки данных workList
  const columnsName = () => {
    const col = { ...columns };
    delete col.colIsError;
    return col;
  };
  const listOfSPO = deleteDuplicates(fullData, "el.data.SPO.formattedText");
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
      worksFilter: { listOfWorksForSearcherInput: fullIds, pickedWorksIds: [] },
      SPOFilter: { listOfSPOForSearcherInput: listOfSPO, pickedSPO: [] },
      serializedFilters: [],
      percentageFilter: { range: { from: 0, to: 100 }, selectedPercentageFilter: undefined },
    },
  };
  const result = {
    fullData,
    slicedData: { displayedData, selectedData },
    sizes,
    workList: { columnsName: { ...columnsName() } },
    ids: { fullIds, displayedIds, selectedIds },
    dataSpec,
    scales: {
      ...changeScaleY({
        displayedIds,
        sizesSVG: sizes.sizesSVG,
      }),
      ...changeScaleX({
        sizesSVG: sizes.sizesSVG,
        fullData,
        displayedData,
        selectedData,
      }),
      changeScales: { changeScaleX, changeScaleY },
    },
    someData: { listOfSPO },
  };

  return result;
};
