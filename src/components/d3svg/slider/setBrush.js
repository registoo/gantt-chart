import * as d3 from "d3";
import moment from "moment";
import getScales from "./drawScales.js";

export default function (props) {
  const drawScales = getScales(props);
  let selectedDates = props.xScale.domain().map((e) => drawScales.xScale(e));

  const g = d3.select("#gForSlider");
  const brushed = () => {
    if (!d3.event.sourceEvent) return;
    if (d3.event.sourceEvent.type === "brush") return;

    const d0 = d3.event.selection.map(drawScales.xScale.invert),
      d1 = d0.map(d3.utcDay.round);

    if (d1[0] >= d1[1]) {
      d1[0] = +moment.utc(d3.utcDay.floor(d0[0])).format("x");
      d1[1] = +moment.utc(d3.utcDay.offset(d1[0])).subtract(1, "ms").format("x");
    }
    const result = [
      +moment.utc(d1[0]).format("x"),
      +moment.utc(d1[1]).subtract(1, "ms").format("x"),
    ];

    g.call(d3.event.target.move, result.map(drawScales.xScale));
  };

  const brushEnded = () => {
    if (!d3.event.selection) {
      g.call(d3.event.target.move, selectedDates);
      return;
    }
    if (d3.event.sourceEvent) {
      selectedDates = d3.event.selection;
      props.changeXRange(
        selectedDates.map((el) => +moment.utc(drawScales.xScale.invert(el)).format("x"))
      );
    }
  };

  const brush = d3
    .brushX()
    .extent(drawScales.brushCoordinate)
    .on("brush", function () {
      brushed();
    })
    .on("end", function () {
      brushEnded();
    });
  g.call(drawScales.xAxis)
    .call(brush)
    .call(brush.move, selectedDates)
    .call((g) => {
      g.selectAll(".tick text").attr("font-size", "0.5rem");
    })
    .call((g) => {
      g.selectAll(".tick text").attr("display", "block");
    });
}
