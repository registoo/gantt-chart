import * as d3 from "d3";
import { rowHasError } from "../../../auxFunctions";
import moment from "moment";

export default function (state) {
  const getPixelsInOneDay = (start, finish) =>
    state.sizesSVG.width / moment.duration(moment.utc(finish).diff(moment.utc(start))).as("d");

  const xScaleMaxCoordinate =
    state.sizesSVG.width - state.sizesSVG.margin.left - state.sizesSVG.margin.right;
  const xScaleMinCoordinate = 0;

  const domainXFinishMS = d3
    .max(state.dataDisplayed, (d) => {
      if (rowHasError(d.data)) return null;
      return moment.utc(d.data.finish.dateInMillisecons);
    })
    .add(1, "ms")
    .valueOf();

  const domainXStartMS = d3
    .min(state.dataDisplayed, (d) => {
      if (rowHasError(d.data)) return null;
      return moment.utc(d.data.start.dateInMillisecons);
    })
    .valueOf();

  const projectStartMS = d3
    .min(state.fullData, (d) => {
      if (rowHasError(d.data)) return null;
      return moment.utc(d.data.start.dateInMillisecons);
    })
    .valueOf();

  const projectFinishMS = d3
    .max(state.fullData, (d) => {
      if (rowHasError(d.data)) return null;
      return moment.utc(d.data.finish.dateInMillisecons);
    })
    .add(1, "ms")
    .valueOf();

  const xScale = d3
    .scaleTime()
    .domain([domainXStartMS, domainXFinishMS])
    .range([xScaleMinCoordinate, xScaleMaxCoordinate]);

  const xAxis = d3.axisBottom().scale(xScale);

  const setWidthOfHorizontalScale = ({
    widthSVG,
    marginSVG,
    domainXStartMS,
    domainXFinishMS,
    xScaleMinCoordinate,
  }) => {
    const xScaleMaxCoordinate = widthSVG - marginSVG.left - marginSVG.right;
    const xScale = d3
      .scaleTime()
      .domain([domainXStartMS, domainXFinishMS])
      .range([xScaleMinCoordinate, xScaleMaxCoordinate]);
    const xAxis = d3.axisBottom().scale(xScale);
    return { xScaleMaxCoordinate, xScale, xAxis };
  };

  const setXRange = (startMS, finishMS, state) => {
    const domainXStartMS = startMS;
    const domainXFinishMS = finishMS;
    const xScale = d3
      .scaleTime()
      .domain([domainXStartMS, domainXFinishMS])
      .range([state.scales.xScaleMinCoordinate, state.scales.xScaleMaxCoordinate]);
    const xAxis = d3.axisBottom().scale(xScale);

    return { xScale, xAxis, domainXStartMS, domainXFinishMS };
  };

  return {
    xScale,
    xAxis,
    domainXFinishMS,
    domainXStartMS,
    xScaleMaxCoordinate,
    xScaleMinCoordinate,
    projectStartMS,
    projectFinishMS,
    aux: { setWidthOfHorizontalScale, setXRange, getPixelsInOneDay },
  };
}
