import * as d3 from "d3";
import moment from "moment";

export const brushStart = (node, xScale) => {
  console.log("brushStart", d3.event.sourceEvent.type, node, xScale());
};

export function brushed({ node, xScale, currentChildren, accordionExpanded }) {
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
  if (accordionExpanded) {
    const start = {
      cellType: "date",
      dateInMillisecons: d1[0],
      formattedText: moment.utc(d1[0]).format("MM/DD/YY"),
    };
    const s = +moment.utc(d1[0]).format("x");
    const f = +moment.utc(d1[1]).format("x");
    function getDates(startDate0, stopDate0) {
      const dateArray = [];
      let currentDate = moment.utc(startDate0);
      const stopDate = moment.utc(stopDate0);
      while (currentDate <= stopDate) {
        const obj = {
          [currentDate.format("MM/DD/YY")]: {
            cellType: "date",
            startDateInMillisecons: +currentDate.startOf("d").format("x"),
            finishDateInMillisecons: +currentDate.endOf("d").format("x"),
            formattedText: currentDate.format("MM/DD/YY"),
          },
        };
        dateArray.push(obj);
        currentDate = moment.utc(currentDate).add(1, "d");
      }
      return dateArray;
    }
    currentChildren.data.brushedData = getDates(s, f);
  }
}
export const brushEnd = ({ currentChildren, accordionExpanded }) => {
  if (accordionExpanded && !d3.event.selection) {
  }
};
