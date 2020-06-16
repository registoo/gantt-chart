import rowHasError from "../../auxFunctions/rowHasError";
import scales from "./scales";

export default (data) => {
  const stringHeight = 70;
  const heightSVG = data.length * (stringHeight * 1.25);
  const marginSVG = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };
  const sizesSVG = { width: 0, height: heightSVG, margin: marginSVG, stringHeight };
  const sizesWL = { width: 0, height: heightSVG, margin: { ...marginSVG, top: 50 } };

  const listID = data.map((d) =>
    rowHasError(d.data) ? d.data.isError.formattedText : d.data.jobName.formattedText
  );

  const result = {
    data,
    sizesSVG,
    sizesWL,
    listID,
    scales: scales({
      listID,
      sizesSVG,
      data,
    }),
  };
  console.log(result);

  return result;
};
