import * as d3 from "d3";
import moment from "moment";
import rowHasError from "../../../data/auxFunctions/rowHasError";

const width = 550,
  height = 550,
  margin = {
    top: 16,
    right: 10,
    bottom: 16,
    left: 10,
  };

export default (data) => {
  const sizesSVG = { width, height, margin };

  const domainXStartMS = d3
    .min(data, (d) => {
      if (rowHasError(d.data)) return null;
      return moment.utc(d.data.start.dateInMillisecons);
    })
    .valueOf();

  const domainXFinishMS = d3
    .max(data, (d) => {
      if (rowHasError(d.data)) return null;
      return moment.utc(d.data.finish.dateInMillisecons);
    })
    .add(1, "ms")
    .valueOf();

  const listID = data.map((d) =>
    rowHasError(d.data) ? d.data.isError.formattedText : d.data.jobName.formattedText
  );

  const xScaleMaxCoordinate = sizesSVG.width - margin.left - margin.right;

  const xScaleMinCoordinate = 0;

  const pixelsInOneDay =
    width / moment.duration(moment.utc(domainXFinishMS).diff(moment.utc(domainXStartMS))).as("d");

  return {
    data,
    sizesSVG,
    listID,
    scales: { domainXStartMS, domainXFinishMS, xScaleMaxCoordinate, xScaleMinCoordinate },
    aux: { pixelsInOneDay },
  };
};
