import rowHasError from "../../auxFunctions/rowHasError";
import scales from "./scales";

const width = 250,
  height = 550,
  margin = {
    top: 16,
    right: 10,
    bottom: 16,
    left: 10,
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
