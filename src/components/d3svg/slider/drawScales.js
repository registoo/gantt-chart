import * as d3 from "d3";

export default (props) => {
  const xScale = d3
    .scaleTime()
    .domain([props.selectedStartMS, props.selectedFinishMS])
    .range([0, props.widthSVG]);
  const xAxis = d3
    .axisBottom()
    .scale(xScale)
    .ticks(d3.timeWeek)
    .tickFormat((d) => d3.timeFormat("%d/%m")(d));

  const x0 = 0;
  const y0 = 0;
  const x1 = props.widthSVG;

  const y1 = y0 + props.height;
  const brushCoordinate = [
    [x0, y0],
    [x1, y1],
  ];

  return { xScale, xAxis, brushCoordinate };
};
