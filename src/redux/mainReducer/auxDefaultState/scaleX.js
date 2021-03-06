import * as d3 from "d3";
import { rowHasError } from "../../../auxFunctions";
import moment from "moment";

export default function (state) {
  if (state.hierarchyDisplayedData.length === 0) return;
  const xScaleMaxCoordinate =
    state.sizesSVG.width - state.sizesSVG.margin.left - state.sizesSVG.margin.right;
  const xScaleMinCoordinate = 0;

  const displayedFinishMS0 = d3.max(state.hierarchyDisplayedData, (d0) => {
    const d = d0.data;
    if (rowHasError(d.data)) return moment.utc().endOf("day");
    if (!d.data.finish) return;
    return moment.utc(d.data.finish.dateInMillisecons);
  });

  const displayedStartMS0 = d3.min(state.hierarchyDisplayedData, (d0) => {
    const d = d0.data;
    if (rowHasError(d.data)) return moment.utc().endOf("day");
    if (!d.data.start) return;
    return moment.utc(d.data.start.dateInMillisecons);
  });
  const projectStartMS0 = d3.min(state.hierarchyFullData.children, (d0) => {
    const d = d0.data;
    if (rowHasError(d.data)) return null;
    if (!d.data.start) return;
    return moment.utc(d.data.start.dateInMillisecons);
  });

  const projectFinishMS0 = d3.max(state.hierarchyFullData.children, (d0) => {
    const d = d0.data;
    if (rowHasError(d.data)) return null;
    if (!d.data.finish) return;
    return moment.utc(d.data.finish.dateInMillisecons);
  });

  const displayedFinishMS = displayedFinishMS0
    ? displayedFinishMS0.add(1, "ms").valueOf()
    : displayedFinishMS0;
  const projectFinishMS = projectFinishMS0
    ? projectFinishMS0.add(1, "ms").valueOf()
    : projectFinishMS0;
  const displayedStartMS = displayedStartMS0 ? displayedStartMS0.valueOf() : displayedStartMS0;
  const projectStartMS = projectStartMS0 ? projectStartMS0.valueOf() : projectStartMS0;

  const selectedFinishMS = d3
    .max(
      state.hierarchySelectedData.length > 0
        ? state.hierarchySelectedData
        : state.hierarchyFullData.children,
      (d0) => {
        const d = d0.data;
        if (rowHasError(d.data)) return moment.utc().endOf("day");
        if (!d.data.finish) return;
        return moment.utc(d.data.finish.dateInMillisecons);
      }
    )
    .add(1, "ms")
    .valueOf();

  const selectedStartMS = d3
    .min(
      state.hierarchySelectedData.length > 0
        ? state.hierarchySelectedData
        : state.hierarchyFullData.children,
      (d0) => {
        const d = d0.data;
        if (rowHasError(d.data)) return moment.utc().endOf("day");
        if (!d.data.start) return;
        return moment.utc(d.data.start.dateInMillisecons);
      }
    )
    .valueOf();

  const xScale = d3
    .scaleTime()
    .domain([displayedStartMS, displayedFinishMS])
    .range([xScaleMinCoordinate, xScaleMaxCoordinate]);

  const xAxis = d3.axisBottom().scale(xScale);

  const setWidthOfHorizontalScale = ({
    widthSVG,
    marginSVG,
    displayedStartMS,
    displayedFinishMS,
    xScaleMinCoordinate,
  }) => {
    const xScaleMaxCoordinate = widthSVG - marginSVG.left - marginSVG.right;
    const xScale = d3
      .scaleTime()
      .domain([displayedStartMS, displayedFinishMS])
      .range([xScaleMinCoordinate, xScaleMaxCoordinate]);
    const xAxis = d3.axisBottom().scale(xScale);
    return { xScaleMaxCoordinate, xScale, xAxis };
  };

  const setXRange = (startMS, finishMS, state) => {
    const displayedStartMS = startMS;
    const displayedFinishMS = finishMS;
    const xScale = d3
      .scaleTime()
      .domain([displayedStartMS, displayedFinishMS])
      .range([state.scales.xScaleMinCoordinate, state.scales.xScaleMaxCoordinate]);
    const xAxis = d3.axisBottom().scale(xScale);

    return { xScale, xAxis, displayedStartMS, displayedFinishMS };
  };

  return {
    xScale,
    xAxis,
    displayedFinishMS,
    displayedStartMS,
    xScaleMaxCoordinate,
    xScaleMinCoordinate,
    projectStartMS,
    projectFinishMS,
    selectedStartMS,
    selectedFinishMS,
    aux: { setWidthOfHorizontalScale, setXRange },
  };
}
