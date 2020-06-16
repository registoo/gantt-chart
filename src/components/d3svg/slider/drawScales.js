import * as d3 from "d3";

export default (props) => {
  const pixelsInOneDay = props.getPixelsInOneDay(props.projectStartMS, props.projectFinishMS);
  const xScale = d3
    .scaleTime()
    .domain([props.projectStartMS, props.projectFinishMS])
    .range([0, props.widthSVG - props.marginSVG.left - props.marginSVG.right]);
  const xAxis = d3
    .axisBottom()
    .scale(xScale)
    .ticks(d3.utcDay)
    .tickFormat((d) => d3.timeFormat("%d/%m")(d));

  const x0 = 0;
  const y0 = 0;
  const x1 = props.widthSVG - props.marginSVG.right - props.marginSVG.left;

  const y1 = y0 + 50;
  const brushCoordinate = [
    [x0, y0],
    [x1, y1],
  ];

  return { pixelsInOneDay, xScale, xAxis, brushCoordinate };
};
