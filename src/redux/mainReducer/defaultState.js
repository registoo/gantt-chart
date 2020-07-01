import rowHasError from "../../auxFunctions/rowHasError";
import changeScaleX from "./scales/x.js";
import changeScaleY from "./scales/y.js";
import columns from "../../data/columns.js";
import { defaultResizer } from "../../auxFunctions/resizedTypes";

export default (fullData) => {
  // количетсво строк данных
  const maxElementsOnPage = 12;
  const startData = 0;
  const dataSpec = {
    dataRange: { start: startData, finish: startData + maxElementsOnPage },
    currentElementsOnPage: maxElementsOnPage,
    maxElementsOnPage,
    wheeled: true,
    filtered: false,
  };

  const dataDisplayed = fullData.slice(dataSpec.dataRange.start, dataSpec.dataRange.finish);
  const stringHeight = 35;
  const heightSVG = dataDisplayed.length * (stringHeight * 1.25);
  const marginSVG = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };
  const sizesSVG = {
    separatorWidth: 6,
    minWidth: 400,
    width: 0,
    height: heightSVG,
    margin: marginSVG,
    stringHeight,
    slider: { height: 20 },
    resizedType: defaultResizer,
  };
  const sizesWL = { width: 0, height: heightSVG };

  const displayedIds = dataDisplayed.map((d) =>
    rowHasError(d.data) ? d.data.isError.formattedText : d.data.jobName.formattedText
  );

  const fullIds = fullData.map((d) =>
    rowHasError(d.data) ? d.data.isError.formattedText : d.data.jobName.formattedText
  );

  const selectedData = fullData;
  const selectedIds = fullIds;
  // колоки данных workList
  const columnsName = () => {
    const col = { ...columns };
    delete col.colIsError;
    return col;
  };

  const result = {
    fullData,
    slicedData: { dataDisplayed, selectedData },
    sizesSVG,
    workList: { sizesWL, columnsName: { ...columnsName() } },
    ids: { fullIds, displayedIds, selectedIds },
    dataSpec,
    scales: {
      ...changeScaleY({
        displayedIds,
        sizesSVG,
      }),
      ...changeScaleX({
        sizesSVG,
        fullData,
        dataDisplayed,
      }),
      changeScales: { changeScaleX, changeScaleY },
    },
  };

  return result;
};
