import * as d3 from "d3";
import moment from "moment";

export const brushStart = (node, xScale) => {
  console.log("brushStart", d3.event.sourceEvent.type, node, xScale());
};

export function brushed({ node, xScale, currentChildren, lvl4BrushSelected }) {
  if (d3.event.sourceEvent.type === "brush") return;
  const d0 = d3.event.selection.map(xScale.invert),
    d1 = d0.map(d3.utcDay.round);
  // If empty when rounded, use floor instead.
  if (d1[0] >= d1[1]) {
    d1[0] = +moment.utc(d3.utcDay.floor(d0[0])).format("x");
    d1[1] = +moment.utc(d3.utcDay.offset(d1[0])).subtract(1, "ms").format("x");
  } else {
    d1[0] = +moment.utc(d1[0]).format("x");
    d1[1] = +moment.utc(d1[1]).subtract(1, "ms").format("x");
  }

  d3.select(node).call(d3.event.target.move, d1.map(xScale));
  // магия рисования прямоугольничков поверх брашей
  if (lvl4BrushSelected) {
    const start = {
      cellType: "date",
      dateInMillisecons: d1[0],
      formattedText: moment.utc(d1[0]).format("MM/DD/YY"),
    };
    const finish = {
      cellType: "date",
      dateInMillisecons: d1[1],
      formattedText: moment.utc(d1[1]).format("MM/DD/YY"),
    };
    currentChildren.data.start = start;
    currentChildren.data.finish = finish;

    const millisecondsToDate = (ms) => moment.utc(ms);
    currentChildren.data.duration =
      moment
        .duration(
          millisecondsToDate(finish.dateInMillisecons).diff(
            millisecondsToDate(start.dateInMillisecons)
          )
        )
        .get("d") + 1;

    currentChildren.data.percentComplete = 0;
  }
}
export const brushEnd = ({ currentChildren, lvl4BrushSelected }) => {
  if (lvl4BrushSelected && !d3.event.selection) {
    delete currentChildren.data.start;
    delete currentChildren.data.finish;
    delete currentChildren.data.duration;
  }
};
