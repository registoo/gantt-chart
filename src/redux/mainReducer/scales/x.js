import * as d3 from "d3";
import { rowHasError } from "../../../auxFunctions";
import moment from "moment";

export default function (state) {
  const xScaleMaxCoordinate =
    state.sizesSVG.width - state.sizesSVG.margin.left - state.sizesSVG.margin.right;
  const xScaleMinCoordinate = 0;

  const domainXFinishMS = d3
    .max(state.data, (d) => {
      if (rowHasError(d.data)) return null;
      return moment.utc(d.data.finish.dateInMillisecons);
    })
    .add(1, "ms")
    .valueOf();

  const domainXStartMS = d3
    .min(state.data, (d) => {
      if (rowHasError(d.data)) return null;
      return moment.utc(d.data.start.dateInMillisecons);
    })
    .valueOf();

  const xScale = d3
    .scaleTime()
    .domain([domainXStartMS, domainXFinishMS])
    .range([xScaleMinCoordinate, xScaleMaxCoordinate]);

  const xAxis = d3.axisBottom().scale(xScale);

  const setHorizontalScale = (width, state) => {
    const xScaleMaxCoordinate = width - state.sizesSVG.margin.left - state.sizesSVG.margin.right;
    const xScale = d3
      .scaleTime()
      .domain([state.scales.domainXStartMS, state.scales.domainXFinishMS])
      .range([state.scales.xScaleMinCoordinate, xScaleMaxCoordinate]);
    const xAxis = d3.axisBottom().scale(xScale);
    return { xScaleMaxCoordinate, xScale, xAxis };
  };

  return {
    xScale,
    xAxis,
    domainXFinishMS,
    domainXStartMS,
    xScaleMaxCoordinate,
    xScaleMinCoordinate,
    aux: { setHorizontalScale },
  };
}
