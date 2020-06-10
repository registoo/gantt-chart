import * as d3 from "d3";

export default (props) => {
  const pixelsInOneDay = props.scales.aux.getPixelsInOneDay(
    props.scales.projectStartMS,
    props.scales.projectFinishMS
  );
  const xScale = d3
    .scaleTime()
    .domain([props.scales.projectStartMS, props.scales.projectFinishMS])
    .range([0, props.sizesSVG.width - props.sizesSVG.margin.left - props.sizesSVG.margin.right]);
  const xAxis = d3
    .axisBottom()
    .scale(xScale)
    .ticks(d3.utcDay)
    .tickFormat((d) => d3.timeFormat("%d/%m")(d));

  const x0 = 0;
  const y0 = 0;
  const x1 = props.sizesSVG.width - props.sizesSVG.margin.right - props.sizesSVG.margin.left;

  const y1 = y0 + 50;
  const brushCoordinate = [
    [x0, y0],
    [x1, y1],
  ];

  return { pixelsInOneDay, xScale, xAxis, brushCoordinate };
};
