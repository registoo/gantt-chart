import rowHasError from "../../auxFunctions/rowHasError";
import scales from "./scales";

const width = 450,
  height = 9000,
  margin = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

export default (data) => {
  const sizesSVG = { width, height, margin };

  const listID = data.map((d) =>
    rowHasError(d.data) ? d.data.isError.formattedText : d.data.jobName.formattedText
  );

  return {
    data,
    sizesSVG,
    listID,
    scales: scales({
      listID,
      sizesSVG,
      data,
    }),
  };
};
