import rowHasError from "../../auxFunctions/rowHasError";
import scales from "./scales";
import columns from "../../data/columns.js";

export default (data) => {
  // количетсво строк данных
  const elementsOnPage = 12;
  const startData = 0;
  const dataSpec = {
    dataRange: { start: startData, finish: startData + elementsOnPage },
    elementsOnPage,
    wheeled: true,
  };

  const dataDisplayed = data.slice(dataSpec.dataRange.start, dataSpec.dataRange.finish);
  const stringHeight = 40;
  const heightSVG = dataDisplayed.length * (stringHeight * 1.25);
  const marginSVG = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };
  const sizesSVG = {
    width: 0,
    height: heightSVG,
    margin: marginSVG,
    stringHeight,
    slider: { height: 20 },
  };
  const sizesWL = { width: 0, height: heightSVG };

  const listIdDisplayed = dataDisplayed.map((d) =>
    rowHasError(d.data) ? d.data.isError.formattedText : d.data.jobName.formattedText
  );

  const totalListOfID = data.map((d) =>
    rowHasError(d.data) ? d.data.isError.formattedText : d.data.jobName.formattedText
  );
  // колоки данных workList
  const columnsName = () => {
    const col = { ...columns };
    delete col.colIsError;
    return col;
  };

  const result = {
    data,
    sizesSVG,
    workList: { sizesWL, columnsName: { ...columnsName() } },
    ids: { totalListOfID, listIdDisplayed },
    dataSpec,
    dataDisplayed,
    scales: scales({
      listIdDisplayed,
      sizesSVG,
      dataDisplayed,
    }),
    changeScales: scales,
  };

  return result;
};
